import { forwardRef, useCallback } from 'react';
import { FlatList, FlatListProps, ListRenderItemInfo, StyleSheet } from 'react-native';
import { OSS_DOMAIN } from '@/constants';
import { isTrue } from '@/utils';
import GridProductItem from './GridProductItem';

interface GridProductListProps extends Omit<FlatListProps<API.Product>, 'renderItem'> { }

const GridProductList = forwardRef<FlatList<API.Product>, GridProductListProps >((props, ref) => {
  const renderItem = useCallback((info: ListRenderItemInfo<API.Product>) => {
    const isLineEnd = (info.index + 1) % 2 === 0;

    return (
      <GridProductItem style={isTrue(isLineEnd, styles.lineLast)} data={info.item} domain={OSS_DOMAIN} />
    )
  }, []);

  return (
    <FlatList
      ref={ref}
      {...props}
      numColumns={2}
      renderItem={renderItem}
    />
  )
})

const styles = StyleSheet.create({
  lineLast: {
    borderRightWidth: 0
  }
});

export default GridProductList;
