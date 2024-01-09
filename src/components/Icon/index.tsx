import { useMemo } from 'react';
import { Image, ImageProps, ImageSourcePropType } from 'react-native';
import { ICON_MAP } from './constants';

export type IconKeys = keyof typeof ICON_MAP;

export interface IconProps extends Omit<ImageProps, 'source'> {
  size?: number;
  icon?: IconKeys | ImageSourcePropType;
}

const Icon = (props: IconProps) => {
  const { size = 16, icon, style } = props;

  const source = useMemo<ImageSourcePropType>(() => {
    if (typeof icon === 'string') {
      return ICON_MAP[icon];
    }
    return icon;
  }, [icon]);

  return (
    <Image source={source} style={[{ width: size, height: size }, style]} />
  )
}
export default Icon;
