import { useCallback, useEffect, useMemo } from 'react';
import { useRequest } from '@/hooks';
import { MEMBER, PRODUCT } from '@/services';
import { request, toast } from '@/utils';

function useProduct(id: number) {
  const [state, { run }] = useRequest<API.ProductInfo>(`${PRODUCT.details}/${id}`);
  const [descState] = useRequest<string>(`${PRODUCT.description}/${id}`);
  const [activityState, { run: activityRun }] = useRequest<API.ProductPromotion[]>(`${PRODUCT.activity}/${id}`, {
    manual: true,
  });
  const [ticketState, { run: ticketRun }] = useRequest<API.PromotionTicket[]>(`${PRODUCT.ticket}/${id}`, {
    manual: true,
  });

  const [collectionState, { mutate: setCollection }] = useRequest<boolean>(MEMBER.isCollectionProduct, {
    defaultParams: { productId: id }
  });

  const [commentState] = useRequest<API.ProductCommentResponse>(PRODUCT.comment, {
    defaultParams: {
      pageSize: 2,
      pageIndex: 1,
      productId: id,
    }
  });

  const curGoodsInfo = useMemo(() => {
    return state.data?.productGoodsList?.find(({ isDefault }) => isDefault === 1);
  }, [state.data?.productGoodsList]);

  const collection = useCallback(async (collection: boolean) => {
    if (collection) {
      await request.post(MEMBER.collectionProduct, { productId: id });
    } else {
      await request.delete(MEMBER.collectionProduct, { productId: id });
    }
    setCollection(collection);
    toast(collection ? '收藏成功' : '取消收藏');
  }, [id]);

  useEffect(() => {
    const productGoodsId = curGoodsInfo?.id;
    if (productGoodsId) {
      ticketRun({ productGoodsId });
      activityRun({ productGoodsId });
    }
  }, [curGoodsInfo?.id]);

  return [
    {
      loading: state.loading,
      info: state.data,
      richText: descState.data,
      activity: activityState.data,
      ticket: ticketState.data,
      collection: collectionState.data,
      comment: commentState.data,
      curGoodsInfo,
    },
    {
      reload: run,
      collection,
    }
  ] as const;
}

export default useProduct;
