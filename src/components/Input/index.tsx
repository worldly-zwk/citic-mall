import { ReactNode } from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

interface InputProps extends TextInputProps {
  extra?: ReactNode;
}

const Input = (props: InputProps) => {
  const { style, extra, ...restProps } = props;

  return (
    <View style={[styles.container, style]}>
      <TextInput style={styles.input} placeholderTextColor="#999" {...restProps} />
      {extra}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    borderBottomColor: '#dbdbdb',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  input: {
    flex: 1,
    height: 48,
    color: '#333',
    fontSize: 17,
    paddingHorizontal: 8,
  }
});


export default Input;
