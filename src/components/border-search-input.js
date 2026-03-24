import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import {useNavigation} from '@react-navigation/native';

const BorderSearchInput = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.continer}>
      <TextInput
        style={styles.input}
        placeholder={props.title}
        placeholderTextColor={COLORS.GREY}
        defaultValue={props.defaultValue}
        onChangeText={props.onChangeText}
      />
      <Feather
        name={'search'}
        size={17}
        color={COLORS.PRIMARY}
        style={styles.icon}
      />
    </View>
  );
};

export default BorderSearchInput;

const styles = StyleSheet.create({
  continer: {
    justifyContent: 'center',
    backgroundColor: COLORS.WHITE,
    // padding: 15,
  },
  input: {
    backgroundColor: COLORS.WHITE,
    height: 50,
    paddingLeft: 40,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderColor: COLORS.BG,
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
  },
  icon: {
    position: 'absolute',
    left: 15,
    // top: 25,
  },

  text: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.GREY,
  },
});
