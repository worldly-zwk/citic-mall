import { useCallback, useEffect, useState } from 'react';
import { Modal, ModalProps, StyleSheet, View } from 'react-native';
import WebView, { WebViewMessageEvent } from 'react-native-webview';
import Spin from '../Spin';
import Link from '../Link';
import Typography from '../Typography';
import { toast } from '@/utils';

interface PopupProps extends ModalProps {
  onFinish?: (data: any) => void;
  onClose?: () => void;
}

interface Message<P = any> {
  type: 'init' | 'close' | 'success' | 'ready' | 'error';
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

    if (message.type === 'error') {
      toast(message.payload?.message || '');
      onClose?.();
    }
  }, [onFinish, onClose]);

  useEffect(() => {
    setLoading(props.visible || false);
  }, [props.visible]);

  return (
    <Modal animationType="fade" transparent onRequestClose={onClose} onDismiss={onClose} {...restProps}>
      <View style={styles.body}>
        <View style={styles.captcha}>
          <Spin spinning={loading} style={{ flex: 0 }} contentContainerStyle={{ flex: 0 }}>
            <WebView
              webviewDebuggingEnabled
              originWhitelist={['*']}
              source={require('@/assets/html/captcha.html')}
              onMessage={handleMessage}
              containerStyle={styles.captchaContainer}
            />
          </Spin>
          <Link style={styles.cancel} onPress={onClose}>
            <Typography.Text size="large" color="secondary" align="center">取消</Typography.Text>
          </Link>
        </View>
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
  captcha: {
    width: 330,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
  },
  captchaContainer: {
    flex: 0,
    width: 330,
    height: 240,
  },
  cancel: {
    height: 49,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
    justifyContent: 'center',
  }
})

export default ModalCaptcha;
