import { useMemo } from 'react';
import useTimer from './useTimer';

function useTimerWithClock(second: number, autoplay = false) {
  const [time, actions] = useTimer(second, autoplay);

  const clock = useMemo(() => {
    const hours = Math.floor(time / 60 / 60).toString().padStart(2, '0');
    const minute = Math.floor(time / 60 % 60).toString().padStart(2, '0');
    const second = Math.floor(time % 60).toString().padStart(2, '0');
    return { time, hours, minute, second }
  }, [time]);
  
  return [clock, actions] as const;
}

export default useTimerWithClock;
