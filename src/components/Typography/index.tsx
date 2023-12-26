import { ReactNode } from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';
import TypographyText from './Text';
import TypographyTitle from './Title';
import TypographyPrice from './Price';

interface TypographyProps extends ViewProps {
  tag?: ReactNode;
}

const Typography = (props: TypographyProps) => {
  const { tag, children, ...restProps } = props;
  return (
    <View {...restProps}>
      {tag && (
        <View style={styles.tag}>{tag}</View>
      )}
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  tag: {
    position: 'absolute',
    left: 0,
    top: 2,
  }
})

Typography.Text = TypographyText;
Typography.Title = TypographyTitle;
Typography.Price = TypographyPrice;

export default Typography;

