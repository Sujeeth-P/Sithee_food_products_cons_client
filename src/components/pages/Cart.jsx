import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import CheckoutModal from './CheckoutModal';
import '../css/Cart.css';

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const navigate = useNavigate();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // Calculate subtotal for each item
  const getItemSubtotal = (item) => {
    return item.price * item.quantity;
  };

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => {
    return total + getItemSubtotal(item);
  }, 0);

  // Calculate total number of items
  const itemCount = cart.reduce((count, item) => count + item.quantity, 0);
  
  // Handle quantity changes
  const handleQuantityChange = (item, action) => {
    if (action === 'increase') {
      updateQuantity(item.id, 'increase', 1);
    } else if (action === 'decrease') {
      if (item.quantity > 1) {
        updateQuantity(item.id, 'decrease', 1);
      } else {
        // If quantity is 1, remove the item
        removeFromCart(item);
      }
    }
  };

  // Handle checkout button click
  const handleCheckout = () => {
    if (!user) {
      // Redirect to login if not authenticated
      navigate('/login', { 
        state: { 
          from: { pathname: '/cart' },
          message: 'Please login to proceed with checkout'
        }
      });
      return;
    }
    setShowCheckoutModal(true);
  };

  // Continue shopping
  const handleContinueShopping = () => {
    navigate('/products');
  };

  // If cart is empty
  if (cart.length === 0) {
    return (
      <div className="cart-page">
        <div className="container">
          <h1>Your Shopping Cart</h1>
          <div className="empty-cart">
            <div className="empty-cart-icon">🛒</div>
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any products to your cart yet.</p>
            <button 
              className="continue-shopping-btn"
              onClick={handleContinueShopping}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-page">
      <div className="container">
        <h1>Your Shopping Cart</h1>
        
        <div className="cart-header">
          <div className="cart-row">
            <div className="cart-col product-col">Product</div>
            <div className="cart-col price-col">Price</div>
            <div className="cart-col quantity-col">Quantity</div>
            <div className="cart-col subtotal-col">Subtotal</div>
            <div className="cart-col action-col">Action</div>
          </div>
        </div>
        
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-row cart-item">
              <div className="cart-col product-col">
                <div className="cart-product">
                  <div className="cart-product-image">
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div className="cart-product-info">
                    <h3>{item.name}</h3>
                    <p className="product-weight">{item.weight}</p>
                  </div>
                </div>
              </div>
              
              <div className="cart-col price-col">
                <span className="price">₹{item.price}</span>
              </div>
              
              <div className="cart-col quantity-col">
                <div className="quantity-control">
                  <button 
                    className="quantity-btn decrease" 
                    onClick={() => handleQuantityChange(item, 'decrease')}
                  >
                    -
                  </button>
                  <span className="quantity">{item.quantity}</span>
                  <button 
                    className="quantity-btn increase" 
                    onClick={() => handleQuantityChange(item, 'increase')}
                  >
                    +
                  </button>
                </div>
              </div>
              
              <div className="cart-col subtotal-col">
                <span className="subtotal">₹{getItemSubtotal(item)}</span>
              </div>
              
              <div className="cart-col action-col">
                <button 
                  className="remove-btn"
                  onClick={() => removeFromCart(item)}
                >
                  ×
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="cart-summary">
          <div className="clear-cart">
            <button 
              className="clear-cart-btn"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </div>
          
          <div className="cart-totals">
            <div className="totals-row">
              <div className="total-label">Items:</div>
              <div className="total-value">{itemCount}</div>
            </div>
            <div className="totals-row">
              <div className="total-label">Subtotal:</div>
              <div className="total-value">₹{cartTotal}</div>
            </div>
            <div className="totals-row shipping">
              <div className="total-label">Shipping:</div>
              <div className="total-value">Calculated at checkout</div>
            </div>
            <div className="totals-row grand-total">
              <div className="total-label">Total:</div>
              <div className="total-value">₹{cartTotal}</div>
            </div>
          </div>
        </div>
        
        <div className="cart-actions">
          <button 
            className="continue-shopping-btn"
            onClick={handleContinueShopping}
          >
            Continue Shopping
          </button>
          <button 
            className="checkout-btn"
            onClick={handleCheckout}
          >
            {user ? 'Proceed to Checkout' : 'Login to Checkout'}
          </button>
        </div>
      </div>
      
      {/* Checkout Modal */}
      {showCheckoutModal && (
        <CheckoutModal 
          onClose={() => setShowCheckoutModal(false)}
          cart={cart}
          total={cartTotal}
        />
      )}
    </div>
  );
}

export default Cart;