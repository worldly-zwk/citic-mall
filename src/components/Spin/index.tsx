import { Image, StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface SpinProps extends ViewProps {
  spinning?: boolean;
  contentContainerStyle?: StyleProp<ViewStyle>;
}

const Spin = (props: SpinProps) => {
  const { style, spinning, contentContainerStyle, ...restProps } = props;

  return (
    <View style={[{ flex: 1 }, style]}>
      {spinning && (
        <View style={styles.spin}>
          <Image style={styles.loading} source={require('@/assets/images/view/loading.gif')} />
        </View>
      )}
      <View style={[styles.container, { opacity: spinning ? 0.7 : 1 }, contentContainerStyle]} {...restProps} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    pointerEvents: 'none',
  },
  spin: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  loading: {
    width: 67,
    height: 67,
  }
});

export default Spin;
