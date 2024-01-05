import { ImageBackground, StyleSheet } from 'react-native';
import { Cell, Icon, Space, Typography } from '@/components';

const CellGroup = Cell.Group;
const { Text, Price } = Typography;

interface OrderMoneyProps {
  order?: API.OrderDetails;
}


const OrderMoney = ({ order }: OrderMoneyProps) => {
  return (
    <CellGroup style={styles.container}>
      <Cell label="商品总金额" style={styles.cell} labelStyle={styles.secondary}>
        <Text color="secondary">¥ {order?.moneyProduct.toFixed(2)}</Text>
      </Cell>
      {!!order?.fullDis && (
        <Cell label="满减" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">- ¥ {order?.fullDis.toFixed(2)}</Text>
        </Cell>
      )}
      {!!order?.singleDis && (
        <Cell label="单品立减" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">- ¥ {order?.singleDis.toFixed(2)}</Text>
        </Cell>
      )}
      {!!order?.couponDis && (
        <Cell label="优惠券" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">- ¥ {order?.couponDis.toFixed(2)}</Text>
        </Cell>
      )}
      {!!order?.couponPlatformDis && (
        <Cell label="红包" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">- ¥ {order?.couponPlatformDis.toFixed(2)}</Text>
        </Cell>
      )}
      {!!order?.moneyLogistics && (
        <Cell label="运费" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">+ ¥ {order?.moneyLogistics.toFixed(2)}</Text>
        </Cell>
      )}
      {!!order?.bonusOrderAmount && (
        <Cell label="积分抵扣" style={styles.cell} labelStyle={styles.secondary}>
          <Text color="secondary">- ¥ {order?.bonusOrderAmount}抵现¥ {order.bonusOrderFee.toFixed(2)}</Text>
        </Cell>
      )}
      <Cell label="需付款:" style={styles.cell} labelStyle={styles.strong}>
        <Price>{order?.moneyOrder.toFixed(2)}</Price>
      </Cell>
    </CellGroup>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
  },
  cell: {
    paddingHorizontal: 0,
  },
  secondary: {
    color: '#666',
  },
  strong: {
    fontWeight: '700'
  }
})

export default OrderMoney;
