import { Image, StyleSheet, View } from 'react-native';
import Swiper from 'react-native-swiper';

interface CarouselProps {
  items?: string[];
}

const Carousel = ({ items = [] }: CarouselProps) => {
  return (
    <Swiper
      autoplay
      height={375}
      containerStyle={styles.wrapper}
      dotStyle={styles.dot}
      activeDotStyle={styles.activeDot}
      paginationStyle={styles.pagination}
      key={items.length}
    >
      {items.map((item) => (
        <View style={styles.silde} key={item}>
          <Image source={{ uri:  item }} style={styles.image} resizeMode="stretch" />
        </View>
      ))}
    </Swiper>
  );
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
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, .3)'
  },
  activeDot: {
    backgroundColor: '#e65321'
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
    bottom: 10
  }
})

export default Carousel;
