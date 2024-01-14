import { isBoolean } from '@/utils';
import { useMemo } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

const colorPresets = {
  primary: '#e65321',
  secondary: '#666',
  disabled: '#999',
}

type ColorPresetsKeys = keyof typeof colorPresets;

export interface TypographyTextProps extends TextProps {
  primary?: boolean;
  strong?: boolean | TextStyle['fontWeight'];
  size?: 'large' | 'small' | 'mini' | number;
  color?: LiteralUnion<ColorPresetsKeys>;
  delete?: boolean;
  indent?: number;
  align?: TextStyle['textAlign'];
}

const TypographyText = (props: TypographyTextProps) => {
  const {
    color,
    style,
    indent,
    primary,
    size,
    align,
    strong,
    lineBreakMode = 'tail',
    delete: deleteLine,
    children,
    ...restProps
  } = props;
  const textStyles = useMemo(() => {
    const textStyle: TextStyle = {
      textAlign: align,
    };
    const items: TextStyle[]  = [styles.text, textStyle];
    if (primary) {
      items.push(styles.primary);
    }

    if (deleteLine) {
      textStyle.textDecorationLine ='line-through';
    }

    if (strong) {
      textStyle.fontWeight = isBoolean(strong) ? '700' : strong;
    }

    if (typeof size === 'string') {
      items.push(styles[size]);
    } else if (typeof size === 'number') {
      textStyle.fontSize = size;
      textStyle.lineHeight = size;
    }

    if (color) {
      textStyle.color = colorPresets[color as ColorPresetsKeys] || color;
    }

    return StyleSheet.compose(items,  style);
  }, [style, primary, size, strong, deleteLine, color, align]);

  return (
    <Text {...restProps} lineBreakMode={lineBreakMode} style={textStyles}>
      {!!indent && '\u00A0\u00A0'.repeat(indent)}
      {children}
    </Text>
  )
}

const styles = StyleSheet.create({
  text: {
    color: '#333',
    fontSize: 14,
    lineHeight: 20,
  },
  primary: {
    color: '#e65321'
  },
  large: {
    fontSize: 16,
    lineHeight: 22,
  },
  small: {
    fontSize: 12,
    lineHeight: 16,
  },
  mini: {
    fontSize: 10,
    lineHeight: 10,
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
