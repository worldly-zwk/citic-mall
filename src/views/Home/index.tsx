import { useMemo } from "react";
import { StyleSheet, Text, View, SafeAreaView, ScrollView } from "react-native";
import { Link } from '@react-navigation/native';
import SearchBar from "@/components/SearchBar";
import { convertProduct } from "@/utils/convert";
import { CACHE_KEY_HOME } from "@/constants";
import { useRequest } from "@/hooks";
import { HOME, PRODUCT } from "@/services";
import Carousel from "./components/Carousel";
import Nav from './components/Nav';
import Recommend from "./components/Recommend";
import Floor from "./components/Floor";
import { HomeScreenProps } from "@/typings/screen";

const Home = ({ navigation }: HomeScreenProps) => {
  const [state] = useRequest<API.Home>(HOME.index, {
    cacheKey: CACHE_KEY_HOME
  });
  const data = useMemo(() => state.data, [state.data]);

  const [recommendState] = useRequest<API.MemberRecommend>(`${PRODUCT.recommends}?position=1`);
  const recommends = useMemo(() => {
    if (Array.isArray(recommendState.data?.productList)) {
      return recommendState.data?.productList.map(convertProduct);
    }

    return [];
  }, [recommendState.data]);

  return (
    <SafeAreaView style={styles.container}>
      <Link to={{ screen: 'Product', params: { id: '51784' } }}>51784</Link>
      <SearchBar onPress={() => navigation.navigate('Search')} />
      <ScrollView style={styles.main}>
        <Carousel banners={data?.banners} />
        <View style={styles.section}>
          <Nav items={data?.channels} />
          <Recommend title={recommendState.data?.heardTitle} items={recommends} />
          <Floor items={data?.floors} collection={{ title: data?.floorBlockName, subtitle: data?.floorBlockViceName }} />
        </View>
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>Copyright@2016-2017中信易家版权所有</Text>
          <Text style={styles.copyrightText}>食品经营许可证编号 JY11105050876919</Text>
          <Text style={styles.copyrightText}>京ICP备17008530号-3</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  main: {
    backgroundColor: '#f5f6fa'
  },
  section: {
    paddingLeft: 10,
    paddingRight: 10,
    marginTop: -45,
    gap: 10,
  },
  copyright: {
    paddingTop: 30,
    paddingBottom: 30,
  },
  copyrightText: {
    width: '100%',
    color: '#666',
    fontSize: 10,
    textAlign: 'center',
    lineHeight: 18
  }
})

export default Home;
