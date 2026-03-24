import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function NoRecords({title}) {
  return (
    <View style={styles.indicatorConatiner}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  indicatorConatiner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
  },
  title: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 15,
    color: COLORS.BLACK,
  },
});
