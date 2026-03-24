import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function HomeScreen() {

  // ✅ Dummy Data
  const dashboard = {
    totalBookings: 124,
    totalHotels: 6,
    totalRooms: 180,
    occupiedRooms: 120,
    availableRooms: 60,
  };

  const occupancyRate = Math.round(
    (dashboard.occupiedRooms / dashboard.totalRooms) * 100
  );

  const Card = ({ title, value }) => (
    <View style={styles.card}>
      <Text style={styles.value}>{value}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );

  return (
    <ScrollView style={styles.container}>

      <Text style={styles.heading}>Vendor Dashboard</Text>

      {/* 🔹 Row 1 */}
      <View style={styles.row}>
        <Card title="Total Bookings" value={dashboard.totalBookings} />
        <Card title="Hotels" value={dashboard.totalHotels} />
      </View>

      {/* 🔹 Row 2 */}
      <View style={styles.row}>
        <Card title="Total Rooms" value={dashboard.totalRooms} />
        <Card title="Occupied Rooms" value={dashboard.occupiedRooms} />
      </View>

      {/* 🔹 Row 3 */}
      <View style={styles.row}>
        <Card title="Available Rooms" value={dashboard.availableRooms} />
        <Card title="Occupancy %" value={`${occupancyRate}%`} />
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
    padding: 15,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#222',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    padding: 20,
    borderRadius: 15,
    elevation: 4,
    alignItems: 'center',
  },
  value: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  title: {
    fontSize: 13,
    color: '#666',
    marginTop: 5,
    textAlign: 'center',
  },
});