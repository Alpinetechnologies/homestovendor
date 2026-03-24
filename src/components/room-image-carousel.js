import React, {useRef, useState, useEffect} from 'react';
import Carousel from 'react-native-reanimated-carousel';
import {
  View,
  Dimensions,
  StyleSheet,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import {COLORS} from '../constants/colors';
import ImageViewer from 'react-native-image-zoom-viewer';
const {width} = Dimensions.get('window');

export default function RoomImageCarousel({banner}) {
  const carouselRef = useRef(null);
  const [isImageVisible, setIsImageVisible] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = banner.map(option => ({
    id: option.id,
    url: option.image,
  }));

  const renderItem = ({item, index}) => {
    return (
      <TouchableHighlight
        onPressIn={() => setCurrentIndex(index)}
        onPress={() => setIsImageVisible(true)}
        style={styles.item}
        key={item.id}>
        <Image source={{uri: item.image}} style={styles.image} />
      </TouchableHighlight>
    );
  };

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={isImageVisible}
        onRequestClose={() => setIsImageVisible(false)}>
        <ImageViewer
          backgroundColor={'rgba(0, 0, 0, 0.8)'}
          index={currentIndex}
          imageUrls={images}
        />
      </Modal>
      <Carousel
        ref={carouselRef}
        width={width}
        height={175}
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
    //paddingBottom:10
  },
  item: {
    width: width,
    marginBottom: 10,
    elevation: 2.5,
    borderWidth: 0,
    // borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: COLORS.WHITE,
  },

  image: {
    resizeMode: 'cover',
    width: width,
    height: 175,
  },

  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  activeDot: {
    height: 6,
    width: 6,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 7,
    marginHorizontal: 3,
  },
  dot: {
    height: 4,
    width: 4,
    backgroundColor: COLORS.GREY,
    borderRadius: 6,
    marginHorizontal: 3,
  },
});
