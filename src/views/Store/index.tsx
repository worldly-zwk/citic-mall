import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { StoreScreenProps } from '@/typings';
import { useRequest } from '@/hooks';
import { SELLER } from '@/services';
import Tabs from './components/Tabs';
import Toolbar from './components/Toolbar';
import StoreHome from './components/Home';
import AllProductList from './components/AllProductList';
import StoreHeader from './components/Header';
import FloorProductList from './components/FloorProductList';

const Store = ({ route, navigation }: StoreScreenProps) => {
  const { id } = route.params;
  const [state] = useRequest<API.SellerIndex>(`${SELLER.index}/${id}`, {
    defaultParams: {
      deviceFlg: 1,
    }
  });

  const { mSellerIndex, sellerInfo } = state.data || {};

  return (
    <View style={styles.container}>
      <StoreHeader
        logo={mSellerIndex?.logo || sellerInfo?.sellerLogo}
        name={mSellerIndex?.sellerName || sellerInfo?.sellerName}
        collectionCount={state.data?.collectionSellerCount}
      />
      <Tabs>
        <Tabs.Item title="店铺首页" value="home">
          <StoreHome
            notice={state.data?.notice}
            messages={state.data?.sellerMsgNoticeList}
            bannerList={state.data?.bannerList}
            recommendList={state.data?.recommendList}
          />
        </Tabs.Item>
        <Tabs.Item title="全部商品" value="all">
          <AllProductList id={id} />
        </Tabs.Item>
        {state.data?.mSellerIndexFloorlist?.map(({ id: floorId, name }) => {
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
