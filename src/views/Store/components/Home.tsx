
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Typography } from '@/components';
import { convertProduct } from '@/utils';
import GridProductList from './GridProductList';

interface StoreHomeProps {
  bannerList?: API.Banner[];
  recommendList?: API.SellerRecommend[];
}

const StoreHome = (props: StoreHomeProps) => {
  const { recommendList } = props;
  const items = useMemo(() => {
    if (recommendList?.length) {
      return recommendList?.filter((item): item is Required<API.SellerRecommend> => !!item.product).map(item => convertProduct(item.product));
    }
    return [];
  }, [recommendList]);

  const bannerList = [
    {
        "title": "易家-1.27年货节生鲜专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240122142505&page=activity&channel=ZXYJ",
        "image": "https://oss.citic-mall.com/d3ba9af0-b8c8-442d-83ea-f36c3540c47a"
    },
    {
        "title": "易家-1.24酒水专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240117101531&page=activity&channel=ZXYJ",
        "image": "https://oss.citic-mall.com/35fe0b06-58b7-44fa-8712-8e543715c5b2"
    },
    {
        "title": "易家-1.17茶叶专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240112111156&page=activity&channel=ZXYJ",
        "image": "https://oss.citic-mall.com/e2de31b2-57d3-4e9d-87bb-c1df38ca9f1e"
    },
    {
        "title": "易家-1.20茶具与酒具专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240115144707&page=activity&channel=ZXYJ ",
        "image": "https://oss.citic-mall.com/e4ca8a51-7045-4656-9365-ccb9b904c96a"
    },
    {
        "title": "易家-1.10厨具专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240105091140&page=activity&channel=ZXYJ ",
        "image": "https://oss.citic-mall.com/299762f5-287e-4d4a-8014-15d2b42963e3"
    },
    {
        "title": "易家-1.13家纺专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240111094148&page=activity&channel=ZXYJ",
        "image": "https://oss.citic-mall.com/cc7418ea-46c9-4dfa-8c7a-3aa6d5b999e8"
    },
    {
        "title": "易家-1.5粮油副食专场",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20240103165532&page=activity&channel=ZXYJ",
        "image": "https://oss.citic-mall.com/9842e89f-2373-4a27-8a71-8dea8956f2e6"
    },
    {
        "title": "办公精品",
        "linkType": 1,
        "linkUrl": "https://m.citic-mall.com/cms/page_h5.html?hideNavBar=1&id=CMSPG20220902092618&page=activity&channel=ZXYJ ",
        "image": "https://oss.citic-mall.com/298f79fd-235d-4611-bf26-307e334e4f93"
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.home}>
        <View style={styles.notice}>
          <Typography.Text>123123123</Typography.Text>
        </View>
        {bannerList?.length && (
          <Swiper
            autoplay
            style={styles.carousel}
            dotStyle={styles.bullet}
            activeDotStyle={[styles.bullet, { opacity: 1 }]}
            paginationStyle={{ bottom: 10 }}
          >
            {bannerList?.map((item, index) => (
              <Image style={styles.slide} source={{ uri: item.image }} key={`${item.image}_${index}`} />
            ))}
          </Swiper>
        )}
      </View>
      <GridProductList items={items} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'red'
  },
  home: {
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  notice: {
    height: 37,
    backgroundColor: 'red'
  },
  carousel: {
    height: 200,
  },
  slide: {
    width: '100%',
    height: 200,
  },
  bullet: {
    width: 20,
    height: 3,
    backgroundColor: '#fff',
    opacity: .2,
  }
})

export default StoreHome;
