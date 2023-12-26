import { Image, StyleSheet, View } from 'react-native';
import Typography from '@/components/Typography';
import Space from '@/components/Space';
import InputNumber from '@/components/InputNumber';
import { isTrue } from '@/utils/type';
import Checkbox from '@/components/Checkbox';
import { useCart } from '@/store';
import { ReactNode, useCallback } from 'react';
import Link from '@/components/Link';

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
        <Checkbox checked={checked} onChange={handleChange} />
        <Space size={2} align="center">
          <Typography.Text strong>{title}</Typography.Text>
          <Image style={styles.arrow} source={require('@/assets/images/icons/arrow.png')} />
        </Space>
        {extra}
      </View>
      <View>
        {items?.map((item, index) => (
          <Space key={item.productId} style={styles.item} align="center">
            <Checkbox style={styles.checkbox} checked={item.selected} onChange={checked => actions.checkedProduct(item.cartId, checked)} />
            <Link style={[styles.cartItem, isTrue((index + 1) < items.length, styles.borderd)]} to={{ screen: 'Product', params: { id: item.productId } }}>
              <Image style={styles.image} source={{ uri: item.image }} />
              <View style={{ flex: 1 }}>
                <Typography.Text numberOfLines={2}>{item.productName}</Typography.Text>
                <Typography.Text size="small" color="secondary" style={styles.norm}>{item.specification}</Typography.Text>
                <Typography.Price style={styles.price}>{item.money}</Typography.Price>
                <InputNumber style={styles.numeric} value={item.number} />
              </View>
            </Link>
          </Space>
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
    columnGap: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderBottomColor: '#f5f6fa',
    borderBottomWidth: StyleSheet.hairlineWidth,
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
  borderd: {
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default CartCard;
   