import { Key, ReactNode, useCallback, useEffect, useRef, useState } from 'react';
import { LayoutChangeEvent, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';
import LinearGradient from 'react-native-linear-gradient';

interface BadgeProps extends ViewProps {
  count?: number;
  offset?: [number, number?];
}

const Badge = (props: BadgeProps) => {
  const { count, style, offset = [], children, ...restProps } = props;
  const mountKeyRef = useRef<number>();
  const [offsetX = 0, offsetY = 0] = offset;
  const [size, setSize] = useState({ width: 0, height: 0 });
  const countPosition = {
    top: 0 - ((size.height / 2) + offsetY),
    right: 0 - ((size.width / 2) + offsetX),
  };

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    if (mountKeyRef.current !== count) {
      mountKeyRef.current = count;
      setSize({ width: Math.floor(width), height: Math.floor(height) });
    }
    
  }, [count]);

  return (
    <View style={[styles.container, style]} {...restProps}>
      {!!count && (
        <LinearGradient colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 1 }} style={[styles.count, countPosition]} onLayout={handleLayout}>
          <Typography.Text size="small" color="white">{count}</Typography.Text>
        </LinearGradient>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    
  },
  count: {
    position: 'absolute',
    paddingHorizontal: 4,
    borderRadius: 16,
    backgroundColor: 'red',
    zIndex: 5,
    minWidth: 16,
    alignItems: 'center',
  },
})

export default Badge;
   