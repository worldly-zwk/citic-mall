import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Empty, FlatStoreList, Spin } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { MEMBER } from '@/services';
import request from '@/utils/request';

const StoreList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.Store[]>(MEMBER.collectionSeller, {
      pageIndex: index
    });
    return {
      data: result || [],
      count: result?.total || 0
    }
  });


  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          style={styles.empty}
          image={require('@/assets/images/empty/collection.png')}
          title="暂无收藏记录哦"
        />
      </Spin>
    )
  }


  return (
    <FlatStoreList
      data={state.data}
      onEndReached={actions.loadMore}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    />
  )
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
    marginBottom: 0,
    paddingVertical: 30,
    backgroundColor: '#fff',
  }
})

export default StoreList;
