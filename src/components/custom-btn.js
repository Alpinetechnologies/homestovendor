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
import {FONT_FAMILY} from '../constants/font-family';
var {width} = Dimensions.get('window');

export default function CustomBtn(props) {
  return (
    <View style={{marginVertical: props.marginVertical}}>
      <TouchableOpacity style={styles.gradientBtn} onPress={props.onPress}>
        {props.isLoading ? (
          <ActivityIndicator size="small" color={COLORS.WHITE} />
        ) : (
          <Text style={styles.gradientBtnTxt}>{props.title}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  gradientBtn: {
    borderRadius: 30,
    paddingHorizontal: 50,
    height: 49,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    elevation: 2.5,
  },

  gradientBtnTxt: {
    color: COLORS.WHITE,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primaryBold,
    textAlign: 'center',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
});
