import { useNavigation } from '@react-navigation/native';
import { Image, ImageStyle, StyleProp, StyleSheet, TouchableOpacity } from 'react-native';

interface GlobalBackProps {
  icon?: 'arrow' | 'closed';
  style?: StyleProp<ImageStyle>;
  onPress?: () => void;
}

const GlobalBack = ({ icon = 'arrow', style, onPress }: GlobalBackProps) => {
  const navigation = useNavigation();
  const source = icon === 'arrow' ? require('@/assets/images/icons/back.png') : require('@/assets/images/icons/closed.png');

  return (
    <TouchableOpacity onPress={onPress || navigation.goBack}>
      <Image style={[styles.icon, style]} source={source} />
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
