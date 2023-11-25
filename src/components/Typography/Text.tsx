import { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TypographyTextProps extends TextProps {
  primary?: boolean;
  strong?: boolean;
  size?: 'large' | 'small' | 'mini';
  type?: 'secondary';
}

const TypographyText = ({ style, primary, size, strong, type, ...restProps }: TypographyTextProps) => {
  const textStyles = useMemo(() => {
    const items: StyleProp<TextStyle>[]  = [styles.text];
    if (primary) {
      items.push(styles.primary);
    }

    if (strong) {
      items.push(styles.strong)
    }

    if (size) {
      items.push(styles[size]);
    }

    if (type === 'secondary') {
      items.push(styles.secondary);
    }

    return StyleSheet.compose(items, style);
  }, [style]);

  return <Text {...restProps} style={textStyles} />
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 14,
  },
  primary: {
    color: '#e65321'
  },
  large: {
    fontSize: 16,
  },
  small: {
    fontSize: 12
  },
  mini: {
    fontSize: 10
  },
  strong: {
    fontWeight: '600'
  },
  secondary: {
    color: '#666'
  }
});



export default TypographyText;
