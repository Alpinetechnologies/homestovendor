import React, {useRef, useState} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {View, Dimensions, StyleSheet, TouchableHighlight} from 'react-native';
import {COLORS} from '../constants/colors';
import ImageLoader from './image-loader';
const {width, height} = Dimensions.get('window');
import {Modal} from 'react-native';
import ImageViewer from 'react-native-image-zoom-viewer';

export default function HotelImagesCarousel({banner}) {
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = banner.map((option, i) => ({
    id: option.id,
    url: option.image,
  }));

  const carouselRef = useRef(null);

  const renderItem = ({item, index}) => {
    return (
      <View style={styles.item} key={item.id}>
        <TouchableHighlight
          onPressIn={() => setCurrentIndex(index)}
          onPress={() => setIsImageVisible(true)}>
          <ImageLoader image={item.image} style={styles.image} />
        </TouchableHighlight>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}>
        <ImageViewer
          backgroundColor={COLORS.BLACK}
          index={currentIndex}
          imageUrls={images}
        />
      </Modal>
      <Carousel
        ref={carouselRef}
        width={width}
        height={250}
        data={banner}
        renderItem={renderItem}
        autoPlay={true}
        loop={true}
        pagingEnabled={true}
        snapEnabled={true}
        onSnapToItem={index => setCurrentIndex(index)}
      />
      <View style={styles.dotContainer}>
        {banner.map((_, i) => (
          <View
            key={i}
            style={i === currentIndex ? styles.activeDot : styles.dot}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
  },
  item: {
    width: width,
    height: 250,
    elevation: 3,
    backgroundColor: COLORS.WHITE,
    alignItems: 'center',
  },
  imageContainer: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    borderRadius: 20,
  },
  image: {
    //resizeMode: 'stretch',
    width: width,
    height: 250,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
  },
  activeDot: {
    height: 7,
    width: 7,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    marginHorizontal: 2.5,
    elevation: 2,
  },
  dot: {
    height: 5,
    width: 5,
    backgroundColor: COLORS.WHITE,
    borderRadius: 6,
    marginHorizontal: 2.5,
    elevation: 2,
  },
});
