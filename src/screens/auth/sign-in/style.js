import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

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
    marginVertical: 30,
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
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
    marginBottom: 15,
  },
  forgotPassword: {
    fontSize: 12,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'right',
    marginRight: 5,
    marginVertical: 5,
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
    color: COLORS.LIGHT_GREY,
    //color: COLORS.WHITE,
    textAlign: 'center',
    marginVertical: 5,
  },
  iconContainer: {
    height: 49,
    // width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderRadius: 30,
    flexDirection: 'row',
    borderWidth: 1,
    marginTop: 15,
    borderColor: COLORS.LIGHT_GREY,
  },
  flexRow: {
    //  justifyContent: 'space-evenly',
    // alignItems: 'center',
    //  flexDirection: 'row',
    // marginTop: 20,
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
