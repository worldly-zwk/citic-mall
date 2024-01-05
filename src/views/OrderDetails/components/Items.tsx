import { Card, Icon, Link, Space, Typography } from '@/components';
import { Image, StyleSheet, View } from 'react-native';

const { Text } = Typography;

interface OrderItemsProps {
  seller?: API.OrderDetails['sellerVo'];
  items?: API.OrderInitProduct[];
}


const OrderItems = ({ seller, items }: OrderItemsProps) => {
  return (
    <Card contentStyle={styles.container}>
      <Space size={4} style={styles.header}>
        <Icon icon="shop" />
        <Text strong>{seller?.sellerName}</Text>
        <Icon icon="arrow" />
      </Space>
      {items?.map((item) => {
        return (
          <Link style={styles.item} key={item.productId} to={{ screen: 'Product', params: { id: item.productId } }}>
            <Image style={styles.image} source={{ uri: item.productMasterImage }} />
            <View style={{ flex: 1 }}>
              <Text numberOfLines={1}>{item.productName}</Text>
              <Text size="small" color="disabled" style={styles.norms}>{item.number}件, {item.specInfo || '默认规格'}</Text>
              <Space align="center" justify="space-between">
                <Text size="large" primary>¥{item?.moneyPrice}</Text>
              </Space>
              {item?.sevenDays === 0 && (
                <Space size={6} align="center">
                  <Icon icon="warning" />
                  <Text size="small" color="#ff873c">该商品不支持7天无理由退货</Text>
                </Space>
              )}
            </View>
          </Link>
        )
      })}
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  header: {
    height: 44,
    alignItems: 'center',
  },
  item: {
    gap: 8,
    flexDirection: 'row',
    paddingVertical: 12,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 70,
    height: 70,
  },
  norms: {
    marginBottom: 14
  }
})

export default OrderItems;
