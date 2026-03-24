import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { COLORS } from '../constants/colors';
import { FONT_FAMILY } from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { AirbnbRating } from '@rneui/themed';
import ConvertIntoRupees from './convert-in-rupees';
import CalculateGst from './calculate-gst';
import ImageLoader from './image-loader';

const { width } = Dimensions.get('window');

export default function HotelCard({ data, showDetails = true, imageStyle, imageContainer, cardStyle }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.card, cardStyle]}
      onPress={() =>
        navigation.navigate('HotelDetails', {
          hotelId: data.id,
          hotelName: data.hotelname,
          bookingAmt: data.booking_amt,
          bookingAmtHrs: data.booking_amt_hr,
        })
      }>
      <View style={[styles.imgContainer, imageContainer]}>
        {data?.gallery?.[0] ? (
          <ImageLoader image={data.gallery[2]} style={[styles.img, imageStyle]} />
        ) : (
          <ImageLoader
            image={'https://via.placeholder.com/150'}
            style={[styles.img, imageStyle]}
          />
        )}
      </View>

      <View style={{ padding: 10 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <AirbnbRating
            size={12}
            showRating={false}
            count={5}
            defaultRating={4}
            starContainerStyle={{ alignSelf: 'flex-start' }}
          //onFinishRating={ratingCompleted}
          //  style={{paddingVertical: 10}}
          />
          <Text style={styles.rate}>3.8/5</Text>
        </View>
        <Text style={styles.hotelName} numberOfLines={1}>
          {data.hotelname}
        </Text>
        <View style={styles.flexRow}>
          <Text style={styles.address}>
            <Feather name="map-pin" size={12} color={COLORS.GREY} width={15} />
            {'  ' + data.city_name}
          </Text>

        </View>
        {showDetails &&
          <>

            <Text style={styles.breakfast}>✔ No meals included</Text>
            <Text style={styles.breakfast}>
              ✔ Complimentary 1+1 Happy Hours is available
            </Text>
            <Text style={styles.breakfast}>
              ✔ Free Early Check in, Subject to Availability
            </Text>
            {/* <Text style={styles.price}>300</Text> */}
            <Text style={styles.discount}>
              <Text style={{ fontFamily: FONT_FAMILY.primaryBlack }}>
                {data.booking_amt}
              </Text>{' '}
              for <Text style={{ fontFamily: FONT_FAMILY.primaryBlack }}>1 room</Text>{' '}
              per night
            </Text>
          </>
        }
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    width: width - 30,
    //  height: 260,
    borderRadius: 10,
    borderWidth: 1,
    overflow: 'hidden',
    borderColor: COLORS.EXTRALIGHT_GREY,
    marginRight: 10,
    marginVertical: 5,
    elevation: 2,
    backgroundColor: COLORS.WHITE,
    marginHorizontal: 2.5,
    marginBottom: 10,
  },

  img: {
    // borderRadius: 100,
    height: '100%',
    width: width - 30,
    // width: '90%',
    //  borderRadius: 16,
    //  resizeMode: 'contain',
  },

  imgContainer: {
    alignItems: 'center',
    // marginTop: 10,
    height: 200,
    marginBottom: 5,
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
    // marginBottom: 30,
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
    marginBottom: 10
  },

  price: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 5,
    textDecorationLine: 'line-through',
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
    marginVertical: 2,
  },
  gst: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 5,
  },
});
