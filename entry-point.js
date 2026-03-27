import * as React from 'react';
import { StatusBar } from 'react-native';
import { AuthContext } from './auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthNavigator from './src/navigations/auth-navigator';
import AppNavigator from './src/navigations/app-navigator';
import API from './src/action/api';

export default function EntryPoint({ }) {
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            userId: action.id,
            isLoading: false,
            userProfile: action.userProfile,
          };

        case 'USER_PROFILE':
          return {
            ...prevState,
            userProfile: action.userProfile,
          };

        case 'SIGN_IN':
          return {
            ...prevState,
            isLoggedIn: true,
            userToken: action.token,
            userId: action.id,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLoggedIn: false,
            userToken: null,
            userId: null,
            userProfile: null,
          };

        case 'CART_COUNT':
          return {
            ...prevState,
            cartCount: action.cartCount,
          };
      }
    },
    {
      isLoading: true,
      isLoggedIn: false,
      userToken: null,
      userId: null,
      userProfile: null,
    },
  );

  const logoutUser = async () => {
    try {
      await AsyncStorage.removeItem('userId');
      await AsyncStorage.removeItem('accessToken');
    } catch (e) {
      console.log(e);
    }
  };

  const checkAuthData = async () => {
    let userToken;
    let userId;
    let userProfile = null;

    try {
      userToken = await AsyncStorage.getItem('accessToken');
      userId = await AsyncStorage.getItem('userId');

      if (userToken && userId) {
        try {
          const profile = await API.getUserProfile();

          if (profile && profile.success === 'true') {
            userProfile = {
              ...profile.extraData.profile,
              user_id: userId,
            };
            console.log('Entrypoint ', userProfile);
          } else {
            // Invalid token, logout user
            await logoutUser();
            userToken = null;
            userId = null;
          }
        } catch (profileError) {
          console.log('Profile fetch error:', profileError);
          // Continue without profile, don't block app
        }
      }
    } catch (e) {
      console.log('Auth check error:', e);
    }

    dispatch({
      type: 'RESTORE_TOKEN',
      token: userToken,
      id: userId,
      userProfile: userProfile,
    });
  };

  React.useEffect(() => {
    checkAuthData();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        dispatch({ type: 'SIGN_IN', token: data.token, id: data.id });
      },
      signOut: async () => dispatch({ type: 'SIGN_OUT' }),
      updateUserProfile: async data => {
        dispatch({ type: 'USER_PROFILE', userProfile: data.userProfile });
      },
      // updateCartCount: async data => {
      //   dispatch({type: 'CART_COUNT', cartCount: data.cartCount});
      // },
    }),
    [],
  );

  // console.log(state);

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <AuthContext.Provider
        value={{
          authContext,
          userProfile: state.userProfile,
          // cartCount: state.cartCount,
        }}>
        {state.userToken == null || state.userId == null ? (
          <AuthNavigator />
        ) : (
          <AppNavigator />
        )}
      </AuthContext.Provider>
    </>
  );
}