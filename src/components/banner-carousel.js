import React, { useState } from 'react';
import { View, Dimensions, StyleSheet, TouchableOpacity, Text } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ImageLoader from './image-loader';
import { COLORS } from '../constants/colors';

const { width } = Dimensions.get('window');

export default function BannerCarousel({ data, height = 180, showPagination = true, interval = 2500 }) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <ImageLoader image={'https://munnar.com/uploads/hotel_photos/1757765796_68c560a4e2d63.webp'} style={[styles.image, { height }]} />
            <View style={styles.bannerOverlay}>
                <View style={styles.descriptionContainer}>
                    <Text style={styles.bannerDescription} numberOfLines={2}>
                        {item.description || 'Exclusive deals on top-rated stays'}
                    </Text>
                </View>
                <TouchableOpacity style={styles.bookNowButton} activeOpacity={0.8}>
                    <Text style={styles.bookNowText}>Book Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );

    return (
        <View style={styles.container}>
            <Carousel
                loop
                width={width - 30}
                height={height}
                autoPlay={true}
                data={data}
                scrollAnimationDuration={interval}
                onSnapToItem={(index) => setCurrentIndex(index)}
                renderItem={renderItem}
                style={styles.carousel}
            />
            {showPagination &&
                <View style={styles.pagination}>
                    {data.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                currentIndex === index ? styles.activeDot : styles.inactiveDot,
                            ]}
                        />
                    ))}
                </View>
            }
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 10,
    },
    carousel: {
        borderRadius: 10,
        overflow: 'hidden',
    },
    itemContainer: {
        flex: 1,
        borderRadius: 10,
        overflow: 'hidden',
        marginHorizontal: 5
    },
    image: {
        width: '100%',
        resizeMode: 'cover',
    },
    pagination: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 4,
    },
    activeDot: {
        backgroundColor: COLORS.PRIMARY,
        width: 20,
    },
    inactiveDot: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
    },
    bannerOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        padding: 15,
        backgroundColor: 'rgba(0,0,0,0.1)', // Subtle overlay
    },
    descriptionContainer: {
        flex: 1,
        marginRight: 10,
    },
    bannerDescription: {
        color: COLORS.WHITE,
        fontSize: 14,
        fontWeight: '600',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: -1, height: 1 },
        textShadowRadius: 10,
    },
    bookNowButton: {
        backgroundColor: COLORS.WHITE,
        paddingHorizontal: 15,
        paddingVertical: 8,
        borderRadius: 5,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    bookNowText: {
        color: COLORS.BLACK,
        fontSize: 12,
        fontWeight: 'bold',
    },
});
