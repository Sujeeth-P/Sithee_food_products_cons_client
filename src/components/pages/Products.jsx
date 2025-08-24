import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import productAPI from '../../services/productAPI';
import '../css/Products.css';

function Products() {
  const { productId } = useParams();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [loadingProducts, setLoadingProducts] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { cart, dispatch } = useCart();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null); // Reset any previous errors
        
        console.log('Fetching products...');
        const response = await productAPI.getAllProducts();
        
        console.log('Products API response:', response);
        
        if (response && response.success) {
          setProducts(response.data || response.products || []);
          console.log(`Loaded ${(response.data || response.products || []).length} products successfully`);
        } else {
          setError('Failed to fetch products: ' + (response?.message || 'Unknown error'));
        }
      } catch (err) {
        setError('Error fetching products: ' + err.message);
        console.error('Product fetch error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Get unique categories from products
  const categories = ['All', ...new Set(products.map(product => product.category))];

  // Handle adding product to cart
  const handleAddToCart = (product) => {
    // Check if product is out of stock
    if (product.stock <= 0) {
      setNotification({ 
        show: true, 
        message: `${product.name} is out of stock` 
      });
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      return;
    }

    // Check if trying to add more than available stock
    const existingCartItem = cart.find(item => item.id === product._id || item._id === product._id);
    const currentQuantityInCart = existingCartItem ? existingCartItem.quantity : 0;
    
    if (currentQuantityInCart >= product.stock) {
      setNotification({ 
        show: true, 
        message: `Cannot add more. Only ${product.stock} items available` 
      });
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      return;
    }

    // Set loading state for this specific product
    setLoadingProducts(prev => ({ ...prev, [product._id]: true }));
    
    // Add price as a number for cart calculations
    const productWithPrice = {
      ...product,
      id: product._id, // Use MongoDB _id as id for cart
      price: product.price || 100, // Default price if not set
      quantity: 1,
      stock: product.stock // Include stock info for cart
    };

    // Simulate a small delay for better UX
    setTimeout(() => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: productWithPrice
      });
      
      // Show notification
      setNotification({ 
        show: true, 
        message: `${product.name} added to cart` 
      });
      
      // Hide notification after 3 seconds
      setTimeout(() => {
        setNotification({ show: false, message: '' });
      }, 3000);
      
      // Reset loading state for this specific product
      setLoadingProducts(prev => ({ ...prev, [product._id]: false }));
    }, 400);
  };

  // Filter products based on category and search
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Show loading state
  if (loading) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="loading-spinner">
            <h2>Loading products...</h2>
          </div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="products-page">
        <div className="container">
          <div className="error-message">
            <h2>Error loading products</h2>
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="container">
        {/* Hero Section */}
        <section className="products-hero">
          <div className="hero-content">
            <h1>Our Premium Products</h1>
            <p>Discover our range of high-quality traditional food products</p>
          </div>
        </section>

        {/* Search and Filter Section */}
        <section className="products-filter">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>
          
          <div className="category-filters">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section className="products-section">
          <div className="products-grid">
            {filteredProducts.map(product => (
              <div key={product._id} className="product-card">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {/* <div className="product-overlay">
                    <button 
                      className="quick-view-btn"
                      onClick={() => setSelectedProduct(product)}
                    >
                      👁️ Quick View
                    </button>
                  </div> */}
                </div>
                <div className="product-info">
                  <div className="product-category">{product.category}</div>
                  <h3>{product.name}</h3>
                  <p className="product-weight">{product.weight}</p>
                  <p className="product-price">₹{product.price}</p>
                  <p className="product-description">{product.description}</p>
                  
                  {/* Stock Information */}
                  <div className="stock-info">
                    <span className={`stock-status ${
                      product.stock <= 0 ? 'out-of-stock' : 
                      product.stock <= 15 ? 'low-stock' : 'in-stock'
                    }`}>
                      {product.stock <= 0 ? 'Out of Stock' : 
                       product.stock <= 15 ? `Only ${product.stock} left!` : 
                       `${product.stock} in stock`}
                    </span>
                  </div>

                  <div className="product-features">
                    {product.features?.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                  <div className="product-actions">
                    <button 
                      className={product.category === "Gram Flour Varieties" ? "enquiry-btn" : "add-cart-btn"}
                      onClick={() => product.category === "Gram Flour Varieties" ? 
                        window.location.href = "mailto:siteefoods@example.com?subject=Quote Request: " + product.name : 
                        handleAddToCart(product)}
                      disabled={loadingProducts[product._id] || (product.category !== "Gram Flour Varieties" && product.stock <= 0)}
                    >
                      {product.category === "Gram Flour Varieties" ? "Get Quote" : 
                        product.stock <= 0 ? "Out of Stock" :
                        loadingProducts[product._id] ? "Adding..." : "Add to Cart"}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="no-products">
              <h3>No products found</h3>
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Notification */}
        {notification.show && (
          <div className="notification">
            <p>{notification.message}</p>
          </div>
        )}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className={`product-modal ${selectedProduct ? 'active' : ''}`} onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <button className="modal-close" onClick={() => setSelectedProduct(null)}>×</button>
            </div>
            <div className="modal-body">
              <div className="modal-image">
                <img src={selectedProduct.image} alt={selectedProduct.name} />
              </div>
              <div className="modal-details">
                <div className="modal-category">{selectedProduct.category}</div>
                <h2>{selectedProduct.name}</h2>
                <p className="modal-weight">{selectedProduct.weight}</p>
                <p className="modal-price">₹{selectedProduct.price}</p>
                <p className="modal-description">{selectedProduct.description}</p>
                
                {/* Stock Information in Modal */}
                <div className="modal-stock-info">
                  <span className={`stock-status ${
                    selectedProduct.stock <= 0 ? 'out-of-stock' : 
                    selectedProduct.stock <= 5 ? 'low-stock' : 'in-stock'
                  }`}>
                    {selectedProduct.stock <= 0 ? 'Out of Stock' : 
                     selectedProduct.stock <= 5 ? `Only ${selectedProduct.stock} left` : 
                     `${selectedProduct.stock} in stock`}
                  </span>
                </div>
                
                <div className="modal-features">
                  <h4>Key Features:</h4>
                  <div className="feature-list">
                    {selectedProduct.features?.map((feature, index) => (
                      <span key={index} className="feature-tag">{feature}</span>
                    ))}
                  </div>
                </div>
                <div className="modal-actions">
                  <button 
                    className={selectedProduct?.category === "Gram Flour Varieties" ? "enquiry-btn" : "add-cart-btn"}
                    onClick={() => {
                      if (selectedProduct?.category === "Gram Flour Varieties") {
                        window.location.href = "mailto:siteefoods@example.com?subject=Quote Request: " + selectedProduct.name;
                      } else {
                        handleAddToCart(selectedProduct);
                        setSelectedProduct(null); // Close modal after adding to cart
                      }
                    }}
                    disabled={loadingProducts[selectedProduct?._id] || (selectedProduct?.category !== "Gram Flour Varieties" && selectedProduct?.stock <= 0)}
                  >
                    {selectedProduct?.category === "Gram Flour Varieties" ? "📧 Get Quote" : 
                      selectedProduct?.stock <= 0 ? "Out of Stock" :
                      loadingProducts[selectedProduct?._id] ? "Adding..." : "🛒 Add to Cart"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;
