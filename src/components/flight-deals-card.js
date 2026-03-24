import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const {width} = Dimensions.get('window');

import {useNavigation} from '@react-navigation/native';
import {Rating, AirbnbRating} from '@rneui/themed';
import ConvertIntoRupees from './convert-in-rupees';

export default function FlightDealsCard() {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('HotelDetails')}>
      <View style={styles.offContainer}>
        <Text style={styles.flat}>Flat</Text>
        <Text style={styles.off}>10% OFF</Text>
      </View>

      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row'}}>
          <Image
            source={{
              uri: 'https://logos-world.net/wp-content/uploads/2022/01/Akasa-Air-Emblem.png',
            }}
            style={styles.img}
          />
          <Text style={styles.hotelName} numberOfLines={1}>
            Akasa Air
          </Text>
        </View>
        <View style={styles.flexRow}>
          <Feather
            name="map-pin"
            size={12}
            color={COLORS.LIGHT_GREY}
            width={15}
          />
          <Text style={styles.date}>Thu, 25 July</Text>
        </View>
        <View style={{marginVertical: 10}} />

        <View style={styles.flexRow}>
          <View>
            <Text style={styles.time}>05:55</Text>
            <Text style={styles.code}>BLR</Text>
          </View>
          <View style={styles.line} />
          <View>
            <Text style={{...styles.time, textAlign: 'right'}}>07:05</Text>
            <Text style={{...styles.code, textAlign: 'right'}}>MAA</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 2.25,
    //  height: 260,
    borderRadius: 7.5,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: COLORS.EXTRALIGHT_GREY,
    marginRight: 10,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 2,
  },

  img: {
    // borderRadius: 100,
    height: 20,
    width: 20,
    // width: '90%',
    //  borderRadius: 16,
    //  resizeMode: 'contain',
    marginRight: 10,
  },

  offContainer: {
    // alignItems: 'center',
    // marginTop: 10,
    //  height: 150,
    marginBottom: 5,
    padding: 15,
    backgroundColor: COLORS.PRIMARY_LIGHT,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },

  hotelName: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 2.5,
  },

  flat: {
    fontSize: 13,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 7.5,
  },

  off: {
    fontSize: 18,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBlack,
  },

  date: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
  },

  time: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    // marginTop: 20,
  },
  code: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 5,
  },
  line: {
    flex: 1,
    height: 2,
    backgroundColor: COLORS.EXTRALIGHT_GREY,
    marginHorizontal: 10,
  },
});
