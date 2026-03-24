import {DrawerActions, useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Image, Text, View, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {FONT_FAMILY} from '../constants/font-family';
import Fontisto from 'react-native-vector-icons/Fontisto';
import {ICONS} from '../constants/icons';
import {AuthContext} from '../../auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SearchIcon = () => {
  return (
    <TouchableOpacity>
      <Ionicons name="search" color={COLORS.WHITE} size={20} />
    </TouchableOpacity>
  );
};

const GoBack = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Ionicons name="chevron-back-outline" color={COLORS.WHITE} size={24} />
    </TouchableOpacity>
  );
};

const DrawerMenu = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.dispatch(DrawerActions.toggleDrawer());
      }}>
      <Ionicons name={'menu'} size={22} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

const SelectedLocation = () => {
  const {location} = React.useContext(AuthContext);
  const navigation = useNavigation();

  function getLocalityAndPinCode(addressComponents) {
    let locality = '';
    let pinCode = '';

    addressComponents.forEach(component => {
      if (component.types.includes('sublocality_level_1')) {
        locality = component.long_name;
      }
      if (component.types.includes('postal_code')) {
        pinCode = component.long_name;
      }
    });

    return {locality, pinCode};
  }

  const result = getLocalityAndPinCode(location?.address_components);

  return (
    <View style={{flex: 1, marginLeft: 10}}>
      <Text style={styles.headerTitle}>Your city</Text>
      <View
        // onPress={() => navigation.navigate('SelectLocation')}
        style={{flexDirection: 'row', alignItems: 'center'}}>
        <FontAwesome5 name="map-marker-alt" size={12} color={COLORS.WHITE} />
        <Text style={styles.location} numberOfLines={1}>
          {result ? `${result.locality}, ${result.pinCode}` : 'Select Location'}
        </Text>
        <Ionicons name="caret-down" size={12} color={COLORS.WHITE} />
      </View>
    </View>
  );
};

const NotificationIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      style={styles.iconStyleLeft}
      // onPress={() => navigation.navigate('Notifications')}
    >
      <Ionicons name={'notifications'} size={22} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

const WalletIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyWallet')}>
      <Fontisto name={'wallet'} size={19} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

const LogoutIcon = () => {
  const navigation = useNavigation();

  const {signOut} = React.useContext(AuthContext).authContext;

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
      signOut({});
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <TouchableOpacity onPress={() => logoutUser()}>
      <Ionicons name={'log-out'} size={22} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};

const ProfileIcon = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
      <Ionicons name={'person-circle-outline'} size={35} color={COLORS.WHITE} />
    </TouchableOpacity>
  );
};
const ReferEarn = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.navigate('MyProfile')}>
      <Image
        source={ICONS.REFER_EARN}
        style={{height: 22, width: 22, marginLeft: 10, marginRight: 8}}
      />
    </TouchableOpacity>
  );
};

export {
  GoBack,
  SearchIcon,
  DrawerMenu,
  SelectedLocation,
  NotificationIcon,
  WalletIcon,
  ProfileIcon,
  ReferEarn,
  LogoutIcon,
};

const styles = StyleSheet.create({
  iconStyleLeft: {marginLeft: 15},
  iconStyleRight: {marginRight: 15},

  box: {
    marginRight: 15,
    borderWidth: 1,
    borderColor: COLORS.PRIMARY,
    borderRadius: 10,
    paddingHorizontal: 12.5,
    paddingVertical: 1.5,
  },
  back: {height: 15, width: 10, marginLeft: 20},
  menu: {marginLeft: 15},
  text: {
    // fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 15,
    color: COLORS.WHITE,
    marginLeft: 5,
  },

  cartCountContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    borderRadius: 20,
    height: 15,
    width: 15,
    alignItems: 'center',
    justifyContent: 'center',
    top: -5,
    right: -5,
  },

  cartCount: {
    fontSize: 9,
    //fontFamily: FONT_FAMILY.primaryBold,
    color: COLORS.WHITE,
  },
  headerTitle: {
    fontSize: 12,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    letterSpacing: 0.5,
    flex: 1,
    marginBottom: 2.5,
  },
  location: {
    fontSize: 13.5,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    marginHorizontal: 5,
    // // maxWidth: '40%',
  },
  icon: {height: 25, width: 25, resizeMode: 'contain'},
});
