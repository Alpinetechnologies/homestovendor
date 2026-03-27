import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/font-family';

export default function TermsConditions() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.title}>Terms & Conditions</Text>
                <Text style={styles.content}>
                    1. By using this application, you agree to our terms of service.
                </Text>
                <Text style={styles.content}>
                    2. Vendors must provide accurate information about their properties.
                </Text>
                <Text style={styles.content}>
                    3. All bookings made through the platform are subject to our cancellation policy.
                </Text>
                <Text style={styles.content}>
                    4. We reserve the right to suspend accounts that violate our community guidelines.
                </Text>
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
        marginBottom: 20,
    },
    content: {
        fontSize: 14,
        fontFamily: FONT_FAMILY.primary,
        color: COLORS.BLACK,
        lineHeight: 22,
        marginBottom: 15,
    },
});
