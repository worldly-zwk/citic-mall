import { ReactNode, useCallback } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, ViewProps } from 'react-native';
import { useControllableValue } from '@/hooks';
import Space from '../Space';

interface CheckboxProps extends ViewProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
}

const Checkbox = (props: CheckboxProps) => {
  const { children, ...restProps } = props;
  const [checked, setChecked] = useControllableValue(props, {
    defaultValue: false,
    valuePropName: 'checked',
  });

  const handlePress = useCallback(() => {
    setChecked(checked => !checked);
  }, []);

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <Space size={8} align="center" {...restProps}>
        <Image style={styles.checkbox} source={checked ? require('@/assets/images/icons/checkbox-checked.png') : require('@/assets/images/icons/checkbox.png')} />
        {children}
      </Space>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  checkbox: {
    width: 24,
    height: 24,
  },
});

export default Checkbox;
