import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, []);

  // All products organized by categories
  const productCategories = {
    "Flour Products": [
      {
        id: 1,
        name: "Rice Flour",
        weight: "500gm",
        fullName: "500gm Sithee Rice Flour",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503333782/UT/NA/UR/122442363/roasted-vermicelli-250x250.jpeg",
        category: "Flour Products",
        price: "₹85"
      },
      {
        id: 2,
        name: "Ragi Flour",
        weight: "500gm",
        fullName: "500gm Sithee Ragi Flour",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503333979/MS/BN/GX/122442363/double-roasted-rava-sooji-250x250.jpeg",
        category: "Flour Products",
        price: "₹95"
      },
      {
        id: 3,
        name: "Wheat Flour",
        weight: "500gm",
        fullName: "500gm Sithee Chakki Fresh Atta",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503334512/HC/XO/FJ/122442363/wheat-flour-250x250.jpeg",
        category: "Flour Products",
        price: "₹120"
      },
      {
        id: 4,
        name: "Corn Flour",
        weight: "1Kg",
        fullName: "1Kg Sithee Corn Flour",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503333432/QA/UX/MM/122442363/gram-savoury-flour-250x250.jpeg",
        category: "Flour Products",
        price: "₹75"
      }
    ],
    "Rava & Sooji": [
      {
        id: 5,
        name: "Roasted Rava",
        weight: "500gm",
        fullName: "500gm Sithee Double Roasted Rava",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503334363/JH/HJ/LE/122442363/gram-flour-250x250.jpeg",
        category: "Rava & Sooji",
        price: "₹65"
      },
      {
        id: 6,
        name: "Sooji",
        weight: "200gm",
        fullName: "200gm Sithee Double Roasted Rava",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503332807/OH/ZZ/IT/122442363/double-roasted-rava-250x250.jpeg",
        category: "Rava & Sooji",
        price: "₹45"
      },
      {
        id: 7,
        name: "Organic Wheat",
        weight: "500gm",
        fullName: "500gm Sithee Samba Rava",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503332086/UJ/JT/CW/122442363/gram-flour-250x250.jpeg",
        category: "Rava & Sooji",
        price: "₹80"
      }
    ],
    "Noodles & Vermicelli": [
      {
        id: 8,
        name: "Hakka Noodles",
        weight: "1kg",
        fullName: "1kg Sithee Veg Hakka Noddles",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503332953/XI/NE/WD/122442363/bajji-bonda-powder-250x250.jpeg",
        category: "Noodles & Vermicelli",
        price: "₹150"
      },
      {
        id: 9,
        name: "Roasted Vermicelli",
        weight: "150gm",
        fullName: "150gm Sithee Roasted Vermicelli",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503332415/FR/GT/XW/122442363/natural-maida-flour-500x500.jpeg",
        category: "Noodles & Vermicelli",
        price: "₹35"
      },
      {
        id: 10,
        name: "Ragi Vermicelli",
        weight: "170gm",
        fullName: "170gm Sithee Ragi Vermicelli",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503331334/MH/LP/FW/122442363/double-roasted-rava-500x500.jpeg",
        category: "Noodles & Vermicelli",
        price: "₹55"
      },
      {
        id: 11,
        name: "Premium Vermicelli",
        weight: "170gm",
        fullName: "170gm Sithee Premium Roasted Vermicelli",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503331697/IJ/FV/VX/122442363/ragi-flour-500x500.jpeg",
        category: "Noodles & Vermicelli",
        price: "₹40"
      }
    ],
    "Specialty Products": [
      {
        id: 17,
        name: "Jaggery Powder",
        weight: "Organic",
        fullName: "Sithee Organic Jaggery Powder",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503334223/DJ/DC/XQ/122442363/appalam-papad-250x250.jpeg",
        category: "Specialty Products",
        price: "₹120"
      },
      {
        id: 18,
        name: "Appalam Papad",
        weight: "100gm",
        fullName: "100gm Sithee Appalam",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503334223/DJ/DC/XQ/122442363/appalam-papad-250x250.jpeg",
        category: "Specialty Products",
        price: "₹25"
      },
      {
        id: 19,
        name: "Bajji Bonda Mix",
        weight: "500gm",
        fullName: "500gm Sithee Bajji Bonda Powder",
        image: "https://5.imimg.com/data5/SELLER/Default/2025/4/503332953/XI/NE/WD/122442363/bajji-bonda-powder-250x250.jpeg",
        category: "Specialty Products",
        price: "₹90"
      }
    ]
  };

  // Get all products flattened
  const allProducts = Object.values(productCategories).flat();
  
  // Select featured products (max 6 products from different categories)
  const featuredProducts = [];
  const categories = Object.keys(productCategories);
  const maxFeaturedProducts = 6;
  
  // Get at most 2 products from each category until we have 6 featured products
  for (let i = 0; i < categories.length && featuredProducts.length < maxFeaturedProducts; i++) {
    const category = categories[i];
    const productsToAdd = productCategories[category].slice(0, 2);
    featuredProducts.push(...productsToAdd);
  }
  
  // Trim to exactly 6 products if we have more
  if (featuredProducts.length > maxFeaturedProducts) {
    featuredProducts.length = maxFeaturedProducts;
  }

  return (
    <div className="home-page">
      {/* Hero Section with Floating Elements */}
      <section className="hero-section">
        <div className="hero-background">
          <div className="floating-element fruit-1">🥭</div>
          <div className="floating-element fruit-2">🍊</div>
          <div className="floating-element fruit-3">🥥</div>
          <div className="floating-element leaf-1">🌿</div>
          <div className="floating-element leaf-2">🍃</div>
          <div className="floating-element grain-1">🌾</div>
        </div>
        
        <div className="container">
          <div className="row align-items-center min-vh-100">
            <div className="col-lg-6">
              <div className="hero-content">
                <span className="welcome-text">Welcome to Our Store</span>
                <h1 className="hero-title">
                  High-Quality
                  <span className="highlight-text">Traditional Products</span>
                </h1>
                <p className="hero-description">
                  Discover authentic South Indian food products made with traditional recipes 
                  and premium ingredients. From fresh flours to aromatic spices, we bring 
                  the taste of heritage to your kitchen.
                </p>
                <div className="hero-buttons">
                  <Link to="/products" className="btn btn-primary discover-btn">
                    Discover Now
                  </Link>
                  <a href="#about" className="btn btn-outline learn-more">
                    Learn More
                  </a>
                </div>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="hero-image">
                <div className="product-showcase">
                  <img 
                    src="https://5.imimg.com/data5/SELLER/Default/2025/4/503334512/HC/XO/FJ/122442363/wheat-flour-250x250.jpeg" 
                    alt="Premium Flour Products" 
                    className="main-product-image"
                  />
                  <div className="floating-products">
                    <div className="floating-product product-1">
                      <img src="https://5.imimg.com/data5/SELLER/Default/2025/4/503333782/UT/NA/UR/122442363/roasted-vermicelli-250x250.jpeg" alt="Rice Flour" />
                    </div>
                    <div className="floating-product product-2">
                      <img src="https://5.imimg.com/data5/SELLER/Default/2025/4/503333979/MS/BN/GX/122442363/double-roasted-rava-sooji-250x250.jpeg" alt="Ragi Flour" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section with Icons */}
      <section className="about-section" id="about">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-12">
              <span className="section-subtitle">A Few Words About Us</span>
              <h2 className="section-title">
                A store for good people
                <br />
                by good people
              </h2>
            </div>
          </div>
          
          <div className="row mb-5">
            <div className="col-lg-6">
              <p className="about-text">
                Buy natural, sustainable and chemical-free products from local sellers 
                across the country. We are committed to bringing you the finest traditional 
                food products that have been passed down through generations.
              </p>
              <p className="about-text">
                We are a strong community of 10,000+ customers and 60+ suppliers 
                who aspire to be good, do good, and spread goodness. We are a 
                democratic, self-sustaining marketplace which thrives on trust 
                and is built on community and high-quality content.
              </p>
            </div>
            <div className="col-lg-6">
              <div className="founder-info">
                <div className="two-part-section">
                  {/* Part 1: Featured Product Showcase */}
                  <div className="showcase-part">
                    <div className="showcase-header">
                      <h3>Our Signature Products</h3>
                      <p>Premium quality traditional ingredients</p>
                    </div>
                    <div className="featured-product-display">
                      <Link to="/products" className="main-product">
                        <img src="https://5.imimg.com/data5/SELLER/Default/2025/4/503334512/HC/XO/FJ/122442363/wheat-flour-250x250.jpeg" alt="Wheat Flour" />
                        <div className="product-badge">
                          <span className="badge-text">Best Seller</span>
                        </div>
                        <div className="product-info-overlay">
                          <h5>Premium Wheat Flour</h5>
                          {/* <span className="price">₹120</span> */}
                        </div>
                      </Link>
                      <div className="side-products">
                        <Link to="/products" className="side-product">
                          <img src="https://5.imimg.com/data5/SELLER/Default/2025/4/503333782/UT/NA/UR/122442363/roasted-vermicelli-250x250.jpeg" alt="Rice Flour" />
                          <span>Rice Flour</span>
                        </Link>
                        <Link to="/products" className="side-product">
                          <img src="https://5.imimg.com/data5/SELLER/Default/2025/4/503333979/MS/BN/GX/122442363/double-roasted-rava-sooji-250x250.jpeg" alt="Ragi Flour" />
                          <span>Ragi Flour</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  {/* Part 2: Company Trust & Founder */}
                  {/* <div className="trust-part">
                    <div className="trust-stats">
                      <div className="stat-item">
                        <div className="stat-icon">🏆</div>
                        <div className="stat-content">
                          <h4>25+ Years</h4>
                          <p>Experience</p>
                        </div>
                      </div>
                      <div className="stat-item">
                        <div className="stat-icon">❤️</div>
                        <div className="stat-content">
                          <h4>10K+ Happy</h4>
                          <p>Customers</p>
                        </div>
                      </div>
                    </div>
                    <div className="founder-section">
                      <div className="founder-image">
                        <img src="https://via.placeholder.com/80" alt="Founder" />
                      </div>
                      <div className="founder-info-content">
                        <h5>Sithee Kumar</h5>
                        <span className="founder-role">Founder & Quality Expert</span>
                        <p>"Quality is our tradition, trust is our foundation."</p>
                        <Link to="/products" className="btn btn-sm btn-outline-primary mt-2">
                          View Our Products
                        </Link>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section with Icons */}
      <section className="process-section">
        <div className="container">
          <div className="row">
            <div className="col-md-4 text-center">
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                      <path d="m2 17 10 5 10-5"/>
                      <path d="m2 12 10 5 10-5"/>
                    </svg>
                  </div>
                </div>
                <h4>Pick a starter option</h4>
                <p>Choose from select products to start. Keep, add, or remove items.</p>
              </div>
            </div>
            
            <div className="col-md-4 text-center">
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M3 3h18v18H3zM9 9h6v6H9z"/>
                    </svg>
                  </div>
                </div>
                <h4>Shop groceries</h4>
                <p>Add in your grocery staples, snacks, and other favorite pantry items every week.</p>
              </div>
            </div>
            
            <div className="col-md-4 text-center">
              <div className="process-step">
                <div className="process-icon">
                  <div className="icon-wrapper">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M16 16l-4-4-4 4"/>
                      <path d="M21 16V8a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2z"/>
                    </svg>
                  </div>
                </div>
                <h4>We deliver. You enjoy.</h4>
                <p>Save yourself a trip to the store and enjoy tasty meals — how delicious is that?</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products">
        <div className="container">
          <div className="row">
            <div className="col-12 text-center mb-5">
              <span className="section-subtitle">Our Featured Selection</span>
              <h2 className="section-title">Featured Products</h2>
              <p>Discover our most popular premium South Indian food products</p>
            </div>
          </div>
          
          <div className="row">
            {featuredProducts.map((product) => (
              <div key={product.id} className="col-lg-4 col-md-6 mb-4">
                <div className="product-card">
                  <Link to={`/products`} className="product-card-link">
                    <div className="product-image">
                      <img src={product.image} alt={product.name} />
                      <div className="product-tag">{product.category}</div>
                    </div>
                    <div className="product-info">
                      <span className="product-weight">{product.weight}</span>
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-full-name">{product.fullName}</p>
                      <div className="product-price-row">
                        <span className="price">{product.price}</span>
                        <div className="view-details">
                          View Details <span className="arrow-icon">→</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              </div>
            ))}
          </div>
          
          <div className="row mt-4">
            <div className="col-12 text-center">
              <Link to="/products" className="btn btn-outline-primary btn-lg">
                View All Products
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="row">
            <div className="col-6 col-md-3 text-center">
              <div className="stat-item">
                <h3 className="stat-number">10K+</h3>
                <p className="stat-label">Happy Customers</p>
              </div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="stat-item">
                <h3 className="stat-number">{allProducts.length}+</h3>
                <p className="stat-label">Product Varieties</p>
              </div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="stat-item">
                <h3 className="stat-number">25+</h3>
                <p className="stat-label">Years Experience</p>
              </div>
            </div>
            <div className="col-6 col-md-3 text-center">
              <div className="stat-item">
                <h3 className="stat-number">100%</h3>
                <p className="stat-label">Natural Products</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
