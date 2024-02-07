
import { StyleSheet } from 'react-native';
import { request } from '@/utils';
import { SELLER } from '@/services';
import { useInfiniteScroll } from '@/hooks';
import GridProductList from './GridProductList';

interface FloorProductListProps {
  id: number;
  floorId: number;
}

const FloorProductList = ({ id, floorId }: FloorProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.SellerFloorPageResponse>(`${SELLER.floorMoreProduct}/${id}`, {
      floorId,
      pageIndex: index,
    });
    return {
      data: result.floordatas.map((floorInfo) => floorInfo.product),
      count: result.pager.rowsCount || 0,
    }
  });

  return (
    <GridProductList
      style={styles.container}
      data={state.data || []}
      onEndReached={actions.loadMore}
    />
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

export default FloorProductList;
