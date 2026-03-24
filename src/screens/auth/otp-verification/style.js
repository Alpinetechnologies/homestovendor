import {StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.WHITE,
    padding: 30,
    flex: 1,
  },

  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  verifyimgContainer: {
    height: 110,
    width: 110,
    borderRadius: 80,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  },
  verifyimg: {
    height: 50,
    width: 50,
    alignSelf: 'center',
    resizeMode: 'contain',
  },
  topContainer: {
    flex: 1.5,
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

  tc: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.DARK_GREY,
    textDecorationLine: 'underline',
  },

  resendCode: {
    textAlign: 'center',
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },

  otpInput: {
    height: 100,
    marginLeft: 10,
    marginRight: 10,
    alignItems: 'center',
    // width: width - 150,
  },

  underlineStyleBase: {
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    backgroundColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 5,
    fontSize: 16,
  },

  underlineStyleHighLighted: {
    borderColor: COLORS.PRIMARY,
  },
});
