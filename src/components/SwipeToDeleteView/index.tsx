import { ReactNode, useCallback, useRef } from 'react';
import { GestureResponderEvent, LayoutChangeEvent, NativeScrollEvent, NativeSyntheticEvent, ScrollView, ScrollViewProps, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { useSetState } from '@/hooks';
import { pick } from '@/utils';
import { useGlobalState } from './hooks';

interface SwipeToDeleteViewProps extends ScrollViewProps {
  deleteContainerStyle?: StyleProp<ViewStyle>;
  extra?: ReactNode;
}

const SwipeToDeleteView = (props: SwipeToDeleteViewProps) => {
  const { style, extra, contentContainerStyle, deleteContainerStyle, children, ...restProps } = props;
  const scrollViewRef = useRef<ScrollView>(null);
  const startLocationXRef = useRef(0);
  const deleteContainerWidthRef = useRef(0);
  const visible = useGlobalState(state => state.visible);
  const abortDelete = useGlobalState(state => state.abort);
  const [state, setState] = useSetState({
    width: 0,
    bounces: false,
  });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setState(pick(e.nativeEvent.layout, ['width', 'height']));
  }, []);

  const handleDeleteLayout = useCallback((e: LayoutChangeEvent) => {
    deleteContainerWidthRef.current = e.nativeEvent.layout.width;
  }, []);

  const handleTouchStar = useCallback((e: GestureResponderEvent) => {
    startLocationXRef.current = e.nativeEvent.locationX;
  }, []);

  const handleTouchMove = useCallback((e: GestureResponderEvent) => {
    const { locationX } = e.nativeEvent;
    if (startLocationXRef.current - locationX > 5) {
      setState({ bounces: true });
      abortDelete();
    }
  }, [abortDelete]);

  const handleScrollEnd = useCallback((e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = e.nativeEvent;
    const deleteWidth = deleteContainerWidthRef.current;
    const isVisible = contentOffset.x > (deleteWidth / 2);
    if (contentOffset.x < deleteWidth) {
      scrollViewRef.current?.scrollTo({ x: isVisible ? deleteWidth : 0, animated: true });
    }
    useGlobalState.setState({
      visible: isVisible,
      abortFunc: () => {
        scrollViewRef.current?.scrollTo({ x: 0, animated: true });
      },
    });
  }, []);

  return (
    <ScrollView
      {...restProps}
      horizontal
      ref={scrollViewRef}
      bounces={state.bounces}
      showsHorizontalScrollIndicator={false}
      style={[styles.container, style]}
      onLayout={handleLayout}
      onScrollEndDrag={handleScrollEnd}
      onTouchStart={handleTouchStar}
      onTouchMove={handleTouchMove}
      onTouchEnd={abortDelete}
      scrollEventThrottle={16}
    >
      <View style={[pick(state, ['width']), contentContainerStyle, { pointerEvents: visible ? 'box-only' : 'auto' }]}>
        {children}
      </View>
      <View style={[styles.deleteContainer, deleteContainerStyle]} onLayout={handleDeleteLayout}>
        {extra}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  inner: {
    width: '100%',
    height: 200,
    backgroundColor: 'red'
  },
  deleteContainer: {
    width: 50,
    justifyContent: 'center',
  }
});

export default SwipeToDeleteView;
