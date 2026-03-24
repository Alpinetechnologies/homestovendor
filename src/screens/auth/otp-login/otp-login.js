import React, {useState} from 'react';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import {IMAGES} from '../../../constants/images';
import styles from './style';
import IconInput from '../../../components/icon-input';
import {COLORS} from '../../../constants/colors';
import CenterBtn from '../../../components/center-btn';
import Feather from 'react-native-vector-icons/Feather';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

export default function SignIn(props) {
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => props.navigation.goBack()}>
              <Feather name="arrow-left" size={20} color={COLORS.BLACK} />
            </TouchableOpacity>
          )}
          <Image source={IMAGES.LOGO} style={styles.logo} />
          <Text style={styles.title}>Login</Text>
          <Text style={styles.subTitle}>
            Enter your Phone Number we will send you an OTP for verification.
          </Text>
          <IconInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            icon="smartphone"
          />

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Forgot Password?</Text>
          </TouchableOpacity>

          <View style={{marginTop: 20}}>
            <CenterBtn
              title="SUBMIT"
              // onPress={() => props.navigation.navigate('OtpVerification')}
            />
          </View>
        </View>
        <View>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('OtpLogin')}>
            <Text style={styles.loginWith}>Login with Phone Number</Text>
          </TouchableOpacity>

          <View style={styles.orContainer}>
            <View style={styles.underline} />
            <Text style={styles.or}>or</Text>
            <View style={styles.underline} />
          </View>

          <Text style={styles.signInOptions}>Login with Social Networks</Text>

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.iconContainer}>
              <FontAwesome name="facebook" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <FontAwesome name="google" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <FontAwesome name="instagram" size={20} color={COLORS.WHITE} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>Dont't have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={styles.signUpHeading}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
