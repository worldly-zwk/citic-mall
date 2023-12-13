import Typography from '@/components/Typography';
import { Image, StyleSheet, Text, View, ViewProps } from 'react-native';

interface DividerProps extends ViewProps {
  
}

const Divider = ({ children, style, ...restProps }: DividerProps) => {

  return (
    <View {...restProps} style={[styles.divider, style]}>
      <Image style={styles.line} source={require('@/assets/images/view/user_divider.png')} />
      <Typography.Title level={4}>{children}</Typography.Title>
      <Image style={[styles.line, styles.lineAfter]} source={require('@/assets/images/view/user_divider.png')} />
    </View>
  )
}

const styles = StyleSheet.create({
  divider: {
    height: 25,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    columnGap: 6,
    marginTop: 13,
  },
  line: {
    width: 54,
    height: 16
  },
  lineAfter: {
    transform: [{ rotate: '180deg' }]
  }
})

export default Divider;
