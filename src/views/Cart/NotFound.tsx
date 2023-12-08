import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Button from "@/components/Button";
import Empty from "@/components/Empty";
import GridProductList from "@/components/GridProductList";
import { useRequest } from "@/hooks";
import { PRODUCT } from "@/services";
import { convertProduct } from "@/utils/convert";

const CartNotFound = () => {
  const [state] = useRequest(`${PRODUCT.recommends}?position=1`);

  const recommends = useMemo(() => {
    if (Array.isArray(state.data?.productList)) {
      return state.data?.productList.map(convertProduct);
    }

    return [];
  }, [state.data]);

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
      <GridProductList style={styles.card} items={recommends} />
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
  toolBar: {
    height: 49,
    backgroundColor: '#fff',
  }
})

export default CartNotFound;
   