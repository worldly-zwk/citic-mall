import { FC } from "react";
import { Image, ScrollView, ScrollViewProps, StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { isLastItem } from "@/utils/array";

interface ScrollProductListProps extends ScrollViewProps {
  items: ProductItem[];
  more?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ScrollProductList: FC<ScrollProductListProps> = ({ items, style, containerStyle, ...restProps }) => {
  return (
    <View style={style}>
      <ScrollView {...restProps} style={containerStyle}>
        {items.map(({ name, image, price }, index) => (
          <View style={[styles.item, isLastItem(index, items.length) ? styles.lastItem : undefined]} key={`${index}-${name}`}>
            <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
            <View>
              <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{name}</Text>
              <Text style={styles.amount}>¥{price}</Text>
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
    borderWidth: 1,
    borderColor: '#f5f6fa',
  },
  name: {
    color: '#333',
    fontSize: 12,
    marginTop: 5,
    lineHeight: 18,
  },
  amount: {
    color: '#e65321',
    fontSize: 12,
    lineHeight: 20,
    fontWeight: '500'
  },
  lastItem: {
    marginRight: 0
  }
})

export default ScrollProductList;
