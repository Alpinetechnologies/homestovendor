import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    padding: 25,
    // justifyContent: 'space-between',
    paddingVertical: 25,
  },

  logo: {
    height: 90,
    alignSelf: 'center',
    marginVertical: 20,
    width: 175,
    resizeMode: 'contain',
    // backgroundColor: 'pink',
  },

  title: {
    fontSize: 22,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBlack,
    marginBottom: 5,
  },

  subTitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    marginBottom: 20,
  },

  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
    marginTop: 20,
  },

  signUp: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },

  signUpHeading: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.PRIMARY,
  },
  btnTxt: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    marginLeft: 15,
  },
});
