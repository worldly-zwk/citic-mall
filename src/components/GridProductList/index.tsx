import { Image, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';

interface GridProductListProps extends ViewProps {
  items: ProductItem[];
}


const GridProductList = ({ items, style, ...restProps }: GridProductListProps) => {
  return (
    <View {...restProps} style={[styles.container, style]}>
      {items?.map(({ id, name, price, image }) => (
        <View style={styles.item} key={id}>
          <Image style={styles.image} source={{ uri: image }} />
          <Typography style={styles.content}>
            <Typography.Text style={styles.name} numberOfLines={2} lineBreakMode="tail">{name}</Typography.Text>
            <Typography.Text style={styles.price} size="large" primary>¥{price}</Typography.Text>
          </Typography>
        </View>
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
    width: '49%',
    padding: 4,
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
  },
  price: {
    lineHeight: 22,
  }
});

export default GridProductList;
