import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Dimensions, Image, ImageLoadEventData, ImageProps, ImageURISource, NativeSyntheticEvent } from "react-native";

const AutoImage: FC<ImageProps> = ({ source, style, ...restProps }) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    // TODO
    if (source as ImageURISource) {
      // Image.getSize(source.uri, (width, height) => {
      //   setAspectRatio(width / height);
      // })
    }
    
  }, [source]);

  return (
    <Image style={[{ width: '100%', aspectRatio }, style]} source={source} {...restProps} />
  )
}

export default AutoImage;
