import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import Typography from "@/components/Typography";
import { isLastItem } from "@/utils/array";

interface Item {
  label: string;
  content?: string;
}

interface DescriptionsProps {
  title?: string;
  items?: Item[];
  style?: StyleProp<ViewStyle>;
}

const Descriptions = ({ title, items = [], style }: DescriptionsProps) => {
  return (
    <View style={[styles.container, style]}>
      {title && (
        <View style={[styles.title, items.length ? null : styles.hideBorder]}>
          <Typography.Text>{title}</Typography.Text>
        </View>
      )}
      {items?.map(({ label, content }, index) => (
        <View key={index} style={[styles.row, isLastItem(index, items.length) ? styles.hideBorder : null]}>
          <View style={[styles.cell, styles.label]}>
            <Typography.Text type="secondary" size="small">{label}</Typography.Text>
          </View>
          <View style={[styles.cell, styles.content]}>
            <Typography.Text type="secondary" size="small">{content}</Typography.Text>
          </View>
        </View>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#ddd',
  },
  title: {
    padding: 12,
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  row: {
    flexDirection: 'row',
    borderBottomColor: '#ddd',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  cell: {
    padding: 12,
    borderRightColor: '#ddd',
    borderRightWidth: StyleSheet.hairlineWidth,
  },
  label: {
    width: 110,
  },
  content: {
    flex: 1,
    borderRightWidth: 0,
  },
  hideBorder: {
    borderWidth: 0
  }
})

export default Descriptions;
