import { useCallback, useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Image, TouchableWithoutFeedback, FlatList, ListRenderItemInfo } from 'react-native';
import { useInfiniteScroll } from '@/hooks';
import { PRODUCT } from '@/services';
import Typography from '@/components/Typography';
import request from '@/utils/request';

interface ProductListProps {
  id: string;
  isActive: boolean;
  onPress?: (id: string) => void;
  setTitle?: (title: string) => void;
}


const ProductList = ({ id, isActive, onPress, setTitle }: ProductListProps) => {
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

  const renderItem = useCallback(({ item }: ListRenderItemInfo<API.Product>) => {
    return (
      <TouchableWithoutFeedback key={item.id} onPress={() => onPress?.(item.id)}>
        <View style={styles.item}>
          <Image style={styles.image} source={{ uri: item.masterImg }} />
          <View style={styles.content}>
            <Typography.Text style={styles.name} numberOfLines={2}>{item.name1}</Typography.Text>
            <Typography style={styles.price}>
              <Typography.Price>{item.mallPcPrice}</Typography.Price>
              <Typography.Text delete type="disabled" size="small">¥{item.marketPrice}</Typography.Text>
            </Typography>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }, []);

  useEffect(() => {
    if (isActive && !isActivatedRef.current) {
      actions.run();
      isActivatedRef.current = true;
    }
  }, [isActive]);

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.list}
      data={state.data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
      onEndReached={actions.loadMore}
      onEndReachedThreshold={0.1}
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
