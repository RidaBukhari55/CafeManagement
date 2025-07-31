


import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  ActivityIndicator,
  ImageBackground,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { setUser } from '../Data/UserData';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Missing Fields',
        text2: 'Please enter both email and password',
      });
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBBR-yWMXwGi9PoAZ3JxMO8roEZO3MJQzs',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
            returnSecureToken: true,
          }),
        }
      );

      const data = await response.json();

      if (email === 'manager@gmail.com' && password === 'manager') {
        console.log('🔐 Manager login — Navigating to MDashboard');
        navigation.replace('MDashboard');
      } else if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Login Successful',
          text2: `Welcome, ${email}`,
        });

       
        await AsyncStorage.setItem('loggedInUserId', email);

        setUser(email);
        navigation.navigate('Home');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Login Failed',
          text2: data.error.message || 'Please try again',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Something went wrong',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground
        source={require('../../assets/images/Coffee5.jpg')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <Text style={styles.heading}>Welcome Back</Text>

          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
            placeholderTextColor="#777"
          />

          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            secureTextEntry
            placeholderTextColor="#777"
          />

          <TouchableOpacity onPress={handleLogin} style={styles.button} disabled={loading}>
            {loading ? (
              <ActivityIndicator color="#000" />
            ) : (
              <Text style={styles.buttonText}>Login</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.linkText}>Don't have an account? Signup</Text>
          </TouchableOpacity>
        </View>
        <Toast />
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgba(85, 77, 77, 0.8)',
    margin: 60,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
    color: '#000',
  },
  button: {
    backgroundColor: '#f5eebc',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkText: {
    marginTop: 15,
    textAlign: 'center',
    color: '#eee',
    textDecorationLine: 'underline',
  },
});
