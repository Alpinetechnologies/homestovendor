import * as React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';
import {GoBack} from '../components/header-components';
import ViewProfile from '../screens/app/account/view-profile/view-profile';

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

  iconStyleRight: {marginRight: 15},
});
