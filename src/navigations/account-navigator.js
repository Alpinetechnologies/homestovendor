import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { COLORS } from '../constants/colors';
import { FONT_FAMILY } from '../constants/font-family';
import { GoBack } from '../components/header-components';
import ViewProfile from '../screens/app/account/view-profile/view-profile';
import EditProfile from '../screens/app/account/edit-profile/edit-profile';
import ChangePassword from '../screens/app/account/change-password/change-password';
import About from '../screens/app/account/about/about';
import TermsConditions from '../screens/app/account/terms-conditions/terms-conditions';
import ContactUs from '../screens/app/account/contact-us/contact-us';

const Stack = createNativeStackNavigator();

export default function AccountNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: styles.headerTitle,

        headerStyle: {
          backgroundColor: COLORS.PRIMARY,
        },
        headerTitleAlign: 'center',
        headerShadowVisible: false,
      }}>
      <Stack.Screen
        name="Profile"
        component={ViewProfile}
        options={{
          title: 'My Profile',
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{
          title: 'Edit Profile',
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
        options={{
          title: 'Change Password',
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen
        name="About"
        component={About}
        options={{
          title: 'About Us',
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen
        name="TermsConditions"
        component={TermsConditions}
        options={{
          title: 'Terms & Conditions',
          headerLeft: () => <GoBack />,
        }}
      />
      <Stack.Screen
        name="ContactUs"
        component={ContactUs}
        options={{
          title: 'Contact Us',
          headerLeft: () => <GoBack />,
        }}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  headerSubTitle: {
    fontSize: 10,
    color: COLORS.WHITE,
    textTransform: 'capitalize',
    marginLeft: 30,
    marginTop: 1,
  },

  iconStyleRight: { marginRight: 15 },
});
