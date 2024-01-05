import { FlatList, ListRenderItemInfo, StyleProp, ViewStyle } from 'react-native';
import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';
import { useCallback } from 'react';
import { Ticket } from '@/components';

interface ProductListProps {
  // id: string;
  service: string;
  contentContainerStyle?: StyleProp<ViewStyle>
}

const WalletList = ({ service, contentContainerStyle }: ProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<any[]>(service, {
      pageIndex: index
    });
    return {
      data: result,
      count: result.length,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<any>) => {
    return (
      <Ticket ticket={info.item} disabled={info.item.state !== 1} />
    )
  }, []);

  return (
    <FlatList
      data={state.data}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReached={actions.loadMore}
      contentContainerStyle={contentContainerStyle}
    />
  )
}

export default WalletList;
