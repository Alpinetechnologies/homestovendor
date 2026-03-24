import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import {COLORS} from '../constants/colors';

import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';
var {width} = Dimensions.get('window');

export default function SignUpModalAlert(props) {
  return (
    <Modal
      onBackdropPress={props.onSkip}
      onBackButtonPress={props.onSkip}
      backdropOpacity={0.5}
      transparent={true}
      statusBarTranslucent={true}
      visible={props.isVisible}>
      <View
        style={{
          flex: 1,
          backgroundColor: COLORS.TRANSPARENT_BLACK,
          justifyContent: 'flex-end',
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.iconContainer}>
            <Image source={ICONS.CHECK} style={styles.icon} />
          </View>
          <Text style={styles.modalHeading}>{props.heading} !</Text>
          <Text style={styles.modalTxt}>{props.txt}</Text>

          <TouchableOpacity style={styles.modalBtn} onPress={props.onSkip}>
            <Text style={styles.modalBtnTxt}>{props.btnTxt}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    // width: width - 60,
    justifyContent: 'center',
    overflow: 'hidden',
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    paddingVertical: 25,
    paddingHorizontal: 15,
  },
  icon: {
    height: 80,
    width: 80,
    alignSelf: 'center',
  },
  modalBtn: {
    backgroundColor: COLORS.PRIMARY,
    //marginBottom: 15,
    //paddingHorizontal: 20,
    // paddingVertical: 15,
    borderRadius: 50,
    marginHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
  },

  modalBtnTxt: {
    fontFamily: FONT_FAMILY.primaryBold,
    textTransform: 'capitalize',
    color: COLORS.WHITE,
    fontSize: 14,
  },

  modalHeading: {
    fontFamily: FONT_FAMILY.primaryBlack,
    color: COLORS.PRIMARY,
    fontSize: 20,
    // marginBottom: 10,
    //backgroundColor: COLORS.PRIMARY,
    // padding: 15,
    marginTop: 20,
    textAlign: 'center',
  },

  modalTxt: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    fontSize: 14,
    margin: 15,
    textAlign: 'center',
    marginBottom: 30,
    // backgroundColor: 'yellow',
  },

  modalBtnContainer: {
    marginTop: 20,
    marginLeft: 15,
  },

  iconContainer: {
    backgroundColor: '#ffd2cc',
    alignSelf: 'center',
    padding: 20,
    borderRadius: 100,
  },
});
