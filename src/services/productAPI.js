// Product API service for fetching products from backend
const API_BASE_URL = (import.meta.env.VITE_API_URL || 'https://sithee-food-products-cons-server.onrender.com/api')+ '/products';


// Mock products for development when backend is unavailable
const mockProducts = [
  {
    _id: '1',
    name: 'Turmeric Powder',
    fullName: 'Organic Turmeric Powder',
    description: 'High-quality organic turmeric powder with curcumin.',
    price: 5.99,
    weight: '250g',
    stock: 100,
    category: 'Spices',
    imageUrl: '/images/turmeric.jpg',
    isActive: true
  },
  {
    _id: '2',
    name: 'Red Chilli Powder',
    fullName: 'Premium Red Chilli Powder - Extra Hot',
    description: 'Spicy red chilli powder made from selected chilies.',
    price: 4.99,
    weight: '200g',
    stock: 150,
    category: 'Spices',
    imageUrl: '/images/chilli.jpg',
    isActive: true
  },
  {
    _id: '3',
    name: 'Garam Masala',
    fullName: 'Traditional Garam Masala Blend',
    description: 'A perfect blend of aromatic spices for Indian cooking.',
    price: 6.99,
    weight: '150g',
    stock: 75,
    category: 'Blends',
    imageUrl: '/images/garam-masala.jpg',
    isActive: true
  }
];

// Set to false to use real API instead of mock data
const USE_MOCK = false;

const productAPI = {
  // Get all products with optional filters
  getAllProducts: async (params = {}) => {
    try {
      // Return mock data if USE_MOCK is true
      if (USE_MOCK) {
        console.log('Using mock product data');
        return {
          success: true,
          products: mockProducts,
          pagination: {
            currentPage: 1,
            totalPages: 1,
            totalProducts: mockProducts.length,
            hasNext: false,
            hasPrev: false
          }
        };
      }
      
      // Set a high limit to get all products (default backend limit is 10)
      const defaultParams = {
        limit: 100, // Request up to 100 products to show all
        ...params
      };
      
      const queryString = new URLSearchParams(defaultParams).toString();
      const url = queryString ? `${API_BASE_URL}?${queryString}` : API_BASE_URL;
      
      console.log('Fetching products from:', url);
      const response = await fetch(url);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with ${response.status}: ${errorText}`);
        throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  },

  // Get products by category
  getProductsByCategory: async (category) => {
    try {
      const response = await fetch(`${API_BASE_URL}?category=${encodeURIComponent(category)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch products by category');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      throw error;
    }
  },

  // Get single product by ID
  getProductById: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  },

  // Search products
  searchProducts: async (searchTerm) => {
    try {
      const response = await fetch(`${API_BASE_URL}?search=${encodeURIComponent(searchTerm)}`);
      if (!response.ok) {
        throw new Error('Failed to search products');
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error searching products:', error);
      throw error;
    }
  }

};

export default productAPI;
