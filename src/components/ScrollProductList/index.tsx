import { FC } from "react";
import { Image, ScrollView, ScrollViewProps, StyleProp, StyleSheet, TouchableWithoutFeedback, View, ViewStyle } from "react-native";
import { isLastItem } from "@/utils/array";
import Typography from "../Typography";
import { useNavigation } from "@react-navigation/native";
import { ProductScreenProps } from "@/typings/screen";

interface ScrollProductListProps extends ScrollViewProps {
  items: ProductItem[];
  more?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const ScrollProductList: FC<ScrollProductListProps> = ({ items, style, containerStyle, ...restProps }) => {
  const navigation = useNavigation<ProductScreenProps['navigation']>();

  return (
    <View style={style}>
      <ScrollView horizontal {...restProps} style={containerStyle}>
        {items.map(({ id, name, image, price }, index) => (
          <TouchableWithoutFeedback key={id} onPress={() => navigation.push('Product', { id })}>
            <View style={[styles.item, isLastItem(index, items.length) ? styles.lastItem : undefined]}>
              <Image style={styles.image} source={{ uri: image }} resizeMode="contain" />
              <View>
                <Typography.Text style={styles.name} size="small" numberOfLines={1}>{name}</Typography.Text>
                <Typography.Price size="small">{price}</Typography.Price>
              </View>
            </View>
          </TouchableWithoutFeedback>
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

export default ScrollProductList;
