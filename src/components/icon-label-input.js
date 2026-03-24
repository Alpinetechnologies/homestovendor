import React, {useState} from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

export default function IconLabelInput(props) {
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
      <Text style={styles.label}>{props.placeholder}</Text>
      <View style={styles.container}>
        {props.secureText ? (
          <TextInput
            placeholder={'Enter ' + props.placeholder}
            //  placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            secureTextEntry={data.secureTextEntry ? true : false}
            autoCapitalize="none"
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
            maxLength={props.maxLength}
          />
        ) : (
          <TextInput
            placeholder={'Enter ' + props.placeholder}
            // placeholder={props.placeholder}
            placeholderTextColor={COLORS.GREY}
            style={styles.input}
            defaultValue={props.defaultValue}
            onChangeText={props.onChangeText}
            keyboardType={props.keyboardType}
            editable={props.editable}
            maxLength={props.maxLength}
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
    backgroundColor: COLORS.BG,
    borderRadius: 30,
    color: COLORS.BLACK,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: COLORS.LIGHT_GREY,
  },

  label: {
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 13,
    color: COLORS.BLACK,
    marginTop: 10,
    marginBottom: -5,
  },

  eyeIcon: {
    position: 'absolute',
    right: 17.5,
    zIndex: 1,
  },
});
