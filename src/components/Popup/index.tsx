import { ReactNode } from 'react';
import { Modal, ModalProps, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Typography from '../Typography';

interface PopupProps extends ModalProps {
  title?: string;
  header?: ReactNode;
  bodyStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
}

const Popup = (props: PopupProps) => {
  const { title, header, style, bodyStyle, children, onClose, ...restProps } = props;
  const insets = useSafeAreaInsets();

  return (
    <Modal animationType="fade" transparent onRequestClose={onClose} onDismiss={onClose} {...restProps}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.mask}></View>
      </TouchableWithoutFeedback>
      <View style={[styles.popup, style]}>
        {header}
        {(!header && title) && (
          <View style={styles.header}>
            <Typography.Text style={styles.title} size="large">{title}</Typography.Text>
          </View>
        )}
        <View style={[styles.body, { paddingBottom: insets.bottom }, bodyStyle]}>{children}</View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  mask: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, .5)'
  },
  popup: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    zIndex: 10,
  },
  header: {
    paddingVertical: 11,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    padding: 10,
    backgroundColor: '#fff'
  },
  title: {
    textAlign: 'center',
  }
})

export default Popup;
