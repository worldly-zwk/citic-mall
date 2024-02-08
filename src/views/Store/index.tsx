import { useEffect } from 'react';
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

const Store = ({ route }: StoreScreenProps) => {
  const { id } = route.params;
  const state = useSeller(state => state.sellerInfo);
  const storeInit = useSeller(state => state.init);
  const { mSellerIndex, sellerInfo } = state || {};

  useEffect(() => {
    storeInit(id, true);
  }, []);

  return (
    <View style={styles.container}>
      <StoreHeader
        id={id}
        logo={mSellerIndex?.logo || sellerInfo?.sellerLogo}
        name={mSellerIndex?.sellerName || sellerInfo?.sellerName}
        collectionCount={state?.collectionSellerCount}
      />
      <Tabs>
        <Tabs.Item title="店铺首页" value="home">
          <StoreHome
            notice={state?.notice}
            messages={state?.sellerMsgNoticeList}
            bannerList={state?.bannerList}
            recommendList={state?.recommendList}
          />
        </Tabs.Item>
        <Tabs.Item title="全部商品" value="all">
          <AllProductList id={id} />
        </Tabs.Item>
        {state?.mSellerIndexFloorlist?.map(({ id: floorId, name }) => {
          return (
            <Tabs.Item title={name} value={floorId} key={floorId}>
              <FloorProductList id={id} floorId={floorId} />
            </Tabs.Item>
          )
        })}
      </Tabs>
      {/* <View style={styles.background}>
        <Image style={styles.image} source={{ uri: mSellerIndex?.backImage || sellerInfo?.sellerLogo }} />
        <BlurView style={StyleSheet.absoluteFillObject} blurType="dark" blurAmount={2.5} />
      </View> */}
      <Toolbar />
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
