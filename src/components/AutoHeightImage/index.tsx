import { FC, useEffect, useState } from "react";
import { Image, ImageProps } from "react-native";
import { isObject } from "@/utils";

const AutoHeightImage: FC<ImageProps> = ({ source, style, ...restProps }) => {
  const [aspectRatio, setAspectRatio] = useState(0);

  useEffect(() => {
    // TODO
    if (!Array.isArray(source) && isObject(source) && source.uri) {
      Image.getSize(source.uri, (width, height) => {
        setAspectRatio(width / height);
      })
    }
  }, [source]);

  return (
    <Image style={[{ width: '100%', aspectRatio }, style]} source={source} {...restProps} />
  )
}

export default AutoHeightImage;
