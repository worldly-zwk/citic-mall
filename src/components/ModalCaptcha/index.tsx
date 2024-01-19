import { useCallback, useEffect, useState } from 'react';
import { Modal, ModalProps, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import Spin from '../Spin';

interface PopupProps extends ModalProps {
  onFinish?: (data: any) => void;
  onClose?: () => void;
}

interface Message<P = any> {
  type: 'init' | 'close' | 'success' | 'ready';
  payload: P;
}

const ModalCaptcha = (props: PopupProps) => {
  const { children, onFinish, onClose, ...restProps } = props;
  const [loading, setLoading] = useState(true);

  const handleMessage = useCallback((e: WebViewMessageEvent) => {
    const message: Message = JSON.parse(e.nativeEvent.data);
    if (message.type === 'ready') {
      setLoading(false);
    }

    if (message.type === 'success') {
      onFinish?.(message.payload);
    }

    if (message.type === 'close') {
      onClose?.();
    }
  }, [onFinish, onClose]);

  useEffect(() => {
    setLoading(props.visible || false);
  }, [props.visible]);

  return (
    <Modal animationType="fade" transparent onRequestClose={onClose} onDismiss={onClose} {...restProps}>
      <View style={styles.body}>
        <Spin spinning={loading} style={{ flex: 0 }} contentContainerStyle={{ flex: 0, opacity: 1 }}>
          <WebView
            webviewDebuggingEnabled
            originWhitelist={['*']}
            source={require('@/assets/html/captcha.html')}
            onMessage={handleMessage}
            containerStyle={styles.captchaContainer}
          />
        </Spin>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  captchaContainer: {
    flex: 0,
    width: 330,
    height: 280,
    backgroundColor: '#fff',
    borderRadius: 6
  }
})

export default ModalCaptcha;
