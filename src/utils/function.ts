type DebouncedFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => void;
type ThrottleFunction<F extends (...args: any[]) => any> = (...args: Parameters<F>) => ReturnType<F>;

export function debounce<F extends (...args: any[]) => any>(func: F, wait: number): DebouncedFunction<F> {
  let timer: NodeJS.Timeout;
  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  }
}

export function throttle<F extends (...args: any[]) => any>(func: F, wait: number): ThrottleFunction<F> {
  let lastInvoke: number;
  let result: ReturnType<F>;

  return function(this: ThisParameterType<F>, ...args: Parameters<F>) {
    const time = Date.now();
    if (!lastInvoke || (time - lastInvoke > wait)) {
      lastInvoke = time;
      result = func.apply(this, args);
    }

    return result;
  }
}
