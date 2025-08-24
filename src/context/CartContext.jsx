import { createContext, useContext, useReducer, useEffect } from 'react';

// Define the initial cart state
const initialState = [];

// Create the cart context
export const CartContext = createContext(initialState);

// Cart reducer function to handle state updates
function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id
      );

      if (existingItemIndex > -1) {
        // Item exists, update quantity but check stock limit
        return state.map((item, index) => {
          if (index === existingItemIndex) {
            const newQuantity = item.quantity + (action.payload.quantity || 1);
            const maxQuantity = action.payload.stock || item.stock || 999;
            return { 
              ...item, 
              quantity: Math.min(newQuantity, maxQuantity)
            };
          }
          return item;
        });
      } else {
        // Item doesn't exist, add new item
        return [...state, action.payload];
      }
    }

    case 'REMOVE_FROM_CART': {
      return state.filter(item => item.id !== action.payload.id);
    }

    case 'UPDATE_QUANTITY': {
      return state.map(item => {
        if (item.id === action.payload.id) {
          if (action.payload.action === 'increase') {
            const newQuantity = item.quantity + action.payload.quantity;
            const maxQuantity = item.stock || 999;
            return { ...item, quantity: Math.min(newQuantity, maxQuantity) };
          } else if (action.payload.action === 'decrease') {
            return { ...item, quantity: Math.max(1, item.quantity - action.payload.quantity) };
          } else {
            // Direct update to a specific quantity, but respect stock limit
            const maxQuantity = item.stock || 999;
            return { ...item, quantity: Math.min(action.payload.quantity, maxQuantity) };
          }
        }
        return item;
      });
    }

    case 'CLEAR_CART':
      return initialState;

    default:
      return state;
  }
}

// Cart provider component
export function CartProvider({ children }) {
  // Helper function to validate cart data
  const isValidCartItem = (item) => {
    // Check if item has valid ID (should be a string that looks like MongoDB ObjectId)
    return item && 
           (typeof item.id === 'string' || typeof item._id === 'string') &&
           (item.id || item._id) &&
           typeof item.quantity === 'number' &&
           item.quantity > 0;
  };

  // Check if there's existing cart data in localStorage
  const savedCart = localStorage.getItem('cart');
  let initialCart = initialState;
  
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      // Validate cart data and filter out invalid items
      if (Array.isArray(parsedCart)) {
        const validCartItems = parsedCart.filter(isValidCartItem);
        // If we filtered out any items, this means there was invalid data
        if (validCartItems.length !== parsedCart.length) {
          console.log('Removed invalid cart items from localStorage');
        }
        initialCart = validCartItems;
      }
    } catch (error) {
      console.error('Error parsing cart from localStorage:', error);
      localStorage.removeItem('cart'); // Clear corrupted data
    }
  }
  
  const [cart, dispatch] = useReducer(cartReducer, initialCart);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Helper functions
  const addToCart = (product, quantity = 1) => {
    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });
  };

  const removeFromCart = (product) => {
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { id: product.id }
    });
  };

  const updateQuantity = (productId, action, quantity = 1) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: productId, action, quantity }
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  return (
    <CartContext.Provider 
      value={{ 
        cart, 
        dispatch,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
