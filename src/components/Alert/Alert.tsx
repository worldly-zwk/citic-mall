import { StyleSheet, View, TouchableWithoutFeedback, Animated } from 'react-native';
import Typography from '../Typography';
import { useCallback, useEffect, useMemo } from 'react';
import { useAnimated } from './hooks';

 export interface AlertProps {
  okText?: string;
  message?: string;
  onOk?: () => void;
}

const Alert = (props: AlertProps) => {
  const { message, okText = '我知道了', onOk } = props;
  const [opacity, scale, hide] = useAnimated();
  // const anim = useMemo(() => new Animated.Value(0), []);

  const handleOk = useCallback(() => {
    hide();
    onOk?.();
  }, [onOk, hide]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity }]}>
      <Animated.View style={[styles.alert, { opacity, transform: [{ scale }] }]}>
        <Animated.View style={styles.content}>
          {message?.split('\n').map((text, index) => (
            <Typography.Text align="center" key={index}>{text}</Typography.Text>
          ))}
        </Animated.View>
        <TouchableWithoutFeedback onPress={handleOk}>
          <View style={styles.ok}>
            <Typography.Text size="large" primary>{okText}</Typography.Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .45)'
  },
  alert: {
    width: 270,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  ok: {
    height: 50,
    lineHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default Alert;
