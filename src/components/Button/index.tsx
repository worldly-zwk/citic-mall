import { PropsWithChildren, useMemo } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../Typography';
import ButtonGroup from './Group';

interface ButtonProps extends PropsWithChildren {
  size?: 'small' | 'large';
  round?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string[];
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = (props: ButtonProps) => {
  const { size = 'large', round, style, disabled, color = ['#ffaf31', '#ff8400'], onPress, children } = props;

  const buttonStyle = useMemo(() => {
    const items: StyleProp<ViewStyle> = [styles.button];

    if (size) {
      items.push(styles[size as 'small']);
    }

    if (round) {
      items.push(styles.round);
    }

    if (disabled) {
      items.push(styles.disabled);
    }

    return StyleSheet.compose(items, style);
  }, [size, style, round, disabled]);


  return (
    <TouchableWithoutFeedback onPress={disabled ? undefined : onPress}>
      <LinearGradient colors={color} end={{ x: 1, y: 0 }} style={buttonStyle}>
        <Typography.Text style={styles.text} size={size}>{children}</Typography.Text>
      </LinearGradient>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 9,
    borderRadius: 2,
    alignItems: 'center',
  },
  small: {
    paddingVertical: 5,
  },
  round: {
    borderRadius: 20,
  },
  disabled: {
    backgroundColor: '#dbdbdb'
  },
  text: {
    color: '#fff'
  }
});

Button.Group = ButtonGroup;

export default Button;
   