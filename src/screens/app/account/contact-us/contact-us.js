import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/font-family';
import Feather from 'react-native-vector-icons/Feather';

export default function ContactUs() {
    const ContactItem = ({ icon, title, value }) => (
        <View style={styles.item}>
            <Feather name={icon} size={20} color={COLORS.PRIMARY} style={{ marginRight: 15 }} />
            <View>
                <Text style={styles.label}>{title}</Text>
                <Text style={styles.value}>{value}</Text>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.title}>Contact Us</Text>
                <ContactItem icon="mail" title="Email" value="support@homesto.in" />
                <ContactItem icon="phone" title="Phone" value="+91 1234567890" />
                <ContactItem icon="map-pin" title="Address" value="Sector 62, Noida, UP, India" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.WHITE,
    },
    title: {
        fontSize: 22,
        fontFamily: FONT_FAMILY.primaryBold,
        color: COLORS.BLACK,
        marginBottom: 30,
    },
    item: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 25,
    },
    label: {
        fontSize: 12,
        color: COLORS.GREY,
        fontFamily: FONT_FAMILY.primary,
    },
    value: {
        fontSize: 16,
        color: COLORS.BLACK,
        fontFamily: FONT_FAMILY.primaryMedium,
        marginTop: 2,
    },
});
