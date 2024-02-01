import { useCallback, useMemo, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View, TextInput } from 'react-native';
import { Cell, Notice, Space, Typography, Button } from '@/components';
import { useOrder } from '@/store';
import { OrderScreenProps } from '@/typings/screen';
import AddressCard from './components/AddressCard';
import ProductCard from './components/ProductCard';
import SummaryCard from './components/SummaryCard';

const CellGroup = Cell.Group;

const invoicePropertyTextEnum: RecordAny =['普票', '电子'];

const Order = ({ route, navigation }: OrderScreenProps) => {
  const orderStore = useOrder();
  const [remark, setRemark] = useState('');

  const invoiceName = useMemo(() => {
    const { type, property, title } = orderStore.invoice;

    if (type === 3) {
      return `专票（${title}）`;
    } else if (type) {
      return `${invoicePropertyTextEnum[property]}（${title}）`
    }

    return '不开发票';
  }, [orderStore.invoice]);

  const couponText = useMemo(() => {
    const { items, couponSn, couponDis } = orderStore.coupon;

    if (items.length) {
      if (couponSn.length) {
        return <Typography.Text color="primary">- ¥{couponDis}</Typography.Text>
      }

      return <Typography.Text>未使用</Typography.Text>;
    }

    return <Typography.Text>无可用</Typography.Text>;
    
  }, [orderStore.coupon]);

  const handleFinish = useCallback(() => {
    orderStore.finish({
      memberNotes: remark
    }).then(({ goJumpPayfor, orderSn }) => {
      if (goJumpPayfor) {
        navigation.navigate('OrderPayment', { orderSn });
      } else {
        // TODO 支付成功页
      }
    })
  }, [remark]);

  return (
    <SafeAreaView style={styles.container}>
      {orderStore.tips && (
        <Notice closeIcon>订单中含有不支持7天无理由退货的商品，请确认相关商品信息后提交订单</Notice>
      )}
      <ScrollView style={styles.main} contentContainerStyle={{ rowGap: 12 }}>
        <AddressCard />
        <ProductCard />
        <View style={styles.form}>
          <CellGroup>
            <Cell label="支付方式" labelStyle={styles.label}>
              <Typography.Text>在线支付</Typography.Text>
            </Cell>
            <Cell label="发票信息" labelStyle={styles.label} to={{ screen: 'OrderInvoice' }}>
              <Typography.Text>{invoiceName}</Typography.Text>
            </Cell>
          </CellGroup>
          <CellGroup>
            <Cell label="优惠券" labelStyle={styles.label} to={{ screen: 'OrderCoupon' }}>
              {couponText}
            </Cell>
            <Cell label="红包" labelStyle={styles.label} isLink>
              <Typography.Text>无可用</Typography.Text>
            </Cell>
          </CellGroup>
          <CellGroup>
            <Cell label="备注" labelStyle={styles.label}>
              <TextInput style={styles.remark} value={remark} onChangeText={setRemark} placeholder="可以对该订单进行备注哦～" placeholderTextColor="#999" />
            </Cell>
          </CellGroup>
          <SummaryCard />
        </View>
      </ScrollView>
      <View style={styles.toolbar}>
        <Space align="flex-end">
          <Typography.Text size="large">实付款：</Typography.Text>
          <Typography.Price style={{ marginBottom: 2 }}>{orderStore.moneyPay.toFixed(2)}</Typography.Price>
        </Space>
        <Button style={styles.submit} onPress={handleFinish}>提交订单</Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  main: {
    flex: 1,
    padding: 12,
    backgroundColor: '#f5f6fa',
  },
  label: {
    color: '#666'
  },
  form: {
    rowGap: 12,
  },
  cellContent: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  remark: {
    flex: 1,
    color: '#333',
    fontSize: 14,
    lineHeight: 16,
    paddingLeft: 12,
  },
  toolbar: {
    height: 49,
    paddingLeft: 12,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
  },
  submit: {
    width: 105,
    margin: 4,
  }
})

export default Order;
