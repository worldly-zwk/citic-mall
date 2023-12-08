import { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TypographyTextProps extends TextProps {
  primary?: boolean;
  strong?: boolean;
  size?: 'large' | 'small' | 'mini';
  type?: 'secondary' | 'disabled';
  delete?: boolean;
}

const TypographyText = ({ style, primary, size, strong, type, lineBreakMode = 'tail', delete: deleteLine, ...restProps }: TypographyTextProps) => {
  const textStyles = useMemo(() => {
    const items: StyleProp<TextStyle>[]  = [styles.text];
    if (primary) {
      items.push(styles.primary);
    }

    if (deleteLine) {
      items.push(styles.delete);
    }

    if (strong) {
      items.push(styles.strong);
    }

    if (size) {
      items.push(styles[size]);
    }

    if (type) {
      items.push(styles[type]);
    }

    return StyleSheet.compose(items, style);
  }, [style, primary, size, type, strong, deleteLine]);

  return <Text {...restProps} lineBreakMode={lineBreakMode} style={textStyles} />
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
    fontSize: 12,
    lineHeight: 16,
  },
  mini: {
    fontSize: 10
  },
  strong: {
    fontWeight: '600'
  },
  secondary: {
    color: '#666'
  },
  disabled: {
    color: '#999'
  },
  delete: {
    textDecorationLine: 'line-through'
  }
});



export default TypographyText;
