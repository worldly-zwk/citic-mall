import { Image, StyleSheet, View } from 'react-native';
import { Space, Typography, Checkbox, Tag, Link, Icon, LinkProps, Button } from '@/components';
import ProductInline from './ProductInline';
import OrderActions from './Actions';

const { Text } = Typography;

interface AddressCardProps extends LinkProps {
  data: API.Order;
}

const OrderCard = ({ data, ...restProps }: AddressCardProps) => {
  return (
    <Link style={styles.container} {...restProps}>
      <Space style={styles.header} align="center" justify="space-between">
        <Space size={4} align="center">
          <Icon icon="shop" />
          <Text strong>{data.sellerName}</Text>
          <Icon icon="arrow" />
        </Space>
        <Text size="small" primary>{data.orderStatusName}</Text>
      </Space>
      <View style={styles.content}>
        <ProductInline items={data.productList} />
        <Space size={12} justify="flex-end">
          <Text size="small" color="secondary">共计{data.productList.length}件商品</Text>
          <Text size="small" color="secondary">需付款：<Text size="large" strong>¥198</Text></Text>
        </Space>
      </View>
      <Space style={styles.footer}>
        <OrderActions type={data.orderType} status={data.orderStatus} buyAgain={data.buyAgain} />
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
   