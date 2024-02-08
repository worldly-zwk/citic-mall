import { useCallback } from 'react';
import { FlatList, ListRenderItemInfo, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Comment, Empty, Spin } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { omit, request } from '@/utils';
import { PRODUCT } from '@/services';

interface ProductCommentListProps {
  id: number;
  grade: string;
  onLoad: (info: Omit<API.ProductCommentResponse, 'productComments' | 'count'>) => void;
}

const CommentList = ({ id, grade, onLoad }: ProductCommentListProps) => {
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const values: API.ProductCommentParams = {
      productId: id,
      pageSize: 20,
      ...params
    };

    if (!['all', 'image'].includes(grade)) {
      values.grades = grade;
    } else if (grade === 'image') {
      values.imageNum = 1;
    }

    const result = await request.get<API.ProductCommentResponse>(PRODUCT.comment, values);
    onLoad?.(omit(result, ['productComments', 'total', 'count']));
    return {
      data: result.productComments,
      count: result.count,
    }
  }, {
    refreshDeps: [grade]
  });

  const renderItem = useCallback((info: ListRenderItemInfo<API.ProductComment>) => {
    const { userName, userHeadPortrait, content, imageList, grade } = info.item;
    return (
      <Comment
        style={styles.item}
        user={{ avatar: userHeadPortrait, name: userName }}
        images={imageList}
        rate={grade}
      >{content}</Comment>
    )
  }, []);

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading}>
        <Empty
          style={styles.empty}
          image={require('@/assets/images/empty/feedback.png')}
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
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.1}
      contentContainerStyle={[styles.container, { paddingBottom: insets.bottom }]}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 10,
    padding: 12,
  },
  item: {
    paddingHorizontal: 12,
    borderRadius: 6,
  },
  empty: {
    flex: 1,
    margin: 12,
    paddingTop: 60,
    backgroundColor: '#fff',
    borderRadius: 6,
  }
})

export default CommentList;
