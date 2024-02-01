import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import { useCart } from '@/store';
import CartNotFound from './NotFound';
import CartCard from './CartCard';

const CartContent = () => {
  const cart = useCart(state => state.cart);

  if (!cart?.sellerCartList.length) {
    return <CartNotFound />
  }

  return (
    <View style={styles.container}>
      {cart.sellerCartList.map((sellerCart) => {
        return (
          <CartCard
            id={sellerCart.sellerId}
            key={sellerCart.sellerId}
            title={sellerCart.sellerName}
            items={sellerCart.ordinaryCart.productList}
            checked={sellerCart.selected}
            extra={sellerCart.coupon && (
              <TouchableWithoutFeedback onPress={console.log}>
                <Image style={styles.tag} source={require('@/assets/images/tag/coupon.png')} />
              </TouchableWithoutFeedback>
            )}
          />
        )
      })}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    rowGap: 12,
    marginTop: 12,
    paddingHorizontal: 12,
  },
  tag: {
    width: 56,
    height: 16,
  }
})

export default CartContent;
   