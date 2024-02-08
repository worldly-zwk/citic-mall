import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatStoreList } from '@/components';
import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';

interface StoreListProps {
  sort?: number;
  keyword: string;
}

const StoreList = (props: StoreListProps) => {
  const { sort, keyword } = props;
  const insets = useSafeAreaInsets();
  const [state, actions] = useInfiniteScroll(async (params) => {
    const result = await request.get<API.Store[]>(PRODUCT.sellerlist, {
      sort,
      keyword,
      ...params
    });
    return {
      data: result || [],
      count: result?.length || 0
    }
  }, {
    refreshDeps: [sort]
  });

  return (
    <FlatStoreList
      data={state.data}
      onEndReached={actions.loadMore}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    />
  )
}

export default StoreList;
