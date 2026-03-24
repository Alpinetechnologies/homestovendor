import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  Modal,
} from 'react-native';
import {COLORS} from '../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import {FONT_FAMILY} from '../constants/font-family';
import LinearGradient from 'react-native-linear-gradient';
import {Divider} from 'react-native-paper';
var {width} = Dimensions.get('window');

export default function ImageMediaSelectModal(props) {
  return (
    <Modal
      statusBarTranslucent={true}
      onRequestClose={props.onSkip}
      animationType="fade"
      transparent={true}
      visible={props.visible}>
      <View style={styles.modalView}>
        <View style={{backgroundColor: COLORS.WHITE}}>
          <View style={{backgroundColor: COLORS.PRIMARY}}>
            <Text style={styles.modalHeading}>Choose an Action</Text>
          </View>

          <TouchableOpacity
            style={styles.modalBtn}
            onPress={props.onOpenImagePicker}
            onPressOut={props.onSkip}>
            <Feather name="image" size={22} color={COLORS.BLACK} />
            <Text style={styles.modalBtnTxt}>Select media from Gallery</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={styles.modalBtn}
            onPress={props.onOpenCamera}
            onPressOut={props.onSkip}>
            <Feather name="camera" size={22} color={COLORS.BLACK} />
            <Text style={styles.modalBtnTxt}>Use camera</Text>
          </TouchableOpacity>
          {props.isShowFileUpload && (
            <>
              <Divider />
              <TouchableOpacity
                style={styles.modalBtn}
                onPress={props.onOpenDocumentPicker}
                onPressOut={props.onSkip}>
                <Feather name="file-text" size={22} color={COLORS.BLACK} />
                <Text style={styles.modalBtnTxt}>Upload File</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    flex: 1,
    backgroundColor: COLORS.TRANSPARENT_BLACK,
    justifyContent: 'flex-end',
    alignItems: 'center',
    // padding: 50,
    // alignItems: 'center',
  },

  modalHeading: {
    fontSize: 15,
    fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
    // backgroundColor: COLORS.PRIMARY,
    padding: 15,
  },
  modalBtnTxt: {
    fontSize: 13,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    // textAlign: 'center',
    marginTop: 2.5,
    flex: 1,
    paddingHorizontal: 10,
  },

  modalBtn: {
    // height: 42.5,
    // borderRadius: 4,
    // borderBottomWidth: 0.5,
    borderColor: COLORS.DARK_GREY,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    flexDirection: 'row',
    width: '100%',
    backgroundColor: COLORS.WHITE,
  },

  modalContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    padding: 20,
    borderRadius: 10,
    width: '75%',
    paddingVertical: 30,
  },
});
