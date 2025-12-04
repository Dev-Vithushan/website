// API configuration and utility functions

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Get token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Set token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Make API request
const apiRequest = async (endpoint, options = {}) => {
  const token = getToken();
  
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  // Add authorization header if token exists
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Something went wrong');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API calls
export const authAPI = {
  register: async (userData) => {
    return apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },

  login: async (email, password) => {
    return apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  getMe: async () => {
    return apiRequest('/auth/me');
  },
};

// Products API calls
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    return apiRequest(`/products${queryString ? `?${queryString}` : ''}`);
  },

  getById: async (id) => {
    return apiRequest(`/products/${id}`);
  },
};

// Cart API calls
export const cartAPI = {
  get: async () => {
    return apiRequest('/cart');
  },

  add: async (productId, quantity = 1) => {
    return apiRequest('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity }),
    });
  },

  update: async (productId, quantity) => {
    return apiRequest(`/cart/${productId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  remove: async (productId) => {
    return apiRequest(`/cart/${productId}`, {
      method: 'DELETE',
    });
  },

  clear: async () => {
    return apiRequest('/cart', {
      method: 'DELETE',
    });
  },
};

// Wishlist API calls
export const wishlistAPI = {
  get: async () => {
    return apiRequest('/wishlist');
  },

  add: async (productId) => {
    return apiRequest('/wishlist', {
      method: 'POST',
      body: JSON.stringify({ productId }),
    });
  },

  remove: async (productId) => {
    return apiRequest(`/wishlist/${productId}`, {
      method: 'DELETE',
    });
  },
};

// Newsletter API calls
export const newsletterAPI = {
  subscribe: async (email) => {
    return apiRequest('/newsletter', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
};

export default apiRequest;

