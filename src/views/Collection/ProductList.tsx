import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Empty, Spin, VisitedProductItem } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import request from '@/utils/request';
import { MEMBER } from '@/services';

const ProductList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.CollectionProduct[]>(MEMBER.collectionProduct, {
      pageIndex: index
    });
    return {
      data: result || [],
      count: result?.total || 0,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.CollectionProduct>) => {
    return (
      <VisitedProductItem data={info.item} />
    )
  }, []);

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
    <FlatList
      data={state.data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.bordered} />}
      // ListFooterComponent={<View style={{ height: insets.bottom }} />}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.1}
      onEndReached={actions.loadMore}
      contentContainerStyle={[styles.container]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  empty: {
    flex: 1,
    margin: 10,
    borderRadius: 6,
    paddingTop: 30,
    marginBottom: 0,
    backgroundColor: '#fff',
  },
  bordered: {
    marginHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default ProductList;
