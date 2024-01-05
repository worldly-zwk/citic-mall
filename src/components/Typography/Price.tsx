import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextStyle, View } from 'react-native';
import TypographyText, { TypographyTextProps } from './Text';

const fontSizeEnum: RecordAny<number> = {
  small: 14,
  middle: 16,
  large: 22,
};

const unitGapEnum: RecordAny<number> = {
  small: 1,
  middle: 2,
  large: 4,
};

interface TypographyPriceProps extends Omit<TypographyTextProps, 'size'> {
  size?: 'small' | 'middle' | 'large' | number;
  style?: StyleProp<TextStyle>;
  unitStyle?: StyleProp<TextStyle>;
  children?: string | number;
}

const TypographyPrice = (props: TypographyPriceProps) => {
  const { size = 'middle', style, unitStyle, strong = true, color = 'primary', children } = props;

  const unitStyles = useMemo(() => {
    return StyleSheet.compose({
      fontSize: size === 'large' ? 12 : 10,
      marginBottom: unitGapEnum[size] || 1,
    }, unitStyle);
  }, [size, unitStyle]);

  const textStyles = useMemo<StyleProp<TextStyle>>(() => {
    const height = fontSizeEnum[size] || (size as number);
    return { 
      fontSize: height,
      lineHeight: height,
    };
  }, [size]);

  return (
    <View style={[styles.container, style]}>
      <TypographyText style={unitStyles} size="mini" strong={strong} color={color}>¥</TypographyText>
      <TypographyText style={textStyles} strong={strong} color={color}>{children}</TypographyText>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
});

export default TypographyPrice;
