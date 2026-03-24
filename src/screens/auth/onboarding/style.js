import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    // padding: 15,
    // height: height,
  },
  bgimg: {
    flex: 1,
    resizeMode: 'cover',
    width: width,
    height: width,
  },
  bottomContainer: {
    // flex: ,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: COLORS.WHITE,
    marginTop: -50,
    padding: 30,
    // height: height / 2.35,
    // flex: 1,
  },
  dotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },

  activeDot: {
    width: 15,
    height: 5,
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  dot: {
    width: 5,
    height: 5,
    backgroundColor: COLORS.LIGHT_GREY,
    borderRadius: 6,
    marginHorizontal: 4,
  },
  heading: {
    fontSize: 21,
    fontFamily: FONT_FAMILY.primaryBold,
    //textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.BLACK,
    marginBottom: 5,
    // backgroundColor: 'red',
  },

  subHeading: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    textAlign: 'center',
    marginBottom: 20,
    color: COLORS.GREY,
    // marginHorizontal: 8,
    lineHeight: 20,
  },
  innerContainer: {
    // backgroundColor: 'red',
    //  paddingHorizontal: 20,
    flex: 1,
    // backgroundColor: 'red',
  },
  createBtn: {
    backgroundColor: COLORS.PRIMARY,
    height: 46,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    marginTop: 30,
  },
  BtnTxt: {
    fontSize: 16,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    letterSpacing: 0.5,
  },
  bottomtitle: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    //textTransform: 'uppercase',
    textAlign: 'center',
    color: COLORS.SECONDARY,
    // marginBottom: 5,
  },
});
