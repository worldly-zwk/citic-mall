import { useCallback, useEffect, useMemo, useRef } from "react";
import { useFocusEffect } from "@react-navigation/native";
import request from "@/utils/request";
import storage from "@/utils/storage";
import { throttle, debounce } from "@/utils/function";
import useSetState from "./useSetState";

type Service<T, P> = string | ((params?: P) => Promise<T>);

interface Options<T, P> {
  manual?: boolean;
  cacheKey?: string;
  defaultParams?: P;
  throttleWait?: number;
  debounceWait?: number;
  refreshOnScreenFocus?: boolean;
  onSuccess?: (result: T) => void;
  onFail?: () => void;
}

type OptionsWithFormat<T, P, U> = {
  formatResult: (data: T) => U;
} & Options<U, P>;

interface Action<T, P> {
  run(params?: P): Promise<T>;
  mutate(data: T): void;
}

type Result<T, P> = [RequestState<T>, Action<T, P>];

interface RequestState<T> {
  data?: T;
  loading: boolean;
}

function useRequest<T = any, P extends RecordAny = RecordAny, U = any>(service: Service<T, P>, options: OptionsWithFormat<T, P, U>): Result<U,P>;
function useRequest<T = any, P extends RecordAny = RecordAny>(service: Service<T, P>, options?: Options<T, P>): Result<T,P>;
function useRequest(service: any, options: any = {}) {
  const { onSuccess } = options;
  const mountRef = useRef(false);
  const [state, setState] = useSetState<RequestState<any>>({
    loading: false,
  });

  const fetchBefore = useCallback(() => {
    setState({
      loading: true,
    });

    if (options?.cacheKey) {
      storage.getItem(options?.cacheKey).then(data => {
        setState({
          loading: false,
          data
        });
      })
    }
  }, []);

  const fetch = useCallback((params?: any) => {
    fetchBefore();
    if (typeof service === 'string') {
      return request({
        url: service,
        method: 'GET',
        params
      })
    }

    return service(params);
  }, []);

  const fetchAfter = useCallback((data: any) => {
    let result = data;

    if (options?.cacheKey) {
      storage.setItem(options?.cacheKey, data);
    }

    if (options?.formatResult) {
      result = options.formatResult(data);
    }

    onSuccess?.(data);
    setState({
      data: result,
      loading: false,
    });

    return data;
  }, []);

  const run = useMemo(() => {
    const func = (params: any) => {
      return fetch(params).then(fetchAfter).finally(() => {
        setState({
          loading: false
        });
      })
    };

    if (options.throttleWait) {
      return throttle(func, options.throttleWait);
    }

    if (options.debounceWait) {
      return debounce(func, options.debounceWait);
    }

    return func;
  }, []);

  useEffect(() => {
    if (!options?.manual) {
      mountRef.current = true;
      run(options?.defaultParams);
    }
  }, []);

  useFocusEffect(useCallback(() => {
    if (mountRef.current && options?.refreshOnScreenFocus) {
      run(options?.defaultParams);
    }
  }, []));

  const actions = useMemo(() => {
    return {
      run,
      mutate: (data: any) => {
        setState({ data });
      }
    }
  }, []);

  return [state, actions] as const;
}

export default useRequest;
