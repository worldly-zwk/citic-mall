import { PropsWithChildren, useMemo } from 'react';
import { StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Typography from '../Typography';

interface ButtonProps extends PropsWithChildren {
  block?: boolean;
  style?: StyleProp<ViewStyle>;
  
}

const Button = ({ style, children }: ButtonProps) => {
  const buttonStyles = useMemo(() => {
    const items: StyleProp<ViewStyle>  = [styles.button];

    return StyleSheet.compose(items, style);
  }, []);


  return (
    <TouchableWithoutFeedback>
      <LinearGradient colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }} style={buttonStyles}>
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
})

export default Button;
   