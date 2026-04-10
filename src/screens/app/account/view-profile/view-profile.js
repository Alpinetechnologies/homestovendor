import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Share } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../../../auth-context';
import ModalAlert from '../../../../components/modal-alert';
import LinearGradient from 'react-native-linear-gradient';

export default function ViewProfile(props) {
  const { userProfile } = React.useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const { signOut } = React.useContext(AuthContext).authContext;

  const profileOptions = [
    {
      id: 1,
      title: 'Change Password',
      subTitle: 'Update your account password',
      icon: 'lock',
      screen: 'ChangePassword',
    },
    {
      id: 2,
      title: 'About',
      subTitle: 'Learn more about HOMESTO',
      icon: 'info',
      screen: 'About',
    },
    {
      id: 3,
      title: 'Wallet',
      subTitle: 'View your wallet balance',
      icon: 'wallet',
      screen: 'Wallet',
    },
    {
      id: 4,
      title: 'Terms & Conditions',
      subTitle: 'Read our terms of service',
      icon: 'file-text',
      screen: 'TermsConditions',
    },
    {
      id: 5,
      title: 'Share APK',
      subTitle: 'Share this app with friends',
      icon: 'share-2',
      action: 'share',
    },
    {
      id: 6,
      title: 'Contact Us',
      subTitle: 'Reach out for support',
      icon: 'phone',
      screen: 'ContactUs',
    },
    {
      id: 7,
      title: 'Log Out',
      subTitle: 'Sign out from this account',
      icon: 'log-out',
      action: 'logout',
    },
  ];

  const handleAction = async (item) => {
    if (item.action === 'logout') {
      setModalVisible(true);
    } else if (item.action === 'share') {
      try {
        await Share.share({
          message: 'Download the HOMESTO Vendor App and manage your bookings easily!',
          url: 'https://homesto.in',
        });
      } catch (error) {
        console.log(error);
      }
    } else if (item.screen) {
      props.navigation.navigate(item.screen);
    }
  };

  const signOutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');

      signOut({});
      setModalVisible(false);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>

        {/* 🔹 Top Header */}
        <View style={{ height: 50, backgroundColor: COLORS.PRIMARY }} />

        {/* 🔹 Profile Card */}
        <View style={styles.topContainer}>
          <View style={{ flexDirection: 'row', marginBottom: 20 }}>

            <LinearGradient
              colors={[COLORS.PRIMARY, COLORS.SECONDARY]}
              style={styles.avatar}
            >
              <Text style={styles.avatarName}>
                {userProfile?.name?.[0]}
              </Text>
            </LinearGradient>

            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{userProfile?.name}</Text>
              <Text style={styles.info}>{userProfile?.phone}</Text>
              <Text style={styles.info}>{userProfile?.email}</Text>
            </View>

            {/* ✏️ Edit Profile */}
            <TouchableOpacity
              onPress={() =>
                props.navigation.navigate('EditProfile', userProfile)
              }
            >
              <Ionicons name="pencil" color={COLORS.BLACK} size={18} />
            </TouchableOpacity>

          </View>
        </View>

        {/* 🔹 Options List */}
        <View style={{ padding: 12.5, marginTop: -20 }}>
          {profileOptions.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.listContainer}
              onPress={() => handleAction(item)}
            >
              <View style={styles.iconContainer}>
                <Feather name={item.icon} size={20} color={COLORS.PRIMARY} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.listHeading}>{item.title}</Text>
                <Text style={styles.listSubHeading}>{item.subTitle}</Text>
              </View>
              <Feather name="chevron-right" size={18} color={COLORS.GREY} />
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>

      {/* 🔴 Logout Modal */}
      <ModalAlert
        isVisible={isModalVisible}
        onSkip={() => setModalVisible(false)}
        onClose={() => setModalVisible(false)}
        redBtnTxt="Yes"
        btnTxt="No"
        txt="Are you sure you want to logout from this device?"
        heading="Log Out"
        onConfirm={signOutUser}
      />
    </View>
  );
}