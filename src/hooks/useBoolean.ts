import { isBoolean } from "@/utils/type";
import { useCallback, useState } from "react";

const useSetState = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const setBoolean = useCallback((value?: any) => {
    setState(isBoolean(value) ? value : false);
  }, []);

  return [state, setBoolean] as const;
};

export default useSetState;
