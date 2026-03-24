import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';
import {FONT_FAMILY} from '../../../../constants/font-family';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BG,
    // padding: 12.5,
  },

  topContainer: {
    margin: 12.5,
    backgroundColor: COLORS.WHITE,
    padding: 15,
    marginTop: -50,
    borderRadius: 10,
    elevation: 2.5,
    marginBottom: 20,
    paddingVertical: 20,
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarName: {
    fontSize: 30,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
  },
  name: {
    fontSize: 20,
    fontFamily: FONT_FAMILY.primaryBlack,
    color: COLORS.BLACK,
    marginBottom: 5,
    // marginTop: 7.5,
  },
  info: {
    fontSize: 11.5,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },

  logo: {
    height: 50,
    width: 75,
    resizeMode: 'contain',
    //backgroundColor: 'pink',
    marginLeft: 5,
  },
  heading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryBlack,
    color: COLORS.BLACK,
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 17.5,
    paddingTop: 20,
    paddingBottom: 15,
  },
  listHeading: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
  },
  listSubHeading: {
    fontSize: 10,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
    marginTop: 2,
  },
  completeStatus: {
    color: COLORS.BLACK,
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    marginTop: 5,
  },

  iconContainer: {
    height: 22,
    width: 22,
    marginRight: 15,
    //marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

  listContainer: {
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    paddingVertical: 15,
    flexDirection: 'row',

    //borderRadius: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },

  userImage: {
    height: 55,
    width: 55,
    borderRadius: 5,
  },
  imageBg: {
    elevation: 5,
    overflow: 'hidden',
    borderRadius: 5,
    height: 55,
    width: 55,
  },

  btn: {
    borderWidth: 1.5,
    borderRadius: 20,
    paddingHorizontal: 12.5,
    paddingVertical: 2.5,
    borderColor: COLORS.PRIMARY,
  },

  btnTxt: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.PRIMARY,
  },
});
