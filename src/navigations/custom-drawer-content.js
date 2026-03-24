import React, {useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {FONT_FAMILY} from '../constants/font-family';
import {COLORS} from '../constants/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalAlert from '../components/modal-alert';

import {Divider} from 'react-native-paper';
import {AuthContext} from '../../auth-context';

function CustomDrawerContent({navigation}) {
  const {signOut} = React.useContext(AuthContext).authContext;
  const {userProfile} = React.useContext(AuthContext);
  console.log(userProfile);
  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
      await AsyncStorage.removeItem('userProfile');
      signOut({});
      setModalVisible(!isModalVisible);
    } catch (e) {
      console.log(e);
    }
  };
  const [isModalVisible, setModalVisible] = useState(false);
  // const ShareApp = async () => {
  //   const options = {
  //     message: 'https://play.google.com/store/apps/details?id=com.whatsapp',
  //   };
  //   Share.open(options)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       err && console.log(err);
  //     });
  // };

  const DrawerList = ({title, onPress, icon}) => (
    <TouchableOpacity style={styles.listContainer} onPress={onPress}>
      <View style={styles.iconImage}>
        <Feather name={icon} color={COLORS.BLACK} size={18} />
      </View>
      <Text style={styles.labelStyle} numberOfLines={1}>
        {title}
      </Text>
      <Feather name="chevron-right" color={COLORS.BLACK} size={18} />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={{position: 'absolute', top: 35, right: 15}}
          onPress={() => navigation.closeDrawer()}>
          <Ionicons name="close-outline" color={COLORS.WHITE} size={28} />
        </TouchableOpacity>

        <View style={styles.headerContentContainer}>
          <TouchableOpacity style={styles.userInfoContainer}>
            <View style={styles.iconContainer}>
              <Ionicons name="business" size={22} color={COLORS.WHITE} />
            </View>
            <View style={{flex: 1}}>
              <Text style={styles.name}>HOMESTO</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <DrawerContentScrollView>
        <View style={{marginBottom: -27.5}} />
        <DrawerList
          title={'Edit Profile'}
          icon="user"
          // onPress={() => navigation.navigate('EditProfile', userProfile)}
        />

        {/*     <DrawerList
          title={'Favorite'}
          icon="heart"
          // onPress={() => navigation.navigate('SubscriptionPlans')}
        /> */}

        {/*    <DrawerList
          title={'About Us'}
          icon="info"
        //  onPress={() => navigation.navigate('AboutUs')}
        />  */}
        <DrawerList
          title={'Contact Us'}
          icon="phone"
          // onPress={() => navigation.navigate('Support')}
        />
        <DrawerList
          title={'Privacy & Policy'}
          icon="file"
          //  onPress={() => navigation.navigate('PrivacyPolicy')}
        />
        <DrawerList
          title={'Terms & Conditions'}
          icon="file-text"
          // onPress={() => navigation.navigate('TermsConditions')}
        />
      </DrawerContentScrollView>
      <Divider />
      <DrawerList
        title={'Sign Out'}
        icon="log-out"
        onPress={() => setModalVisible(!isModalVisible)}
      />

      <ModalAlert
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
        redBtnTxt="Logout"
        btnTxt="Cancel"
        txt=" Are you sure you want to logout ?"
        heading="Logout"
        onConfirm={() => signOutUser()}
      />
    </View>
  );
}

export default CustomDrawerContent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.WHITE,
  },

  listContainer: {
    paddingVertical: 12.5,
    // alignItems: 'center',
    backgroundColor: COLORS.WHITE,
    paddingHorizontal: 15,
    flexDirection: 'row',
    //  marginHorizontal: 15,
    // marginVertical: 7.5,
    borderBottomWidth: 0.5,
    borderColor: COLORS.EXTRALIGHT_GREY,
    // borderRadius: 2,
  },

  iconContainer: {
    height: 45,
    width: 45,
    borderRadius: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    marginRight: 12.5,
    backgroundColor: COLORS.GREY,
    borderColor: COLORS.GREY,
  },
  userInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    // backgroundColor: 'red',
  },
  planContainer: {
    borderWidth: 1,
    borderColor: COLORS.EXTRALIGHT_GREY,
    height: 18,
    width: 70,
    borderRadius: 2.5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.SECONDARY,
    marginTop: 2.5,
  },
  plan: {
    fontSize: 10,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  headerContainer: {
    justifyContent: 'flex-end',
    backgroundColor: COLORS.PRIMARY,
    height: 150,
  },

  headerContentContainer: {
    alignItems: 'center',
    marginVertical: 15,
    paddingHorizontal: 15,
    marginTop: 60,
    //  backgroundColor: 'red',
  },

  name: {
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryBold,
    fontSize: 18.5,
    textTransform: 'capitalize',
  },

  labelStyle: {
    fontFamily: FONT_FAMILY.primaryMedium,
    color: COLORS.BLACK,
    fontSize: 13,
    //  marginLeft: -10,
    flex: 1,
  },

  iconImage: {
    height: 20,
    width: 30,
    resizeMode: 'stretch',
    //  alignItems: 'center',
  },
});
