import { useCallback, useMemo } from "react";
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from "react-native";
import Typography from "../Typography";
import { useControllableValue } from "@/hooks";

interface InputNumberProps extends ViewProps {
  value?: number;
  onChange?: (number: number) => void;
}

const InputNumber = (props: InputNumberProps) => {
  const { style } = props;
  const [state, setState] = useControllableValue<number>(props, {
    defaultValue: 1
  });

  const handleChange = useCallback((e:  NativeSyntheticEvent<TextInputChangeEventData>) => {
    setState(Number(e.nativeEvent.text));
  }, []);

  const handlePlus = useCallback(() => {
    setState(oldNum => oldNum + 1);
  }, []);

  const handleMinus = useCallback(() => {
    setState(oldNum => Math.max(oldNum - 1, 1));
  }, []);

  return (
    <View {...props} style={[styles.container, style]}>
      <TouchableWithoutFeedback onPress={handleMinus}>
        <View style={styles.icon}>
          <Typography.Text size="large">-</Typography.Text>
        </View>
      </TouchableWithoutFeedback>
      <View style={styles.content}>
        <TextInput keyboardType="numeric" value={`${state}`} style={styles.input} onChange={handleChange} />
      </View>
      <TouchableWithoutFeedback onPress={handlePlus}>
        <View style={styles.icon}>
          <Typography.Text size="large">+</Typography.Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 86,
    flexDirection: 'row',
    backgroundColor: '#f5f6fa',
    borderRadius: 26,
  },
  icon: {
    width: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    width: 38,
    height: 24
  },
  input: {
    height: 24,
    textAlign: 'center',
    fontSize: 14,
    color: '#333',
  }
});


export default InputNumber;
