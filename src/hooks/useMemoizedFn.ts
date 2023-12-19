import { useCallback, useRef } from 'react';

function useMemoizedFn<F extends (...args: any[]) => any>(func: F) {
  const funcRef = useRef(func);

  if (func !== funcRef.current) {
    funcRef.current = func;
  }

  return useCallback((...args: Parameters<F>): ReturnType<F> => {
    return funcRef.current.apply(null, args);
  }, []);
}

export default useMemoizedFn;
