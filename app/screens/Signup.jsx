
import React, { useState } from 'react';
import {
  ActivityIndicator,
  ImageBackground,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { setUser } from '../Data/UserData';

export default function SignupScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    if (!email || !password) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Please enter both email and password',
      });
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBBR-yWMXwGi9PoAZ3JxMO8roEZO3MJQzs',
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
      console.log('Firebase response:', data);

      if (response.ok) {
        Toast.show({
          type: 'success',
          text1: 'Success',
          text2: 'Account created successfully!',
        });
        setUser(email);
        navigation.navigate('Login');
      } else {
        const errorMessage = data?.error?.message || 'Unknown error occurred';
        Toast.show({
          type: 'error',
          text1: 'Signup Failed',
          text2: errorMessage,
        });
      }
    } catch (error) {
      console.error('Signup error:', error);
      Toast.show({
        type: 'error',
        text1: 'Network Error',
        text2: 'Something went wrong. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground
      source={require('../../assets/images/Coffee5.jpg')}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <Text style={styles.heading}>Sign up</Text>

        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="grey"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="grey"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleSignup} disabled={loading}>
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.buttonText}>Sign up</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.loginText}>
          Already have an account?{' '}
          <Text
            onPress={() => navigation.navigate('Login')}
            style={styles.loginLink}
          >
            Login
          </Text>
        </Text>
      </View>
      <Toast />
    </ImageBackground>
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
    backgroundColor: 'rgba(85, 77, 77, 0.81)',
    margin: 60,
    borderRadius: 15,
    shadowColor: 'rgba(0, 0, 0, 0.8)',
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
  heading: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#fff',
  },
  input: {
    width: '100%',
    backgroundColor: '#E6F0FF',
    padding: 12,
    borderRadius: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  button: {
    backgroundColor: 'rgb(241, 233, 197)',
    paddingVertical: 14,
    width: '100%',
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: 'rgba(8, 8, 8, 1)',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  loginText: {
    marginTop: 15,
    color: '#fff',
  },
  loginLink: {
    fontWeight: 'bold',
    color: '#fff',
    textDecorationLine: 'underline',
  },
});
