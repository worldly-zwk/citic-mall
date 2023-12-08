import { FC } from "react";
import { Image, ScrollView, ScrollViewProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { isLastItem } from "@/utils/array";
import Typography from "../Typography";

interface ScrollProductListProps extends ScrollViewProps {
  items: ProductItem[];
  more?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ScrollProductList: FC<ScrollProductListProps> = ({ items, style, containerStyle, ...restProps }) => {
  return (
    <View style={style}>
      <ScrollView horizontal {...restProps} style={containerStyle}>
        {items.map(({ name, image, price }, index) => (
          <View style={[styles.item, isLastItem(index, items.length) ? styles.lastItem : undefined]} key={`${index}-${name}`}>
            <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
            <View>
              <Typography.Text style={styles.name} size="small" numberOfLines={1}>{name}</Typography.Text>
              <Typography.Text style={styles.amount} primary strong>¥{price}</Typography.Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  item: {
    width: 90,
    marginRight: 10,
  },
  image: {
    width: 90,
    height: 90,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f5f6fa',
  },
  name: {
    marginTop: 5,
    lineHeight: 18,
  },
  amount: {
    lineHeight: 20
  },
  lastItem: {
    marginRight: 0
  }
})

export default ScrollProductList;
