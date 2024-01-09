import { FC } from "react";
import { Image, ScrollView, ScrollViewProps, StyleSheet, View } from "react-native";
import { ProductItem } from "@/typings";
import { isTrue, isLastItem } from "@/utils";
import Typography from "../Typography";
import Link from "../Link";

interface HorizontalProductListProps extends ScrollViewProps {
  items: ProductItem[];
  more?: boolean;
}

const HorizontalProductList: FC<HorizontalProductListProps> = ({ items, style, ...restProps }) => {
  return (
    <View style={style}>
      <ScrollView horizontal {...restProps}>
        {items.map(({ id, name, image, price }, index) => (
          <Link style={[styles.item, isTrue(isLastItem(index, items.length), styles.lastItem)]} to={{ screen: 'Product', params: { id } }} key={id}>
            <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
            <View>
              <Typography.Text style={styles.name} size="small" numberOfLines={1}>{name}</Typography.Text>
              <Typography.Price size="small">{price}</Typography.Price>
            </View>
          </Link>
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
  lastItem: {
    marginRight: 0
  }
})

export default HorizontalProductList;
