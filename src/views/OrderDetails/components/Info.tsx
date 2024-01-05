import { StyleSheet } from 'react-native';
import { Card, Typography } from '@/components';

const { Text } = Typography;

interface OrderInfoProps {
  order?: API.OrderDetails;
}


const OrderInfo = ({ order }: OrderInfoProps) => {
  return (
    <Card title="订单信息" titleStyle={styles.title} contentStyle={styles.container}>
      <Text color="secondary">订单编号：{order?.orderSn}</Text>
      <Text color="secondary">下单时间：{order?.createTime}</Text>
      <Text color="secondary">下单备注：{order?.memberNotes || '无'}</Text>
      <Text color="secondary">支付方式：{order?.cashPayChannel}</Text>
      <Text color="secondary">发票信息：不开发票</Text>
    </Card>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 12
  },
  title: {
    fontSize: 15,
    lineHeight: 15,
    fontWeight: '700',
  },
})

export default OrderInfo;
