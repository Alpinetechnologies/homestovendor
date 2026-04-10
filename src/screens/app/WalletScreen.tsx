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

const WalletScreen = () => {
  const { userProfile } = useContext(AuthContext);

  const [walletAmt, setWalletAmt] = useState<number>(0);
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [withdrawing, setWithdrawing] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmt, setWithdrawAmt] = useState('');

  const fetchWallet = async (silent = false) => {
    try {
      const res = await API.getUserProfile();
      if (res && res.success === 'true' && typeof res.extraData === 'object') {
        console.log('Wallet Data:', res.extraData);
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

  useEffect(() => {
    fetchWallet();
  }, []);

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
    fetchWallet(true);
  }, []);

  const formatDate = (dateStr: string) => {
    if (!dateStr) return '—';
    return dateStr.replace('T', ' ').split('.')[0];
  };

  const renderItem = ({ item }: { item: WalletTransaction }) => {
    const isCredited = parseFloat(item.amt_credited) > 0;

    return (
      <View style={styles.card}>
        {/* Row 1: Order label + Amount */}
        <View style={styles.row}>
          <Text style={styles.orderLabel}>Order #{item.order_id}</Text>
          <Text style={[styles.amount, isCredited ? { color: '#27AE60' } : { color: '#E74C3C' }]}>
            {isCredited ? `+₹${item.amt_credited}` : `-₹${item.amt_debited}`}
          </Text>
        </View>

        <View style={styles.divider} />

        {/* Row 2: Opening / Closing balance */}
        <View style={styles.row}>
          <View style={styles.balanceBlock}>
            <Text style={styles.dateLabel}>Opening Bal</Text>
            <Text style={styles.dateValue}>₹{item.opening_bal}</Text>
          </View>
          <View style={[styles.balanceBlock, { alignItems: 'flex-end' }]}>
            <Text style={styles.dateLabel}>Closing Bal</Text>
            <Text style={[styles.dateValue, { fontWeight: '700', color: '#2E86DE' }]}>₹{item.closing_bal}</Text>
          </View>
        </View>

        {/* Row 3: Check-in / Check-out */}
        <View style={styles.row}>
          <View style={styles.dateBlock}>
            <Text style={styles.dateLabel}>Check-in</Text>
            <Text style={styles.dateValue}>{formatDate(item.check_in_date)}</Text>
          </View>
          <View style={[styles.dateBlock, { alignItems: 'flex-end' }]}>
            <Text style={styles.dateLabel}>Check-out</Text>
            <Text style={styles.dateValue}>{formatDate(item.check_out_date)}</Text>
          </View>
        </View>

        {/* Row 4: Date-time + Status */}
        <View style={[styles.row, { marginTop: 6 }]}>
          <Text style={styles.meta}>{formatDate(item.date_time)}</Text>
          <View style={[styles.statusBadge, item.status === '1' ? styles.statusSuccess : styles.statusPending]}>
            <Text style={styles.statusText}>{item.status === '1' ? 'Completed' : 'Pending'}</Text>
          </View>
        </View>

        {/* Transaction ID if present */}
        {!!item.transaction_id && (
          <Text style={styles.txnId}>Txn: {item.transaction_id}</Text>
        )}
      </View>
    );
  };

  const renderEmpty = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No transactions found.</Text>
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

      <Text style={styles.sectionTitle}>Transaction History</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#2E86DE" style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={transactions}
          keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
          renderItem={renderItem}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={
            transactions.length === 0 ? styles.emptyList : styles.list
          }
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={['#2E86DE']}
              tintColor="#2E86DE"
            />
          }
        />
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
    // backgroundColor: '#5f9a48ff',
  },
  balanceCard: {
    // margin: 16,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333',
    marginHorizontal: 16,
    marginBottom: 8,
  },
  list: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
    paddingHorizontal: 16,
  },
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
  balanceBlock: {
    flex: 1,
  },
  dateBlock: {
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusSuccess: {
    backgroundColor: '#E8F8F0',
  },
  statusPending: {
    backgroundColor: '#FFF3E0',
  },
  statusText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#27AE60',
  },
  dateLabel: {
    fontSize: 10,
    color: '#999',
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  dateValue: {
    fontSize: 12,
    color: '#444',
    fontWeight: '500',
    marginTop: 1,
  },
  meta: {
    fontSize: 12,
    color: '#888',
  },
  closing: {
    fontSize: 12,
    color: '#555',
    fontWeight: '600',
  },
  txnId: {
    marginTop: 6,
    fontSize: 11,
    color: '#aaa',
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 15,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default WalletScreen;
