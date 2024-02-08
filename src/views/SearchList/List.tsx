import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';
import FlatProductList from '@/components/FlatProductList';

interface ListProps {
  sort?: number;
  keyword: string;
}

const List = (props: ListProps) => {
  const { sort, keyword } = props;
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.CatalogProductList>(PRODUCT.list, {
      sort,
      keyword,
      ...params,
    });
    return {
      data: result.productList || [],
      count: result.count || 0
    }
  }, {
    refreshDeps: [sort]
  });

  return (
    <FlatProductList
      data={state.data}
      onEndReached={actions.loadMore}
    />
  )
}

export default List;
