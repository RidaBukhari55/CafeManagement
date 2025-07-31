import { useNavigation, useRoute } from '@react-navigation/native';
import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { useCart } from '../components/CartProvider';

const OrderSummaryScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { clearCart } = useCart();

  const { order } = route.params || {};

  const {
    orderItems = [],
    total = 0,
    tax = 0,
    orderNo = 'N/A',
    customer = 'Guest',
    timestamp = new Date().toLocaleString(),
  } = order || {};

  const renderItem = ({ item }) => (
    <View style={styles.itemRow}>
      <Text style={styles.itemName}>
        {item.name} × {item.quantity}
      </Text>
      <Text style={styles.itemPrice}>
        Rs {(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#1a1a1a' }}>
      <View style={styles.container}>
        <Text style={styles.title}>🧾 Order Receipt</Text>

        <View style={styles.sectionBox}>
          <Text style={styles.detail}>
            <Text style={styles.label}>Order No:</Text> {orderNo}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Customer:</Text> {customer}
          </Text>
          <Text style={styles.detail}>
            <Text style={styles.label}>Date:</Text> {timestamp}
          </Text>
        </View>

        <View style={styles.itemSection}>
          <FlatList
            data={orderItems}
            keyExtractor={(item) => item.id?.toString()}
            renderItem={renderItem}
          />
        </View>

        <View style={styles.sectionBox}>
          <View style={styles.itemRow}>
            <Text style={styles.summaryText}>Tax</Text>
            <Text style={styles.summaryText}>Rs {tax?.toFixed(2)}</Text>
          </View>
          <View style={[styles.itemRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Grand Total</Text>
            <Text style={styles.totalLabel}>Rs {total?.toFixed(2)}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            clearCart();
            navigation.navigate('Home');
          }}
        >
          <Text style={styles.buttonText}>Order Again</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default OrderSummaryScreen;

const styles = StyleSheet.create({
  container: {
    padding: 24,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f5c87a',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionBox: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#3a3a3a',
  },
  label: {
    color: '#f5c87a',
    fontWeight: '600',
  },
  detail: {
    color: '#ccc',
    fontSize: 14,
    marginVertical: 4,
  },
  itemSection: {
    backgroundColor: '#2a2a2a',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
    paddingBottom: 6,
    borderBottomColor: '#444',
    borderBottomWidth: 0.6,
  },
  itemName: {
    color: '#f5c87a',
    fontSize: 15,
    fontWeight: '500',
  },
  itemPrice: {
    color: '#fff',
    fontSize: 15,
  },
  summaryText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#555',
    paddingTop: 10,
    marginTop: 10,
  },
  totalLabel: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#f5c87a',
  },
  button: {
    alignSelf: 'center',
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 14,
    paddingHorizontal: 50,
    borderRadius: 10,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
}); 