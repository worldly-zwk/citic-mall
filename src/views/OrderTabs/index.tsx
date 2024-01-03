import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Tabs } from '@/components';
import { OrderTabsScreenProps } from '@/typings';
import { ORDER_TABS } from '@/constants';


const OrderTabs = ({ route, navigation }: OrderTabsScreenProps) => {
  const { params } = route;
  // const [state] = useRequest<API.LigthCatalog[]>(`${PRODUCT.sametype}/${id}`);

  // useEffect(() => {
  //   navigation.setOptions({
  //     title: params?.tab,
  //   });
  // }, []);

  return (
    <Tabs style={styles.container} scrollable={false} defaultActiveKey={params?.tab}>
      {ORDER_TABS.map(({ title, value }) => {
        return (
          <Tabs.Item title={title} value={value} key={value}></Tabs.Item>
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
