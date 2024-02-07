import { useCallback } from 'react';
import { FlatList, FlatListProps, Image, ListRenderItemInfo, StyleSheet } from 'react-native';
import { Link, Space, Typography } from '@/components';
import { OSS_DOMAIN } from '@/constants';
import { isTrue } from '@/utils';

interface GridProductListProps extends Omit<FlatListProps<API.Product>, 'renderItem'> {
  
}


const GridProductList = (props: GridProductListProps) => {
  const renderItem = useCallback((info: ListRenderItemInfo<API.Product>) => {
    const { id, name1, masterImg, mallPcPrice, marketPrice } = info.item;
    const isLineEnd = (info.index + 1) % 2 === 0;
    return (
      <Link style={[styles.item, isTrue(isLineEnd, styles.lineEnd)]} to={{ screen: 'Product', params: { id } }} push>
        <Image style={styles.image} source={{ uri: `${OSS_DOMAIN}${masterImg}` }} />
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
  }, []);

  return (
    <FlatList
      {...props}
      numColumns={2}
      renderItem={renderItem}
    />
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
  lineEnd: {
    borderRightWidth: 0
  }
});

export default GridProductList;
