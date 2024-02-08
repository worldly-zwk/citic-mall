import { useEffect, useState } from 'react';
import { Image, ImageProps, PixelRatio } from 'react-native';

const AVATAR_SIZE = 40;
const devicePixelRatio = PixelRatio.get();

interface StoreAvatarProps extends Omit<ImageProps, 'source'> {
  avatar?: string;
}

const StoreAvatar = (props: StoreAvatarProps) => {
  const { avatar, style } = props;
  const [size, setSize] = useState({
    width: AVATAR_SIZE,
    height: AVATAR_SIZE,
  });

  useEffect(() => {
    if (avatar) {
      Image.getSize(avatar, (width, height) => {
        if (height > AVATAR_SIZE) {
          const deviceWidth = width / devicePixelRatio;
          const deviceHeight = height / devicePixelRatio;
          const scale = Math.min(AVATAR_SIZE / deviceHeight, 1);
          setSize({ height: deviceHeight * scale, width: deviceWidth * scale });
        } else {
          setSize({ width, height });
        }
      });
    }
  }, [avatar]);

  return (
    <Image style={[size, style]} source={{ uri: avatar }} />
  )
}

export default StoreAvatar;
