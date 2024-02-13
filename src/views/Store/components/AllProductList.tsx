
import { Key, useCallback, useRef, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { request } from '@/utils';
import { SELLER } from '@/services';
import { Empty, SortBar, SortOption } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import GridProductList from './GridProductList';

const sorters: SortOption[] = [
  {
    label: '推荐',
    value: 0
  },
  {
    label: '价格',
    value: [1, 2]
  },
  {
    label: '销量',
    value: 3
  },
  {
    label: '新品',
    value: 5
  },
];

interface AllProductListProps {
  id: number;
}

const AllProductList = ({ id }: AllProductListProps) => {
  const listRef = useRef<FlatList>(null);
  const [sort, setSort] = useState<Key>(0);
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.SellerProductPageResponse>(`${SELLER.moreProduct}/${id}`, params);
    return {
      data: result.products || [],
      count: result.pager.rowsCount || 0,
    }
  }, {
    defaultParams: { sort }
  });

  const handleSortChange = useCallback((value: Key) => {
    setSort(value);
    actions.run({ sort: value });
    listRef.current?.scrollToIndex({ index: 0, animated: false });
  }, [actions]);

  return (
    <View style={styles.container}>
      <SortBar options={sorters} onChange={handleSortChange} />
      <GridProductList
        ref={listRef}
        data={state.data || []}
        onEndReached={actions.loadMore}
        ListEmptyComponent={<Empty fullscreen title="空空如也" />}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
  },
})

export default AllProductList;
