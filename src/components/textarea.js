import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function Textarea(props) {
  const [data, setData] = useState({
    secureTextEntry: true,
  });

  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry,
    });
  };
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={props.placeholder}
        placeholderTextColor={COLORS.GREY}
        style={styles.input}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        editable={props.editable}
        multiline={true}
        numberOfLines={5}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    justifyContent: 'center',
    marginTop: 15,
    // marginHorizontal: 40,
  },
  icon: {
    position: 'absolute',
    left: 17.5,
    zIndex: 1,
  },
  input: {
    fontFamily: FONT_FAMILY.primary,
    fontSize: 14,
    paddingLeft: 15,
    backgroundColor: '#EBF0F3',
    borderRadius: 5,
    color: COLORS.BLACK,
    paddingVertical: 12,
    textAlignVertical: 'top',
  },

  label: {
    //fontFamily: FONT_FAMILY.primary,
    fontSize: 10,
    color: '#555555',
  },

  eyeIcon: {
    position: 'absolute',
    right: 17.5,
    zIndex: 1,
  },
});
