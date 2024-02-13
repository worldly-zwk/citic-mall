import { useCallback, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreScreenProps } from '@/typings';
import { useSeller } from '@/store';
import Tabs from './components/Tabs';
import Toolbar from './components/Toolbar';
import StoreHome from './components/Home';
import AllProductList from './components/AllProductList';
import StoreHeader from './components/Header';
import FloorProductList from './components/FloorProductList';
import CategoryList from './components/CategoryList';

const Store = ({ route }: StoreScreenProps) => {
  const { id, tab } = route.params;
  const state = useSeller(state => state.sellerInfo);
  const insets = useSafeAreaInsets();
  const storeInit = useSeller(state => state.init);
  const storeCollection = useSeller(state => state.collection);
  const { mSellerIndex, sellerInfo } = state || {};
  const isCollected = state?.collected === 'true';

  const handleCollection = useCallback(() => {
    storeCollection(id, !isCollected);
  }, [id, isCollected]);

  useEffect(() => {
    storeInit(id, true);
  }, []);

  return (
    <View style={styles.container}>
      <StoreHeader
        data={{
          id,
          logo: mSellerIndex?.logo || sellerInfo?.sellerLogo,
          name: mSellerIndex?.sellerName || sellerInfo?.sellerName,
          collected: isCollected,
          collectionCount: state?.collectionSellerCount
        }}
        onCollection={handleCollection}
      />
      <Tabs>
        <Tabs.Item title="店铺首页" value="home">
          <StoreHome
            messages={state?.sellerMsgNoticeList}
            bannerList={state?.bannerList}
            recommendList={state?.recommendList}
          />
        </Tabs.Item>
        <Tabs.Item title="全部商品" value="all">
          <AllProductList id={id} />
        </Tabs.Item>
        <Tabs.Item title="全部分类" value="cate">
          <CategoryList id={id} items={state?.cateList} contentContainerStyle={{ paddingBottom: insets.bottom }} />
        </Tabs.Item>
        {state?.mSellerIndexFloorlist?.map(({ id: floorId, name }) => {
          return (
            <Tabs.Item title={name} value={floorId} key={floorId}>
              <FloorProductList id={id} floorId={floorId} contentContainerStyle={{ paddingBottom: insets.bottom }} />
            </Tabs.Item>
          )
        })}
      </Tabs>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
