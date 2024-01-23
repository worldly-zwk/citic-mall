import { useCallback, useMemo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Typography, GridProductList, Icon, Link } from '@/components';
import { useRequest } from '@/hooks';
import { useMember } from '@/store';
import { PRODUCT } from '@/services';
import { convertProduct } from '@/utils/convert';
import { OrderStatus, WalletTab, CollectionTab } from '@/typings';
import Header from './Header';
import Card from './Card';
import GridIcon from './Icon';
import Divider from './Divider';

const Member = () => {
  const [state] = useRequest<API.MemberRecommend>(PRODUCT.top);
  const member = useMember(state => state.member);
  const memberState = useMember(state => state.state);
  const memberUpdate = useMember(state => state.update);

  const items = useMemo(() => {
    if (Array.isArray(state.data?.productList)) {
      return state.data.productList.map(convertProduct);
    }

    return [];
  }, [state.data]);

  useFocusEffect(useCallback(() => {
    memberUpdate();
  }, []));

  return (
    <ScrollView style={styles.container}>
      <Header member={member} />
      <View style={styles.main}>
        <Card title="我的订单" extra={(
          <Link style={{ flexDirection: 'row' }} auth to={{ screen: 'OrderTabs' }}>
            <Typography.Text size="small" color="disabled">查看全部订单</Typography.Text>
            <Icon icon="arrow" />
          </Link>
        )}>
          <GridIcon
            label="待付款"
            image={require('@/assets/images/icons/folder.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.PAYMENT } }}
            showCount={false}
          />
          <GridIcon
            label="待发货"
            image={require('@/assets/images/icons/collect.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.SHIPMENT } }}
            showCount={false}
          />
          <GridIcon
            label="待收货"
            image={require('@/assets/images/icons/drawer.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.DELIVERY } }}
            showCount={false}
          />
          <GridIcon
            label="待评价"
            image={require('@/assets/images/icons/comment.png')}
            to={{ screen: 'OrderTabs', params: { tab: OrderStatus.REVIEW } }}
            showCount={false}
          />
          <GridIcon
            label="退款/售后"
            image={require('@/assets/images/icons/after-sales.png')}
            to={{ screen: 'AfterSales' }}
            showCount={false}
          />
        </Card>
        <Card title="我的资产">
          <GridIcon
            label="红包"
            image={require('@/assets/images/icons/bag.png')}
            count={memberState?.couponPlatformNum}
            to={{ screen: 'Wallet', params: { tab: WalletTab.RED_ENVELOPE } }}
          />
          <GridIcon
            label="优惠券"
            image={require('@/assets/images/icons/coupon.png')}
            count={memberState?.couponNum}
            to={{ screen: 'Wallet', params: { tab: WalletTab.COUPON } }}
          />
          <GridIcon
            label="其他"
            image={require('@/assets/images/icons/other.png')}
            count={memberState?.couponThirdNum}
            to={{ screen: 'Wallet', params: { tab: WalletTab.OTHER } }}
          />
        </Card>
        <Card title="我的服务">
          <GridIcon
            label="商品收藏"
            image={require('@/assets/images/icons/favorites.png')}
            count={memberState?.memberCollectionProductNum}
            to={{ screen: 'Collection', params: { tab: CollectionTab.PRODUCT } }}
          />
          <GridIcon
            label="常用联系人"
            image={require('@/assets/images/icons/contacts.png')}
            count={memberState?.memberAuthNum}
            to={{ screen: 'Contact' }}
          />
          <GridIcon
            label="店铺收藏"
            image={require('@/assets/images/icons/shop-favorites.png')}
            count={memberState?.memberCollectionSellerNum}
            to={{ screen: 'Collection', params: { tab: CollectionTab.SELLER } }}
          />
          <GridIcon
            label="浏览记录"
            image={require('@/assets/images/icons/history.png')}
            count={memberState?.productLookLogNum}
            to={{ screen: 'History' }}
          />
          <GridIcon label="在线客服" image={require('@/assets/images/icons/customer-service.png')} showCount={false} />
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
   