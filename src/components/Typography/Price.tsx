import { useMemo } from 'react';
import { StyleProp, StyleSheet, TextProps, TextStyle, View } from 'react-native';
import TypographyText from './Text';

const fontSizeEnum: RecordAny<number> = {
  small: 14,
  middle: 16,
  large: 22,
};

interface TypographyPriceProps extends TextProps {
  size?: 'small' | 'middle' | 'large' | number;
  style?: StyleProp<TextStyle>;
  children?: string | number;
}

const TypographyPrice = (props: TypographyPriceProps) => {
  const { size = 'middle', children } = props;
  const unitStyles = size === 'large' ? styles.largeUnit : styles.unit;
  const textStyles = useMemo<TextStyle>(() => {
    return { 
      fontSize: fontSizeEnum[size] || (size as number)
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
  unit: {
    marginBottom: 2
  },
  largeUnit: {
    fontSize: 12,
    marginBottom: 3,
  }
});



export default TypographyPrice;
