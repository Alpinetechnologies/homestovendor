import React, {useState} from 'react';
import {View} from 'react-native';
import API from '../../../../action/api';
import ActivityLoader from '../../../../components/activity-loader';
import AlertMsg from '../../../../components/alert-msg';
import CustomBtn from '../../../../components/custom-btn';
import IconInput from '../../../../components/icon-input';
import styles from './style';

export default function EditProfile(props) {
  const userProfile = props.route.params;

  const [isLoading, setIsLoading] = useState(false);
  const [emailId, setEmailId] = useState(userProfile.email);
  const [username, setUsername] = useState(userProfile.username);
  const [name, setName] = useState(userProfile.name);
  const [phoneNo, setPhoneNo] = useState(userProfile.phone);

  async function onSubmit() {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (name && name.toString().trim().length > 0) {
      if (username && username.toString().trim().length > 0) {
        if (reg.test(emailId) === true) {
          setIsLoading(true);

          const data = await API.setUserProfile(
            name,
            emailId,
            username,
            userProfile.password,
          );

          if (data.success === 'true') {
            setIsLoading(false);
            AlertMsg('Profile Updated Successfully');
            props.navigation.goBack();
          } else {
            setIsLoading(false);
            AlertMsg('Something Went Wrong..');
          }
        } else {
          AlertMsg('Please Enter Valid Email Id.');
        }
      } else {
        AlertMsg('Please Enter Username.');
      }
    } else {
      AlertMsg('Please Enter Your Name.');
    }
  }
  return (
    <View style={styles.container}>
      {isLoading && <ActivityLoader isLoading={isLoading} />}
      <View>
        <IconInput
          placeholder="Enter Name"
          icon={'user'}
          defaultValue={name}
          onChangeText={text => setName(text)}
        />

        <IconInput
          placeholder="Enter Mobile Number"
          icon={'smartphone'}
          onChangeText={text => setPhoneNo(text)}
          editable={false}
          keyboardType="number-pad"
          defaultValue={phoneNo}
        />
        <IconInput
          placeholder="Enter Username"
          icon="user"
          defaultValue={username}
          onChangeText={text => setUsername(text)}
          keyboardType="email-address"
        />
        <IconInput
          placeholder="Enter Email Address"
          icon={'mail'}
          defaultValue={emailId}
          onChangeText={text => setEmailId(text)}
          keyboardType="email-address"
        />
      </View>

      <CustomBtn
        title="SAVE CHANGES"
        onPress={() => onSubmit()}
        marginVertical={15}
      />
    </View>
  );
}
