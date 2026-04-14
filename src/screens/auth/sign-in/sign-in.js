import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
} from 'react-native';
import { IMAGES } from '../../../constants/images';
import { COLORS } from '../../../constants/colors';
import { FONT_FAMILY } from '../../../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';
import IconLabelInput from '../../../components/icon-label-input';
import CustomBtn from '../../../components/custom-btn';
import { AuthContext } from '../../../../auth-context';
import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';
import API from '../../../action/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import baseStyle from './style';

const RESEND_TIMER = 30;
const OTP_LENGTH = 4;

function OtpInput({ value, onChange }) {
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const digit = text.replace(/[^0-9]/g, '').slice(-1);
    const arr = value.split('');
    arr[index] = digit;
    const next = arr.join('');
    onChange(next);
    if (digit && index < OTP_LENGTH - 1) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e, index) => {
    if (e.nativeEvent.key === 'Backspace' && !value[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  return (
    <View style={styles.otpRow}>
      {Array.from({ length: OTP_LENGTH }).map((_, i) => (
        <TextInput
          key={i}
          ref={ref => (inputs.current[i] = ref)}
          style={[styles.otpField, value[i] ? styles.otpFieldFilled : null]}
          value={value[i] || ''}
          onChangeText={text => handleChange(text, i)}
          onKeyPress={e => handleKeyPress(e, i)}
          keyboardType="number-pad"
          maxLength={1}
          autoFocus={i === 0}
          textContentType="oneTimeCode"
        />
      ))}
    </View>
  );
}

export default function SignIn(props) {
  const { signIn, updateUserProfile } = React.useContext(AuthContext).authContext;

  const [step, setStep] = useState('phone'); // 'phone' | 'otp'
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(RESEND_TIMER);
  const [canResend, setCanResend] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (step === 'otp') startTimer();
    return () => clearInterval(timerRef.current);
  }, [step]);

  const startTimer = () => {
    setTimeLeft(RESEND_TIMER);
    setCanResend(false);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timerRef.current);
          setCanResend(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleSendOtp = async () => {
    if (!phone || phone.trim().length < 10) {
      ToastAlertMsg('Please enter a valid 10-digit phone number');
      return;
    }
    setIsLoading(true);
    try {
      const res = await API.vendorLogin(phone.trim());
      if (res && res.success === 'true') {
        setStep('otp');
      } else {
        ToastAlertMsg(res?.msg || 'Failed to send OTP. Please try again.');
      }
    } catch (e) {
      ToastAlertMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (!otp || otp.length < 4) {
      ToastAlertMsg('Please enter the 4-digit OTP');
      return;
    }
    setIsLoading(true);
    try {
      const res = await API.vendorVerifyOtp(phone.trim(), otp);
      if (res && res.success === 'true' && res.user_status === '1') {
        await AsyncStorage.setItem('userId', res.user_id);
        await AsyncStorage.setItem('accessToken', res.token);

        try {
          const profile = await API.getUserProfile();
          updateUserProfile({
            userProfile: {
              ...profile.extraData.profile,
              user_id: res.user_id,
            },
          });
        } catch (profileError) {
          console.log('Profile fetch error:', profileError);
        }

        signIn({ token: res.token, id: res.user_id });

      } else {

        ToastAlertMsg(res?.msg || 'Hotel not registred.');
      }
    } catch (e) {
      ToastAlertMsg('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setOtp('');
    await handleSendOtp();
    startTimer();
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      {isLoading && <ActivityLoader isLoading={isLoading} />}

      <View style={baseStyle.container}>
        <View style={{ flex: 1 }}>
          {(Platform.OS === 'ios' || step === 'otp') && (
            <TouchableOpacity
              style={{ marginTop: 20 }}
              onPress={() => {
                if (step === 'otp') {
                  clearInterval(timerRef.current);
                  setOtp('');
                  setStep('phone');
                } else {
                  props.navigation.goBack();
                }
              }}>
              <Feather name="arrow-left" size={20} color={COLORS.BLACK} />
            </TouchableOpacity>
          )}

          <Image source={IMAGES.LOGO} style={baseStyle.logo} />
          <Text style={baseStyle.title}>Welcome To HOMESTO, Your Travel Partner</Text>

          {step === 'phone' ? (
            <>
              <Text style={baseStyle.subTitle}>Login with your phone number</Text>
              <IconLabelInput
                icon="phone"
                placeholder="Enter Phone Number"
                keyboardType="phone-pad"
                maxLength={10}
                defaultValue={phone}
                onChangeText={text => setPhone(text)}
              />
            </>
          ) : (
            <>
              <Text style={baseStyle.subTitle}>
                OTP sent to{' '}
                <Text style={{ color: COLORS.BLACK, fontFamily: FONT_FAMILY.primaryBold }}>
                  +91 {phone}
                </Text>
              </Text>

              <View style={styles.otpWrapper}>
                <OtpInput value={otp} onChange={setOtp} />
              </View>

              <View style={styles.resendRow}>
                {canResend ? (
                  <TouchableOpacity onPress={handleResendOtp}>
                    <Text style={styles.resendLink}>Resend OTP</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.resendTimer}>
                    Resend OTP in{' '}
                    <Text style={{ color: COLORS.BLACK }}>
                      00:{timeLeft < 10 ? `0${timeLeft}` : timeLeft}
                    </Text>
                  </Text>
                )}
              </View>
            </>
          )}
        </View>

        <View>
          <CustomBtn
            title={step === 'phone' ? 'SEND OTP' : 'VERIFY & LOGIN'}
            onPress={step === 'phone' ? handleSendOtp : handleVerifyOtp}
          />
        </View>

        {/* <View style={baseStyle.signUpContainer}>
          <Text style={baseStyle.signUp}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignUp')}>
            <Text style={baseStyle.signUpHeading}>Sign Up</Text>
          </TouchableOpacity>
        </View> */}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  otpWrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
  },
  otpField: {
    width: 54,
    height: 58,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: COLORS.LIGHT_GREY,
    textAlign: 'center',
    color: COLORS.BLACK,
    fontSize: 22,
    fontFamily: FONT_FAMILY.primaryBold,
    backgroundColor: '#F8F9FA',
  },
  otpFieldFilled: {
    borderColor: COLORS.PRIMARY,
    backgroundColor: '#fff',
  },
  resendRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendTimer: {
    fontSize: 13,
    color: COLORS.GREY,
    fontFamily: FONT_FAMILY.primary,
  },
  resendLink: {
    fontSize: 13,
    color: COLORS.PRIMARY,
    fontFamily: FONT_FAMILY.primaryBold,
  },
});
