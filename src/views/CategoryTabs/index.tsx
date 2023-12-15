import { StyleSheet } from 'react-native';
import Tabs from '@/components/Tabs';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { CategoryTabsScreenProps } from '@/typings/screen';
import ProductList from './List';
import { useEffect, useState } from 'react';


const CategoryTabs = ({ route, navigation }: CategoryTabsScreenProps) => {
  const [title, setTitle] = useState('');
  const [state] = useRequest<API.LigthCatalog[]>(`${PRODUCT.sametype}/${route.params.id}`);
  const [activeKey, setActiveKey] = useState(state.data?.[0].id);

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [title]);

  return (
    <Tabs bodyStyle={styles.container} onChange={setActiveKey}>
      {state.data?.map(({ id, name }) => {
        return (
          <Tabs.Item title={name} value={id} key={id}>
            <ProductList
              id={id}
              isActive={activeKey === id}
              onPress={(id) => navigation.navigate('Product', { id })}
              setTitle={setTitle}
            />
          </Tabs.Item>
        )
      })}
    </Tabs>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f5f6fa'
  },
  
})

export default CategoryTabs;
