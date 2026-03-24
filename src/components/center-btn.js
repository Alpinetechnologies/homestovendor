import React from 'react';
import {ActivityIndicator} from 'react-native';
import {
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
} from 'react-native';
import {COLORS} from '../constants/colors';
//import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function CenterBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical, alignItems: 'center'}}>
      <TouchableOpacity style={styles.btnShadow} onPress={props.onPress}>
        <View style={styles.gradientBtn}>
          {props.isLoading ? (
            <ActivityIndicator size="small" color={COLORS.WHITE} />
          ) : (
            <Text style={styles.gradientBtnTxt}>{props.title}</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  btnShadow: {
    backgroundColor: COLORS.WHITE,
    elevation: 2.5,
    borderRadius: 40,
  },

  gradientBtn: {
    borderRadius: 40,
    backgroundColor: COLORS.PRIMARY,
    paddingHorizontal: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },

  gradientBtnTxt: {
    color: COLORS.WHITE,
    fontSize: 14,
    textAlign: 'center',
    letterSpacing: 1.5,
    textTransform: 'none',
  },
});
