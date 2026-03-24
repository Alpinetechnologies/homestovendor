import React from 'react';
import {View, StyleSheet, Image, Modal} from 'react-native';
import {COLORS} from '../constants/colors';
import {ICONS} from '../constants/icons';

export default function ActivityLoader({isLoading}) {
  return (
    <Modal
      statusBarTranslucent={true}
      animationType="fade"
      transparent
      visible={isLoading}>
      <View style={styles.container}>
        <View style={styles.loaderContainer}>
          <Image source={ICONS.LOADER} style={styles.loader} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.TRANSPARENT_BLACK,
  },
  loader: {height: 70, width: 70},
  loaderContainer: {
    height: 100,
    width: 100,
    backgroundColor: COLORS.WHITE,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
});
