import { Key, MutableRefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import { Animated, Dimensions, LayoutRectangle, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from 'react-native';

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
