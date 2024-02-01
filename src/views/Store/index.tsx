import { StyleSheet, View, Image, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { BlurView } from '@react-native-community/blur';
import { SearchBar } from '@/components';
import { StoreScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { SELLER } from '@/services';
import Tabs from './components/Tabs';
import Toolbar from './components/Toolbar';
import StoreMeta from './components/Meta';
import StoreHome from './components/Home';

const Store = ({ route, navigation }: StoreScreenProps) => {
  const { id } = route.params;
  const insets = useSafeAreaInsets();
  const [state] = useRequest<API.SellerIndex>(`${SELLER.index}/${id}`, {
    defaultParams: {
      deviceFlg: 1,
    }
  });

  console.log(state.data);

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <ScrollView contentContainerStyle={{ paddingTop: insets.top }}>
        <View style={styles.background}>
          <Image style={styles.image} source={{ uri: state.data?.mSellerIndex.backImage }} />
          <BlurView style={StyleSheet.absoluteFillObject} blurType="dark" blurAmount={2.5} />
        </View>
        <SearchBar style={styles.searchBar} back extra={null} />
        <StoreMeta
          logo={state.data?.mSellerIndex.logo}
          name={state.data?.sellerInfo.sellerName}
          collectionCount={state.data?.collectionSellerCount}
        />
        <Tabs>
          <Tabs.Item title="店铺首页" value="0">
            <StoreHome bannerList={state.data?.bannerList} recommendList={state.data?.recommendList} />
          </Tabs.Item>
          <Tabs.Item title="全部商品" value="1">
            
          </Tabs.Item>
          {state.data?.mSellerIndexFloorlist?.map(({ id, name }) => {
            return (
              <Tabs.Item title={name} value={id} key={id}>

              </Tabs.Item>
            )
          })}
        </Tabs>
      </ScrollView>
      <Toolbar />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchBar: {
    backgroundColor: 'transparent'
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    bottom: 'auto',
    height: 260,
    zIndex: -1
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch'
  },
})

export default Store;
