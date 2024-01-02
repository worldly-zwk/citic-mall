import { Key, useCallback, useState } from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Animated, TextStyle, LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { isTrue } from '@/utils/type';
import Typography from '../Typography';
import { useAnimated } from './hooks';

interface ActionSheetButton {
  key?: Key;
  text: string;
  style?: TextStyle;
}

export interface ActionSheetProps {
  buttons?: ActionSheetButton[];
  cancelText?: string;
  onOk?: (value: Key) => void;
  onCancel?: () => void;
}

const ActionSheet = (props: ActionSheetProps) => {
  const { buttons, cancelText = '取消', onOk, onCancel } = props;
  const [containerHeight, setContainerHeight] = useState(0);
  const [opacity, scale, hide] = useAnimated();

  const insets = useSafeAreaInsets();

  const translateY = opacity.interpolate({
    inputRange: [0, 1],
    outputRange: [containerHeight, 0]
  });

  const handleLayout = useCallback((e: LayoutChangeEvent) => {
    setContainerHeight(e.nativeEvent.layout.height);
  }, []);

  const handleCancel = useCallback(() => {
    hide();
    onCancel?.();
  }, [onCancel, hide]);

  const handleOk = useCallback((value: Key) => {
    onOk?.(value);
    handleCancel();
  }, [onOk, handleCancel]);

  return (
    <Animated.View style={[StyleSheet.absoluteFill, styles.container, { opacity }]}>
      <Animated.View
        style={[styles.actionSheet, { paddingBottom: insets.bottom, opacity, transform: [ { translateY } ] }]}
        onLayout={handleLayout}
      >
        <View style={styles.content}>
          {buttons?.map(({ key, text, style }, index) => (
            <TouchableWithoutFeedback onPress={() => handleOk?.(key || index)} key={`${key}-${index}`}>
              <View style={[styles.button, isTrue(index < buttons.length - 1, styles.bordered) ]}>
                <Typography.Text style={[styles.buttonText, style]}>{text}</Typography.Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
        <TouchableWithoutFeedback onPress={handleCancel}>
          <View style={[styles.button, styles.cancel]}>
            <Typography.Text style={styles.buttonText}>{cancelText}</Typography.Text>
          </View>
        </TouchableWithoutFeedback>
      </Animated.View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  actionSheet: {
    padding: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    transform: [{ translateY: 10 }]
  },
  content: {
    borderRadius: 6,
    overflow: 'hidden',
    backgroundColor: 'rgba(255, 255, 255, 0.8)'
  },
  button: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  bordered: {
    borderBottomColor: '#bbb',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cancel: {
    marginTop: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  buttonText: {
    fontSize: 18
  }
});

export default ActionSheet;
