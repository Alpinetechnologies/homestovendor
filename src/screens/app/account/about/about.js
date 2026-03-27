import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { COLORS } from '../../../../constants/colors';
import { FONT_FAMILY } from '../../../../constants/font-family';

export default function About() {
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={{ padding: 20 }}>
                <Text style={styles.title}>About HOMESTO</Text>
                <Text style={styles.content}>
                    HOMESTO is your trusted travel partner, providing the best accommodation and travel experiences.
                    Our platform connects vendors with travelers seamlessly, ensuring quality and comfort in every stay.
                </Text>
                <Text style={styles.content}>
                    Version: 1.0.0
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
