import { Stack } from 'expo-router';
import { CartProvider } from './components/CartProvider';

export default function Layout() {
  return (
    <CartProvider>
      <Stack />
    </CartProvider>
  );
}
