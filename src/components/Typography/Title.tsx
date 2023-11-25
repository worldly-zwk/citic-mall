import { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TypographyTitleProps extends TextProps {
  level?: number;
  type?: 'secondary';
}

const TypographyTitle = ({ style, level, type, ...restProps }: TypographyTitleProps) => {
  const titleStyle = useMemo(() => {
    const items: StyleProp<TextStyle> = [styles.title];
    const levels = [styles.h1,styles.h2,styles.h3,styles.h4];

    if (level) {
      items.push(levels[level - 1]);
    }

    if (type === 'secondary') {
      items.push(styles.secondary);
    }

    return StyleSheet.compose(items, style);
  }, [style, level]);

  return <Text style={titleStyle} {...restProps} />
}

const styles = StyleSheet.create({
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
  h4: {
    fontSize: 18
  },
  h3: {
    fontSize: 20
  },
  h2: {
    fontSize: 24
  },
  h1: {
    fontSize: 28
  },
  secondary: {
    color: '#666'
  }
})

export default TypographyTitle;