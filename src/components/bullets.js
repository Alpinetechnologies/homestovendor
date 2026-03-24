import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function Bullets({item}) {
  return (
    <View style={{flexDirection: 'row', marginVertical: 2}}>
      <Text style={styles.bullet}>⦿ </Text>
      <Text style={styles.rules}>{item}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  rules: {
    fontSize: 12,
    color: COLORS.DARK_GREY,
    fontFamily: FONT_FAMILY.primary,
    marginBottom: 5,
    flex: 1,
  },
  bullet: {
    // fontSize: 10,
    color: COLORS.PRIMARY,
    marginRight: 5,
  },
});
