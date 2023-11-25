import { useCallback, useState } from "react";

const useSetState = <S extends Record<string, any>>(initialState: S | (() => S)) => {
  const [state, setState] = useState<S>(initialState);

  const setMergeState = useCallback((patch: Partial<S>) => {
    setState((prevState) => ({
      ...prevState,
      ...patch
    }));
  }, []);

  return [state, setMergeState] as const;
};

export default useSetState;
