import { useCallback, useMemo } from 'react';
import { StyleSheet, ScrollView, View, TouchableWithoutFeedback } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Space, Typography, GridProductList, Icon } from '@/components';
import { useRequest } from '@/hooks';
import { useMember } from '@/store';
import { PRODUCT } from '@/services';
import { convertProduct } from '@/utils/convert';
import { OrderStatus, MemberScreenProps } from '@/typings';
import Header from './Header';
import Card from './Card';
import GridIcon from './Icon';
import Divider from './Divider';

const Member = ({ route, navigation }: MemberScreenProps) => {
  const [state] = useRequest<API.MemberRecommend>(PRODUCT.top);
  const member = useMember(state => state.member);
  const memberInit = useMember(state => state.init);

  const items = useMemo(() => {
    if (Array.isArray(state.data?.productList)) {
      return state.data.productList.map(convertProduct);
    }

    return [];
  }, [state.data]);

  useFocusEffect(useCallback(() => {
    memberInit();
  }, []));

  return (
    <ScrollView style={styles.container}>
      <Header member={member} />
      <View style={styles.main}>
        <Card title="我的订单" extra={(
          <TouchableWithoutFeedback onPress={() => navigation.navigate('OrderTabs')}>
            <Space>
              <Typography.Text size="small" color="disabled">查看全部订单</Typography.Text>
              <Icon icon="arrow" />
            </Space>
          </TouchableWithoutFeedback>
        )}>
          <GridIcon
            label="待付款"
            image={require('@/assets/images/icons/folder.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.PAYMENT } }}
          />
          <GridIcon
            label="待发货"
            image={require('@/assets/images/icons/collect.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.SHIPMENT } }}
          />
          <GridIcon
            label="待收货"
            image={require('@/assets/images/icons/drawer.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.DELIVERY } }}
          />
          <GridIcon
            label="待评价"
            image={require('@/assets/images/icons/comment.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.REVIEW } }}
          />
          <GridIcon
            label="退款/售后"
            image={require('@/assets/images/icons/after-sales.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.ALL } }}
          />
        </Card>
        <Card title="我的资产">
          <GridIcon label="红包" image={require('@/assets/images/icons/bag.png')} />
          <GridIcon label="优惠券" image={require('@/assets/images/icons/coupon.png')} />
          <GridIcon label="其他" image={require('@/assets/images/icons/other.png')} />
        </Card>
        <Card title="我的服务">
          <GridIcon label="商品收藏" image={require('@/assets/images/icons/favorites.png')} />
          <GridIcon label="常用联系人" image={require('@/assets/images/icons/contacts.png')} />
          <GridIcon label="店铺收藏" image={require('@/assets/images/icons/shop-favorites.png')} />
          <GridIcon label="浏览记录" image={require('@/assets/images/icons/history.png')} />
          <GridIcon label="在线客服" image={require('@/assets/images/icons/customer-service.png')} />
        </Card>
        {state.data && (
          <>
            <Divider>{state.data?.heardTitle}</Divider>
            <View style={styles.list}>
              <GridProductList items={items} />
            </View>
          </>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  
  main: {
    paddingLeft: 12,
    paddingRight: 12,
    marginTop: -68,
    rowGap: 12,
  },
  list: {
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingLeft: 10,
    paddingRight: 10,
    marginBottom: 12,
  }
})

export default Member;
   