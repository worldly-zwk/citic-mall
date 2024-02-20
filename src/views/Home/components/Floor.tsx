import { FC, useMemo } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import HorizontalProductList from "@/components/HorizontalProductList";
import { filter, isLastItem } from "@/utils/array";
import { Typography } from "@/components";

interface FloorProps {
  items?: API.Floor[];
  collection?: {
    title?: string;
    subtitle?: string;
  }
}

const Floor: FC<FloorProps> = ({ items, collection }) => {
  const floors = useMemo(() => {
    if (Array.isArray(items)) {
      const list = filter(items || [], ['type', 1]);
      return list.map(({ dataList, ...restItems }) => ({
        ...restItems,
        dataList: dataList.map(({ image, productName, product }) => ({
          image,
          id: product.id,
          name: productName,
          price: product.mallPcPrice,
        }))
      }));
    }
    return []
  }, [items]);
  
  const collections = useMemo(() => filter(items || [], ['type', 2]).map(({ advImage }) => advImage), [items]);

  if (items?.length) {
    return (
      <View>
        <View style={styles.collections}>
          <View style={styles.header}>
            <Typography.Text style={styles.title}>{collection?.title}</Typography.Text>
            <Typography.Text style={styles.subtitle}>{collection?.subtitle}</Typography.Text>
          </View>
          <View>
            {collections.map((image, index) => (
              <View style={[styles.collection, isLastItem(index, collections.length) ? styles.lastCollection : undefined]} key={`${index}-${image}`}>
                <Image style={styles.collectionCover} source={{ uri: image, cache: 'force-cache' }} />
              </View>
            ))}
          </View>
        </View>
        <View>
          {floors.map(({ name, advImage, dataList }, index) => (
            <View style={styles.floor} key={`${index}-${name}`}>
              <Image style={styles.floorCover} source={{ uri: advImage }} />
              <HorizontalProductList style={styles.floorProduct} items={dataList} />
            </View>
          ))}
        </View>
      </View>
    )
  }
  
  return null;
}

const styles = StyleSheet.create({
  collections: {
    padding: 12,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  header: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 10,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    color: '#333',
    lineHeight: 28
  },
  subtitle: {
    flex: 1,
    color: '#f5f6fa',
    fontSize: 18,
    lineHeight: 21
  },
  collection: {
    paddingBottom: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: 1,
    borderStyle: 'solid',
    marginBottom: 12,
  },
  collectionCover: {
    width: '100%',
    height: 160,
    resizeMode: 'stretch',
    borderRadius: 6
  },
  lastCollection: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0
  },
  floor: {
    marginTop: 10,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  floorCover: {
    width: '100%',
    height: 90
  },
  floorProduct: {
    padding: 12
  }
})

export default Floor;
