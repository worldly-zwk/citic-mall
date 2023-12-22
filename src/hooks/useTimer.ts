import { useCallback, useMemo, useRef, useState } from 'react';

function useTimer(second: number) {
  const timerRef = useRef<NodeJS.Timeout>();
  const [state, setState] = useState(second);

  const cancelTimer = useCallback(() => {
    clearTimeout(timerRef.current);
  }, []);

  const startTimer = useCallback((second?: any) => {
    if (typeof second == 'number') {
      setState(second);
    }

    timerRef.current = setTimeout(() => {
      setState(oldSecond => {
        const newSecond = oldSecond - 1;

        if (newSecond > 0) {
          startTimer();
        }

        return newSecond;
      });
    }, 1000);
  }, []);

  const actions = useMemo(() => ({ start: startTimer, cancel: cancelTimer }), [startTimer, cancelTimer]);

  return [state, actions] as const;
}

export default useTimer;
