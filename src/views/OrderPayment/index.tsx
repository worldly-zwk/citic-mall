import { StyleSheet, SafeAreaView, ScrollView, View, TextInput } from 'react-native';
import { Cell, Notice, Space, Typography, Button } from '@/components';
import { useOrder } from '@/store';
import { OrderPaymentScreenProps } from '@/typings/screen';
// import AddressCard from './components/AddressCard';
// import ProductCard from './components/ProductCard';
// import SummaryCard from './components/SummaryCard';

const CellGroup = Cell.Group;

const OrderPayment = ({ route, navigation }: OrderPaymentScreenProps) => {
  const orderStore = useOrder();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.main} contentContainerStyle={{ rowGap: 12 }}>
        
      </ScrollView>
      <View style={styles.toolbar}>
        <Space align="flex-end">
          <Typography.Text size="large">实付款：</Typography.Text>
          <Typography.Price style={{ marginBottom: 2 }}>{orderStore.order?.moneyPay.toFixed(2)}</Typography.Price>
        </Space>
        <Button style={styles.submit}>提交订单</Button>
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

export default OrderPayment;
