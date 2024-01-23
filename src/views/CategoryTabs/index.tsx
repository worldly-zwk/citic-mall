import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import Tabs from '@/components/Tabs';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { CategoryTabsScreenProps } from '@/typings/screen';
import { CACHE_KEY_CATEGORY_TABS } from '@/constants';
import ProductList from './List';


const CategoryTabs = ({ route, navigation }: CategoryTabsScreenProps) => {
  const { id } = route.params;
  const [title, setTitle] = useState('');
  const [activeKey, setActiveKey] = useState(id);
  const [state] = useRequest<API.LigthCatalog[]>(`${PRODUCT.sametype}/${id}`, {
    cacheKey: `${CACHE_KEY_CATEGORY_TABS}_${id}__`
  });

  useEffect(() => {
    navigation.setOptions({
      title,
    });
  }, [title]);

  return (
    <Tabs style={styles.container} activeKey={activeKey} onChange={setActiveKey}>
      {state.data?.map(({ id, name }) => {
        return (
          <Tabs.Item title={name} value={id} key={id}>
            <ProductList
              id={id}
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
    flex: 1,
    backgroundColor: '#f5f6fa'
  },
})

export default CategoryTabs;
