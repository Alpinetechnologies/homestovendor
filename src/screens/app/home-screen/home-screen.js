import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { AuthContext } from '../../../../auth-context';
import API from '../../../action/api';

export default function HomeScreen() {
  const { userProfile } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalHotels: 6,
    totalRooms: 180,
    occupiedRooms: 120,
    availableRooms: 60,
  });

  useEffect(() => {
    const fetchOrders = async () => {
      if (userProfile?.user_id) {
        try {
          const res = await API.getOrdersByVendorId(userProfile.user_id);
          if (res && res.success === 'true') {
            // Assuming res.extraData contains the orders or the dashboard stats
            // For now, let's just count the orders if extraData is an array
            const ordersCount = Array.isArray(res.extraData) ? res.extraData.length : 0;
            setDashboardData(prev => ({
              ...prev,
              totalBookings: ordersCount,
            }));
          }
        } catch (error) {
          console.log('Error fetching orders:', error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    console.log('userProfile?.user_id', userProfile?.user_id);
    fetchOrders();
  }, [userProfile?.user_id]);

  const occupancyRate = Math.round(
    (dashboardData.occupiedRooms / dashboardData.totalRooms) * 100
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

      {isLoading ? (
        <ActivityIndicator size="large" color="#2E86DE" style={{ marginTop: 50 }} />
      ) : (
        <>
          {/* 🔹 Row 1 */}
          <View style={styles.row}>
            <Card title="Total Bookings" value={dashboardData.totalBookings} />
            <Card title="Hotels" value={dashboardData.totalHotels} />
          </View>

          {/* 🔹 Row 2 */}
          <View style={styles.row}>
            <Card title="Total Rooms" value={dashboardData.totalRooms} />
            <Card title="Occupied Rooms" value={dashboardData.occupiedRooms} />
          </View>

          {/* 🔹 Row 3 */}
          <View style={styles.row}>
            <Card title="Available Rooms" value={dashboardData.availableRooms} />
            <Card title="Occupancy %" value={`${occupancyRate}%`} />
          </View>
        </>
      )}

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