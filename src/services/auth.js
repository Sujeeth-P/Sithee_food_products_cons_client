import api from './api';

// Set token in local storage
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Get token from local storage
const getToken = () => {
  return localStorage.getItem('token');
};

// Remove token from local storage
const removeToken = () => {
  localStorage.removeItem('token');
};

// Set auth token in axios headers
const setAuthToken = (token) => {
  if (token) {
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common['Authorization'];
  }
};

// Register user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/signup', userData);
    
    // Set token in local storage
    setToken(response.data.token);
    
    // Set token in axios headers
    setAuthToken(response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

// Login user
export const loginUser = async (email, password) => {
  try {
    const response = await api.post('/login', { email, password });
    console.log("login response:", response.data);
    // Set token in local storage
    setToken(response.data.token);
    
    // Set token in axios headers
    setAuthToken(response.data.token);
    
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

// Logout user
export const logoutUser = () => {
  // Remove token from local storage
  removeToken();
  
  // Remove token from axios headers
  setAuthToken(null);
};

// Get current user
export const getCurrentUser = async () => {
  try {
    // Get token from local storage
    const token = getToken();
    
    if (!token) {
      return null;
    }
    
    // Set token in axios headers
    setAuthToken(token);
    
    // Get current user
    const response = await api.get('/me');
    
    return response.data;
  } catch (error) {
    console.error('Error getting current user:', error);
    removeToken();
    setAuthToken(null);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (userData) => {
  try {
    // TODO: This endpoint doesn't exist in the backend yet
    // const response = await api.put('/users/profile', userData);
    
    // For now, just return the current user data
    // This should be implemented in the backend later
    throw new Error('Profile update not implemented yet');
    
    // If token is returned, update it
    // if (response.data.token) {
    //   setToken(response.data.token);
    //   setAuthToken(response.data.token);
    // }
    
    // return response.data;
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Admin: Get all users
export const getUsers = async () => {
  try {
    // TODO: This endpoint doesn't exist in the main routes
    // It might be in admin routes
    throw new Error('Get users endpoint not implemented yet');
    // const response = await api.get('/users');
    // return response.data;
  } catch (error) {
    console.error('Error getting users:', error);
    throw error;
  }
};

// Admin: Delete user
export const deleteUser = async (id) => {
  try {
    // TODO: This endpoint doesn't exist in the main routes
    throw new Error('Delete user endpoint not implemented yet');
    // const response = await api.delete(`/users/${id}`);
    // return response.data;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw error;
  }
};

// Admin: Update user
export const updateUser = async (id, userData) => {
  try {
    // TODO: This endpoint doesn't exist in the main routes
    throw new Error('Update user endpoint not implemented yet');
    // const response = await api.put(`/users/${id}`, userData);
    // return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

// Initialize auth - call this when app loads
export const initializeAuth = () => {
  const token = getToken();
  if (token) {
    setAuthToken(token);
    return true;
  }
  return false;
};

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  initializeAuth,
  getToken,
  setAuthToken,
};