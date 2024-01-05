import { useCallback } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Space, LinkProps, Button } from '@/components';
import { OrderStatus, RootStackParamList } from '@/typings';
import { useCart } from '@/store';

interface AddressCardProps extends LinkProps {
  order: {
    type?: number;
    status?: OrderStatus;
    orderSn?: string;
    buyAgain?: boolean;
  }
  buttonStyle?: StyleProp<ViewStyle>;
}

const OrderActions = ({ order, buttonStyle }: AddressCardProps) => {
  const isFinish = [OrderStatus.ALL, OrderStatus.REVIEW, OrderStatus.DONE];
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const cartAgain = useCart(state => state.again);

  const handleBuyAgain = useCallback(() => {
    cartAgain(order.orderSn as string).then(success => {
      if (success) {
        navigation.navigate('Index', { screen: 'Cart' });
      }
    });
  }, [cartAgain, order.orderSn]);

  if (order.status === OrderStatus.PAYMENT) {
    return <Button size="small" type="primary" round style={buttonStyle}>去支付</Button>
  }

  if (order.status === OrderStatus.DELIVERY) {
    return (
      <Space size={12} align="center">
        {order.type !== 4 && <Button size="small" round style={buttonStyle}>查看物流</Button>}
        <Button size="small" round style={buttonStyle}>确认收货</Button>
      </Space>
    )
  }

  return (
    <Space size={12} align="center">
      {order.status === OrderStatus.REVIEW && <Button size="small" round style={buttonStyle}>评价晒单</Button>}
      {(isFinish && order.buyAgain) && <Button size="small" type="secondary" round onPress={handleBuyAgain} style={buttonStyle}>再次购买</Button>}
    </Space>
  )
}

export default OrderActions;
   