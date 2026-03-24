import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
} from 'react-native';
import {IMAGES} from '../../../constants/images';
import styles from './style';
import {COLORS} from '../../../constants/colors';
import Feather from 'react-native-vector-icons/Feather';
import IconLabelInput from '../../../components/icon-label-input';
import CustomBtn from '../../../components/custom-btn';

export default function ForgotPassword(props) {
  const [isLoading, setIsLoading] = useState(false);
  const [phoneNo, setPhoneNo] = useState(null);

  const onSubmit = async () => {
    try {
      props.navigation.navigate('OtpVerification', {
        phoneNo,
        forgotPassword: true,
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      <View style={styles.container}>
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => props.navigation.goBack()}>
              <Feather name="arrow-left" size={20} color={COLORS.BLACK} />
            </TouchableOpacity>
          )}
          <Image source={IMAGES.LOGO} style={styles.logo} />
          <Text style={styles.title}>Forgot Password</Text>
          <Text style={styles.subTitle}>
            Please enter your registered mobile number for the verification
            process. We will send you an OTP to verify.
          </Text>
          <IconLabelInput
            placeholder="Phone Number"
            keyboardType="number-pad"
            icon="smartphone"
          />

          <View style={{marginTop: 30}}>
            <CustomBtn title="Send OTP" onPress={() => onSubmit()} />
          </View>
        </View>

        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>Remember Password? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.signUpHeading}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}
