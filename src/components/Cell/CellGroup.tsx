import { isTrue } from '@/utils/type';
import { Children, cloneElement, isValidElement } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

const CellGroup = (props: ViewProps) => {
  const { style, children, ...restProps } = props;
  const count = Children.count(children);

  return (
    <View {...restProps} style={[styles.container, style]}>
      {Children.map(children, (children, index) => {
        if (isValidElement<ViewProps>(children)) {
          const isLast = index < count - 1;
          const cellStyle = children.props.style;
          return cloneElement(children, {
            style: [isTrue(isLast, styles.borderd), cellStyle]
          });
        }
        return children;
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  borderd: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
});

export default CellGroup;
