import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Empty, Spin, Ticket, TicketStatusType, Typography } from '@/components';
import { PROMOTION } from '@/services';
import { useInfiniteScroll } from '@/hooks';
import { request } from '@/utils';

const CouponList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.PromotionTicket[]>(PROMOTION.coupons, params);
    return {
      data: result || [],
      count: (result as any)?.total,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.PromotionTicket>) => {
    let status: TicketStatusType | undefined;
    const { couponType, isReceive, memberReceivedNum } = info.item;
    const disabled = isReceive !== 2 && memberReceivedNum <= 0;
    if(isReceive === 1){
      status = 'soldOut';
    }
    if(memberReceivedNum > 0) {
      status = 'have';
    };
    return (
      <Ticket
        ticket={{
          ...info.item,
          type: couponType,
        }}
        status={status}
        disabled={disabled}
        extra={!disabled ? (
          <TouchableWithoutFeedback>
            <LinearGradient style={styles.button} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
              <Typography.Text size="small" color="white" align="center">{memberReceivedNum > 0 ? '去使用' : '立即领取'}</Typography.Text>
            </LinearGradient>
          </TouchableWithoutFeedback>
        ) : null}
      />
    )
  }, []);

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          fullscreen
          title="空空如也～"
        />
      </Spin>
    )
  }

  return (
    <FlatList
      data={state.data}
      renderItem={renderItem}
      onEndReached={actions.loadMore}
      onEndReachedThreshold={0.1}
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom + 4 }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 4,
  },
  button: {
    width: 36,
    padding: 10,
    justifyContent: 'center',
  },
})

export default CouponList;
