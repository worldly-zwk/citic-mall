import { PropsWithChildren, ReactNode } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import Typography from '../Typography';

interface EmptyProps extends PropsWithChildren {
  title?: ReactNode;
  image: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  description?: string;
}

const Empty = ({ style, title, image, imageStyle, description, children }: EmptyProps) => {

  return (
    <View style={[styles.container, style]}>
      <Image style={[styles.image, imageStyle]} source={image} />
      {title && (
        <Typography.Title type="secondary">{title}</Typography.Title>
      )}
      {description && (
        <View>
          {description.split('\n').map((text, index) => (
            <Typography.Text size="small" color="secondary" align="center" key={index}>{text}</Typography.Text>
          ))}
        </View>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 12,
    paddingBottom: 12,
    alignItems: 'center',
    rowGap: 12,
  },
  image: {
    width: 140,
    height: 140,
  }
})

export default Empty;
   