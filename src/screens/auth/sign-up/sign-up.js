import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import {IMAGES} from '../../../constants/images';
import styles from './style';

import {COLORS} from '../../../constants/colors';

import Feather from 'react-native-vector-icons/Feather';

import IconLabelInput from '../../../components/icon-label-input';
import CustomBtn from '../../../components/custom-btn';

import SignUpModalAlert from '../../../components/signup-modal-alert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {AuthContext} from '../../../../auth-context';
import ToastAlertMsg from '../../../components/toast-alert-msg';

import ActivityLoader from '../../../components/activity-loader';
import API from '../../../action/api';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignUp(props) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [phone, setPhone] = useState(null);
  const [password, setPassword] = useState(null);
  const [userName, setUserName] = useState(null);

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

  const onValidate = async () => {
    try {
      if (name && name.toString().trim().length > 0) {
        if (email && email.toString().trim().length > 0) {
          if (userName && userName.toString().trim().length > 0) {
            if (password && password.toString().trim().length > 0) {
              onRegistration();
            } else {
              ToastAlertMsg('Please Enter Your Password');
            }
          } else {
            ToastAlertMsg('Please Enter Admin Name');
          }
        } else {
          ToastAlertMsg('Please Enter Your Email');
        }
      } else {
        ToastAlertMsg('Please Enter Your Name');
      }
    } catch (error) {
      alert(error);
    }
  };

  const onRegistration = async () => {
    try {
      setIsLoading(true);

      const data = await API.setRegistrationData(
        name,
        email,
        phone,
        password,
        userName,
      );
      console.log(data);

      if (data && data.success === 'true') {
        ToastAlertMsg(data.extraData || 'Registration successful!');
        setIsLoading(false);
        props.navigation.goBack();
      } else {
        setIsLoading(false);
        ToastAlertMsg(data?.msg || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAlertMsg('Registration failed. Please try again.');
    }
  };

  return (
    <>
      <StatusBar
        translucent={true}
        backgroundColor={'transparent'}
        barStyle="dark-content"
      />
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <ScrollView style={styles.container}>
        <View style={{flex: 1}}>
          {Platform.OS === 'ios' && (
            <TouchableOpacity
              style={{marginTop: 20}}
              onPress={() => props.navigation.goBack()}>
              <Feather name="arrow-left" size={20} color={COLORS.BLACK} />
            </TouchableOpacity>
          )}
          <Image source={IMAGES.LOGO} style={styles.logo} />
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subTitle}>
            Submit your details to creae an account
          </Text>
          <IconLabelInput
            placeholder="Name"
            icon="user"
            defaultValue={name}
            onChangeText={text => setName(text)}
          />

          <IconLabelInput
            placeholder="Email ID"
            icon="mail"
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />

          <IconLabelInput
            placeholder="Phone Number"
            icon="smartphone"
            defaultValue={phone}
            onChangeText={text => setPhone(text)}
            maxLength={10}
            keyboardType="phone-pad"
          />

          <IconLabelInput
            placeholder="Admin Name"
            icon="user"
            defaultValue={userName}
            onChangeText={text => setUserName(text)}
          />
          <IconLabelInput
            placeholder="Password"
            icon="lock"
            secureText={true}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          <View style={{marginTop: 30}}>
            <CustomBtn title="Create Account" onPress={() => onValidate()} />
          </View>
        </View>
        {/*  <View>
          <Text style={styles.signInOptions}>Or using other method</Text>

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={ICONS.GOOGLE} style={{height: 20, width: 20}} />
              <Text style={styles.btnTxt}>Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={ICONS.FB} style={{height: 20, width: 20}} />
              <Text style={styles.btnTxt}>Sign Up with Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.signUpContainer}>
          <Text style={styles.signUp}>Already have an account? </Text>
          <TouchableOpacity onPress={() => props.navigation.navigate('SignIn')}>
            <Text style={styles.signUpHeading}>Sign In</Text>
          </TouchableOpacity>
        </View> */}
      </ScrollView>

      <SignUpModalAlert
        isVisible={isModalVisible}
        btnTxt="Login & Continue"
        txt="Congratulations! your account has been created successfuly."
        heading="Register Success"
        isHideRedBtn={true}
        onSkip={() => [setModalVisible(!isModalVisible), onSubmit()]}
      />
    </>
  );
}