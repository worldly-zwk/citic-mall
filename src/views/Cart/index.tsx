import { useCallback } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { Notice, Button, GridProductList } from '@/components';
import { OrderModel, CartScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { convertProduct } from '@/utils/convert';
import { useCart, useMember } from '@/store';
import CartContent from './components/CartContent';
import ToolBar from './components/ToolBar';

const Cart = ({ navigation }: CartScreenProps) => {
  const fetch = useCart(state => state.fetch);
  const check = useCart(state => state.check);
  const login = useMember(state => state.login);
  const [suggestState] = useRequest(PRODUCT.recommends, {
    defaultParams: {
      position: 3
    },
    formatResult: ({ productList }: API.MemberRecommend) => {
      if (Array.isArray(productList)) {
        return productList.map(convertProduct);
      }
      return [];
    }
  });

  const handleFinish = useCallback(() => {
    check(OrderModel.ORDINARY).then(({ code }) => {
      if (code === 1) {
        navigation.navigate('Order', { model: OrderModel.ORDINARY });
      }
    });
  }, [check]);

  useFocusEffect(useCallback(() => {
    fetch();
  }, []));

  return (
    <View style={styles.container}>
      {!login && (
        <Notice
          showIcon
          extra={(
            <Button
              round
              size="small"
              style={{ width: 50 }}
              to={{ screen: 'Login', params: { screen: 'Index' } }}
            >登录</Button>
          )}
        >登录后可同步电脑和手机购物车中的商品</Notice>
      )}
      <ScrollView style={styles.main}>
        <CartContent />
        <GridProductList style={styles.card} items={suggestState.data} />
      </ScrollView>
      <ToolBar onFinish={handleFinish} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    flex: 1,
    backgroundColor: '#f5f6fa'
  },
  card: {
    margin: 10,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
})

export default Cart;
   