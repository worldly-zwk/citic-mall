import { StyleSheet, Animated, Image } from 'react-native';
import { useAnimated } from './hooks';

 export interface AlertProps {
  okText?: string;
  message?: string;
  onOk?: () => void;
}

const Loading = () => {
  const [opacity] = useAnimated();

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity }]}>
      <Image style={styles.loading} source={require('@/assets/images/view/loading.gif')} />
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loading: {
    width: 67,
    height: 67,
  },
});

export default Loading;
