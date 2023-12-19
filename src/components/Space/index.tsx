import { PropsWithChildren } from 'react';
import { FlexAlignType, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface SpaceProps extends PropsWithChildren {
  size?: number;
  wrap?: boolean;
  align?: FlexAlignType;
  style?: StyleProp<ViewStyle>;
}

const Space = (props: SpaceProps) => {
  const { size, wrap, align, style, children } = props;
  const flexStyle: ViewStyle = {
    gap: size,
    alignItems: align,
    flexWrap: wrap ? 'wrap' : 'nowrap'
  }

  return (
    <View style={[styles.container, flexStyle, style]}>
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
   