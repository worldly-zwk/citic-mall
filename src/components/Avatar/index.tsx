import { useMemo } from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from 'react-native';

interface AvatarProps extends Omit<ImageProps, 'source' | 'src'> {
  src?: string;
}

const Avatar = (props: AvatarProps) => {
  const { src, style, ...restProps } = props;

  const avatar = useMemo<ImageSourcePropType>(() => {
    if (src) {
      return { uri: src };
    }
    return require('@/assets/images/view/default_avatar.png');
  }, [src]);

  return (
    <Image source={avatar} style={[styles.avatar, style]} {...restProps} />
  )
}

const styles = StyleSheet.create({
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 56,
    borderColor: '#f5f6fa',
    borderWidth: 1.5,
    marginBottom: 10,
  }
});

export default Avatar;
