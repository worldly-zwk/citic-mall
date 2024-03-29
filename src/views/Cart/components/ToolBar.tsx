import { SafeAreaView, StyleSheet, View } from 'react-native';
import { useCart } from '@/store';
import Typography from '@/components/Typography';
import Button from '@/components/Button';
import Checkbox from '@/components/Checkbox';

interface ToolBarProps {
  onFinish: () => void;
}

const ToolBar = ({ onFinish }: ToolBarProps) => {
  const cart = useCart(state => state.cart);
  const cartCheckedAll = useCart(state => state.checkedAll);

  if (!cart?.sellerCartList.length) {
    return null;
  }

  return (
    <SafeAreaView style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Checkbox checked={cart.selected} onChange={cartCheckedAll}>
          <Typography.Text color="secondary">全选</Typography.Text>
        </Checkbox>
        <View style={styles.amount}>
          <Typography.Text style={styles.money}>
            实付款：
            <Typography.Text style={{ lineHeight: 16 }} size="large" primary>¥{cart.moneyPay}</Typography.Text>
          </Typography.Text>
          <Typography.Text size="small" color="secondary">优惠：¥{cart.disMoney}</Typography.Text>
        </View>
        <Button style={styles.checkout} onPress={onFinish}>结算（{cart.selectedCount}）</Button>
      </View>
    </SafeAreaView>
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
   