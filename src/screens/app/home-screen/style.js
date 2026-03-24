/* import {Dimensions, StyleSheet} from 'react-native';
import {COLORS} from '../../../constants/colors';
import {FONT_FAMILY} from '../../../constants/font-family';

const {height, width} = Dimensions.get('window');
const data = [1, 2, 3, 4, 5];
const itemSize = 150;
const boxWidth = 150;
const box1Width = (boxWidth / 4) * 3 - boxWidth / 10;
const box2Width = boxWidth / 2 - boxWidth / 20;
const box3Width = boxWidth / 4;
const scrollableWidth = data.length * itemSize - width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    //  padding: 15,
  },

  box: {
    // height: 100,
    backgroundColor: COLORS.WHITE,
    flex: 1,
    // padding: 15,
    margin: 5,
    height: 100,
    borderRadius: 10,
    elevation: 2,
    overflow: 'hidden',
  },

  catContainer: {
    marginTop: -70,
    justifyContent: 'center',
    // backgroundColor: 'yellow',
    flexDirection: 'row',
    paddingHorizontal: 10,
    //   backgroundColor: COLORS.WHITE,
  },

  subCatContainer: {
    paddingBottom: 15,
    borderBottomWidth: 10,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },

  subCatCard: {
    // height: 100,
    //backgroundColor: COLORS.GREY,
    flex: 1,
    // padding: 15,
    margin: 5,
    //  height: 100,
    width: width / 4.75,
    //borderRadius: 10,
    // elevation: 2,
    overflow: 'hidden',
  },

  subCatImage: {
    height: 50,
    width: width / 5.5,
    resizeMode: 'contain',
    alignSelf: 'center',
  },

  subCat: {
    fontSize: 11,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
  },
  subCatTitleContainer: {
    // justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    //backgroundColor: COLORS.PRIMARY_LIGHT,
  },

  containerStyle: {
    alignSelf: 'center',
    width: width,
    overflow: 'hidden',
    height: width / 4.5,
    zIndex: 0,
    // marginBottom:15
  },
  arcContainerStyle: {
    borderRadius: width - 10,
    width: width * 2,
    height: width * 2,
    marginLeft: -(width / 2),
    position: 'absolute',
    bottom: 0,
    overflow: 'hidden',
  },
  arc: {
    height: width / 4.5,
    width: width,
    position: 'absolute',
    bottom: 0,
    marginLeft: width / 2,
    backgroundColor: COLORS.PRIMARY,
  },

  flexRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 15,
    marginHorizontal: 15,
  },
  title: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
  },
  titleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },
  heading: {
    fontSize: 16,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },

  subHeading: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
  },
  seeall: {
    fontSize: 12,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primaryBold,
  },

  facility: {
    fontSize: 13,
    color: COLORS.BLACK,
    fontFamily: FONT_FAMILY.primary,
    marginBottom: 5,
  },
  remark: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    marginTop: 10,
    marginBottom: 5,
  },

  infoContainer: {
    borderBottomWidth: 10,
    paddingBottom: 15,
    borderColor: COLORS.EXTRALIGHT_GREY,
  },
  popularHotelRowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'pink',
  },
  offerContainer: {
    width: width / 1.3,
    // flexDirection: 'row',
    backgroundColor: COLORS.WHITE,
    borderColor: COLORS.LIGHT_GREY,
    elevation: 2,
    borderRadius: 10,
    // marginHorizontal: 10,
    marginTop: 7.5,
    overflow: 'hidden',
    marginBottom: 5,
    marginLeft: 2,
    marginRight: 10,
  },
  packageImage: {
    height: 130,
    width: width / 1.3,
    //resizeMode: 'contain',
  },
  banner: {
    height: 100,
    width: width - 30,
    resizeMode: 'contain',
    //  backgroundColor: 'red',
    margin: 15,
    marginBottom: 0,
    borderRadius: 5,
  },
  offerInfoContainer: {
    //  flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },

  desc: {
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    // marginTop: 2.5,
    marginBottom: 15,
  },

  validity: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
  },
  offerInfo: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.GREY,
    marginTop: -10,
    marginBottom: 10,
  },

  tc: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.SECONDARY,
    marginBottom: 10,
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rate: {
    fontSize: 12,
    color: '#FFD700',
    fontFamily: FONT_FAMILY.primaryBold,
  },
  rateflexRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  //slider
});
 */