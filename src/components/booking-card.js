import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import Feather from 'react-native-vector-icons/Feather';

import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from '@rneui/themed';

export default function BookingCard({data, cancleBooking}) {
  const navigation = useNavigation();

  const formatDate = dateString => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const formatTime = dateString => {
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${hours}:${minutes}`;
  };
  const hotel =
    Array.isArray(data?.hotel) && data.hotel.length > 0 ? data.hotel[0] : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('BookingDetails', {bookingData: data})
      }>
      <Text
        style={{
          ...styles.status,
          backgroundColor:
            data?.bookingStatus === 'expired' || 'canceled'
              ? 'red'
              : data?.bookingStatus === 'pending'
              ? 'yellow'
              : 'green',
        }}>
        {data?.bookingStatus || 'Unknown'}
      </Text>
      <View style={{flexDirection: 'row', padding: 10}}>
        <View style={styles.imgContainer}>
          <Image
            source={{
              uri: 'https://thumb.ac-illust.com/73/7387030e5a5600726e5309496353969a_t.jpeg',
            }}
            style={styles.img}
          />
        </View>
        <View style={{flex: 1}}>
          <View style={styles.ratingContainer}>
            <AirbnbRating
              size={12}
              showRating={false}
              count={5}
              defaultRating={hotel?.hotelRatings || 0}
            />
          </View>
          <Text style={styles.hotelName} numberOfLines={1}>
            {hotel?.hotelName || 'Test Hotel'}
          </Text>
          <View style={styles.flexRow}>
            <Feather
              name="map-pin"
              size={12}
              color={COLORS.LIGHT_GREY}
              width={15}
            />
            <Text style={styles.address}>
              {hotel?.address || 'No Address Provided'}
            </Text>
          </View>
          <View style={{marginVertical: 5}} />
          <View style={styles.flexRow}>
            <Feather name="users" size={12} color={COLORS.BLACK} width={15} />
            <Text style={styles.guest}>
              {data?.guest?.name || 'Guest....'} +{' '}
              {data?.numberOfGuests?.adults || 0} | {data?.numberOfRooms || 0}{' '}
              Room
            </Text>
          </View>
        </View>
      </View>

      <View style={{padding: 10}}>
        <View style={{flexDirection: 'row', marginBottom: 8}}>
          <View style={{flex: 1}}>
            <Text style={styles.checkInOut}>Check in</Text>
            <Text style={styles.dateTime}>
              {formatDate(data?.bookingDate?.checkIn)}{' '}
              {formatTime(data?.bookingDate?.checkIn)}
            </Text>
          </View>
          <View>
            <Text style={{...styles.checkInOut, textAlign: 'right'}}>
              Check out
            </Text>
            <Text
              style={{
                ...styles.dateTime,
                textAlign: 'right',
              }}>
              {formatDate(data?.bookingDate?.checkOut)}{' '}
              {formatTime(data?.bookingDate?.checkOut)}
            </Text>
          </View>
        </View>
        {data?.bookingStatus === 'pending' ? (
          <TouchableOpacity
            style={styles.cancleBtn}
            onPress={() => cancleBooking(data?._id, data?.bookingId)}>
            <Text style={styles.cancleBtnTxt}>Cancel Booking</Text>
          </TouchableOpacity>
        ) : null}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    // width: width / 1.5,
    //  height: 260,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: COLORS.EXTRALIGHT_GREY,
    // marginRight: 10,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 5,

    // flexDirection:"row"
  },

  img: {
    // borderRadius: 100,
    height: 85,
    width: 100,
    // width: '90%',
    //  borderRadius: 16,
    //  resizeMode: 'contain',
  },

  imgContainer: {
    // marginTop: 10,
    // width: 100,
    // marginBottom: 5,
    marginRight: 10,
    borderRadius: 5,
    overflow: 'hidden',
    // backgroundColor: 'orange',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2.5,
    borderRadius: 2.5,
    marginTop: 5,
  },
  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  hotelName: {
    fontSize: 16,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 5,
  },

  address: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },
  guest: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginLeft: 2.5,
  },

  checkInOut: {
    fontSize: 11,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 5,
  },
  dateTime: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    //marginTop: 30,
  },

  status: {
    fontSize: 11,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    backgroundColor: 'green',
    alignSelf: 'flex-start',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderBottomRightRadius: 10,
  },
  cancleBtn: {
    height: 42,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    marginTop: 8,
  },
  cancleBtnTxt: {
    fontSize: 14,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
  },
});
