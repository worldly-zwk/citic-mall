import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useInfiniteScroll } from '@/hooks';
import { Empty, Spin } from '@/components';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderStatus } from '@/typings';
import OrderCard from './Card';

interface ProductListProps {
  status: OrderStatus;
}


const OrderList = ({ status }: ProductListProps) => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const service = status === 4 ? ORDER.recharges : ORDER.list;
    const result = await request.get<API.BasePageListResponse<API.Order>>(service, {
      orderStatus: status,
      pageIndex: index
    });
    return {
      data: result.list,
      count: result.count,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.Order>) => {
    return (
      <OrderCard data={info.item} />
    )
  }, []);

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          fullscreen
          image={require('@/assets/images/empty/order.png')}
          title="没有相关订单"
        />
      </Spin>
    )
  }

  return (
    <FlatList
      data={state.data}
      onEndReached={actions.loadMore}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  },
})

export default OrderList;
