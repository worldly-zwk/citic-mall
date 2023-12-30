import { useMemo } from 'react';
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native';

interface TypographyTitleProps extends TextProps {
  level?: number;
  type?: 'secondary';
  primary?: boolean;
}

const TypographyTitle = ({ primary, style, level, type, lineBreakMode = 'tail', ...restProps }: TypographyTitleProps) => {
  const titleStyle = useMemo(() => {
    const items: StyleProp<TextStyle> = [styles.title];
    const levels = [styles.h1,styles.h2,styles.h3,styles.h4];

    if (primary) {
      items.push(styles.primary);
    }

    if (level) {
      items.push(levels[level - 1]);
    }

    if (type === 'secondary') {
      items.push(styles.secondary);
    }

    return StyleSheet.compose(items, style);
  }, [style, level, primary, type]);

  return <Text style={titleStyle} lineBreakMode={lineBreakMode} {...restProps} />
}

const styles = StyleSheet.create({
  title: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  h4: {
    fontSize: 18
  },
  h3: {
    fontSize: 20
  },
  h2: {
    fontSize: 22,
    lineHeight: 36,
  },
  h1: {
    fontSize: 28,
    lineHeight: 32
  },
  primary: {
    color: '#e65321'
  },
  secondary: {
    color: '#666'
  }
})

export default TypographyTitle;