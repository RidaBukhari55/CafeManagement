import {
  Alert,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCart } from '../components/CartProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MenuItem = ({ route }) => {
  const { item } = route.params;
  const { addToCart } = useCart();

  const handleAddToCart = async () => {
    addToCart(item);

    if (Platform.OS === 'android') {
      ToastAndroid.show('Item added to cart.', ToastAndroid.SHORT);
    } else {
      Alert.alert('Success', 'Item added to cart.');
    }

    try {
      const userId = await AsyncStorage.getItem('loggedInUserId'); 
      const cartItemWithUser = {
        ...item,
        userId: userId || 'guest',
        quantity: 1,
       
      };

      const response = await fetch(
        'https://cafe-app-7a85a-default-rtdb.firebaseio.com/cart.json',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(cartItemWithUser),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to add item to Firebase');
      }
    } catch (error) {
      console.error('Firebase Error:', error);
      Alert.alert('Error', 'Could not sync with Firebase.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Image source={item.image} style={styles.image} />
        <View style={styles.content}>
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.price}>Rs {item.price.toFixed(2)}</Text>
          <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


export default MenuItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
  },
  content: {
    padding: 20,
    backgroundColor: '#1E1E1E',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    elevation: 6,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    color: 'white',
    lineHeight: 22,
    marginBottom: 15,
  },
  price: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    marginBottom: 25,
  },
  button: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 3,
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
});

