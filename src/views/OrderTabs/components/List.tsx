import { useCallback, useEffect, useRef } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useInfiniteScroll } from '@/hooks';
import { ORDER } from '@/services';
import request from '@/utils/request';
import { OrderStatus } from '@/typings';
import OrderCard from './Card';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface ProductListProps {
  status: OrderStatus;
}


const OrderList = ({ status }: ProductListProps) => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.BasePageListResponse<API.Order>>(ORDER.list, {
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

  return (
    <FlatList
      data={state.data}
      onEndReached={actions.loadMore}
      renderItem={renderItem}
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 10,
  }
})

export default OrderList;
