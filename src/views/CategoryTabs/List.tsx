import { Spin, FlatProductList } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';

interface ProductListProps {
  id: string;
  setTitle?: (title: string) => void;
}

const ProductList = ({ id, setTitle }: ProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.CatalogProductList>(`${PRODUCT.catalog}/${id}`, {
      self: 0,
      store: 1,
      ...params,
    });
    setTitle?.(result.heardTitle);
    return {
      data: result.productList,
      count: result.count,
    }
  });

  if (!state.data?.length) {
    return (
      <Spin spinning={state.loading} />
    )
  }

  return (
    <FlatProductList
      data={state.data}
      onEndReached={actions.loadMore}
    />
  )
}

export default ProductList;
