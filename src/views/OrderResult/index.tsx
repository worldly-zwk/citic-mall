import { useCallback, useMemo } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import { Button, Card, HorizontalProductList, Typography } from '@/components';
import { convertProduct } from '@/utils';
import { OrderResultScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { ORDER, PRODUCT, PROMOTION } from '@/services';

const OrderResult = ({ route, navigation }: OrderResultScreenProps) => {
  const { orderSn } = route.params || {};
  const [state] = useRequest<API.PayResult>(ORDER.payResult, {
    defaultParams: {
      orderSn
    }
  });
  const [promotionState] = useRequest<API.PayResult>(PROMOTION.orderAfterCheck, {
    defaultParams: {
      orderPSn: orderSn
    }
  });
  const [recommendState] = useRequest<API.MemberRecommend>(PRODUCT.recommends, {
    defaultParams: {
      position: 4
    }
  });

  const success = state.data?.state === 1;
  const color = success ? '#f5a623' : '#4dafea';
  const icon = success ? require('@/assets/images/view/result_checked.png') : require('@/assets/images/view/result_close.png');
  const recommendItems = useMemo(() =>  {
    if (Array.isArray(recommendState.data?.productList)) {
      return recommendState.data.productList?.map(convertProduct);
    }
    return [];
  }, [recommendState]);

  const handleViewOrder = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [
        { name: 'Index', params: { screen: 'Member' }},
        { name: 'OrderTabs', params: { tab: 1 }}
      ]
    });
  }, []);
  

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Card contentStyle={styles.result}>
        <View style={styles.title}>
          <Typography.Text color={color} size="small">{success ? '订单支付成功，请耐心等待商家发货' : '请在24小时内完成付款，过期订单会自动取消！'}</Typography.Text>
        </View>
        <View style={styles.content}>
          <Image style={styles.icon} source={icon} />
          <Typography.Text size="large" color={color} style={{ marginTop: 6, marginBottom: 42, }}>{success ? '付款成功' : '付款失败'}</Typography.Text>
          {!success && (
            <Button
              style={[styles.button, { marginBottom: 10 }]}
              linearGradient={{ colors: ['#21c9ed', '#0082ff'] }}
              to={{ screen: 'OrderPayment', params: { orderSn } }}
            >重新付款</Button>
          )}
          <Button style={styles.button} type="fillMist" onPress={handleViewOrder}>查看订单</Button>
          {success && (
            <Button style={[styles.button, { marginTop: 10 }]} to={{ screen: 'Index', params: { screen: 'Home' } }}>返回首页</Button>
          )}
        </View>
      </Card>
      <Card style={styles.suggest}>
        <Typography.Text style={styles.suggestTitle}>{recommendState.data?.heardTitle}</Typography.Text>
        <HorizontalProductList items={recommendItems} />
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  result: {
    paddingVertical: 0,
  },
  title: {
    paddingVertical: 14,
    alignItems: 'center',
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  content: {
    paddingTop: 34,
    paddingBottom: 28,
    alignItems: 'center',
  },
  icon: {
    width: 72,
    height: 72,
  },
  button: {
    width: 176,
  },
  suggest: {
    marginTop: 10,
    backgroundColor: '#fff'
  },
  suggestTitle: {
    fontSize: 18,
    lineHeight: 28,
    marginBottom: 6,
  }
})

export default OrderResult;
