import React from 'react';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {TextInput} from 'react-native-paper';
import {View, StyleSheet} from 'react-native';

export default function AnimatedInputBox(props) {
  return (
    <View style={styles.container}>
      <TextInput
        label={props.label}
        value={props.defaultValue}
        onChangeText={props.onChangeText}
        keyboardType={props.keyboardType}
        secureTextEntry={props.secureTextEntry}
        editable={props.editable}
        theme={{
          colors: {
            placeholder: COLORS.BLACK,
            text: COLORS.BLACK,
            primary: COLORS.PRIMARY,
            underlineColor: 'transparent',
            background: '#003489',
          },
          fonts: {
            regular: {
              fontFamily: FONT_FAMILY.primaryBold,
            },
          },
        }}
        underlineColor="transparent"
        style={{
          backgroundColor: COLORS.WHITE,
          fontSize: 13,
          height: 60,
          borderWidth: 1,
          borderColor: COLORS.EXTRALIGHT_GREY,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
});
