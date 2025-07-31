import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Toast from 'react-native-toast-message';
//import { OrderHistoryProvider } from './components/OrderHistoryContext';
import AccountScreen from './screens/AccountScreen';
import CartScreen from './screens/CartScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import MDashboardScreen from './screens/MDashboardScreen';
import MenuItem from './screens/MenuItem';
import MonthlyOrdersScreen from './screens/MonthlyOrdersScreen';
import OrderSummaryScreen from './screens/OrderSummaryScreen';
import Signup from './screens/Signup';
import SplashScreen from './screens/SplashScreen';

const Stack = createNativeStackNavigator();

export default function Index() {
  return (
    //<OrderHistoryProvider>
      <>
        <Stack.Navigator >
          
          <Stack.Screen name="Splash" component={SplashScreen} />
          <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
          <Stack.Screen name="MenuItem" component={MenuItem} />
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Account" component={AccountScreen} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Bill" component={CartScreen} options={{ title: 'Cart 🛒' }} />
          <Stack.Screen name="OrderSummary" component={OrderSummaryScreen} options={{ title: 'Bill Summary' }} />
          <Stack.Screen name="MDashboard" component={MDashboardScreen} />
          <Stack.Screen name="MonthlyOrders" component={MonthlyOrdersScreen} />
        </Stack.Navigator>

        {/* Toast should be rendered outside the navigator */}
        <Toast />
      </>
    //</OrderHistoryProvider>
  );
}
