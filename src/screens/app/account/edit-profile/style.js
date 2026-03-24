import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../../../constants/colors';

var {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
    padding: 15,
    justifyContent: 'space-between',
  },
});
