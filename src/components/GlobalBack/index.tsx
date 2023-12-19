import { useNavigation } from '@react-navigation/native';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

interface GlobalBackProps {
  style?: StyleProp<ImageStyle>;
  onPressBack?: () => void;
}

const GlobalBack = ({ style, onPressBack }: GlobalBackProps) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={onPressBack || navigation.goBack}>
      <Image style={[styles.icon, style]} source={require('@/assets/images/icons/back.png')} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
  }
});

export default GlobalBack;
