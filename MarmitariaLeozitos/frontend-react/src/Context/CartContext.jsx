import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (marmita, quantidade) => {
    setCartItems((prev) => {
      const index = prev.findIndex(item => item.id === marmita.id);
      if (index !== -1) {
        const newCart = [...prev];
        newCart[index].quantidade += quantidade;
        return newCart;
      } else {
        return [...prev, { ...marmita, quantidade }];
      }
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item.id !== id));
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      ).filter(item => item.quantidade > 0)
    );
  };

  // ✅ ADICIONE ESTA FUNÇÃO AQUI (caso esteja faltando)
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ ELA ESTÁ INCLUÍDA CORRETAMENTE AQUI:
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
