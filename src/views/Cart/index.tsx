import { ScrollView, StyleSheet, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import NotFound from './NotFound';

const Cart = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <ScrollView style={styles.main}>
        {/* <NotFound /> */}
      </ScrollView>
      <View style={styles.toolBar}></View>
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

export default Cart;
   