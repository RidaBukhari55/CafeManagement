
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  Alert,
  Modal
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CartScreen =() => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);
  const [showModal, setShowModal] = useState(false);
const [customerName, setCustomerName] = useState('');
const tax = 50;
const delivery = 100;

  useEffect(() => {
    getUserAndFetchCart();
  }, []);

  const extractNameFromEmail = (email) => {
  if (!email) return 'Guest';

  const usernamePart = email.split('@')[0]; 
  const cleaned = usernamePart.replace(/[._\d]/g, ' ').trim(); 
  const capitalized = cleaned
    .split(' ')
    .filter(Boolean)
    .map(word => word[0].toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

  return capitalized;
};


const getUserAndFetchCart = async () => {
  try {
    const id = await AsyncStorage.getItem('loggedInUserId');
    setUserId(id);

    if (id) {
      const name = extractNameFromEmail(id); 
      setCustomerName(name); 
      fetchCartItems(id);
    }
  } catch (error) {
    console.error('Error reading user ID:', error);
    setLoading(false);
  }
};

  const fetchCartItems = async (uid) => {
    try {
      const response = await fetch(`https://cafe-app-7a85a-default-rtdb.firebaseio.com/cart.json`);
      const data = await response.json();

      if (!data) {
        setCartItems([]);
        setLoading(false);
        return;
      }

      const filteredItems = Object.entries(data)
        .filter(([_, item]) => item.userId === uid)
        .map(([key, item]) => ({ ...item, firebaseKey: key }));

      setCartItems(filteredItems);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateQuantity = async (item, newQty) => {
    try {
      await fetch(
        `https://cafe-app-7a85a-default-rtdb.firebaseio.com/cart/${item.firebaseKey}.json`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQty }),
        }
      );
      fetchCartItems(userId);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const deleteItem = async (itemId) => {
  try {
    await fetch(`https://cafe-app-7a85a-default-rtdb.firebaseio.com/cart/${itemId}.json`, {
      method: 'DELETE',
    });
    fetchCartItems(userId); 
  } catch (error) {
    console.error('Error deleting item:', error);
  }
};
  const increment = (item) => {
    const newQty = parseInt(item.quantity) + 1;
    updateQuantity(item, newQty);
  };

  const decrement = (item) => {
    if (item.quantity > 1) {
      const newQty = parseInt(item.quantity) - 1;
      updateQuantity(item, newQty);
    } else {
      Alert.alert('Minimum quantity is 1');
    }
  };

  const getSubtotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };
  const total = getSubtotal() + tax + delivery;

  const handlePlaceOrder = async () => {
    try {
    const userId = await AsyncStorage.getItem('loggedInUserId');

    if (!userId || userId.trim() === '') {
      Alert.alert('Login Required', 'Please login to place an order.');
      navigation.navigate('Login'); 
      return;
    }

  } catch (error) {
    console.error('Order placement error:', error);
    Alert.alert('Error', 'Something went wrong.');
  }
  if (cartItems.length === 0) {
    Alert.alert('Cart is empty');
    return;
  }

  
  setShowModal(true);
};

  const renderItem = ({ item }) => {
    console.log('Image URL:', item.image); 
    return(
    <View style={styles.card}>
    
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemDetail}>Rs {item.price}</Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity onPress={() => decrement(item)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{item.quantity}</Text>
          <TouchableOpacity onPress={() => increment(item)} style={styles.qtyBtn}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Delete Icon */}
    <TouchableOpacity
  onPress={() => deleteItem(item.firebaseKey)}
  style={styles.deleteIconContainer}
>
  <Text style={styles.deleteIcon}>🗑</Text>
</TouchableOpacity>
    </View>
    )
  };

  if (loading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#6C63FF" />
      </View>
    );
  }

  if (!userId || cartItems.length === 0) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.emptyText}>
          {userId ? 'Your cart is empty.' : 'Guest users have empty cart. Please login.'}
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cartItems}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />

      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal: Rs {getSubtotal()}</Text>
        
        <TouchableOpacity style={styles.orderBtn} onPress={handlePlaceOrder}>
  <Text style={styles.orderBtnText}>Place Order</Text>
</TouchableOpacity>
      </View>
      

<Modal
  visible={showModal}
  transparent
  animationType="slide"
  onRequestClose={() => setShowModal(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>
      <Text style={styles.modalText}>🎉 Order Placed Successfully!</Text>
      <Text style={styles.modalSubtext}>Your food is on the way 🚀</Text>
      <TouchableOpacity
        style={styles.modalButton}
        onPress={async () => {
          const orderData = {
            id: Date.now(),
            customer: customerName,
            orderItems: cartItems,
            subtotal: getSubtotal(),
            tax,
            delivery,
            total,
            userId: userId,
            orderNo: Math.floor(Math.random() * 100000),
            date: new Date().toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            }),
            timestamp: new Date().toLocaleString()
          };

          try {
            await fetch('https://cafe-app-7a85a-default-rtdb.firebaseio.com/orders.json', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(orderData),
            });

            // Clear cart for current user
            const itemsToDelete = cartItems.map(item =>
              fetch(`https://cafe-app-7a85a-default-rtdb.firebaseio.com/cart/${item.firebaseKey}.json`, {
                method: 'DELETE',
              })
            );
            await Promise.all(itemsToDelete);

            setCartItems([]);
            setShowModal(false);
            navigation.navigate('OrderSummary', { order: orderData });
          } catch (error) {
            console.error('Order failed:', error);
          }
        }}
      >
        <Text style={styles.modalButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </View>
  );
};

export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 20,
    alignSelf: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: 14,
    borderRadius: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 14,
    backgroundColor: '#2e2e2e',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 6,
  },
  itemDetail: {
    color: '#bbbbbb',
    fontSize: 15,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  qtyBtn: {
    backgroundColor: '#6C63FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  qtyBtnText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  qtyNumber: {
    color: '#ffffff',
    fontSize: 16,
    marginHorizontal: 12,
    fontWeight: '600',
  },
  deleteIconContainer: {
    padding: 6,
    marginLeft: 8,
  },
  deleteIcon: {
    fontSize: 32,
    color: '#ffffffff',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#121212',
  },
  emptyText: {
    color: '#999999',
    fontSize: 16,
    marginTop: 10,
  },
  subtotalContainer: {
    padding: 20,
    backgroundColor: '#1e1e1e',
    borderTopWidth: 1,
    borderTopColor: '#333',
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 14,
  },
  orderBtn: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
  },
  orderBtnText: {
    color: '#070707ff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#ffffff',
    padding: 26,
    borderRadius: 14,
    alignItems: 'center',
    width: '80%',
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
  },
  modalText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 10,
  },
  modalSubtext: {
    fontSize: 15,
    color: '#666666',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});



