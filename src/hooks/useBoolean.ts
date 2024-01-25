import { useState, useMemo } from 'react';

const useBoolean = (initialState = false) => {
  const [state, setState] = useState<boolean>(initialState);

  const actions = useMemo((value?: any) => ({
    set: setState,
    toggle: () => {
      setState(old => !old);
    },
    setTrue: () => {
      setState(true);
    },
    setFalse: () => {
      setState(false);
    },
  }), []);

  return [state, actions] as const;
};

export default useBoolean;
