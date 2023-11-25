import { FC } from "react";
import { Image, StyleSheet, View, ImageBackground } from "react-native";
import Swiper from 'react-native-swiper';

interface CarouselProps {
  banners?: API.Banner[]
}

const Carousel: FC<CarouselProps> = ({ banners = [] }) => {
  if (banners?.length) {
    return (
      <ImageBackground source={require('@/assets/images/view/banner_mask.png')} imageStyle={styles.mask}>
        <Swiper
          autoplay
          height={240}
          containerStyle={styles.wrapper}
          dotStyle={styles.dot}
          activeDotStyle={styles.activeDot}
          paginationStyle={styles.pagination}
        >
          {banners.map((banner) => (
            <View style={styles.silde} key={banner.image}>
              <Image source={{ uri:  banner.image }} style={styles.image} resizeMode="stretch" />
            </View>
          ))}
        </Swiper>
      </ImageBackground>
      
    )
  }
  
  return null;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 0,
    backgroundColor: '#f5f6fa',
  },
  mask: {
    top: 'auto',
    height: 20,
    zIndex: 10,
    resizeMode: 'stretch',
  },
  dot: {
    width: 8,
    height: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.5)'
  },
  activeDot: {
    width: 20,
    height: 4,
    backgroundColor: '#fff'
  },
  silde: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  pagination: {
    bottom: 60
  }
})

export default Carousel;
