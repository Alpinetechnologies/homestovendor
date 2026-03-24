import {StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
    paddingVertical: 25,
  },

  logo: {
    height: 110,
    alignSelf: 'center',
    marginVertical: 20,
    width: 200,
    resizeMode: 'contain',
  },

  title: {
    fontSize: 20,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    marginBottom: 5,
  },

  subTitle: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.GREY,
    marginBottom: 10,
  },
  forgotPassword: {
    fontSize: 12,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'right',
    marginRight: 5,
    marginBottom: 5,
  },
  loginWith: {
    fontSize: 14,
    color: COLORS.BLACK,
    textAlign: 'center',
    /// color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    marginVertical: 5,
  },
  underline: {
    flex: 1,
    height: 0.5,
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 4,
    marginTop: 2,
  },

  or: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: 'rgba(19, 10, 28, 0.5)',
    marginHorizontal: 10,
    fontSize: 16,
  },

  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  signInOptions: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    //color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 5,
  },
  iconContainer: {
    height: 40,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 20,
  },
  flexRow: {
    justifyContent: 'space-evenly',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 20,
  },
  signUpContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 5,
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
});
