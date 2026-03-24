import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import SignUp from '../screens/auth/sign-up/sign-up';
import SignIn from '../screens/auth/sign-in/sign-in';
import ForgotPassword from '../screens/auth/forgot-password/forgot-password';

const Stack = createStackNavigator();
export default function AuthNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerBackVisible: false,
          headerShown: false,
        }}>
      
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />

        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}