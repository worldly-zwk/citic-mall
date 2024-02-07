
import { StyleSheet, View } from 'react-native';
import { request } from '@/utils';
import { SELLER } from '@/services';
import { useInfiniteScroll } from '@/hooks';
import GridProductList from './GridProductList';
import { SortBar, SortOption } from '@/components';
import { Key, useState } from 'react';

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
  const [sort, setSort] = useState<Key>(0);
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.SellerProductPageResponse>(`${SELLER.moreProduct}/${id}`, {
      pageIndex: index,
      sort: 0,
    });
    return {
      data: result.products || [],
      count: result.pager.rowsCount || 0,
    }
  });

  console.log(sort);

  return (
    <View style={styles.container}>
      <SortBar options={sorters} onChange={setSort} />
      <GridProductList
        data={state.data || []}
        onEndReached={actions.loadMore}
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
