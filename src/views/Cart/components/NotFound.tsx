import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import Empty from "@/components/Empty";

const CartNotFound = () => {
  return (
    <>
      <View style={styles.card}>
        <Empty
          style={styles.empty}
          title="购物车空空如也"
          image={require('@/assets/images/empty/cart.png')}
          description="去添加一些吧"
        >
          <Button style={styles.stroll}>去逛逛</Button>
        </Empty>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 12,
    borderRadius: 6,
    backgroundColor: '#fff'
  },
  empty: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  stroll: {
    width: 105,
  },
})

export default CartNotFound;
   