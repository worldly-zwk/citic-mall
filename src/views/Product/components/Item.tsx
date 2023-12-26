import { PropsWithChildren } from 'react';
import { Image, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from 'react-native';
import Typography from '@/components/Typography';

interface ItemProps {
  label: string;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const Item = ({ style, label, contentStyle, onPress, children }: PropsWithChildren<ItemProps>) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={[styles.item, style]}>
        <Typography.Text style={styles.label} size="small" color="disabled">{label}</Typography.Text>
        <View style={[styles.content, contentStyle]}>{children}</View>
        <Image style={styles.arrow} source={require('@/assets/images/icons/arrow.png')} />
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginTop: 10,
  },
  item: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 12,
    minHeight: 44,
  },
  itemLine: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  label: {
    marginTop: 2
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
