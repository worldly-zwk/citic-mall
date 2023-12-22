import { Modal, ModalProps, SafeAreaView, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Typography from "../Typography";

interface PopupProps extends ModalProps {
  title?: string;
  bodyStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
}

const Popup = (props: PopupProps) => {
  const { title, bodyStyle, children, onClose, ...restProps } = props

  return (
    <Modal animationType="fade" transparent onRequestClose={onClose} onDismiss={onClose} {...restProps}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.mask}></View>
      </TouchableWithoutFeedback>
      <SafeAreaView style={styles.popup}>
        {title && (
          <View style={styles.header}>
            <Typography.Text style={styles.title} size="large">{title}</Typography.Text>
          </View>
        )}
        <View style={[styles.body, bodyStyle]}>{children}</View>
      </SafeAreaView>
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
    paddingVertical: 4,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  body: {
    padding: 10
  },
  title: {
    textAlign: 'center',
  }
})

export default Popup;
