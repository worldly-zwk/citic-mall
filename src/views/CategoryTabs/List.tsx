import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';
import FlatProductList from '@/components/FlatProductList';

interface ProductListProps {
  id: string;
  setTitle?: (title: string) => void;
}

const ProductList = ({ id, setTitle }: ProductListProps) => {
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.CatalogProductList>(`${PRODUCT.catalog}/${id}`, {
      self: 0,
      store: 1,
      pageIndex: index
    });
    setTitle?.(result.heardTitle);
    return {
      data: result.productList,
      count: result.count,
    }
  });

  return (
    <FlatProductList
      data={state.data}
      onEndReached={actions.loadMore}
    />
  )
}

export default ProductList;
