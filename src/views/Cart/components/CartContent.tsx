import { StyleSheet, View } from 'react-native';
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
})

export default CartContent;
   