
import { StyleSheet } from 'react-native';
import { Empty } from '@/components';
import { request } from '@/utils';
import { SELLER } from '@/services';
import { useInfiniteScroll } from '@/hooks';
import GridProductList, { GridProductListProps } from './GridProductList';

interface FloorProductListProps extends Omit<GridProductListProps, 'id' | 'data'> {
  id: number;
  floorId: number;
}

const FloorProductList = ({ id, floorId, ...restProps }: FloorProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.SellerFloorPageResponse>(`${SELLER.floorMoreProduct}/${id}`, {
      floorId,
      ...params
    });
    return {
      data: result.floordatas.map((floorInfo) => floorInfo.product),
      count: result.pager.rowsCount || 0,
    }
  });

  if (!state.data?.length) {
    return (
      <Empty
        fullscreen
        title="空空如也"
        style={{ margin: 0 }}
      />
    )
  }

  return (
    <GridProductList
      {...restProps}
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
