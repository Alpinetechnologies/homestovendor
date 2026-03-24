import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, Text, View, Platform} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

export default function LabelDatePicker(props) {
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    let currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    let date_format = moment(currentDate).format('DD-MM-YYYY');
    setDate(currentDate);
    if (event.type === 'set') props.onSelectDate(date_format);
    else props.onSelectDate(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.placeholder}</Text>
      <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
        {show && (
          <DateTimePicker
            value={date}
            mode={'date'}
            display="default"
            onChange={onChange}
            maximumDate={props.maximumDate}
            minimumDate={props.minimumDate}
          />
        )}
        {props.value ? (
          <Text style={styles.selectedDate}>{props.value}</Text>
        ) : (
          <Text style={styles.placeholder}>DD-MM-YYYY</Text>
        )}
        <Feather
          style={styles.icon}
          color={COLORS.PRIMARY}
          name={'calendar'}
          size={16}
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginVertical: 10,
  },

  input: {
    paddingLeft: 15,
    borderRadius: 2,
    borderWidth: 0.2,
    borderColor: COLORS.LIGHT_GREY,
    backgroundColor: COLORS.WHITE,
    color: COLORS.BLACK,
    height: 53.5,
    justifyContent: 'center',
  },
  selectedDate: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.BLACK,
    // backgroundColor: 'red',
  },

  placeholder: {
    fontFamily: FONT_FAMILY.primaryMedium,
    fontSize: 12,
    color: COLORS.GREY,
    // backgroundColor: 'red',
  },

  icon: {
    marginRight: 5,
    position: 'absolute',
    right: 8.5,
  },

  label: {
    fontSize: 12,
    fontFamily: FONT_FAMILY.primarySemiBold,
    color: COLORS.BLACK,
    marginBottom: 5,
    marginHorizontal: 3,
  },
});
