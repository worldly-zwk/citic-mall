import { PropsWithChildren, useCallback, useMemo } from 'react';
import { GestureResponderEvent, StyleProp, StyleSheet, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { NavigatorScreenParams, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import LinearGradient from 'react-native-linear-gradient';
import { RootStackParamList } from '@/typings/screen';
import Typography from '../Typography';
import ButtonGroup from './Group';

interface ButtonProps extends PropsWithChildren {
  to?: NavigatorScreenParams<RootStackParamList>;
  size?: 'small' | 'large';
  round?: boolean;
  style?: StyleProp<ViewStyle>;
  color?: string[];
  disabled?: boolean;
  onPress?: (event: GestureResponderEvent) => void;
}

const Button = (props: ButtonProps) => {
  const { to, size = 'large', round, style, disabled, color = ['#ffaf31', '#ff8400'], onPress, children } = props;
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

    return StyleSheet.compose(items, style);
  }, [size, style, round, disabled]);

  const handlePress = useCallback((e: GestureResponderEvent) => {
    if (!disabled) {
      if (to) {
        const { screen, params } = to;
        navigation.navigate(screen as any, params);
      }
      onPress?.(e);
    }
  }, [onPress, disabled, to]);


  return (
    <TouchableWithoutFeedback onPress={handlePress}>
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
    textAlign: 'center',
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
   