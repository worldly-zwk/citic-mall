import { PropsWithChildren, cloneElement, useCallback, useMemo } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TextStyle, TouchableWithoutFeedback, View, ViewProps, ViewStyle } from 'react-native';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient, { LinearGradientProps } from 'react-native-linear-gradient';
import { RootStackParamList } from '@/typings/screen';
import Typography from '../Typography';
import ButtonGroup from './Group';

type ButtonSize = 'small' | 'large';
type ButtonType = 'primary' | 'secondary';

interface ButtonProps extends PropsWithChildren {
  to?: NavigatorScreenParams<RootStackParamList>;
  size?: ButtonSize;
  type?: ButtonType;
  round?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  color?: string[];
  linearGradient?: LinearGradientProps;
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = (props: ButtonProps) => {
  const { to, size = 'large', type, round, style, textStyle, disabled, linearGradient, onPress, children } = props;
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

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

    return items;
  }, [size, style, round, disabled]);

  const buttonLinearGradient = useMemo(() => {
    const linear = {} as LinearGradientProps;
    if (disabled) return linear;
    if (!type) {
      Object.assign(linear, {
        colors: ['#ffaf31', '#ff8400'],
        end: { x: 1, y: 0 }
      });
    }
    return Object.assign(linear, linearGradient);
  }, [linearGradient, type, disabled]);

  const handlePress = useCallback((e: GestureResponderEvent) => {
    if (!disabled) {
      if (to) {
        const { screen, params } = to;
        navigation.navigate(screen as any, params);
      }
      onPress?.(e);
    }
  }, [onPress, disabled, to]);

  let buttonChildren = (
    <View style={[buttonStyle, styles[type as ButtonType], style]}>
      <Typography.Text size={size} color={disabled ? 'white' : type} style={textStyle}>{children}</Typography.Text>
    </View>
  );

  if (buttonLinearGradient.colors) {
    buttonChildren = (
      <LinearGradient {...buttonLinearGradient} style={[buttonStyle, style]}>
        <Typography.Text size={size} color="white" style={textStyle}>{children}</Typography.Text>
      </LinearGradient>
    )
  }

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      {buttonChildren}
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 9,
    paddingHorizontal: 12,
    borderRadius: 2,
    textAlign: 'center',
    alignItems: 'center',
  },
  primary: {
    borderColor: '#e65321',
    borderWidth: 1
  },
  secondary: {
    borderColor: '#bbb',
    borderWidth: 1
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
});

Button.Group = ButtonGroup;

export default Button;
   