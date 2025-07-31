
import React, { useEffect } from 'react';
import { Animated, StatusBar, StyleSheet, View } from 'react-native';

export default function SplashScreen({ navigation }) {
  const fadeAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Home');
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#3e2c2c" barStyle="light-content" />
      <Animated.Image
        source={require('../../assets/images/logo.png')} 
        style={[styles.logo, { opacity: fadeAnim }]}
      />
      <Animated.Text style={[styles.title, { opacity: fadeAnim }]}>
        Java Junction
      </Animated.Text>
      <Animated.Text style={[styles.subtitle, { opacity: fadeAnim }]}>
        Fresh Brewed Code & Coffee
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e2c2c',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 170,
    height: 170,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    color: '#fff8f0', 
    fontWeight: 'bold',
    fontFamily: 'serif',
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#e0c1a0', 
    marginTop: 10,
    fontStyle: 'italic',
    fontFamily: 'sans-serif',
  },
});
