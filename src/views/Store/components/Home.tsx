
import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Icon, Link, Space, Typography } from '@/components';
import { isTrue } from '@/utils';

interface StoreHomeProps {
  notice?: string;
  messages?: API.SellerNotice[];
  bannerList?: API.Banner[];
  recommendList?: API.SellerRecommend[];
}

const StoreHome = (props: StoreHomeProps) => {
  const { messages, bannerList, recommendList } = props;
  const items = useMemo(() => {
    if (recommendList?.length) {
      return recommendList?.filter((item): item is Required<API.SellerRecommend> => !!item.product);
    }
    return [];
  }, [recommendList]);

  return (
    <View style={styles.container}>
      {(!!messages?.length || !!bannerList?.length) && (
        <View style={styles.home}>
          {!!messages?.length && (
            <View style={styles.notice}>
              <Icon size={8} icon="dot" />
              <Swiper
                autoplay
                horizontal={false}
                showsPagination={false}
              >
                {messages?.map(({ id, msgTip }) => (
                  <View style={styles.noticeSlide} key={id}>
                    <Typography.Text size={13}>{msgTip}</Typography.Text>
                  </View>
                ))}
              </Swiper>
            </View>
          )}
          {!!bannerList?.length && (
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
      )}
      <View style={styles.items}>
        {items?.map((item, index) => {
          const isLineEnd = (index + 1) % 2 === 0;
          const { id, name1, masterImg, mallPcPrice, marketPrice } = item.product;
          return (
            <Link style={[styles.item, isTrue(isLineEnd, styles.lineEnd)]} key={id} to={{ screen: 'Product', params: { id } }} push>
              <Image style={styles.image} source={{ uri: masterImg }} />
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
        })}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {},
  home: {
    marginBottom: 10,
    paddingHorizontal: 10,
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
    backgroundColor: '#fff',
  },
  notice: {
    height: 37,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 8,
  },
  noticeSlide: {
    height: 37,
    justifyContent: 'center',
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
  },
  items: {
    backgroundColor: '#fff',
    borderStartStartRadius: 10,
    borderStartEndRadius: 10,
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
})

export default StoreHome;
