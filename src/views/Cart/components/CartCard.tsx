import { ReactNode, useCallback } from 'react';
import { Image, StyleSheet, TouchableWithoutFeedback, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Typography, Space, InputNumber, Checkbox, Link, SwipeToDeleteView, Tag } from '@/components';
import { isTrue } from '@/utils/type';
import { useCart } from '@/store';

interface CartCardProps {
  id: number;
  title: string;
  items?: API.ProductCart[];
  checked?: boolean;
  extra?: ReactNode;
}

const CartCard = (props: CartCardProps) => {
  const { id, title, items, checked, extra } = props;

  const actions = useCart(state => ({
    remove: state.remove,
    update: state.update,
    checkedSeller: state.checkedSeller,
    checkedProduct: state.checkedProduct,
  }));

  const handleChange = useCallback((checked: boolean) => {
    actions.checkedSeller(id, checked);
  }, [id, actions]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Space size={10}>
          <Checkbox checked={checked} onChange={handleChange} />
          <Link style={styles.title} to={{ screen: 'Store', params: { id } }}>
            <Typography.Text strong>{title}</Typography.Text>
            <Image style={styles.arrow} source={require('@/assets/images/icons/arrow.png')} />
          </Link>
        </Space>
        {extra}
      </View>
      <View>
        {items?.map((item, index) => (
          <SwipeToDeleteView
            key={item.productId}
            extra={(
              <TouchableWithoutFeedback
                onPress={() => {
                  actions.remove(item.cartId);
                }}
              >
                <LinearGradient style={styles.delete} colors={['#ffaf31', '#ff8400']} end={{ x: 1, y: 0 }}>
                  <Typography.Text color="white">删除</Typography.Text>
                </LinearGradient>
              </TouchableWithoutFeedback>
            )}
          >
            <Space style={styles.item} align="center">
              <Checkbox style={styles.checkbox} checked={item.selected} onChange={checked => actions.checkedProduct(item.cartId, checked)} />
              <Link style={[styles.cartItem, isTrue((index + 1) < items.length, styles.borderd)]} to={{ screen: 'Product', params: { id: item.productId } }}>
                <Image style={styles.image} source={{ uri: item.image }} />
                <View style={{ flex: 1 }}>
                  <Typography.Text numberOfLines={2}>{item.productName}</Typography.Text>
                  <Typography.Text size="small" color="secondary" style={styles.norm}>{item.specification}</Typography.Text>
                  {!!item.tags?.length && (
                    <Space size={6}>
                      {item.tags?.map((text, index) => <Tag key={index}>{text}</Tag>)}
                    </Space>
                  )}
                  <Typography.Price style={styles.price}>{item.money}</Typography.Price>
                  <InputNumber style={styles.numeric} value={item.number} onChange={count => actions.update(item.cartId, count)} />
                </View>
              </Link>
            </Space>
          </SwipeToDeleteView>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#f5f6fa',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  title: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  arrow: {
    width: 16,
    height: 16,
  },
  checkbox: {
    marginRight: 10,
  },
  item: {
    paddingLeft: 12,
  },
  cartItem: {
    flex: 1,
    columnGap: 8,
    flexDirection: 'row',
    paddingTop: 10,
    paddingRight: 12,
    paddingBottom: 14,
  },
  image: {
    width: 90,
    height: 90,
  },
  norm: {
    marginTop: 4,
  },
  price: {
    marginTop: 10
  },
  numeric: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  delete: {
    flex: 1,
    borderRadius: 2,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  borderd: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default CartCard;
   