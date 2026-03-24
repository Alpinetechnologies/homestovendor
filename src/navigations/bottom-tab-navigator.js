import * as React from 'react';
import {Image} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {COLORS} from '../constants/colors';

import {FONT_FAMILY} from '../constants/font-family';
import {ICONS} from '../constants/icons';
import HomeNavigator from './home-navigator';


import AccountNavigator from './account-navigator';
import HomeScreen from '../screens/app/home-screen/home-screen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        showLabel: true,
        headerShown: false,

        tabBarStyle: {
          backgroundColor: COLORS.WHITE,
        },
        tabBarLabelStyle: {
          fontFamily: FONT_FAMILY.primary,
          fontSize: 10,
          marginTop: -1,
          marginBottom: 3,
        },
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.GREY,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === 'Home_') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Favorite_') {
            iconName = focused ? 'heart' : 'heart-outline';
          } else if (route.name === 'Offer_') {
            iconName = focused ? 'gift' : 'gift-outline';
          } else if (route.name === 'Account_') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'Bookings_') {
            iconName = focused ? 'briefcase' : 'briefcase-outline';
          }

          // You can return any component that you like here!
          return (
            <Ionicons
              name={iconName}
              size={20}
              color={focused ? COLORS.PRIMARY : COLORS.GREY}
            />
          );
        },
      })}>
      <Tab.Screen
        name="Home_"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
        }}
      />
    

     
      <Tab.Screen
        name="Account_"
        component={AccountNavigator}
        options={{
          tabBarLabel: 'Account',
          
        }}
      />
    </Tab.Navigator>
  );
}
