import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
  setCartItems(prev => {
    const existing = prev.find(i => i.id === item.id);
    if (existing) {
      return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
    }
    return [...prev, { ...item, quantity: 1 }];
  });
};

const decreaseQuantity = (id) => {
  setCartItems(prev =>
    prev.map(item =>
      item.id === id ? { ...item, quantity: item.quantity - 1 } : item
    ).filter(item => item.quantity > 0)
  );
};

const removeFromCart = (id) => {
  setCartItems(prev => prev.filter(i => i.id !== id));
};


  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ 
      cartItems,
       addToCart,
        removeFromCart,
         clearCart ,
          decreaseQuantity
            }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);

export default CartProvider;
