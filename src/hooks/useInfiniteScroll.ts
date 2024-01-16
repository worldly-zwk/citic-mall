import { useCallback, useEffect, useMemo, useRef } from "react";
import storage from "@/utils/storage";
import useSetState from "./useSetState";
import useMemoizedFn from "./useMemoizedFn";

type Service<T> = ((index: number) => Promise<API.BasePageResponse<T>>);

interface Options {
  manual?: boolean;
  cacheKey?: string;
  refreshDeps?: any[];
}

interface RequestState<T> {
  data?: T[];
  count: number;
  loading: boolean;
  loadingMore: boolean;
}

const useInfiniteScroll = <T>(serviceFn: Service<T>, options: Options = {}) => {
  const { refreshDeps = [] } = options;
  const indexRef = useRef<number>(1);
  const isLastPage = useRef(false);
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

  const fetch = useMemoizedFn(() => {
    fetchBefore();
    return service(indexRef.current).then(fetchAfter);
  });

  const fetchAfter = useCallback((data: API.BasePageResponse<T>) => {
    if (options?.cacheKey) {
      storage.setItem(options?.cacheKey, data);
    }

    return data;
  }, []);

  const run = useCallback(() => {
    indexRef.current = 1;
    setState({
      loading: true,
    });
    return fetch().then(result => {
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
      const result = await fetch().finally(() => {
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
      run();
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
