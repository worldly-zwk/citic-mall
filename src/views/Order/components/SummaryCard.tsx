import { StyleSheet, View } from 'react-native';
import { Space, Typography } from '@/components';
import { useOrder } from '@/store';


const SummaryCard = () => {
  const order = useOrder(state => state.order);
  const orderCoupon = useOrder(state => state.coupon);

  return (
    <View style={styles.container}>
      <Space align="center" style={styles.item}>
        <Typography.Text color="secondary">商品总金额</Typography.Text>
        <Typography.Text color="secondary">¥{order?.moneyProduct || 0}</Typography.Text>
      </Space>
      {!!order?.fullDis && (
        <Space align="center" style={styles.item}>
          <Typography.Text color="secondary">满减</Typography.Text>
          <Typography.Text color="primary">- ¥{order?.fullDis || 0}</Typography.Text>
        </Space>
      )}
      {!!order?.singleDis && (
        <Space align="center" style={styles.item}>
          <Typography.Text color="secondary">单品立减</Typography.Text>
          <Typography.Text color="primary">- ¥{order?.singleDis || 0}</Typography.Text>
        </Space>
      )}
      {!!order?.staffDis && (
        <Space align="center" style={styles.item}>
          <Typography.Text color="secondary">内购优惠</Typography.Text>
          <Typography.Text color="primary">- ¥{order?.staffDis || 0}</Typography.Text>
        </Space>
      )}
      {!!orderCoupon?.couponDis && (
        <Space align="center" style={styles.item}>
          <Typography.Text color="secondary">优惠券</Typography.Text>
          <Typography.Text color="primary">- ¥{orderCoupon?.couponDis || 0}</Typography.Text>
        </Space>
      )}
      <Space align="center" style={styles.item}>
        <Typography.Text color="secondary">运费</Typography.Text>
        <Typography.Text color="primary">+ ¥{order?.moneyLogistics || 0}</Typography.Text>
      </Space>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    rowGap: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  item: {
    justifyContent: 'space-between',
  },
})

export default SummaryCard;
