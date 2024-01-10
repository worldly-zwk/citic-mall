import { PropsWithChildren } from 'react';
import { Image, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Icon, Link, Typography } from '@/components';

interface ItemProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Item = ({ style, label, contentStyle, onPress, children }: PropsWithChildren<ItemProps>) => {
  return (
    <Link style={[styles.item, style]} onPress={onPress}>
      <Typography.Text style={styles.label} color="disabled">{label}</Typography.Text>
      <View style={[styles.content, contentStyle]}>{children}</View>
      <Image style={styles.arrow} source={require('@/assets/images/icons/arrow.png')} />
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  item: {
    padding: 12,
    flexDirection: 'row',
    minHeight: 44,
  },
  label: {
    fontSize: 13,
  },
  content: {
    flex: 1,
    paddingHorizontal: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  arrow: {
    width: 12,
    height: 12,
    marginTop: 4
  },
});

export default Item;
