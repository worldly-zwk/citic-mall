import { StyleSheet, View } from 'react-native';
import { Space, Typography, Link, Icon, LinkProps, OrderActions } from '@/components';
import ProductInline from './ProductInline';

const { Text } = Typography;

interface AddressCardProps extends LinkProps {
  data: API.Order;
}

const OrderCard = ({ data, ...restProps }: AddressCardProps) => {
  return (
    <Link style={styles.container} to={{ screen: 'OrderDetails', params: { id: data.orderSn } }} {...restProps}>
      <Space style={styles.header} align="center" justify="space-between">
        <Link style={styles.title} to={{ screen: 'Store', params: { id: data.sellerId } }}>
          <Icon icon="shop" />
          <Text strong>{data.sellerName}</Text>
          <Icon icon="arrow" />
        </Link>
        <Text size="small" primary>{data.orderStatusName}</Text>
      </Space>
      <View style={styles.content}>
        <ProductInline items={data.productList} />
        <Space size={12} justify="flex-end">
          <Text size="small" color="secondary">共计{data.productList.length}件商品</Text>
          <Text size="small" color="secondary">需付款：<Text size="large" strong>¥{data.payMoney}</Text></Text>
        </Space>
      </View>
      <Space style={styles.footer}>
        <OrderActions order={{ orderSn: data.orderSn, type: data.orderType, status: data.orderStatus, buyAgain: data.buyAgain  }} />
      </Space>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 12,
  },
  title: {
    gap: 4,
    alignItems: 'center',
    flexDirection: 'row',
  },
  content: {
    gap: 8
  },
  image: {
    width: 68,
    height: 68,
  },
  footer: {
    marginTop: 8,
    justifyContent: 'flex-end',
  },
})

export default OrderCard;
   