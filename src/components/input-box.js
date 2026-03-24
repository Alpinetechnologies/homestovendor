import React, {useState} from 'react';
import {View, TextInput, StyleSheet} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function InputBox(props) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.LIGHT_GREY}
        style={styles.input}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        editable={props.editable}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },

  input: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 13,
    paddingLeft: 15,
    backgroundColor: '#EBF0F3',
    borderRadius: 5,
    color: COLORS.BLACK,
    paddingVertical: 12,
    height: 55,
  },
});
