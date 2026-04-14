import React, { useState, useEffect, useCallback, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../../auth-context';
import API from '../../action/api';

interface WalletTransaction {
  id: string;
  user_id: string;
  opening_bal: number;
  amt_credited: string;
  amt_debited: string;
  order_id: string;
  check_in_date: string;
  check_out_date: string;
  date_time: string;
  transaction_id: string;
  closing_bal: number;
  status: string;
}

interface WithdrawRequest {
  id: string;
  vendor_id: string;
  amt: string;
  status: string;
  date_time: string;
  remarks?: string;
}

type TabType = 'history' | 'withdrawal';

const WalletScreen = () => {
  const { userProfile } = useContext(AuthContext);

  const [activeTab, setActiveTab] = useState<TabType>('history');
  const [walletAmt, setWalletAmt] = useState<number>(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [withdrawRequests, setWithdrawRequests] = useState<WithdrawRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isWithdrawLoading, setIsWithdrawLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmt, setWithdrawAmt] = useState('');

  const fetchWallet = async (silent = false) => {
    try {
      const res = await API.getUserProfile();
      if (res && res.success === 'true' && typeof res.extraData === 'object') {
        setWalletAmt(res.extraData.profile.available_wallet_amt ?? 0);
        setTransactions(res.extraData.profile.wallet_history ?? []);
      } else {
        setWalletAmt(0);
        setTransactions([]);
        if (!silent) {
          const msg = typeof res?.extraData === 'string' ? res.extraData : res?.msg || 'Failed to load wallet.';
          Alert.alert('Error', msg);
        }
      }
    } catch (e) {
      if (!silent) Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  const fetchWithdrawRequests = async (silent = false) => {
    setIsWithdrawLoading(true);
    try {
      const res = await API.getWithdrawRequests();
      if (res && (res.success === 'true' || res.success === true)) {
        const data = Array.isArray(res.extraData) ? res.extraData : [];
        setWithdrawRequests(data);
      } else {
        setWithdrawRequests([]);
        if (!silent) {
          const msg = typeof res?.extraData === 'string' ? res.extraData : res?.msg || 'Failed to load requests.';
          Alert.alert('Error', msg);
        }
      }
    } catch (e) {
      if (!silent) Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsWithdrawLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchWallet();
  }, []);

  useEffect(() => {
    if (activeTab === 'withdrawal') {
      fetchWithdrawRequests(true);
    }
  }, [activeTab]);

  const handleWithdraw = () => {
    if (walletAmt <= 0) {
      Alert.alert('Insufficient Balance', 'No balance available to withdraw.');
      return;
    }
    setWithdrawAmt('');
    setShowWithdrawModal(true);
  };

  const confirmWithdraw = async () => {
    const entered = parseFloat(withdrawAmt);
    if (!withdrawAmt || isNaN(entered) || entered <= 0) {
      Alert.alert('Invalid Amount', 'Please enter a valid amount.');
      return;
    }
    if (entered > walletAmt) {
      Alert.alert('Insufficient Balance', `Maximum withdrawable amount is ₹${walletAmt}.`);
      return;
    }
    setShowWithdrawModal(false);
    setWithdrawing(true);
    try {
      const res = await API.raiseWithdrawRequest(entered);
      if (res && res.success === 'true') {
        Alert.alert('Success', res.msg || 'Withdrawal request raised successfully.');
        fetchWithdrawRequests(true);
      } else {
        const msg = typeof res?.extraData === 'string' ? res.extraData : res?.msg || 'Failed to raise request.';
        Alert.alert('Error', msg);
      }
    } catch {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setWithdrawing(false);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    if (activeTab === 'history') {
      fetchWallet(true);
    } else {
      fetchWithdrawRequests(true);
    }
  }, [activeTab]);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return dateStr.replace('T', ' ').split('.')[0];
  };

  const getWithdrawStatusLabel = (status: string) => {
    switch (status) {
      case '1': return { label: 'Approved', bg: '#E8F8F0', color: '#27AE60' };
      case '2': return { label: 'Rejected', bg: '#FEECEC', color: '#E74C3C' };
      default:  return { label: 'Pending',  bg: '#FFF3E0', color: '#F39C12' };
    }
  };

  // ── Transaction History card ──────────────────────────────────────
  const renderTransaction = ({ item }: { item: WalletTransaction }) => {
    const isCredited = parseFloat(item.amt_credited) > 0;
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <Text style={styles.orderLabel}>Order #{item.order_id}</Text>
          <Text style={[styles.amount, { color: isCredited ? '#27AE60' : '#E74C3C' }]}>
            {isCredited ? `+₹${item.amt_credited}` : `-₹${item.amt_debited}`}
          </Text>
        </View>

        <View style={styles.divider} />

        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.metaLabel}>Opening Bal</Text>
            <Text style={styles.metaValue}>₹{item.opening_bal}</Text>
          </View>
          <View style={[styles.halfBlock, { alignItems: 'flex-end' }]}>
            <Text style={styles.metaLabel}>Closing Bal</Text>
            <Text style={[styles.metaValue, { fontWeight: '700', color: '#2E86DE' }]}>₹{item.closing_bal}</Text>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfBlock}>
            <Text style={styles.metaLabel}>Check-in</Text>
            <Text style={styles.metaValue}>{formatDate(item.check_in_date)}</Text>
          </View>
          <View style={[styles.halfBlock, { alignItems: 'flex-end' }]}>
            <Text style={styles.metaLabel}>Check-out</Text>
            <Text style={styles.metaValue}>{formatDate(item.check_out_date)}</Text>
          </View>
        </View>

        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={styles.metaSmall}>{formatDate(item.date_time)}</Text>
          <View style={[styles.badge, item.status === '1' ? styles.badgeSuccess : styles.badgePending]}>
            <Text style={[styles.badgeText, { color: item.status === '1' ? '#27AE60' : '#F39C12' }]}>
              {item.status === '1' ? 'Completed' : 'Pending'}
            </Text>
          </View>
        </View>

        {!!item.transaction_id && (
          <Text style={styles.txnId}>Txn: {item.transaction_id}</Text>
        )}
      </View>
    );
  };

  // ── Withdrawal Request card ───────────────────────────────────────
  const renderWithdrawRequest = ({ item }: { item: WithdrawRequest }) => {
    const { label, bg, color } = getWithdrawStatusLabel(item.status);
    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View>
            <Text style={styles.orderLabel}>Withdrawal Request</Text>
            {!!item.id && <Text style={styles.metaSmall}>ID: #{item.id}</Text>}
          </View>
          <Text style={[styles.amount, { color: '#E74C3C' }]}>-₹{item.amt}</Text>
        </View>

        <View style={styles.divider} />

        <View style={[styles.row, { marginTop: 2 }]}>
          <Text style={styles.metaSmall}>{formatDate(item.date_time)}</Text>
          <View style={[styles.badge, { backgroundColor: bg }]}>
            <Text style={[styles.badgeText, { color }]}>{label}</Text>
          </View>
        </View>

        {!!item.remarks && (
          <Text style={[styles.metaSmall, { marginTop: 6, color: '#888' }]}>
            Remarks: {item.remarks}
          </Text>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No data found.</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.balanceLabel}>Available Balance</Text>
        <Text style={styles.balanceAmount}>₹{walletAmt}</Text>
        <TouchableOpacity
          style={styles.withdrawBtn}
          onPress={handleWithdraw}
          disabled={withdrawing}
          activeOpacity={0.8}
        >
          {withdrawing ? (
            <ActivityIndicator size="small" color="#2E86DE" />
          ) : (
            <Text style={styles.withdrawBtnText}>Withdraw</Text>
          )}
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'history' && styles.tabActive]}
          onPress={() => setActiveTab('history')}
        >
          <Text style={[styles.tabText, activeTab === 'history' && styles.tabTextActive]}>
            Transaction History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'withdrawal' && styles.tabActive]}
          onPress={() => setActiveTab('withdrawal')}
        >
          <Text style={[styles.tabText, activeTab === 'withdrawal' && styles.tabTextActive]}>
            Withdrawal
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      {activeTab === 'history' ? (
        isLoading ? (
          <ActivityIndicator size="large" color="#2E86DE" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={transactions}
            keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
            renderItem={renderTransaction}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={transactions.length === 0 ? styles.emptyList : styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2E86DE']} tintColor="#2E86DE" />
            }
          />
        )
      ) : (
        isWithdrawLoading ? (
          <ActivityIndicator size="large" color="#2E86DE" style={{ marginTop: 40 }} />
        ) : (
          <FlatList
            data={withdrawRequests}
            keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
            renderItem={renderWithdrawRequest}
            ListEmptyComponent={renderEmpty}
            contentContainerStyle={withdrawRequests.length === 0 ? styles.emptyList : styles.list}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#2E86DE']} tintColor="#2E86DE" />
            }
          />
        )
      )}

      {/* Withdraw Amount Modal */}
      <Modal
        visible={showWithdrawModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowWithdrawModal(false)}
      >
        <KeyboardAvoidingView
          style={styles.modalOverlay}
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        >
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>Withdraw Amount</Text>
            <Text style={styles.modalSubtitle}>Available: ₹{walletAmt}</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Enter amount"
              placeholderTextColor="#aaa"
              keyboardType="numeric"
              value={withdrawAmt}
              onChangeText={setWithdrawAmt}
            />
            <View style={styles.modalActions}>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnCancel]}
                onPress={() => setShowWithdrawModal(false)}
              >
                <Text style={styles.modalBtnCancelText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalBtn, styles.modalBtnConfirm]}
                onPress={confirmWithdraw}
              >
                <Text style={styles.modalBtnConfirmText}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6F8',
  },
  // ── Balance card ──────────────────────────────────────────────────
  balanceCard: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#2E86DE',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#2E86DE',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  balanceLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 6,
  },
  balanceAmount: {
    color: '#fff',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  withdrawBtn: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 32,
    minWidth: 120,
    alignItems: 'center',
  },
  withdrawBtnText: {
    color: '#2E86DE',
    fontWeight: '700',
    fontSize: 15,
  },
  // ── Tabs ──────────────────────────────────────────────────────────
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#E1E8EE',
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabActive: {
    backgroundColor: '#fff',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  tabTextActive: {
    color: '#2E86DE',
  },
  // ── Lists ─────────────────────────────────────────────────────────
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
  // ── Card ──────────────────────────────────────────────────────────
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.07,
    shadowRadius: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  orderLabel: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
  },
  amount: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#F0F0F0',
    marginVertical: 8,
  },
  halfBlock: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  metaValue: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
    marginTop: 1,
  },
  metaSmall: {
    fontSize: 12,
    color: '#888',
  },
  // ── Badge ─────────────────────────────────────────────────────────
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 10,
  },
  badgeSuccess: {
    backgroundColor: '#E8F8F0',
  },
  badgePending: {
    backgroundColor: '#FFF3E0',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
  },
  txnId: {
    marginTop: 6,
    fontSize: 11,
    color: '#aaa',
  },
  // ── Empty state ───────────────────────────────────────────────────
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    fontStyle: 'italic',
  },
  // ── Modal ─────────────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalBox: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#222',
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#2E86DE',
    fontWeight: '600',
    marginBottom: 16,
  },
  modalInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    color: '#222',
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 10,
  },
  modalBtn: {
    flex: 1,
    paddingVertical: 11,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalBtnCancel: {
    backgroundColor: '#F0F0F0',
  },
  modalBtnCancelText: {
    color: '#555',
    fontWeight: '600',
    fontSize: 15,
  },
  modalBtnConfirm: {
    backgroundColor: '#2E86DE',
  },
  modalBtnConfirmText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 15,
  },
});

export default WalletScreen;
