import { useEffect, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Divider, GridProductList, OrderActions, Typography } from '@/components';
import { OrderDetailsScreenProps, OrderStatus } from '@/typings';
import { useRequest, useTimer, useTimerWithClock } from '@/hooks';
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
  const [clock, actions] = useTimerWithClock(0);
  const [state] = useRequest<API.OrderDetails>(`${ORDER.detail}/${id}`);
  const [recommendState] = useRequest<API.MemberRecommend>(PRODUCT.recommends, {
    defaultParams: {
      position: 5
    }
  });
  const order = state.data;

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
        <OrderState title={order?.orderStatusName} describe={order?.orderStatusStep.replace('{time}', `${clock.hours}时${clock.minute}分`)} />
        <View style={styles.main}>
          <OrderAddress loading={state.loading} address={order?.addressVo} />
          <OrderItems loading={state.loading} seller={order?.sellerVo} items={order?.orderProductList} />
          <OrderMoney order={order} />
          <OrderInfo loading={state.loading} order={order} />
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
