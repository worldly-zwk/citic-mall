import { Image, StyleSheet, View, ViewProps } from 'react-native';
import { ProductItem } from '@/typings';
import { Link, Typography } from '@/components';

interface GridProductListProps extends ViewProps {
  items?: ProductItem[];
}


const GridProductList = ({ items, style, ...restProps }: GridProductListProps) => {
  return (
    <View {...restProps} style={[styles.container, style]}>
      {items?.map(({ id, name, price, image }) => (
        <Link style={styles.item} key={id} to={{ screen: 'Product', params: { id } }}>
          <Image style={styles.image} source={{ uri: image }} />
          <Typography style={styles.content}>
            <Typography.Text style={styles.name} numberOfLines={2} lineBreakMode="tail">{name}</Typography.Text>
            <Typography.Text size="large" primary>¥{price}</Typography.Text>
          </Typography>
        </Link>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  item: {
    width: '50%',
    padding: 10,
  },
  image: {
    width: '100%',
    aspectRatio: 1,
    resizeMode: 'contain',
    marginBottom: 6,
  },
  content: {
    paddingLeft: 4,
    paddingRight: 4,
    paddingBottom: 14,
  },
  name: {
    height: 48,
    lineHeight: 24,
    marginBottom: 4,
  }
});

export default GridProductList;
