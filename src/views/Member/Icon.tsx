import { Image, ImageSourcePropType, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '@/components/Typography';

interface CardProps extends ViewProps {
  label: string;
  image: ImageSourcePropType;
}

const Icon = ({ label, image, ...restProps }: CardProps) => {
  return (
    <View style={styles.icon}>
      <Image style={styles.image} source={image} />
      <Typography.Text style={styles.label} color="secondary">{label}</Typography.Text>
    </View>
  )
}

const styles = StyleSheet.create({
  icon: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 30,
    height: 30,
  },
  label: {
    fontSize: 13,
    lineHeight: 18,
    textAlign: 'center',
  }
})

export default Icon;
   