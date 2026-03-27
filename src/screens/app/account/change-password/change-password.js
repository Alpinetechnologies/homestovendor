import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import IconLabelInput from '../../../../components/icon-label-input';
import CustomBtn from '../../../../components/custom-btn';
import API from '../../../../action/api';
import ToastAlertMsg from '../../../../components/toast-alert-msg';
import ActivityLoader from '../../../../components/activity-loader';

export default function ChangePassword(props) {
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if (!password) {
            ToastAlertMsg('Please enter new password');
            return;
        }

        setIsLoading(true);
        try {
            const res = await API.setChangePassword(password);
            if (res && res.success === 'true') {
                ToastAlertMsg('Password changed successfully');
                props.navigation.goBack();
            } else {
                let errorMsg = res?.msg || 'Failed to change password.';
                if (res?.extraData) {
                    if (typeof res.extraData === 'object') {
                        errorMsg = Object.values(res.extraData).join(', ');
                    } else {
                        errorMsg = res.extraData;
                    }
                }
                ToastAlertMsg(errorMsg);
            }
        } catch (error) {
            console.log(error);
            ToastAlertMsg('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            {isLoading && <ActivityLoader isLoading={isLoading} />}
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <IconLabelInput
                    placeholder="Enter New Password"
                    icon="lock"
                    secureText={true}
                    onChangeText={setPassword}
                />
                <View style={{ marginTop: 30 }}>
                    <CustomBtn title="UPDATE PASSWORD" onPress={onSubmit} />
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
});
