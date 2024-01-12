import { StyleSheet, TouchableWithoutFeedback, View, ViewProps } from "react-native";
import Typography from "../Typography";
import { isTrue } from "@/utils";

interface RadioGroupProps extends ViewProps {
  round?: boolean;
  checked?: boolean;
  onPress?: () => void;
}

const RadioButton = (props: RadioGroupProps) => {
  const { round, checked, onPress, children, style, ...restProps } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.button, isTrue(round, styles.round), isTrue(checked, styles.checked), style]} {...restProps}>
        <Typography.Text primary={checked}>{children}</Typography.Text>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: '#f5f6fa',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 2,
  },
  round: {
    borderRadius: 26,
  },
  checked: {
    borderColor: '#e65321'
  }
});

export default RadioButton;
