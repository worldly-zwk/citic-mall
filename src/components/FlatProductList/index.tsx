import { useCallback } from 'react';
import { StyleSheet, View, Image, FlatList, ListRenderItemInfo, FlatListProps } from 'react-native';
import Typography from '../Typography';
import Tag from '../Tag';
import Space from '../Space';
import Link from '../Link';

const FlatProductList = (props: Omit<FlatListProps<API.Product>, 'renderItem'>) => {
  const { style, contentContainerStyle, ...restProps } = props;

  const renderItem = useCallback(({ item }: ListRenderItemInfo<API.Product>) => {
    return (
      <Link style={styles.item} to={{ screen: 'Product', params: { id: item.id } }}>
        <Image style={styles.image} source={{ uri: item.masterImg }} />
        <View style={styles.content}>
          <Typography.Text style={styles.name} numberOfLines={2}>{item.name1}</Typography.Text>
          {!!item.promotionLabelList?.length && (
            <Space size={6} style={styles.tags}>
              {item.promotionLabelList.map(label => (
                <Tag key={label}>{label}</Tag>
              ))}
            </Space>
          )}
          <Typography style={styles.price}>
            <Typography.Price>{item.mallPcPrice}</Typography.Price>
            {!!item.marketPrice && (
              <Typography.Text delete color="disabled" size="small">¥{item.marketPrice}</Typography.Text>
            )}
          </Typography>
        </View>
      </Link>
    )
  }, []);

  return (
    <FlatList
      {...restProps}
      style={[styles.container, style]}
      contentContainerStyle={[styles.list, contentContainerStyle]}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
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
  tags: {
    marginBottom: 6,
  },
  price: {
    columnGap: 4,
    flexDirection: 'row',
    alignItems: 'flex-end',
  }
})

export default FlatProductList;
