import { Image, StyleSheet, ViewProps } from 'react-native';
import { Link, Space, Typography } from '@/components';

interface GridProductItemProps extends ViewProps {
  data: API.Product;
  domain?: string;
}


const GridProductItem = (props: GridProductItemProps) => {
  const { data, style, domain, ...restProps } = props;
  const { id, name1, masterImg, mallPcPrice, marketPrice } = data;

  return (
    <Link
      push
      {...restProps}
      style={[styles.container, style]}
      to={{ screen: 'Product', params: { id } }}
    >
      <Image style={styles.image} source={{ uri: domain ? `${domain}${masterImg}` : masterImg }} />
      <Typography>
        <Typography.Text style={styles.name} numberOfLines={2} lineBreakMode="tail" strong="500">{name1}</Typography.Text>
        <Space size={6} align="baseline">
          <Typography.Text size="large" primary strong>¥{mallPcPrice}</Typography.Text>
          {marketPrice && (
            <Typography.Text size="small" color="#bbb" delete>¥{marketPrice}</Typography.Text>
          )}
        </Space>
      </Typography>
    </Link>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 10,
    borderColor: '#eee',
    borderRightWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  name: {
    height: 42,
    marginBottom: 4,
  },
});

export default GridProductItem;
