import React, {useState} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function IconInput(props) {
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
    <>
      <View style={styles.container}>
        {props.secureText ? (
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
          />
        ) : (
          <TextInput
            placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
          />
        )}

        <TouchableOpacity style={styles.icon}>
          <Feather name={props.icon} size={18} color={COLORS.GREY} />
        </TouchableOpacity>

        {props.secureText ? (
          <TouchableOpacity
            onPress={updateSecureTextEntry}
            style={styles.eyeIcon}>
            {data.secureTextEntry ? (
              <Feather name="eye-off" size={16} color={COLORS.GREY} />
            ) : (
              <Feather name="eye" size={16} color={COLORS.GREY} />
            )}
          </TouchableOpacity>
        ) : null}
      </View>
    </>
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
    fontSize: 12,
    paddingLeft: 50,
    backgroundColor: '#F2F2F2',
    borderRadius: 8,
    color: COLORS.BLACK,
    paddingVertical: 12,
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
