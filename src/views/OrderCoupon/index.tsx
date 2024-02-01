import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, SafeAreaView, ScrollView, View } from 'react-native';
import { Button, CheckTicket, Empty } from '@/components';
import { useOrder } from '@/store';
import { toast } from '@/utils';
import { OrderCouponScreenProps } from '@/typings';

const OrderCoupon = ({ navigation }: OrderCouponScreenProps) => {
  const sellerCouponList = useOrder(state => state.order?.couponVOS || []);
  const orderCouponStore = useOrder(state => state.coupon);
  const setCouponSn = useOrder(state => state.setCouponSn);
  const [state, setState] = useState(new Map());

  const handleChecked = useCallback((sellerId: number, couponSn: string) => {
    setState(oldState => {
      if (oldState.get(sellerId)) {
        toast('同一个店铺只能选择一张优惠券！');
      }
      return new Map([...oldState, [sellerId, couponSn]]);
    });
  }, []);

  const handleFinish = useCallback(() => {
    setCouponSn(Array.from(state.values()));
    navigation.goBack();
  }, [state, setCouponSn]);

  useEffect(() => {
    const selectedMap = new Map();
    const { couponSn } = orderCouponStore;
    for (const seller of sellerCouponList) {
      for (const couponInfo of seller.orderCouponList) {
        if (couponSn.includes(couponInfo.couponSn)) {
          selectedMap.set(seller.sellerId, couponInfo.couponSn);
          break;
        }
      }
    }
    setState(selectedMap);
  }, [orderCouponStore]);

  if (!sellerCouponList.length) {
    return (
      <Empty
        fullscreen
        image={require('@/assets/images/empty/coupon.png')}
        title="没有优惠券信息"
      />
    )
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.form}>
          {sellerCouponList.map((sellerInfo) => {
            const { sellerId } = sellerInfo;
            return sellerInfo.orderCouponList.map(ticket => {
              const { couponSn, couponName, couponType, couponValue, useStartTime, useEndTime } = ticket;
              return (
                <CheckTicket
                  checked={state.get(sellerId) === couponSn}
                  ticket={{
                    ...ticket,
                    name: couponName,
                    type: couponType,
                    value: couponValue,
                    useTimeScope: `${useStartTime.slice(0, 10)} ~ ${useEndTime.slice(0, 10)}`
                  }}
                  onPress={() => {
                    handleChecked(sellerId, couponSn);
                  }}
                  key={couponSn}
                />
              )
            })
          })}
        </View>
      </ScrollView>
      <SafeAreaView style={styles.buttonContainer}>
        <Button style={styles.button} onPress={handleFinish}>确定</Button>
      </SafeAreaView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    rowGap: 12,
    padding: 12,
  },
  card: {
    paddingBottom: 0,
  },
  title: {
    height: 18,
    marginBottom: 12,
  },
  input: {
    height: 40,
    backgroundColor: '#f5f6fa'
  },
  buttonContainer: {
    backgroundColor: 'white',
  },
  button: {
    margin: 4,
  }
})

export default OrderCoupon;
