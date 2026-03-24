import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import CustomDrawerContent from './custom-drawer-content';
import BottomTabNavigator from './bottom-tab-navigator';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants/colors';
import {FONT_FAMILY} from '../constants/font-family';

import {GoBack} from '../components/header-components';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import EditProfile from '../screens/app/account/edit-profile/edit-profile';
import ViewProfile from '../screens/app/account/view-profile/view-profile';

import HomeScreen from '../screens/app/home-screen/home-screen';


const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function AppNavigator({userProfile}) {
  return (
    <NavigationContainer>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="light-content"
      />
    

      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerLeft: () => <GoBack />,
          headerStyle: {
            backgroundColor: COLORS.PRIMARY,
          },
          headerTitleStyle: styles.headerTitle,
        }}>
        <Stack.Screen
          name="Home"
          component={BottomTabNavigator}
       
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            title: 'User Bookings',
          }}
        />

      
    
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{
            title: 'Edit Profile',
          }}
        />

       
        <Stack.Screen
          name="MyProfile"
          component={ViewProfile}
          options={{
            title: 'My Profile',
            headerShadowVisible: false,
          }}
        />


      

      

       
       

      
        
        
        

        
        

        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// function AppStackNavigator() {
//   return (

//   );
// }

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 15,
    color: COLORS.WHITE,
    //  textTransform: 'capitalize',
    fontFamily: FONT_FAMILY.primaryBold,
  },

  logo: {
    height: 45,
    width: 150,
    resizeMode: 'stretch',
    marginTop: 5,
  },

  iconStyleRight: {marginRight: 15},
  name: {
    fontSize: 15,
    color: COLORS.WHITE,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
  phone: {
    fontSize: 11,
    color: COLORS.EXTRALIGHT_GREY,
    fontFamily: FONT_FAMILY.primaryMedium,
  },
});
