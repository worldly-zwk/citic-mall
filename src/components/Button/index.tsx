import { PropsWithChildren, useMemo } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../Typography';
import ButtonGroup from './Group';

interface ButtonProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  color?: string[];
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = (props: ButtonProps) => {
  const { style, color = ['#ffaf31', '#ff8400'], onPress, children } = props;

  const buttonStyles = useMemo(() => {
    const items: StyleProp<ViewStyle>  = [styles.button];

    return StyleSheet.compose(items, style);
  }, [style]);


  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <LinearGradient colors={color} end={{ x: 1, y: 0 }} style={buttonStyles}>
        <Typography.Text style={styles.text}>{children}</Typography.Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 12,
    borderRadius: 2,
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 16,
  }
});

Button.Group = ButtonGroup;

export default Button;
   