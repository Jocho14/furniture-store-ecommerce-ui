import React, {
  createContext,
  useReducer,
  ReactNode,
  useEffect,
  useContext,
} from "react";

interface CartItem {
  id: number;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  addToCart: (id?: number, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateCart: (id: number, quantity: number) => void;
  getProductIds: () => number[];
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

type CartAction =
  | { type: "ADD_TO_CART"; payload: { id: number; quantity: number } }
  | { type: "REMOVE_FROM_CART"; payload: { id: number } }
  | { type: "UPDATE_CART"; payload: { id: number; quantity: number } }
  | { type: "SET_CART"; payload: { cart: CartItem[] } };

const cartReducer = (state: CartItem[], action: CartAction): CartItem[] => {
  switch (action.type) {
    case "ADD_TO_CART":
      const existingItem = state.find((item) => item.id === action.payload.id);
      if (existingItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      }
      return [
        ...state,
        { id: action.payload.id, quantity: action.payload.quantity },
      ];

    case "REMOVE_FROM_CART":
      return state.filter((item) => item.id !== action.payload.id);

    case "UPDATE_CART":
      return state
        .map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
        .filter((item) => item.quantity > 0);

    case "SET_CART":
      return action.payload.cart;

    default:
      return state;
  }
};

const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, [], () => {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  });

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  useEffect(() => {
    console.log("SETTING iN LOCAL STORAGE: ", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (id?: number, quantity: number = 1) => {
    if (!id) return;
    dispatch({ type: "ADD_TO_CART", payload: { id, quantity } });
  };

  const removeFromCart = (id: number) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: { id } });
  };

  const updateCart = (id: number, quantity: number) => {
    console.log("updating cart: ", id, quantity);
    dispatch({ type: "UPDATE_CART", payload: { id, quantity } });
  };

  const getProductIds = () => cart.map((item) => item.id);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        addToCart,
        removeFromCart,
        updateCart,
        getProductIds,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
