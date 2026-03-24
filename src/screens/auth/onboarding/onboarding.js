import {
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  Image,
  StatusBar,
} from 'react-native';
import React, {useRef, useState} from 'react';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import AppIntroSlider from 'react-native-app-intro-slider';

const slides = [
  {
    key: 1,
    heading: 'Search & Select',
    info: 'Browse our wide range of accommodations and select your preferred stay based on location, amenities, and budget.',
    image:
      'https://images.pexels.com/photos/2565222/pexels-photo-2565222.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    key: 2,
    heading: 'Book & Confirm',
    info: 'Complete the booking process by providing necessary details and make a secure payment to confirm your reservation.',
    image:
      'https://images.pexels.com/photos/244133/pexels-photo-244133.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    key: 3,
    heading: 'Enjoy Your Stay',
    info: 'Arrive at your chosen accommodation, present your booking confirmation, and enjoy a comfortable stay with HOMESTO.',
    image:
      'https://images.pexels.com/photos/1697076/pexels-photo-1697076.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

export default function OnbBoarding(props) {
  const slider = useRef();

  const _renderItem = ({item}) => {
    return (
      <View style={styles.innerContainer}>
        <Image source={{uri: item.image}} style={styles.bgimg} />
        <View style={styles.bottomContainer}>
          <Text style={styles.heading}>{item.heading}</Text>
          <Text style={styles.subHeading}>{item.info}</Text>
          <View style={styles.dotContainer}>
            {slides.map((data, i) => {
              return (
                <View
                  key={i}
                  style={item.key === data.key ? styles.activeDot : styles.dot}
                />
              );
            })}
          </View>
          <TouchableOpacity
            style={styles.createBtn}
            onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.BtnTxt}>Login & Continue</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <>
      <StatusBar
        backgroundColor={'transparent'}
        translucent={true}
        barStyle="light-content"
      />
      <View style={styles.container}>
        <AppIntroSlider
          renderItem={_renderItem}
          data={slides}
          showSkipButton={false}
          showNextButton={false}
          showDoneButton={false}
          ref={ref => (slider.current = ref)}
          renderPagination={() => null}
        />
      </View>
    </>
  );
}
