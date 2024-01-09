import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { Link, Typography, Space, Button } from '@/components';

interface VisitedProductItemProps extends ViewProps {
  data: Omit<API.CollectionProduct, 'id'>;
}

const VisitedProductItem = ({ style, data }: VisitedProductItemProps) => {
  return (
    <Link style={[styles.container, style]} to={{ screen: 'Product', params: { id: data.productId } }}>
      <Image style={styles.image} source={{ uri: data.masterImg }} />
      <View style={styles.content}>
        <Typography.Text numberOfLines={2} strong>{data.name1}</Typography.Text>
        <Space align="center" justify="space-between">
          <Typography.Price>{data.mallPcPrice}</Typography.Price>
          <Button size="small" round to={{ screen: 'Product', params: { id: data.productId } }}>立即购买</Button>
        </Space>
      </View>
     </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    columnGap: 8,
    flexDirection: 'row',
  },
  image: {
    width: 110,
    height: 110,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between'
  },
});

export default VisitedProductItem;
