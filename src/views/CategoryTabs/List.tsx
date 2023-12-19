import { useEffect, useRef } from 'react';
import { StyleSheet } from 'react-native';
import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import request from '@/utils/request';
import FlatProductList from '@/components/FlatProductList';

interface ProductListProps {
  id: string;
  isActive: boolean;
  setTitle?: (title: string) => void;
}


const ProductList = ({ id, isActive, setTitle }: ProductListProps) => {
  const isActivatedRef = useRef(false);
  const [state, actions] = useInfiniteScroll(async (index: number) => {
    const result = await request.get<API.CatalogProductList>(`${PRODUCT.catalog}/${id}`, {
      params: {
        self: 0,
        store: 1,
        pageIndex: index
      }
    });
    setTitle?.(result.heardTitle);
    return {
      data: result.productList,
      count: result.count,
    }
  }, {
    manual: true
  });

  useEffect(() => {
    if (isActive && !isActivatedRef.current) {
      actions.run();
      isActivatedRef.current = true;
    }
  }, [isActive]);

  return (
    <FlatProductList
      data={state.data}
      onEndReached={actions.loadMore}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 0,
  },
  list: {
    borderRadius: 6,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  item: {
    paddingVertical: 12,
    flexDirection: 'row',
    columnGap: 8,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: 110,
    height: 110,
  },
  content: {
    flex: 1,
  },
  name: {
    fontWeight: '700',
    lineHeight: 21,
    height: 42,
    marginBottom: 26,
  },
  price: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

export default ProductList;
