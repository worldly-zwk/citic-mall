import { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useCart } from '@/store';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';
import { OrderModel } from '@/typings';

interface ToolBarProps {
  onFinish: () => void;
}

const ToolBar = ({ onFinish }: ToolBarProps) => {
  const cart = useCart(state => state.cart);

  if (!cart?.sellerCartList.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Checkbox checked={cart.selected}>
        <Typography.Text type="secondary">全选</Typography.Text>
      </Checkbox>
      <View style={styles.amount}>
        <Typography.Text style={styles.money}>
          实付款：
          <Typography.Text style={{ lineHeight: 16 }} size="large" primary>¥{cart.moneyPay}</Typography.Text>
        </Typography.Text>
        <Typography.Text size="small" type="secondary">优惠：¥{cart.disMoney}</Typography.Text>
      </View>
      <Button style={styles.checkout} onPress={onFinish}>结算（{cart.selectedCount}）</Button>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 49,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
  },
  amount: {
    flex: 1,
    marginLeft: 12,
  },
  money: {
    marginBottom: 4,
  },
  checkout: {
    width: 105,
  }
})

export default ToolBar;
   