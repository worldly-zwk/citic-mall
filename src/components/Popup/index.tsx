import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Animated, LayoutChangeEvent, ModalProps, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootSiblingPortal } from 'react-native-root-siblings';
import Typography from '../Typography';

interface PopupProps extends ModalProps {
  title?: string;
  header?: ReactNode;
  headerStyle?: StyleProp<ViewStyle>;
  bodyStyle?: StyleProp<ViewStyle>;
  onClose?: () => void;
}

const Popup = (props: PopupProps) => {
  const {
    title,
    style,
    header,
    headerStyle,
    bodyStyle,
    children,
    visible,
    onClose,
  } = props;
  const insets = useSafeAreaInsets();
  const [open, setOpen] = useState(visible);
  const [containerHeight, setContainerHeight] = useState(0);
  const value = useMemo(() => new Animated.Value(0), []);

  const translateY = value.interpolate({
    inputRange: [0, 1],
    outputRange: [containerHeight, 0]
  });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  }, []);

  useEffect(() => {
    if (visible) {
      setOpen(visible);
      Animated.timing(value, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(value, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setOpen(visible);
      });
    }
  }, [visible]);

  return (
    <RootSiblingPortal>
      <View style={[StyleSheet.absoluteFillObject, { display: open ? 'flex' : 'none' }]}>
        <TouchableWithoutFeedback onPress={onClose}>
          <Animated.View style={[styles.mask, { opacity: value }]} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[styles.popup, style, { opacity: value, transform: [{translateY}] }]}
          onLayout={handleLayout}
        >
          {header}
          {(!header && title) && (
            <View style={[styles.header, headerStyle]}>
              <Typography.Text style={styles.title} size="large">{title}</Typography.Text>
            </View>
          )}
          <View style={[styles.body, { paddingBottom: insets.bottom }, bodyStyle]}>{children}</View>
        </Animated.View>
      </View>
    </RootSiblingPortal>
  )
}

const styles = StyleSheet.create({
  mask: {
    ...StyleSheet.absoluteFillObject,
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
