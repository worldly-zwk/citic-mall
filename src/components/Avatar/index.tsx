import { isTrue } from '@/utils';
import { useMemo } from 'react';
import { Image, ImageProps, ImageSourcePropType, StyleSheet } from 'react-native';

interface AvatarProps extends Omit<ImageProps, 'source' | 'src'> {
  size?: number;
  src?: string;
  bordered?: boolean;
}

const Avatar = (props: AvatarProps) => {
  const { src, size = 56, style, bordered = true, ...restProps } = props;
  const avatarStyle = [isTrue(bordered, styles.bordered), { width: size, height: size, borderRadius: size }, style];

  const avatar = useMemo<ImageSourcePropType>(() => {
    if (src) {
      return { uri: src };
    }
    return require('@/assets/images/view/default_avatar.png');
  }, [src]);

  return (
    <Image source={avatar} style={avatarStyle} {...restProps} />
  )
}

const styles = StyleSheet.create({
  bordered: {
    borderColor: '#f5f6fa',
    borderWidth: 1.5,
  }
});

export default Avatar;
