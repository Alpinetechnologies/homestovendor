import {ToastAndroid, AlertIOS, Platform} from 'react-native';

export default function ToastAlertMsg(msg) {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
}
