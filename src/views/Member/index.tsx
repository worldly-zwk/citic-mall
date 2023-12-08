import { useMemo } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import GridProductList from '@/components/GridProductList';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { convertProduct } from '@/utils/convert';
import Header from './Header';
import Card from './Card';
import Icon from './Icon';
import Divider from './Divider';

const Member = () => {
  const navigation = useNavigation();
  const [state] = useRequest(PRODUCT.top);

  const items = useMemo(() => {
    if (Array.isArray(state.data?.productList)) {
      return state.data.productList.map(convertProduct);
    }

    return [];
  }, [state.data]);

  return (
    <ScrollView style={styles.container}>
      <Header />
      <View style={styles.main}>
        <Card title="我的订单">
          <Icon label="待付款" image={require('@/assets/images/icons/folder.png')} />
          <Icon label="待发货" image={require('@/assets/images/icons/collect.png')} />
          <Icon label="待收货" image={require('@/assets/images/icons/drawer.png')} />
          <Icon label="待评价" image={require('@/assets/images/icons/comment.png')} />
          <Icon label="退款/售后" image={require('@/assets/images/icons/after-sales.png')} />
        </Card>
        <Card title="我的资产">
          <Icon label="红包" image={require('@/assets/images/icons/bag.png')} />
          <Icon label="优惠券" image={require('@/assets/images/icons/coupon.png')} />
          <Icon label="其他" image={require('@/assets/images/icons/other.png')} />
        </Card>
        <Card title="我的服务">
          <Icon label="商品收藏" image={require('@/assets/images/icons/favorites.png')} />
          <Icon label="常用联系人" image={require('@/assets/images/icons/contacts.png')} />
          <Icon label="店铺收藏" image={require('@/assets/images/icons/shop-favorites.png')} />
          <Icon label="浏览记录" image={require('@/assets/images/icons/history.png')} />
          <Icon label="在线客服" image={require('@/assets/images/icons/customer-service.png')} />
        </Card>
        <Divider>{state.data?.heardTitle}</Divider>
        <View style={styles.list}>
          <GridProductList items={items} />
        </View>
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
   