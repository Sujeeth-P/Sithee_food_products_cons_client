import { Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import '../css/Header.css';
import '../css/HeaderAdditions.css';

function Header() {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [animateCart, setAnimateCart] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  // Calculate total quantity of items in the cart
  const cartItemCount = cart.length || 0;
  const prevCartCountRef = useRef(cartItemCount);

  // Monitor cart changes and trigger animation
  useEffect(() => {
    if (cartItemCount > prevCartCountRef.current) {
      setAnimateCart(true);
      const timer = setTimeout(() => {
        setAnimateCart(false);
      }, 500);
      return () => clearTimeout(timer);
    }
    prevCartCountRef.current = cartItemCount;
  }, [cartItemCount]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="modern-header">
      <div className="container">
        <div className="header-content">
          {/* Logo */}
         <Link to="/" className="logo">
        {/*    <div className="logo-icon">
              <svg viewBox="0 0 60 60" className="logo-svg">
                <circle cx="30" cy="30" r="28" fill="url(#logoGradient)" stroke="#2d5016" strokeWidth="2"/>
                <path d="M15 25 Q30 12 45 25 Q30 38 15 25" fill="#2d5016"/>
                <circle cx="22" cy="28" r="2.5" fill="#fff"/>
                <circle cx="38" cy="28" r="2.5" fill="#fff"/>
                <path d="M20 40 Q30 48 40 40" stroke="#2d5016" strokeWidth="3" fill="none" strokeLinecap="round"/>
                <path d="M18 20 Q30 8 42 20" stroke="#fff" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <defs>
                  <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#f7931e"/>
                    <stop offset="50%" stopColor="#ff8c42"/>
                    <stop offset="100%" stopColor="#ff6b35"/>
                  </linearGradient>
                </defs>
              </svg>
            </div> */}
            <div className="logo-text">
              <h1>Sithee Food Products</h1>
              <p>Premium Quality • Traditional Taste</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav">
            <ul className="nav-links">
              <li>
                <Link 
                  to="/" 
                  className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                >
                  Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/orders" 
                  className={`nav-link ${location.pathname === '/orders' ? 'active' : ''}`}
                >
                  Orders
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                >
                  Contact
                </Link>
              </li>
            </ul>
            
            <div className="header-actions">
              <Link to="/cart" className="cart-icon-wrapper">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                </svg>
                {cartItemCount > 0 && (
                  <span className={`cart-counter ${animateCart ? 'cart-counter-animate' : ''}`}>{cartItemCount}</span>
                )}
              </Link>
              
              {user ? (
                <div className="user-menu-container">
                  <button 
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="user-profile-btn"
                  >
                    <div className="user-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                      </svg>
                    </div>
                    <div className="user-info">
                      <span className="user-name">{user.name?.split(' ')[0] || 'User'}</span>
                      <span className="user-role">{user.role || 'Customer'}</span>
                    </div>
                    <div className="dropdown-arrow">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                      </svg>
                    </div>
                  </button>
                  
                  {showUserMenu && (
                    <div className="user-dropdown-menu">
                      <div className="user-dropdown-header">
                        <div className="user-dropdown-avatar">
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                            <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                          </svg>
                        </div>
                        <div className="user-dropdown-info">
                          <span className="user-dropdown-name">{user.name}</span>
                          <span className="user-dropdown-email">{user.email}</span>
                        </div>
                      </div>
                      
                      <div className="user-dropdown-divider"></div>
                      
                      <Link 
                        to="/profile" 
                        className="user-dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                        </svg>
                        My Profile
                      </Link>
                      
                      <Link 
                        to="/orders" 
                        className="user-dropdown-item"
                        onClick={() => setShowUserMenu(false)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        My Orders
                      </Link>
                      
                      {user.role === 'admin' && (
                        <Link 
                          to="/admin" 
                          className="user-dropdown-item"
                          onClick={() => setShowUserMenu(false)}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M6 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 2zM3.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9A1.5 1.5 0 0 1 3.5 2h2a.5.5 0 0 1 0 1h-2z"/>
                            <path d="M10 7a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V7zM6 9a1 1 0 0 1 2 0v1a1 1 0 1 1-2 0V9z"/>
                          </svg>
                          Admin Dashboard
                        </Link>
                      )}
                      
                      <div className="user-dropdown-divider"></div>
                      
                      <button 
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="user-dropdown-item logout-item"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                          <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                          <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                        </svg>
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <Link to="/login" className="purchase-btn">
                  Login / Register
                </Link>
              )}
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`mobile-nav ${isMenuOpen ? 'active' : ''}`}>
          <ul className="mobile-nav-links">
            <li>
              <Link 
                to="/" 
                className={`mobile-nav-link ${location.pathname === '/' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/products" 
                className={`mobile-nav-link ${location.pathname === '/products' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
            </li>
            <li>
              <Link 
                to="/orders" 
                className={`mobile-nav-link ${location.pathname === '/orders' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Orders
              </Link>
            </li>
            <li>
              <Link 
                to="/contact" 
                className={`mobile-nav-link ${location.pathname === '/contact' ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            {user ? (
              <>
                <li className="mobile-user-info">
                  <div className="mobile-user-card">
                    <div className="mobile-user-avatar">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                        <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                      </svg>
                    </div>
                    <div className="mobile-user-details">
                      <span className="mobile-user-name">{user.name}</span>
                      <span className="mobile-user-role">{user.role || 'Customer'}</span>
                    </div>
                  </div>
                </li>
                <li>
                  <Link 
                    to="/profile" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z"/>
                    </svg>
                    My Profile
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/orders" 
                    className="mobile-nav-link"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                    </svg>
                    My Orders
                  </Link>
                </li>
                {user.role === 'admin' && (
                  <li>
                    <Link 
                      to="/admin" 
                      className="mobile-nav-link"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                        <path d="M6 2a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3A.5.5 0 0 1 6 2zM3.5 3a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5v-9A1.5 1.5 0 0 1 3.5 2h2a.5.5 0 0 1 0 1h-2z"/>
                        <path d="M10 7a1 1 0 1 1 2 0v3a1 1 0 1 1-2 0V7zM6 9a1 1 0 0 1 2 0v1a1 1 0 1 1-2 0V9z"/>
                      </svg>
                      Admin Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="mobile-logout-btn"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
                      <path fillRule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
                    </svg>
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link 
                  to="/login" 
                  className="mobile-purchase-btn"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login / Register
                </Link>
              </li>
            )}
            <li>
              <Link 
                to="/cart" 
                className="mobile-nav-link cart-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Cart
                {cartItemCount > 0 && (
                  <span className={`mobile-cart-counter ${animateCart ? 'cart-counter-animate' : ''}`}>{cartItemCount}</span>
                )}
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
