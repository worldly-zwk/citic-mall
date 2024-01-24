import { StyleSheet } from 'react-native';
import { Tabs } from '@/components';
import { OrderTabsScreenProps } from '@/typings';
import { ORDER_TABS } from '@/constants';
import OrderList from './components/List';


const OrderTabs = ({ route }: OrderTabsScreenProps) => {
  const { params } = route;

  return (
    <Tabs style={styles.container} scrollable={false} defaultActiveKey={params?.tab}>
      {ORDER_TABS.map(({ title, value }) => {
        return (
          <Tabs.Item title={title} value={value} key={value}>
            <OrderList status={value} />
          </Tabs.Item>
        )
      })}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f6fa'
  },
})

export default OrderTabs;
