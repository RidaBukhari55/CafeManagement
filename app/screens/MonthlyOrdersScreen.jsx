
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const MonthlyOrders = () => {
  const [userEmail, setUserEmail] = useState('');
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getUserEmail = async () => {
    try {
      const email = await AsyncStorage.getItem('loggedInUserId'); 
      if (email) {
        setUserEmail(email);
        fetchOrders(email);
      } else {
        console.warn('User email not found in storage');
        setLoading(false);
      }
    } catch (error) {
      console.error('Error fetching user email:', error);
      setLoading(false);
    }
  };

  const fetchOrders = async (email) => {
    try {
      const response = await axios.get('https://cafe-app-7a85a-default-rtdb.firebaseio.com/orders.json');
      const allOrders = response.data;

      const userOrders = Object.entries(allOrders || {})
        .map(([id, order]) => ({ id, ...order }))
        .filter(order => order.userId === email);

      setMonthlyOrders(userOrders);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserEmail();
  }, []);

  const renderOrderItem = ({ item }) => (
    <View style={styles.orderItem}>
      <Text style={styles.orderText}>Order ID: {item.id}</Text>
      <Text style={styles.orderText}>Date: {item.date}</Text>
      <Text style={styles.orderText}>Total: Rs. {item.total}</Text>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#795548" />
        <Text style={styles.loadingText}>Loading orders...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Monthly Orders</Text>
      {monthlyOrders.length === 0 ? (
        <Text style={styles.noOrdersText}>No orders found.</Text>
      ) : (
        <FlatList
          data={monthlyOrders}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

export default MonthlyOrders;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'black',
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
    color: '#ffffffff',
  },
  orderItem: {
    padding: 14,
    borderWidth: 1,
    borderColor: '#BCAAA4',
    borderRadius: 8,
    marginBottom: 12,
    backgroundColor: '#1e1e1e',
  },
  orderText: {
    fontSize: 16,
    color: '#ffffffff',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 8,
    fontSize: 16,
    color: '#6D4C41',
  },
  noOrdersText: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
    color: '#8D6E63',
  },
});
