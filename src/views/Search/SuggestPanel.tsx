import Typography from '@/components/Typography';
import { isLastItem } from '@/utils/array';
import { isTrue } from '@/utils/type';
import { ScrollView, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';

interface SearchSuggestProps {
  open?: boolean;
  value?: string;
  items?: string[];
  onPress?: (value: string) => void;
  onPressStore?: (value: string) => void;
}


const Suggest = ({ open, value, items, onPress, onPressStore }: SearchSuggestProps) => {
  if (open) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.list}>
          {value && (
            <TouchableWithoutFeedback onPress={() => onPressStore?.(value)}>
              <View style={[styles.item, isTrue(!items?.length, styles.lastItem)]}>
                <Typography.Text>搜索“{value}”店铺</Typography.Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          {items?.map((text, index) => (
            <TouchableWithoutFeedback key={text} onPress={() => onPress?.(text)}>
              <View style={[styles.item, isTrue(isLastItem(index, items.length), styles.lastItem)]}>
                <Typography.Text>{text}</Typography.Text>
              </View>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </ScrollView>
    );
  }
  
  return null;
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: 0,
    bottom: 0,
    backgroundColor: '#f5f6fa',
  },
  list: {
    backgroundColor: '#fff',
    paddingHorizontal: 15,
  },
  item: {
    height: 44,
    justifyContent: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lastItem: {
    borderBottomWidth: 0
  }
});

export default Suggest;
