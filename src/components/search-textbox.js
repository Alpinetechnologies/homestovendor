import React from 'react';
import { StyleSheet, TextInput, View, TouchableOpacity, Pressable } from 'react-native';
import { COLORS } from '../constants/colors';
import { FONT_FAMILY } from '../constants/font-family';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function SearchTextbox({
  title,
  value,
  onChangeText,
  onPress,
  showFilter = false,
  editable = true,
  style,
  inputStyle,
}) {
  const content = (
    <View style={[styles.container, style]}>
      <Ionicons name="search" size={18} color={COLORS.GREY} style={styles.searchIcon} />
      <TextInput
        placeholderTextColor={COLORS.GREY}
        placeholder={title}
        style={[styles.input, inputStyle]}
        value={value}
        onChangeText={onChangeText}
        editable={onPress ? false : editable}
        pointerEvents={onPress ? 'none' : 'auto'}
      />
      {showFilter && (
        <FontAwesome name="sliders" size={18} color={COLORS.GREY} style={styles.filterIcon} />
      )}
    </View>
  );

  if (onPress) {
    return (
      <Pressable activeOpacity={0.7} onPress={onPress}>
        {content}
      </Pressable>
    );
  }

  return content;
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginHorizontal: 15,
    marginVertical: 10,
    height: 48,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 10,
  },
  filterIcon: {
    marginLeft: 10,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: FONT_FAMILY.primary,
    color: COLORS.BLACK,
    paddingVertical: 0,
  },
});
