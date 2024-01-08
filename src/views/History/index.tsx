import { SectionList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MEMBER } from '@/services';
import { CollectionTab } from '@/typings';
// import ProductList from './ProductList';
// import StoreList from './StoreList';


const History = () => {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <SectionList
        
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // main: {
  //   padding: 5,
  //   backgroundColor: '#f5f6fa',
  // },
  // footer: {
  //   backgroundColor: '#fff'
  // }
})

export default History;
