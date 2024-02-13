import { Key, useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatProductList, SearchBar, SortBar, SortOption } from '@/components';
import { StoreSearchListScreenProps } from '@/typings';
import { useInfiniteScroll } from '@/hooks';
import { request } from '@/utils';
import { SELLER } from '@/services';

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

const StoreSearchList = ({ route }: StoreSearchListScreenProps) => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const { sort, pageIndex } = params;
    const result = await request.get<API.Product[]>(SELLER.searchProduct, {
      q: encodeURI(JSON.stringify({
        sort,
        sellerId: route.params.id,
        q_keyword_like: route.params.keyword,
        q_sellerCateId: route.params.cateId,
        crossBorderProduct: false,
        state: 6,
      })),
      pageIndex,
    });
    return {
      data: result || [],
      count: result.total || 0
    }
  });

  const handleSortChange = useCallback((sort: Key) => {
    actions.run({ sort });
  }, []);

  return (
    <View style={[styles.container]}>
      <View style={[styles.bar, { paddingTop: insets.top }]}>
        <SearchBar
          back
          extra={null}
        />
      </View>
      <View style={styles.main}>
        <SortBar style={styles.bar} options={sorters} onChange={handleSortChange} />
        <FlatProductList
          data={state.data}
          onEndReached={actions.loadMore}
          // contentContainerStyle={{ paddingBottom: insets.bottom }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bar: {
    backgroundColor: '#fff'
  },
  main: {
    flex: 1,
  },
})

export default StoreSearchList;
