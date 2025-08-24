import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'https://sithee-food-products-cons-server.onrender.com';

// Create a new order
export const createOrder = async (orderData) => {
  try {
    console.log('Sending order data:', orderData);
    
    // Check if user is authenticated
    const token = localStorage.getItem('token');
    
    if (token) {
      // User is logged in - create authenticated order
      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      };

      console.log('Creating authenticated order for logged-in user');
      const response = await axios.post(`${API_URL}/orders`, orderData, config);
      return response.data;
    } else {
      // User is not logged in - create guest order
      console.log('Creating guest order for non-authenticated user');
      const response = await axios.post(`${API_URL}/orders/guest`, orderData);
      return response.data;
    }
  } catch (error) {
    console.error('Error creating order:', error);
    if (error.response) {
      console.error('Error response:', error.response.data);
      console.error('Error status:', error.response.status);
    }
    throw error;
  }
};

// Get user's order history (requires authentication)
export const getUserOrders = async () => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.get(`${API_URL}/orders/user`, config);
    return response.data;
  } catch (error) {
    console.error('Error fetching user orders:', error);
    throw error;
  }
};

// Get a specific order by ID
export const getOrderById = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    const config = token ? {
      headers: {
        Authorization: `Bearer ${token}`
      }
    } : {};
    
    const response = await axios.get(`${API_URL}/orders/${orderId}`, config);
    return response.data;
  } catch (error) {
    console.error(`Error fetching order ${orderId}:`, error);
    throw error;
  }
};

// Cancel an order (requires authentication)
export const cancelOrder = async (orderId) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required');
    }
    
    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    };
    
    const response = await axios.put(`${API_URL}/orders/${orderId}/cancel`, {}, config);
    return response.data;
  } catch (error) {
    console.error('Error cancelling order:', error);
    throw error;
  }
};

// Helper function to calculate order totals
export const calculateOrderTotals = (cartItems) => {
  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );
  
  // Standard shipping cost
  const shipping = 50;
  
  // Total = subtotal + shipping
  // const total = subtotal + shipping;
  const total = Math.round((subtotal + shipping) * 100) / 100;

  return {
    subtotal,
    shipping,
    total
  };
};

export default {
  createOrder,
  getUserOrders,
  getOrderById,
  cancelOrder,
  calculateOrderTotals
};
