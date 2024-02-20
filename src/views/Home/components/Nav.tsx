import { FC } from "react";
import Swiper from "react-native-swiper";
import { Image, StyleSheet, Text, View } from "react-native";
import { Link, Space, Typography } from "@/components";

interface NavProps {
  items?: API.HomeChannel[];
  news?: API.HomeMessage[];
}

const Nav: FC<NavProps> = ({ items, news }) => {
  if (Array.isArray(items) && items.length) {
    return (
      <View style={styles.container}>
        <View style={styles.items}>
          {items.map(({ title, image }, index) => (
            <View style={styles.icon} key={`${index}-${title}`}>
              <Image style={styles.image} source={{ uri: image, cache: 'force-cache' }} />
              <Text style={styles.label}>{title}</Text>
            </View>
          ))}
        </View>
        {!!news?.length && (
          <View style={styles.news}>
            <Image style={styles.newsPrefix} source={require('@/assets/images/tag/new.png')} />
            <Swiper autoplay horizontal={false} showsPagination={false}>
              {news?.map(({ title, msgNoticeId }) => (
                <Link style={styles.newsSlide} to={{ screen: 'NoticeDetails', params: { id: msgNoticeId } }} key={msgNoticeId}>
                  <Typography.Text size={13} color="primary">公告</Typography.Text>
                  <Typography.Text size={13} style={styles.newsText} numberOfLines={1}>{title}</Typography.Text>
                  <Typography.Text size="small" color="disabled">查看</Typography.Text>
                </Link>
              ))}
            </Swiper>
          </View>
        )}
      </View>
    )
  }
  
  return null
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: 'white',
  },
  items: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    paddingTop: 10,
  },
  icon: {
    width: '20%',
    marginBottom: 10,
    alignContent: 'center',
    alignItems: 'center'
  },
  image: {
    width: 40,
    height: 40
  },
  label: {
    fontSize: 11,
    color: '#333',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4
  },
  news: {
    height: 42,
    flexDirection: 'row',
    paddingHorizontal: 12,
    alignItems: 'center',
    borderTopColor: '#eee',
    borderTopWidth: 1,
  },
  newsPrefix: {
    width: 26,
    height: 26,
    marginRight: 8,
  },
  newsSlide: {
    height: 42,
    flexDirection: 'row',
    alignItems: 'center',
  },
  newsText: {
    flex: 1,
    marginLeft: 5,
    marginRight: 8,
  }
})

export default Nav;
