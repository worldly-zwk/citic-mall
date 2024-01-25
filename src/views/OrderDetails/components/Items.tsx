import { Card, Icon, Link, Skeleton, Space, Typography } from '@/components';
import { Image, StyleSheet, View } from 'react-native';

const { Text } = Typography;

interface OrderItemsProps {
  seller?: API.OrderDetails['sellerVo'];
  items?: API.OrderInitProduct[];
  loading?: boolean;
}


const OrderItems = ({ seller, items, loading }: OrderItemsProps) => {
  return (
    <Card contentStyle={styles.container}>
      <Link style={styles.header} to={{ screen: 'Store', params: { id: seller?.sellerId as number } }}>
        <Icon icon="shop" />
        <Skeleton loading={loading} style={{ width: 100, padding: 0 }}>
          <Text strong>{seller?.sellerName}</Text>
        </Skeleton>
        <Icon icon="arrow" />
      </Link>
      <Skeleton loading={loading} avatar={{ size: 70 }} text={{ rows: 3 }}>
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
      </Skeleton>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 0,
  },
  header: {
    gap: 4,
    height: 44,
    flexDirection: 'row',
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
