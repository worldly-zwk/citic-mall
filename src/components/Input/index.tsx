import { ReactNode } from 'react';
import { StyleProp, StyleSheet, TextInput, TextInputProps, TextStyle, View, ViewStyle } from 'react-native';
import { isTrue } from '@/utils/type';

type InputSize = 'middle';

interface InputProps extends TextInputProps {
  size?: InputSize;
  extra?: ReactNode;
  bordered?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input = (props: InputProps) => {
  const { size, style, extra, bordered = true, containerStyle, ...restProps } = props;

  return (
    <View style={[styles.container, isTrue(bordered, styles.bordered), containerStyle]}>
      <TextInput style={[styles.input, styles[size as InputSize], style]} placeholderTextColor="#999" {...restProps} />
      {extra}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    height: 48,
    color: '#333',
    fontSize: 17,
    paddingHorizontal: 8,
  },
  middle: {
    height: 44,
    fontSize: 14,
  },
  bordered: {
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: StyleSheet.hairlineWidth
  }
});


export default Input;
