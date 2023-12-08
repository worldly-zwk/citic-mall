import { PropsWithChildren } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

interface SpaceProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
}

const Space = (props: SpaceProps) => {
  const { style, children } = props;

  return (
    <View style={[styles.container, style]}>
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
   