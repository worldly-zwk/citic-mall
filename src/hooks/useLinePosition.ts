import { Key, useEffect, useMemo } from 'react';
import { Animated, LayoutRectangle, ViewStyle } from 'react-native';

interface LinePositionOptions {
  tabSizes: Map<Key, LayoutRectangle>;
  activeKey: Key;
}

export function useLinePosition(options: LinePositionOptions): ViewStyle {
  const { tabSizes, activeKey } = options;
  const lineAnim = useMemo(() => new Animated.Value(0), []);

  useEffect(() => {
    const layout = tabSizes.get(activeKey);
    if (layout) {
      lineAnim.setValue(layout.x + layout?.width / 2 - 7);
    }
  }, [tabSizes.size]);

  useEffect(() => {
    const layout = tabSizes.get(activeKey);
    if (layout) {
      const toValue = layout.x + layout?.width / 2 - 7;
      Animated.timing(lineAnim, {
        toValue,
        duration: 300,
        useNativeDriver: true
      }).start();
    }
  }, [activeKey]);

  return {
    transform: [{ translateX: lineAnim }]
  }
}

export default useLinePosition;
