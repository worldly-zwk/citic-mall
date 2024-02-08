import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Empty, Spin, SwipeToDeleteView, Typography, VisitedProductItem } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import request from '@/utils/request';
import { MEMBER } from '@/services';

const ProductList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.CollectionProduct[]>(MEMBER.collectionProduct, params);
    return {
      data: result || [],
      count: result?.total || 0,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.CollectionProduct>) => {
    return (
      <SwipeToDeleteView extra={(
        <LinearGradient style={styles.delete} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
          <Typography.Text color="white">取消收藏</Typography.Text>
        </LinearGradient>
      )}>
        <VisitedProductItem data={info.item} />
      </SwipeToDeleteView>
    )
  }, []);

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
    <FlatList
      data={state.data}
      renderItem={renderItem}
      ItemSeparatorComponent={() => <View style={styles.bordered} />}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.1}
      onEndReached={actions.loadMore}
      contentContainerStyle={[styles.container, { marginBottom: insets.bottom }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  bordered: {
    marginHorizontal: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  delete: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  }
})

export default ProductList;
