import React, { useEffect, useState, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Image, Linking, Alert, RefreshControl } from 'react-native';
import { AuthContext } from '../../../../auth-context';
import API from '../../../action/api';

export default function HomeScreen() {
  const { userProfile } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('ongoing'); // 'ongoing' or 'past'
  const [ongoingOrders, setOngoingOrders] = useState([]);
  const [pastOrders, setPastOrders] = useState([]);
  const [checkoutLoading, setCheckoutLoading] = useState(null); // stores order_id being processed
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    totalBookings: 0,
    totalHotels: 6,
    totalRooms: 180,
    occupiedRooms: 120,
    availableRooms: 60,
  });

  const fetchOrders = async ({ silent = false } = {}) => {
    try {
      const res = await API.getOrdersByVendorId(userProfile?.user_id);
      if (res && res.success === 'true' && typeof res.extraData === 'object') {
        const ongoing = res.extraData.ongoing_bookings || [];
        const past = res.extraData.past_cancel_bookings || [];
        setOngoingOrders(ongoing);
        setPastOrders(past);
        setDashboardData(prev => ({
          ...prev,
          totalBookings: ongoing.length + past.length,
        }));
      } else {
        // success: "false" or extraData is "No order Found" string — clear lists
        setOngoingOrders([]);
        setPastOrders([]);
      }
    } catch (error) {
      console.log('Error fetching orders:', error);
      if (!silent) Alert.alert('Error', 'Failed to load orders. Please try again.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (userProfile?.user_id) fetchOrders();
    else setIsLoading(false);
  }, [userProfile?.user_id]);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchOrders({ silent: true });
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    fetchOrders({ silent: true });
  };

  const handleCheckout = (orderId) => {
    Alert.alert(
      'Confirm Check-out',
      'Are you sure you want to mark this booking as checked out?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Yes, Check-out',
          style: 'destructive',
          onPress: async () => {
            setCheckoutLoading(orderId);
            try {
              const res = await API.setMarkAsCheckout(orderId);
              if (res && res.success === 'true') {
                Alert.alert('Success', 'Booking marked as checked out.');
                setOngoingOrders(prev => prev.filter(o => o.order_id !== orderId));
              } else {
                const errMsg = typeof res?.extraData === 'string'
                  ? res.extraData
                  : res?.msg || 'Failed to mark as check-out.';
                Alert.alert('Error', errMsg);
              }
            } catch (e) {
              Alert.alert('Error', 'Something went wrong. Please try again.');
            } finally {
              setCheckoutLoading(null);
            }
          },
        },
      ],
    );
  };

  const occupancyRate = Math.round(
    (dashboardData.occupiedRooms / dashboardData.totalRooms) * 100
  );

  const SummaryCard = ({ title, value }) => (
    <View style={styles.summaryCard}>
      <Text style={styles.summaryValue}>{value}</Text>
      <Text style={styles.summaryTitle}>{title}</Text>
    </View>
  );

  const BookingCard = ({ item, onCheckout, isCheckingOut }) => (
    <View style={styles.bookingCard}>
      <View style={styles.cardHeader}>
        {item.image && item.image.length > 0 && (
          <Image
            source={{ uri: item.image[0] }}
            style={styles.hotelImage}
            resizeMode="cover"
          />
        )}
        <View style={styles.headerInfo}>
          <Text style={styles.hotelName} numberOfLines={1}>{item.hotel_name}</Text>
          <Text style={styles.orderId}>Order ID: #{item.order_id}</Text>
        </View>
        <View style={[styles.statusBadge, { backgroundColor: item.order_status === 'Pending' ? '#FFEAA7' : '#DFF9FB' }]}>
          <Text style={[styles.statusText, { color: item.order_status === 'Pending' ? '#F1C40F' : '#22A6B3' }]}>
            {item.order_status}
          </Text>
        </View>
      </View>

      <View style={styles.cardBody}>
        <View style={styles.infoRow}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Check In</Text>
            <Text style={styles.infoValue}>{item.check_in_date}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Check Out</Text>
            <Text style={styles.infoValue}>{item.check_out_date}</Text>
          </View>
        </View>

        <View style={styles.addressContainer}>
          <Text style={styles.infoLabel}>Address</Text>
          <Text style={styles.addressText} numberOfLines={2}>
            {item.address}, {item.city}, {item.state}
          </Text>
        </View>

        {item.g_map_link && (
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => Linking.openURL(item.g_map_link)}
          >
            <Text style={styles.mapButtonText}>View on Map</Text>
          </TouchableOpacity>
        )}
      </View>


      <View style={styles.cardFooter}>
        <TouchableOpacity
          style={[styles.actionButton, isCheckingOut && styles.actionButtonDisabled]}
          onPress={onCheckout}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.actionButtonText}>Mark as Check-out</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderContent = () => {
    const data = activeTab === 'ongoing' ? ongoingOrders : pastOrders;

    if (data.length === 0) {
      return (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No data found</Text>
        </View>
      );
    }

    return data.map((item, index) => (
      <BookingCard
        key={item.order_id || index}
        item={item}
        onCheckout={() => handleCheckout(item.order_id)}
        isCheckingOut={checkoutLoading === item.order_id}
      />
    ));
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={handleRefresh}
          colors={['#2E86DE']}
          tintColor="#2E86DE"
        />
      }
    >
      <Text style={styles.heading}>Vendor Dashboard</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2E86DE" style={{ marginTop: 50 }} />
      ) : (
        <>
          {/* Dashboard Summary */}
          <View style={styles.row}>
            <SummaryCard title="Total Bookings" value={dashboardData.totalBookings} />
            <SummaryCard title="Occ. Rate" value={`${occupancyRate}%`} />
          </View>

          {/* Tabs */}
          <View style={styles.tabContainer}>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
              onPress={() => setActiveTab('ongoing')}
            >
              <Text style={[styles.tabText, activeTab === 'ongoing' && styles.activeTabText]}>Ongoing</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.tab, activeTab === 'past' && styles.activeTab]}
              onPress={() => setActiveTab('past')}
            >
              <Text style={[styles.tabText, activeTab === 'past' && styles.activeTabText]}>Past / Cancelled</Text>
            </TouchableOpacity>
          </View>

          {/* List Content */}
          <View style={styles.listContainer}>
            {renderContent()}
          </View>

          {/* Load More */}
          <TouchableOpacity
            style={[styles.loadMoreButton, isLoadingMore && styles.loadMoreButtonDisabled]}
            onPress={handleLoadMore}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <ActivityIndicator size="small" color="#2E86DE" />
            ) : (
              <Text style={styles.loadMoreText}>Load More</Text>
            )}
          </TouchableOpacity>
        </>
      )}
      <View style={{ height: 30 }} />
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
    marginBottom: 20,
  },
  summaryCard: {
    flex: 1,
    backgroundColor: '#fff',
    marginHorizontal: 5,
    padding: 15,
    borderRadius: 12,
    elevation: 3,
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  summaryTitle: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#E1E8EE',
    borderRadius: 10,
    padding: 4,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#fff',
    elevation: 2,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#2E86DE',
  },
  listContainer: {
    paddingBottom: 20,
  },
  bookingCard: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    paddingBottom: 10,
    marginBottom: 10,
  },
  hotelImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 10,
  },
  headerInfo: {
    flex: 1,
  },
  hotelName: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  orderId: {
    fontSize: 11,
    color: '#777',
    marginTop: 1,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardBody: {
    marginTop: 2,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  addressContainer: {
    marginBottom: 12,
  },
  addressText: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    marginTop: 2,
  },
  mapButton: {
    backgroundColor: '#F0F7FF',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 5,
  },
  mapButtonText: {
    color: '#2E86DE',
    fontSize: 13,
    fontWeight: 'bold',
  },
  cardFooter: {
    marginTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
    paddingTop: 12,
  },
  actionButton: {
    backgroundColor: '#2E86DE',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  actionButtonDisabled: {
    backgroundColor: '#A0C4F1',
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  loadMoreButton: {
    marginVertical: 10,
    paddingVertical: 12,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#2E86DE',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
    backgroundColor: '#fff',
  },
  loadMoreButtonDisabled: {
    borderColor: '#A0C4F1',
  },
  loadMoreText: {
    color: '#2E86DE',
    fontSize: 14,
    fontWeight: '700',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    fontStyle: 'italic',
  },
});