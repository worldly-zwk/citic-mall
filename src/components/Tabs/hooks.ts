import { Key, MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, ScrollView, ViewStyle } from 'react-native';

interface LinePositionOptions {
  tabSizes: Map<Key, LayoutRectangle>;
  activeKey: string | number;
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

interface ScrollTabToCenterOptions {
  scrollable?: boolean;
  activeKey: Key;
  tabSizes: Map<Key, LayoutRectangle>;
  scrollView: MutableRefObject<ScrollView | null>;
}

export function useScrollTabToCenter(options: ScrollTabToCenterOptions) {
  const { tabSizes, activeKey, scrollView, scrollable } = options;
  const scrollOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (scrollable) {
      const tabSize = tabSizes.get(activeKey);
      if (tabSize) {
        const scrollOffsetX = scrollOffset.current.x;
        const screenX = tabSize.x - scrollOffsetX;
        const screenWidthHalf = Dimensions.get('screen').width / 2;
        scrollView.current?.scrollTo({x: scrollOffsetX + (screenX - screenWidthHalf) + tabSize.width, animated: true });
      }
    }
  }, [activeKey, tabSizes.size]);

  return useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    scrollOffset.current = e.nativeEvent.contentOffset;
  }, []);
}
