import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {COLORS} from '../constants/colors';
import Modal from 'react-native-modal';
import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function ModalAlert(props) {
  return (
    <Modal
      onBackdropPress={props.onSkip}
      onBackButtonPress={props.onSkip}
      backdropOpacity={0.5}
      statusBarTranslucent={true}
      isVisible={props.isVisible}>
      <View style={{alignItems: 'center'}}>
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeading}>{props.heading} !</Text>
          <Text style={styles.modalTxt}>{props.txt}</Text>
          <View style={styles.modalBtnContainer}>
            <TouchableOpacity style={styles.modalBtn} onPress={props.onSkip}>
              <Text style={styles.modalBtnTxt}>{props.btnTxt}</Text>
            </TouchableOpacity>
            {props.isHideRedBtn ? null : (
              <TouchableOpacity
                style={styles.modalBtnCancel}
                onPress={props.onConfirm}>
                <Text style={styles.modalBtnTxt}>{props.redBtnTxt}</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    width: width - 60,
    justifyContent: 'center',
    overflow: 'hidden',
  },

  modalBtn: {
    backgroundColor: COLORS.SECONDARY,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    marginRight: 15,
  },
  modalBtnCancel: {
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 30,
    marginRight: 15,
  },
  modalBtnTxt: {
    fontFamily: FONT_FAMILY.primary,
    textTransform: 'capitalize',
    color: COLORS.WHITE,
    fontSize: 12,
  },

  modalHeading: {
    fontFamily: FONT_FAMILY.primaryBlack,
    color: COLORS.WHITE,
    fontSize: 16,
    marginBottom: 10,
    backgroundColor: COLORS.SECONDARY,
    padding: 15,
  },

  modalTxt: {
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.BLACK,
    fontSize: 14,
    margin: 15,
  },

  modalBtnContainer: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'flex-end',
  },
});
