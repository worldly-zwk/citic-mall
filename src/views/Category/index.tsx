import { StyleSheet, SafeAreaView, ScrollView, View, Image, TouchableWithoutFeedback } from 'react-native';
import Typography from '@/components/Typography';
import SearchBar from '@/components/SearchBar';
import SideBar from '@/components/SideBar';
import { useRequest } from '@/hooks';
import { PRODUCT } from '@/services';
import { CACHE_KEY_CATEGORY } from '@/constants';
import { isLastItem } from '@/utils/array';
import { CategoryScreenProps } from '@/typings/screen';

const SideBarItem = SideBar.Item;

const Category = ({ navigation }: CategoryScreenProps) => {
  const [state] = useRequest<API.Catalog[]>(PRODUCT.category, {
    cacheKey: CACHE_KEY_CATEGORY
  });

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar />
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
                        <TouchableWithoutFeedback key={id} onPress={() => navigation.navigate('CategoryTabs', { id })}>
                          <View style={styles.item}>
                            <Image style={styles.image} source={{ uri: image }} />
                            <Typography.Text size="small">{name}</Typography.Text>
                          </View>
                        </TouchableWithoutFeedback>
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
    flex: 1
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
