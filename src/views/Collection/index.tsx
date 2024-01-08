import { StyleSheet, View } from 'react-native';
import { Tabs } from '@/components';
import { CollectionScreenProps } from '@/typings/screen';
import { CollectionTab } from '@/typings';
import ProductList from './ProductList';
import StoreList from './StoreList';


const Collection = ({ route }: CollectionScreenProps) => {
  const { tab } = route.params;

  return (
    <View style={styles.container}>
      <Tabs style={styles.container} defaultActiveKey={tab} scrollable={false}>
        <Tabs.Item title="商品" value={CollectionTab.PRODUCT} key={CollectionTab.PRODUCT}>
          <ProductList />
        </Tabs.Item>
        <Tabs.Item title="店铺" value={CollectionTab.SELLER} key={CollectionTab.SELLER}>
          <StoreList />
        </Tabs.Item>
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  main: {
    padding: 5,
    backgroundColor: '#f5f6fa',
  },
  footer: {
    backgroundColor: '#fff'
  }
})

export default Collection;
