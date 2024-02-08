import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Empty, FlatStoreList, Spin } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { MEMBER } from '@/services';
import request from '@/utils/request';

const StoreList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.CollectionStore[]>(MEMBER.collectionSeller, params);
    return {
      data: result || [],
      count: result?.total || 0
    }
  });

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          fullscreen
          image={require('@/assets/images/empty/collection.png')}
          title="暂无收藏记录哦"
        />
      </Spin>
    )
  }

  return (
    <FlatStoreList
      data={state.data}
      rowKey="sellerId"
      onEndReached={actions.loadMore}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    />
  )
}

export default StoreList;
