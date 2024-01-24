import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Empty, Spin, Ticket, Typography } from '@/components';
import { PROMOTION } from '@/services';
import { useInfiniteScroll } from '@/hooks';
import { request } from '@/utils';

const RedEnvelopeList = () => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.Ticket[]>(PROMOTION.coupons, {
      pageIndex: index
    });
    return {
      data: result || [],
      count: (result as any)?.total,
    }
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.Ticket>) => {
    return (
      <Ticket
        ticket={info.item}
        extra={info.item.state === 1 ? (
          <TouchableWithoutFeedback>
            <LinearGradient style={styles.button} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
              <Typography.Text size="small" color="white" align="center">立即领取</Typography.Text>
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

export default RedEnvelopeList;
