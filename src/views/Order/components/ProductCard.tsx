import { useMemo } from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { Icon, Link, Popup, ProductSummaryInline, Space, Typography } from '@/components';
import { useOrder } from '@/store';
import { useBoolean } from '@/hooks';

const { Text } = Typography;

const ProductCard = () => {
  const orderProduct = useOrder(state => state.order?.productVOList);
  const [visible, setVisible] = useBoolean(false);

  const items = useMemo<API.OrderProduct[]>(() =>{
    if (orderProduct?.length) {
      return orderProduct.reduce((total, item) => [...total, ...item.productList], [] as API.OrderProduct[]);
    }
    return [];
  }, [orderProduct]);

  if (items && items?.length > 1) {
    return (
      <>
        <View style={styles.container}>
          <Text style={styles.title}>{orderProduct?.[0].sellerName}</Text>
          <Space size={12}>
            <ScrollView horizontal style={{ flex: 1 }} contentContainerStyle={styles.contentContainer}>
              {items.map(info => (
                <View key={info.productId}>
                  <Image style={styles.image} source={{ uri: info.productMasterImage }} />
                </View>
              ))}
            </ScrollView>
            <Link style={styles.more} onPress={() => setVisible(true)}>
              <Icon icon="arrow" />
            </Link>
          </Space>
        </View>
        <Popup
          header={(
            <Space style={styles.header} align="center">
              <Text size={15} color="black">商品清单</Text>
              <Text size="small" color="secondary">共{items.length}件</Text>
            </Space>
          )}
          bodyStyle={{ padding: 0 }}
          visible={visible}
          onClose={setVisible}
        >
          <ScrollView style={styles.list}>
            {orderProduct?.map(sellerInfo => {
              return (
                <View style={styles.item} key={sellerInfo.sellerId}>
                  <Space size={8} align="center" style={{ height: 44 }}>
                    <Icon icon="shop" />
                    <Text>{sellerInfo.sellerName}</Text>
                  </Space>
                  <View>
                    {sellerInfo.productList.map(info => (
                      <ProductSummaryInline style={styles.product} data={info} key={info.productId} />
                    ))}
                  </View>
                </View>
              )
            })}
          </ScrollView>
        </Popup>
      </>
    );
  }

  if (items?.[0]) {
    return (
      <View style={styles.container}>
        <ProductSummaryInline data={items[0]} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  title: {
    paddingBottom: 12,
  },
  contentContainer: {
    columnGap: 8,
  },
  image: {
    width: 70,
    height: 70,
  },
  norms: {
    marginBottom: 14
  },
  more: {
    justifyContent: 'center',
  },
  header: {
    height: 40,
    paddingLeft: 16,
    paddingRight: 40,
    justifyContent: 'space-between',
    backgroundColor: '#f5f6fa',
  },
  list: {
    maxHeight: 506,
    backgroundColor: '#f5f6fa'
  },
  item: {
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    marginBottom: 12,
    
  },
  sellerName: {
    paddingHorizontal: 12,
  },
  product: {
    paddingVertical: 12,
    borderTopColor: '#eee',
    borderTopWidth: StyleSheet.hairlineWidth,
  }
})

export default ProductCard;
