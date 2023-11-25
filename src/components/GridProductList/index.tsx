import { Image, StyleSheet, View, ViewProps } from 'react-native';
import Typography from '../Typography';

interface GridProductListProps extends ViewProps {
  items: ProductItem[];
}


const GridProductList = ({ items, style, ...restProps }: GridProductListProps) => {

  return (
    <View {...restProps} style={[styles.container, style]}>
      {items.map(({ id, name, price, image }) => (
        <View style={styles.item} key={id}>
          <Image style={styles.image} source={{ uri: image }} />
          <Typography>
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
    alignSelf: 'center',
    columnGap: 12,
  },
  item: {
    width: '48%',
    padding: 4,
  },
  image: {
    flex: 1,
    aspectRatio: 1,
    resizeMode: 'contain',
  },
  name: {
    marginLeft: 4,
    marginRight: 4,
    lineHeight: 20,
  },
  price: {
    lineHeight: 22,
  }
});

export default GridProductList;
