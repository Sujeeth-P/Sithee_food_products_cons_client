import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const createPaymentOrder = async (amount) => {
  try {
    const response = await axios.post(`${API_URL}/api/payment/create-order`, {
      amount: amount
    });
    return response.data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

export const verifyPayment = async (paymentData) => {
  try {
    // Make sure this matches your backend route: /verify-payment
    const response = await axios.post(`${API_URL}/api/payment/verify-payment`, paymentData);
    return response.data;
  } catch (error) {
    console.error('Error verifying payment:', error);
    throw error;
  }
};