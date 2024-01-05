import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider, GridProductList, OrderActions, Typography } from '@/components';
import { OrderDetailsScreenProps, OrderStatus } from '@/typings';
import { useRequest, useTimer } from '@/hooks';
import { ORDER, PRODUCT } from '@/services';
import { convertProduct } from '@/utils/convert';
import OrderState from './components/State';
import OrderAddress from './components/Address';
import OrderItems from './components/Items';
import OrderMoney from './components/Money';
import OrderInfo from './components/Info';

const { Text } = Typography;

const OrderDetails = ({ route, navigation }: OrderDetailsScreenProps) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const [time, actions] = useTimer(0);
  const [state] = useRequest<API.OrderDetails>(`${ORDER.detail}/${id}`);
  const [recommendState] = useRequest<API.MemberRecommend>(PRODUCT.recommends, {
    defaultParams: {
      position: 5
    }
  });
  const order = state.data;


  const timeText = useMemo(() => {
    const hours = Math.floor(time / 60 / 60).toString();
    const minute = Math.floor(time / 60 % 60).toString();
    return `${hours.padStart(2, '0')}时${minute.padStart(2, '0')}分`
  }, [time]);

  useEffect(() => {
    if (order?.orderStatus === OrderStatus.PAYMENT && order.restTime) {
      actions.start(order.restTime / 1000);
    }
  }, [order?.orderStatus]);


  const items = useMemo(() => {
    if (recommendState.data?.productList.length) {
      return recommendState.data.productList.map(convertProduct);
    }
    return [];
  }, [recommendState.data]);


  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom }}>
        <OrderState title={order?.orderStatusName} describe={order?.orderStatusStep.replace('{time}', timeText)} />
        <View style={styles.main}>
          <OrderAddress address={order?.addressVo} />
          <OrderItems seller={order?.sellerVo} items={order?.orderProductList} />
          <OrderMoney order={order} />
          <OrderInfo order={order} />
          {recommendState.data?.heardTitle && (
            <Divider>{recommendState.data?.heardTitle}</Divider>
          )}
          <GridProductList style={styles.suggest} items={items} />
        </View>
      </ScrollView>
      <View style={[styles.toolbar, { paddingBottom: insets.bottom + 12 }]}>
        <OrderActions order={{ orderSn: order?.orderSn, type: order?.orderType, status: order?.orderStatus, buyAgain: order?.canBuyAgain  }} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    marginTop: -38,
    paddingHorizontal: 12,
    rowGap: 10
  },
  suggest: {
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  toolbar: {
    padding: 12,
    alignItems: 'flex-end',
    backgroundColor: '#fff'
  }
})

export default OrderDetails;
