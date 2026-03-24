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
import {AuthContext} from '../../../../auth-context';

import ToastAlertMsg from '../../../components/toast-alert-msg';
import ActivityLoader from '../../../components/activity-loader';
import API from '../../../action/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignIn(props) {
  const {signIn} = React.useContext(AuthContext).authContext;

  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = async () => {
    try {
      //  let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
      if (email && email.toString().trim().length > 0) {
        if (password && password.toString().trim().length > 0) {
          setIsLoading(true);
          const data = await API.getLoginViaEmail(email, password);
          console.log(data);

          if (data && data.success === 'true') {
            await AsyncStorage.setItem('userId', data.user_id);
            await AsyncStorage.setItem('accessToken', data.token);
            signIn({token: data.token, id: data.user_id});
            setIsLoading(false);
          } else {
            setIsLoading(false);
            ToastAlertMsg(data?.msg || 'Invalid UserName or Password.');
          }
        } else {
          ToastAlertMsg('Please Enter Password');
        }
      } else {
        ToastAlertMsg('Please Enter Valid UserName');
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      ToastAlertMsg('Login failed. Please try again.');
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
          <Text style={styles.title}>
            Welcome To HOMESTO, Your Travel Partner
          </Text>
          <Text style={styles.subTitle}>Admin Login / Signup</Text>

          <IconLabelInput
            icon="mail"
            placeholder="Enter UserName"
            defaultValue={email}
            onChangeText={text => setEmail(text)}
          />
          <IconLabelInput
            icon="lock"
            placeholder="Password"
            secureTextEntry={true}
            defaultValue={password}
            onChangeText={text => setPassword(text)}
          />

          {/*  <View style={{marginTop: 25}}>
            <CustomBtn
              title="SUBMIT"
              // onPress={() => props.navigation.navigate('OtpVerification')}
              onPress={() => checkInput()}
            />
          </View> */}
        </View>
        <View>
          <CustomBtn title="SUBMIT" onPress={() => onSubmit()} />
          {/*  <Text style={styles.signInOptions}>Or using other method</Text>

          <View style={styles.flexRow}>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={ICONS.GOOGLE} style={{height: 20, width: 20}} />
              <Text style={styles.btnTxt}>Login/Sign Up with Google</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconContainer}>
              <Image source={ICONS.FB} style={{height: 20, width: 20}} />
              <Text style={styles.btnTxt}>Login/Sign Up with Facebook</Text>
            </TouchableOpacity>
          </View> */}
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