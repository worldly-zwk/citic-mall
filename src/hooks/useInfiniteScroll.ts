import { useCallback, useEffect, useMemo, useRef } from "react";
import storage from "@/utils/storage";
import useSetState from "./useSetState";
import useMemoizedFn from "./useMemoizedFn";

type Service<T, P> = ((params: P & API.BasePageParams) => Promise<API.BasePageResponse<T>>);

interface Options<P> {
  manual?: boolean;
  cacheKey?: string;
  refreshDeps?: any[];
  defaultParams?: P;
}

interface RequestState<T> {
  data?: T[];
  count: number;
  loading: boolean;
  loadingMore: boolean;
}

const useInfiniteScroll = <T, P extends RecordAny = RecordAny>(serviceFn: Service<T, P>, options: Options<P> = {}) => {
  const { refreshDeps = [] } = options;
  const indexRef = useRef<number>(1);
  const isLastPage = useRef(false);
  const serviceParamsRef = useRef<P>();
  const service = useMemoizedFn(serviceFn);
  const [state, setState] = useSetState<RequestState<T>>({
    count: 0,
    loading: false,
    loadingMore: false,
  });

  const fetchBefore = useCallback(() => {
    if (options?.cacheKey) {
      storage.getItem(options?.cacheKey).then(data => {
        setState({
          loading: false,
          data
        });
      })
    }
  }, []);

  const fetch = useMemoizedFn((params?: P) => {
    fetchBefore();
    return service({
      ...(params as P),
      pageIndex: indexRef.current
    }).then(fetchAfter);
  });

  const fetchAfter = useCallback((data: API.BasePageResponse<T>) => {
    if (options?.cacheKey) {
      storage.setItem(options?.cacheKey, data);
    }

    return data;
  }, []);

  const run = useCallback((params?: P) => {
    indexRef.current = 1;
    serviceParamsRef.current = params;
    setState({
      loading: true,
      data: []
    });
    return fetch(params).then(result => {
      const { data, count } = result;
      isLastPage.current = result.data.length >= result.count;
      setState({
        data,
        count,
        loading: false,
      });
    }).catch(() => {
      setState({
        data: [],
        loading: false
      })
    });
  }, []);

  const loadMore = useCallback(async () => {
    indexRef.current += 1;
    setState({
      loadingMore: true,
    });
    if (!isLastPage.current) {
      const result = await fetch(serviceParamsRef.current).finally(() => {
        setState({
          loadingMore: false,
        });
      });

      setState((prevState) => {
        const { count } = result;
        const data = prevState.data?.concat(result.data);
        isLastPage.current = Number(data?.length) >= count;
        return {
          ...prevState,
          data,
          count,
        }
      });
    }

    return isLastPage.current;
  }, []);

  useEffect(() => {
    if (!options?.manual) {
      run(options.defaultParams);
    }
  }, [...refreshDeps]);

  const actions = useMemo(() => {
    return {
      run,
      loadMore
    }
  }, []);

  return [state, actions] as const;
}

export default useInfiniteScroll;
