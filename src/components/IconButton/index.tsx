import { Image, ImageSourcePropType, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import Typography from "../Typography";

interface IconButtonProps {
  icon: ImageSourcePropType;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  children?: string;
}

const IconButton = (props: IconButtonProps) => {
  const { icon, style, onPress, children } = props;

  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.container, style]}>
        <Image style={styles.icon} source={icon} />
        <Typography.Text size="mini" color="secondary">{children}</Typography.Text>
      </View>
    </TouchableWithoutFeedback>
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