import { isFunction } from "@/utils/type";
import { useCallback, useState } from "react";

const useSetState = <S extends Record<string, any>>(initialState: S | (() => S)) => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((value: Partial<S> | ((prevState: S) => Partial<S>)) => {
    setState((prevState) => {
      const patch = isFunction(value) ? value(prevState) : value;
      return {
        ...prevState,
        ...patch
      }
    });
  }, []);

  return [state, setMergeState] as const;
};

export default useSetState;
