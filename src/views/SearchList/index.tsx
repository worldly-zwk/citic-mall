import { useMemo, useState } from 'react';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import SearchBar from '@/components/SearchBar';
import { SearchListScreenProps, SearchTypeEnum } from '@/typings/screen';
import Tabs from '@/components/Tabs';
import List from './List';
import StoreList from './StoreList';


const SearchList = ({ route, navigation }: SearchListScreenProps) => {
  const { keyword, type } = route.params;
  const [activeKey, setActiveKey] = useState(0);

  const items = useMemo(() => {
    if (type === SearchTypeEnum.PRODUCT) {
      return [
        {
          label: '推荐',
          value: '0',
        },
        {
          label: '价格',
          value: 4,
        },
        {
          label: '销量',
          value: 1,
        },
      ]
    }

    return [
      {
        label: '综合排序',
        value: '0',
      },
      {
        label: '销量优先',
        value: 1,
      },
    ]
  }, [type]);

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <SearchBar back value={keyword} extra={null} />
        <Tabs scrollable={false} onChange={setActiveKey}>
          {items.map(({ label, value }) => (
            <Tabs.Item title={label} value={value} key={value} />
          ))}
        </Tabs>
      </SafeAreaView>
      <View style={styles.main}>
        {type === SearchTypeEnum.PRODUCT && (
          <List sort={activeKey} keyword={keyword} />
        )}
        {type === SearchTypeEnum.SELLER && (
          <StoreList sort={activeKey} keyword={keyword} />
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
});

export default SearchList;
