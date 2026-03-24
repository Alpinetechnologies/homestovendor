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
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from '@rneui/themed';
import ConvertIntoRupees from './convert-in-rupees';
import CalculateGst from './calculate-gst';
import ImageLoader from './image-loader';

const {width} = Dimensions.get('window');

export default function PopularHotelCard({data}) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate('HotelDetails', {
          hotelId: data.id,
          hotelName: data.hotelname,
          bookingAmt: data.booking_amt,
          bookingAmtHrs: data.booking_amt_hr,
        })
      }>
      <View style={styles.imgContainer}>
        <ImageLoader image={data.gallery[0]} style={styles.img} />
      </View>

      <View style={{padding: 10}}>
        <View style={styles.ratingContainer}>
          <AirbnbRating
            size={12}
            showRating={false}
            count={5}
            defaultRating={4}
            //onFinishRating={ratingCompleted}
            //  style={{paddingVertical: 10}}
          />
        </View>
        <Text style={styles.hotelName} numberOfLines={1}>
          {data.hotelname}
        </Text>
        <View style={styles.flexRow}>
          <Feather
            name="map-pin"
            size={12}
            color={COLORS.LIGHT_GREY}
            width={15}
          />
          <Text style={styles.address} numberOfLines={1}>
            {data.address + ', ' + data.city_name + ', ' + data.state_name}
          </Text>
        </View>
        <Text style={styles.rate}>3.8/5</Text>

        {/*  <Text style={styles.breakfast}>
          ✔ Breakfast available at extra charges
        </Text> */}
        {/* <Text style={styles.price}>₹{data.booking_amt}</Text> */}
        <Text style={styles.discount}>
          <Text style={{fontFamily: FONT_FAMILY.primaryBlack}}>
            ₹{data.booking_amt}{' '}
          </Text>{' '}
          for <Text style={{fontFamily: FONT_FAMILY.primaryBlack}}>1 room</Text>{' '}
          per night
        </Text>
        {/* <Text style={styles.gst}>+ 50</Text> */}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width / 1.5,
    //  height: 260,
    borderRadius: 10,
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
    height: '100%',
    width: width / 1.5,
    // width: '90%',
    //  borderRadius: 16,
    //  resizeMode: 'contain',
  },

  imgContainer: {
    alignItems: 'center',
    // marginTop: 10,
    height: 150,
    marginBottom: 5,
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
    marginBottom: 2.5,
  },

  address: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },

  price: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    // marginTop: 5,
    textDecorationLine: 'line-through',
    marginTop: 20,
  },
  discount: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 5,
  },
  breakfast: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 30,
  },
  gst: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 5,
  },
});
