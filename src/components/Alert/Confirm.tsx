import { useCallback } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, TextStyle } from 'react-native';
import Typography from '../Typography';
import { useAnimated } from './hooks';
import Space from '../Space';

 export interface ConfirmProps {
  width?: number;
  okText?: string;
  cancelText?: string;
  message?: string;
  onOk?: () => void;
  onCancel?: () => void;
  contentStyle?: TextStyle;
  okButtonStyle?: TextStyle;
}

const Confirm = (props: ConfirmProps) => {
  const {
    width = 270,
    message,
    okText = '确定',
    cancelText = '取消',
    onOk,
    onCancel,

    contentStyle,
    okButtonStyle
  } = props;
  const [opacity, scale, hide] = useAnimated();

  const handleCancel = useCallback(() => {
    hide();
    onCancel?.();
  }, [onCancel, hide]);

  const handleOk = useCallback(() => {
    hide();
    onOk?.();
  }, [handleCancel]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity }]}>
      <Animated.View style={[styles.confirm, { width, opacity, transform: [{ scale }] }]}>
        <Animated.View style={styles.content}>
          {message?.split('\n').map((text, index) => (
            <Typography.Text align="center" key={index} style={contentStyle}>{text}</Typography.Text>
          ))}
        </Animated.View>
        <Space>
          <TouchableWithoutFeedback onPress={handleCancel}>
            <View style={[styles.button, styles.bordered]}>
              <Typography.Text size="large" color="secondary">{cancelText}</Typography.Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={handleOk}>
            <View style={styles.button}>
              <Typography.Text size="large" primary style={okButtonStyle}>{okText}</Typography.Text>
            </View>
          </TouchableWithoutFeedback>
        </Space>
        
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
  confirm: {
    width: 270,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  button: {
    flex: 1,
    height: 50,
    lineHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bordered: {
    borderRightColor: '#eee',
    borderRightWidth: StyleSheet.hairlineWidth,
  }
});

export default Confirm;
