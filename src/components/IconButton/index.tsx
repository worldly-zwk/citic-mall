import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Typography from "../Typography";
import Link, { LinkProps } from "../Link";

interface IconButtonProps extends LinkProps {
  icon: ImageSourcePropType;
  color?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  children?: string;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, color = 'secondary', style, children, ...restProps } = props;

  return (
    <Link style={[styles.container, style]} {...restProps}>
      <Image style={styles.icon} source={icon} />
      <Typography.Text size="mini" color={color}>{children}</Typography.Text>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    width: 49,
    height: 49,
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    marginVertical: 6
  }
});

export default IconButton;