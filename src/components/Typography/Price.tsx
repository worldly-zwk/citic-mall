import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle, View } from 'react-native';
import TypographyText from './Text';

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

interface TypographyPriceProps extends TextProps {
  size?: 'small' | 'middle' | 'large' | number;
  style?: StyleProp<TextStyle>;
  children?: string | number;
}

const TypographyPrice = (props: TypographyPriceProps) => {
  const { size = 'middle', children } = props;

  const unitStyles = useMemo(() => {
    return {
      fontSize: size === 'large' ? 12 : 10,
      marginBottom: unitGapEnum[size] || 1,
    }
  }, []);

  const textStyles = useMemo<TextStyle>(() => {
    const height = fontSizeEnum[size] || (size as number);
    return { 
      fontSize: height,
      lineHeight: height,
    }
  }, [size]);

  return (
    <View style={styles.container}>
      <TypographyText style={unitStyles} size="mini" strong primary>¥</TypographyText>
      <TypographyText style={textStyles} strong primary>{children}</TypographyText>
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
