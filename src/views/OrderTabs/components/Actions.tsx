import { StyleSheet } from 'react-native';
import { Space, LinkProps, Button } from '@/components';
import { OrderStatus } from '@/typings';

interface AddressCardProps extends LinkProps {
  type: number;
  status: OrderStatus;
  buyAgain: boolean;
}

const OrderActions = ({ type, status, buyAgain, ...restProps }: AddressCardProps) => {
  const isFinish = [OrderStatus.ALL, OrderStatus.REVIEW, OrderStatus.DONE];

  if (status === OrderStatus.PAYMENT) {
    return <Button size="small" type="primary" round>去支付</Button>
  }

  if (status === OrderStatus.DELIVERY) {
    return (
      <Space size={12} align="center">
        {type !== 4 && <Button size="small" round>查看物流</Button>}
        <Button size="small" round>确认收货</Button>
      </Space>
    )
  }

  return (
    <Space size={12} align="center">
      {status === OrderStatus.REVIEW && <Button size="small" round>评价晒单</Button>}
      {(isFinish && buyAgain) && <Button size="small" type="secondary" round>再次购买</Button>}
    </Space>
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
  button: {
    paddingHorizontal: 12,
  }
})

export default OrderActions;
   