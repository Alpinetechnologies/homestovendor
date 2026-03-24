import React, {useState} from 'react';
import {ActivityIndicator} from 'react-native';
import {StyleSheet, Dimensions, Image, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';

export default function ImageLoader(props) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const noImage =
    props.image === 'https://hotel.easytipsntricks.com/product-images/'
      ? true
      : false;

  return (
    <>
      {isImageLoading && noImage === false ? (
        <View style={[props.style, styles.loader]}>
          <Image source={ICONS.LOADER} style={{height: 50, width: 50}} />
        </View>
      ) : null}

      <Image
        source={{
          uri: props.image,
        }}
        style={props.style}
        //  resizeMode="stretch"
        onLoadEnd={() => setIsImageLoading(false)}
      />
    </>
  );
}

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
  },
});
