import React, {
  createContext,
  useState,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface CartItem {
  id: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateCart: (id: string, quantity: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });
  const [cartCount, setCartCount] = useState<number>(0);

  useEffect(() => {
    const newCartCount = cart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(newCartCount);
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === id);
      if (existingItem) {
        return prevCart.map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { id, quantity }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  const updateCart = (id: string, quantity: number) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + quantity } : item
      );
      return updatedCart.filter((item) => item.quantity > 0);
    });
  };

  return (
    <CartContext.Provider
      value={{ cart, cartCount, addToCart, removeFromCart, updateCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
