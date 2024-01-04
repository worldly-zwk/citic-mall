import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { Space, Typography, LinkProps } from '@/components';

const { Text } = Typography;

interface AddressCardProps extends LinkProps {
  items: API.OrderProduct[];
}

const ProductInline = ({ items = [] }: AddressCardProps) => {
  if (items?.length > 1) {
    return (
      <ScrollView horizontal contentContainerStyle={{ gap: 12 }}>
        {items.map(item => (
          <Image style={styles.image} source={{ uri: item.image }} key={item.productId} />
        ))}
      </ScrollView>
    )
  }

  return (
    <Space size={8}>
      <Image style={styles.image} source={{ uri: items[0]?.image }}  />
      <View style={{ flex: 1 }}>
        <Text numberOfLines={2}>{items[0]?.productName}</Text>
        <Text size="small" color="disabled" numberOfLines={1}>{items[0]?.specInfo}</Text>
      </View>
    </Space>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 68,
    height: 68,
  },
})

export default ProductInline;
   