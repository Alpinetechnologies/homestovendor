import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import styles from './style';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../../../../auth-context';
import ModalAlert from '../../../../components/modal-alert';
import LinearGradient from 'react-native-linear-gradient';

export default function ViewProfile(props) {
  const { userProfile } = React.useContext(AuthContext);

  const [isModalVisible, setModalVisible] = useState(false);
  const { signOut } = React.useContext(AuthContext).authContext;

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