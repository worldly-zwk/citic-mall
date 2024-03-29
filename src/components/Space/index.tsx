import { PropsWithChildren } from 'react';
import { FlexAlignType, FlexStyle, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface SpaceProps extends PropsWithChildren {
  size?: number;
  wrap?: boolean;
  align?: FlexAlignType;
  justify?: FlexStyle['justifyContent'];
  style?: StyleProp<ViewStyle>;
}

const Space = (props: SpaceProps) => {
  const { size, wrap, align, justify, style, children, ...restProps } = props;
  const flexStyle: ViewStyle = {
    gap: size,
    alignItems: align,
    justifyContent: justify,
    flexWrap: wrap ? 'wrap' : 'nowrap'
  }

  return (
    <View style={[styles.container, flexStyle, style]} {...restProps}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

export default Space;
   