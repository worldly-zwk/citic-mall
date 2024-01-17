import { StyleSheet, SafeAreaView, ScrollView, View, Image } from 'react-native';
import { Link, SideBar, SearchBar, Typography  } from '@/components';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { CACHE_KEY_CATEGORY } from '@/constants';
import { isLastItem } from '@/utils/array';
import { CategoryScreenProps } from '@/typings';

const SideBarItem = SideBar.Item;

const Category = ({ navigation }: CategoryScreenProps) => {
  const [state] = useRequest<API.Catalog[]>(PRODUCT.category, {
    cacheKey: CACHE_KEY_CATEGORY
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar onPress={() => navigation.navigate('Search')}  />
      <SideBar>
        {state.data?.map(({ id, name, productCatalogVOList }) => (
          <SideBarItem title={name} key={id}>
            <ScrollView style={styles.section}>
              {productCatalogVOList.map(({ id, name, productCatalogVOList: items }, index) => {
                const lastItem = isLastItem(index, productCatalogVOList.length);
                return (
                  <View key={id}>
                    <Typography.Text size="small" strong style={styles.title}>{name}</Typography.Text>
                    <View style={[styles.content, lastItem ? styles.lastContent : null]}>
                      {items.map(({ id, name, image }) => (
                        <Link style={styles.item} to={{ screen: "CategoryTabs", params: { id } }} key={id}>
                          <Image style={styles.image} source={{ uri: image, cache: 'force-cache' }} />
                          <Typography.Text size="small">{name}</Typography.Text>
                        </Link>
                      ))}
                    </View>
                  </View>
                )
              })}
            </ScrollView>
          </SideBarItem>
        ))}
      </SideBar>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    paddingLeft: 12,
    paddingRight: 12,
    backgroundColor: '#fff',
  },
  title: {
    marginTop: 12,
    marginBottom: 8,
  },
  content: {
    paddingBottom: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: 12,
    borderBottomColor: '#eee',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  lastContent: {
    borderBottomWidth: 0
  },
  item: {
    width: '50%',
    alignItems: 'center'
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 8
  }
})

export default Category;
