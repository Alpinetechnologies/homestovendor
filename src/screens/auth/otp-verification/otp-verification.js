import React, {useEffect, useState} from 'react';
import {View, Text, Image, StatusBar, TouchableOpacity} from 'react-native';
import styles from './style';

import {COLORS} from '../../../constants/colors';

import Feather from 'react-native-vector-icons/Feather';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import CustomBtn from '../../../components/custom-btn';
import {AuthContext} from '../../../../auth-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ICONS} from '../../../constants/icons';
import ActivityLoader from '../../../components/activity-loader';
import ToastAlertMsg from '../../../components/toast-alert-msg';

export default function OtpVerification(props) {
  const [isLoading, setIsLoading] = useState(false);

  const {signIn} = React.useContext(AuthContext).authContext;
  const onSubmit = async () => {
    try {
      signIn({token: 'accessToken', id: 'userId'});
      await AsyncStorage.setItem('userId', 'userId');
      await AsyncStorage.setItem('accessToken', 'accessToken');
      //  setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const [timer, setTimer] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);

  const [otp, setOtp] = useState(null);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />

      <View style={styles.topContainer}>
        <TouchableOpacity
          style={styles.backContainer}
          onPress={() => props.navigation.goBack()}>
          <Feather name="arrow-left" size={24} color={COLORS.BLACK} />
        </TouchableOpacity>

        <View style={styles.verifyimgContainer}>
          <Image source={ICONS.OTP} style={styles.verifyimg} />
        </View>
        <Text style={styles.title}>Verification Code</Text>
        <Text style={styles.subTitle}>
          We have to sent the code Verification to :{'\n'}
          <Text style={{color: COLORS.BLACK}}></Text>
        </Text>

        <View style={{marginBottom: 10}}>
          <OTPInputView
            style={styles.otpInput}
            pinCount={4}
            codeInputFieldStyle={styles.underlineStyleBase}
            codeInputHighlightStyle={styles.underlineStyleHighLighted}
            onCodeFilled={code => setOtp(code)}
            autoFocusOnLoad={false}
          />
        </View>
        <CustomBtn
          title="Verify"
          marginVertical={20}
          onPress={() => onSubmit()}
        />
      </View>
      {timer ? (
        <TouchableOpacity>
          <Text style={styles.resendCode}>Resend Code ?</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity>
          <Text style={styles.resendCode}>Resend Code in 00:{timeLeft}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}
