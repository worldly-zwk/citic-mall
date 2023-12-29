import { useCallback, useEffect, useMemo } from 'react';
import { Animated } from 'react-native';

export function useAnimated() {
  const mask = useMemo(() => new Animated.Value(0), []);
  const content = useMemo(() => new Animated.Value(1.2), []);

  useEffect(() => {
    Animated.timing(mask, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(content, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  const hide = useCallback(() => {
    Animated.timing(mask, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();

    Animated.timing(content, {
      toValue: 0.2,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, []);

  return [mask, content, hide] as const;
}