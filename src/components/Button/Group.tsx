import { Children, PropsWithChildren, cloneElement, isValidElement } from 'react';
import { StyleProp, StyleSheet, View, ViewProps, ViewStyle } from 'react-native';

interface ButtonProps extends PropsWithChildren {
  style?: StyleProp<ViewStyle>;
  color?: string[];
}

const ButtonGroup = (props: ButtonProps) => {
  const { style, children } = props;

  return (
    <View style={[styles.group, style]}>
      {Children.map(children, (child) => {
        if (isValidElement<ViewProps>(child)) {
          return cloneElement(child, {
            style: StyleSheet.compose(styles.button, child.props?.style)
          })
        }
        return child;
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  group: {
    flex: 1,
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    margin: 4
  }
})

export default ButtonGroup;
   