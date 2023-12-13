import { useCallback, useEffect, useMemo } from "react";
import request from "@/utils/request";
import storage from "@/utils/storage";
import useSetState from "./useSetState";

type Service<T, P> = string | ((params?: P) => Promise<T>);

interface Options {
  manual?: boolean;
  cacheKey?: string;
}

interface RequestState<T> {
  data?: T;
  loading: boolean;
}

const useRequest = <T = any, P extends RecordAny = RecordAny>(service: Service<T, P>, options?: Options) => {
  const [state, setState] = useSetState<RequestState<T>>({
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

  const fetch = useCallback((params?: P) => {
    fetchBefore();
    if (typeof service === 'string') {
      return request<T, P>({
        url: service,
        method: 'GET',
      })
    }

    return service(params);
  }, []);

  const fetchAfter = useCallback((data: T) => {
    setState({
      data,
      loading: false,
    });

    if (options?.cacheKey) {
      storage.setItem(options?.cacheKey, data);
    }

    return data;
  }, []);

  const run = useCallback((params?: P) => {
    return fetch(params).then(fetchAfter).finally(() => {
      setState({
        loading: false
      });
    });
  }, []);

  useEffect(() => {
    if (!options?.manual) {
      run()
    }
  }, []);

  const actions = useMemo(() => {

    return {
      run,
    }
  }, []);

  return [state, actions] as const;
}

export default useRequest;
