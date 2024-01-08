import { useCallback } from 'react';
import { FlatList, FlatListProps, Image, ListRenderItemInfo, StyleSheet, View } from 'react-native';
import { Typography, Space, Link } from '@/components';

interface StoreListProps extends Omit<FlatListProps<API.Store>, 'renderItem'> {
}

const FlatStoreList = (props: StoreListProps) => {
  const renderItem = useCallback(({ item }: ListRenderItemInfo<API.Store>) => {
    return (
      <Link style={styles.item} key={item.id}>
        <Space size={12}>
          <Image style={styles.logo} source={{ uri: item.sellerLogo }} />
          <View style={styles.content}>
            <Image style={styles.tag} source={require('@/assets/images/tag/store.png')} />
            <Typography.Text>{item.sellerName}</Typography.Text>
            <Typography.Text size="small" color="disabled">共{item.productNumber}件商品</Typography.Text>
          </View>
        </Space>
        {!!item?.productList?.length && (
          <Space size={10} style={{ marginTop: 12 }}>
            {item.productList?.map(info => (
              <Link style={styles.wares} to={{ screen: 'Product', params: { id: info.id } }}>
                <Image style={styles.waresImage} source={{ uri: info.masterImg }} />
                <View style={styles.waresPrice}>
                  <Typography.Text primary>¥{info.mallPcPrice}</Typography.Text>
                </View>
              </Link>
            ))}
          </Space>
        )}
      </Link>
    )
  }, []);

  return (
    <FlatList
      style={styles.container}
      renderItem={renderItem}
      keyExtractor={(item) => `${item.id}`}
      onEndReachedThreshold={0.1}
      {...props}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    paddingBottom: 0,
  },
  item: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  logo: {
    width: 61,
    height: 61,
    resizeMode: 'contain'
  },
  content: {
    flex: 1,
    paddingTop: 9,
    rowGap: 6
  },
  tag: {
    position: 'absolute',
    width: 68,
    height: 16,
    top: 10,
    right: 0,
  },
  wares: {
    width: '31.4%',
    aspectRatio: 1,
  },
  waresImage: {
    width: '100%',
    height: '100%',
  },
  waresPrice: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
  }
});

export default FlatStoreList;
