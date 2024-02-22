import { PropsWithChildren, ReactNode } from 'react';
import { Image, ImageSourcePropType, ImageStyle, StyleProp, StyleSheet, View } from 'react-native';
import { isTrue } from '@/utils';
import Typography from '../Typography';

interface EmptyProps extends PropsWithChildren {
  title?: ReactNode;
  image?: ImageSourcePropType;
  style?: StyleProp<ImageStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  description?: string;
  fullscreen?: boolean;
}

const Empty = (props: EmptyProps) => {
  const { style, title, image, imageStyle, description, fullscreen, children } = props;
  return (
    <View style={[styles.container, isTrue(fullscreen, styles.fullscreen), style]}>
      <Image
        style={[styles.image, imageStyle]}
        source={image || require('@/assets/images/empty/list.png')}
      />
      {title && (
        <Typography.Title type="secondary">{title}</Typography.Title>
      )}
      {description && (
        <Typography.Text size="small" color="secondary" align="center">{description}</Typography.Text>
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
  },
  fullscreen: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
    paddingTop: 42,
    backgroundColor: '#fff',
  }
})

export default Empty;
   