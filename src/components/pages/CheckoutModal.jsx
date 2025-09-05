import React, { useState, useEffect } from 'react';
import '../css/CheckoutModal.css';

// State-City data for autocomplete
const stateCityData = {
  "Tamil Nadu": [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli", "Salem", "Tirunelveli",
    "Erode", "Vellore", "Thoothukudi", "Dindigul", "Thanjavur", "Ranipet",
    "Sivakasi", "Karur", "Udhagamandalam", "Hosur", "Nagercoil", "Kanchipuram",
    "Kumarakonam", "Pudukkottai", "Ambur", "Pallavaram", "Neyveli", "Rajapalayam"
  ],
  "Maharashtra": [
    "Mumbai", "Pune", "Nagpur", "Nashik", "Aurangabad", "Solapur", "Amravati",
    "Kolhapur", "Sangli", "Jalgaon", "Akola", "Latur", "Dhule", "Ahmednagar",
    "Chandrapur", "Parbhani", "Ichalkaranji", "Jalna", "Ambajogai", "Bhusawal"
  ],
  "Karnataka": [
    "Bangalore", "Mysore", "Hubli", "Mangalore", "Belgaum", "Gulbarga", "Davanagere",
    "Bellary", "Bijapur", "Shimoga", "Tumkur", "Raichur", "Bidar", "Hospet",
    "Hassan", "Gadag", "Udupi", "Robertsonpet", "Bhadravati", "Chitradurga"
  ],
  "Kerala": [
    "Thiruvananthapuram", "Kochi", "Kozhikode", "Thrissur", "Kollam", "Palakkad",
    "Alappuzha", "Malappuram", "Kannur", "Kasaragod", "Kottayam", "Idukki",
    "Ernakulam", "Wayanad", "Pathanamthitta", "Munnar", "Varkala", "Bekal"
  ],
  "Andhra Pradesh": [
    "Hyderabad", "Visakhapatnam", "Vijayawada", "Guntur", "Nellore", "Kurnool",
    "Rajahmundry", "Tirupati", "Anantapur", "Kadapa", "Vizianagaram", "Eluru",
    "Ongole", "Nandyal", "Machilipatnam", "Adoni", "Tenali", "Chittoor"
  ],
  "Telangana": [
    "Hyderabad", "Warangal", "Nizamabad", "Khammam", "Karimnagar", "Mahbubnagar",
    "Nalgonda", "Adilabad", "Suryapet", "Miryalaguda", "Jagtial", "Mancherial",
    "Nirmal", "Kothagudem", "Ramagundam", "Medak", "Bhongir", "Bodhan"
  ],
  "Rajasthan": [
    "Jaipur", "Jodhpur", "Kota", "Bikaner", "Ajmer", "Udaipur", "Bhilwara",
    "Alwar", "Bharatpur", "Sikar", "Pali", "Sri Ganganagar", "Kishangarh",
    "Baran", "Dhaulpur", "Tonk", "Beawar", "Hanumangarh", "Gangapur City"
  ],
  "West Bengal": [
    "Kolkata", "Howrah", "Durgapur", "Asansol", "Siliguri", "Malda", "Bardhaman",
    "Baharampur", "Habra", "Kharagpur", "Shantipur", "Dankuni", "Dhulian",
    "Ranaghat", "Haldia", "Raiganj", "Krishnanagar", "Nabadwip", "Medinipur"
  ],
  "Gujarat": [
    "Ahmedabad", "Surat", "Vadodara", "Rajkot", "Bhavnagar", "Jamnagar", "Junagadh",
    "Gandhinagar", "Anand", "Navsari", "Morbi", "Mahesana", "Bharuch", "Vapi",
    "Valsad", "Palanpur", "Porbandar", "Godhra", "Botad", "Amreli"
  ],
  "Uttar Pradesh": [
    "Lucknow", "Kanpur", "Ghaziabad", "Agra", "Varanasi", "Meerut", "Allahabad",
    "Bareilly", "Aligarh", "Moradabad", "Saharanpur", "Gorakhpur", "Firozabad",
    "Jhansi", "Muzaffarnagar", "Mathura", "Rampur", "Shahjahanpur", "Farrukhabad"
  ]
};

// State-City Autocomplete Component
const StateCityAutocomplete = ({ formData, handleChange, formErrors }) => {
  const [cityQuery, setCityQuery] = useState(formData.city || '');
  const [filteredCities, setFilteredCities] = useState([]);
  const [showCitySuggestions, setShowCitySuggestions] = useState(false);

  // Update city query when formData.city changes
  useEffect(() => {
    setCityQuery(formData.city || '');
  }, [formData.city]);

  // Filter cities based on selected state and search query
  useEffect(() => {
    if (formData.state && stateCityData[formData.state]) {
      const availableCities = stateCityData[formData.state];
      if (cityQuery) {
        const filtered = availableCities.filter(city =>
          city.toLowerCase().includes(cityQuery.toLowerCase())
        );
        setFilteredCities(filtered);
      } else {
        setFilteredCities(availableCities);
      }
    } else {
      setFilteredCities([]);
    }
  }, [formData.state, cityQuery]);

  const handleStateChange = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const state = e.target.value;
    console.log('State selected:', state); // Debug log
    handleChange({ target: { name: 'state', value: state } });
    handleChange({ target: { name: 'city', value: '' } });
    setCityQuery('');
    setShowCitySuggestions(false);
  };

  const handleCityInputChange = (e) => {
    const query = e.target.value;
    setCityQuery(query);
    handleChange({ target: { name: 'city', value: query } });
    setShowCitySuggestions(true);
  };

  const handleCitySelect = (city) => {
    setCityQuery(city);
    handleChange({ target: { name: 'city', value: city } });
    setShowCitySuggestions(false);
  };

  const handleCityInputFocus = () => {
    if (formData.state) {
      setShowCitySuggestions(true);
    }
  };

  const handleCityInputBlur = () => {
    setTimeout(() => {
      setShowCitySuggestions(false);
    }, 200);
  };

  return (
    <div className="form-row">
      <div className="form-group">
        <label htmlFor="state">State *</label>
        <select
          id="state"
          name="state"
          value={formData.state}
          onChange={handleStateChange}
          onClick={(e) => e.stopPropagation()}
          className={formErrors.state ? 'error' : ''}
          style={{
            pointerEvents: 'auto',
            cursor: 'pointer',
            zIndex: 'auto'
          }}
          required
        >
          <option value="">Select State</option>
          {Object.keys(stateCityData).sort().map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
        {formErrors.state && <span className="error-text">{formErrors.state}</span>}
      </div>
      
      <div className="form-group">
        <label htmlFor="city">City *</label>
        <div style={{ position: 'relative' }}>
          <input
            type="text"
            id="city"
            name="city"
            value={cityQuery}
            onChange={handleCityInputChange}
            onFocus={handleCityInputFocus}
            onBlur={handleCityInputBlur}
            className={formErrors.city ? 'error' : ''}
            placeholder={formData.state ? "Search or select city..." : "Select state first"}
            disabled={!formData.state}
            required
          />
          {formErrors.city && <span className="error-text">{formErrors.city}</span>}
          
          {/* City Suggestions Dropdown */}
          {showCitySuggestions && formData.state && filteredCities.length > 0 && (
            <div className="city-suggestions">
              {filteredCities.slice(0, 8).map(city => (
                <div
                  key={city}
                  className="city-suggestion-item"
                  onClick={() => handleCitySelect(city)}
                >
                  {city}
                </div>
              ))}
            </div>
          )}
          
          {/* No cities found message */}
          {showCitySuggestions && formData.state && cityQuery && filteredCities.length === 0 && (
            <div className="city-suggestions">
              <div className="city-suggestion-item" style={{ color: '#666', cursor: 'default' }}>
                No cities found matching "{cityQuery}"
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="form-group">
        <label htmlFor="zip">PIN Code *</label>
        <input
          type="text"
          id="zip"
          name="zip"
          value={formData.zip}
          onChange={handleChange}
          className={formErrors.zip ? 'error' : ''}
          placeholder="6-digit PIN code"
          maxLength="6"
          required
        />
        {formErrors.zip && <span className="error-text">{formErrors.zip}</span>}
      </div>
    </div>
  );
};

function CheckoutModal({ onClose, cart, total }) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    paymentMethod: 'cod'
  });
  
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  // Form validation
  const validateForm = () => {
    const errors = {};
    
    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.fullName)) {
      errors.fullName = 'Full name should only contain letters and spaces';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phone.trim()) {
      errors.phone = 'Phone number is required';
    } else if (!/^(\+91|91)?[6-9]\d{9}$/.test(formData.phone.replace(/\s+/g, ''))) {
      errors.phone = 'Please enter a valid Indian phone number';
    }
    
    if (!formData.address.trim()) {
      errors.address = 'Address is required';
    } else if (formData.address.trim().length < 10) {
      errors.address = 'Please provide a complete address';
    }
    
    if (!formData.city.trim()) {
      errors.city = 'City is required';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.city) || formData.city.trim().length < 2) {
      errors.city = 'Please enter a valid city name';
    }
    
    if (!formData.state.trim()) {
      errors.state = 'State is required';
    } else if (formData.state.trim().length < 3) {
      errors.state = 'Please enter a valid state name';
    }
    
    if (!formData.zip.trim()) {
      errors.zip = 'PIN code is required';
    } else if (!/^[1-9][0-9]{5}$/.test(formData.zip)) {
      errors.zip = 'Please enter a valid 6-digit PIN code';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Form change:', name, value); // Debug log
    
    // Clear validation for the field being edited
    if (formErrors[name]) {
      setFormErrors({ ...formErrors, [name]: '' });
    }
    
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  // Go to next step with validation
  const handleNextStep = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setStep(step + 1);
  };

  // Go back to previous step
  const handlePrevStep = () => {
    setStep(step - 1);
  };

  // Submit order
  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const newOrderId = 'ORD-' + Math.floor(100000 + Math.random() * 900000);
      setOrderId(newOrderId);
      setOrderComplete(true);
      
      // Clear cart would go here
      console.log('Order placed successfully:', newOrderId);
      
    } catch (error) {
      console.error('Error submitting order:', error);
      alert('There was an error processing your order. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  console.log('Current form data:', formData); // Debug log

  return (
    <div className="checkout-modal-overlay" onClick={onClose}>
      <div className="checkout-modal" onClick={handleModalClick}>
        <button className="close-modal" onClick={onClose}>×</button>
        
        {orderComplete ? (
          <div className="order-confirmation">
            <div className="confirmation-icon">✓</div>
            <h2>Order Placed Successfully!</h2>
            <p>Your order #{orderId} has been received.</p>
            <p>Thank you for shopping with Sithee Food Masala!</p>
            <p>We will send a confirmation to your email shortly.</p>
            <button className="close-btn" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div className="checkout-header">
              <h2>Checkout</h2>
              <div className="checkout-steps">
                <div className={`step ${step >= 1 ? 'active' : ''}`}>1. Delivery</div>
                <div className={`step ${step >= 2 ? 'active' : ''}`}>2. Payment</div>
                <div className={`step ${step >= 3 ? 'active' : ''}`}>3. Review</div>
              </div>
            </div>
            
            <div className="checkout-body">
              {step === 1 && (
                <form onSubmit={handleNextStep} className="checkout-form">
                  <h3>Delivery Information</h3>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="fullName">Full Name *</label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={formErrors.fullName ? 'error' : ''}
                        required
                      />
                      {formErrors.fullName && <span className="error-text">{formErrors.fullName}</span>}
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="email">Email *</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={formErrors.email ? 'error' : ''}
                        required
                      />
                      {formErrors.email && <span className="error-text">{formErrors.email}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="phone">Phone *</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className={formErrors.phone ? 'error' : ''}
                        placeholder="Enter 10-digit mobile number"
                        required
                      />
                      {formErrors.phone && <span className="error-text">{formErrors.phone}</span>}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="address">Address *</label>
                    <input
                      type="text"
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      className={formErrors.address ? 'error' : ''}
                      placeholder="Enter your complete address"
                      required
                    />
                    {formErrors.address && <span className="error-text">{formErrors.address}</span>}
                  </div>
                  
                  {/* State-City Autocomplete Component */}
                  <StateCityAutocomplete 
                    formData={formData}
                    handleChange={handleChange}
                    formErrors={formErrors}
                  />
                  
                  <div className="form-actions">
                    <button type="submit" className="next-btn">
                      Continue to Payment
                    </button>
                  </div>
                </form>
              )}
              
              {step === 2 && (
                <form onSubmit={handleNextStep} className="checkout-form">
                  <h3>Payment Method</h3>
                  
                  <div className="payment-options">
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="cod"
                        name="paymentMethod"
                        value="cod"
                        checked={formData.paymentMethod === 'cod'}
                        onChange={handleChange}
                      />
                      <label htmlFor="cod">Cash on Delivery</label>
                    </div>
                    
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="upi"
                        name="paymentMethod"
                        value="upi"
                        checked={formData.paymentMethod === 'upi'}
                        onChange={handleChange}
                      />
                      <label htmlFor="upi">UPI Payment</label>
                    </div>
                    
                    <div className="payment-option">
                      <input
                        type="radio"
                        id="card"
                        name="paymentMethod"
                        value="card"
                        checked={formData.paymentMethod === 'card'}
                        onChange={handleChange}
                      />
                      <label htmlFor="card">Credit/Debit Card</label>
                    </div>
                  </div>
                  
                  {formData.paymentMethod === 'upi' && (
                    <div className="upi-details">
                      <p>Send payment to: <strong>sitheefoods@upi</strong></p>
                      <p>Scan the QR code during delivery</p>
                    </div>
                  )}
                  
                  {formData.paymentMethod === 'card' && (
                    <div className="card-payment-note">
                      <p>Card payment will be processed at the time of delivery.</p>
                    </div>
                  )}
                  
                  <div className="form-actions">
                    <button type="button" className="back-btn" onClick={handlePrevStep}>
                      Back
                    </button>
                    <button type="submit" className="next-btn">
                      Review Order
                    </button>
                  </div>
                </form>
              )}
              
              {step === 3 && (
                <form onSubmit={handleSubmitOrder} className="checkout-form">
                  <h3>Order Summary</h3>
                  
                  <div className="order-items">
                    {cart && cart.map(item => (
                      <div key={item.id} className="order-item">
                        <div className="item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                        <div className="item-details">
                          <h4>{item.name}</h4>
                          <p className="item-price">₹{item.price} × {item.quantity}</p>
                        </div>
                        <div className="item-total">
                          ₹{item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="order-summary">
                    <div className="summary-row">
                      <span>Subtotal:</span>
                      <span>₹{total}</span>
                    </div>
                    <div className="summary-row">
                      <span>Shipping:</span>
                      <span>₹50</span>
                    </div>
                    <div className="summary-row total">
                      <span>Total:</span>
                      <span>₹{total + 50}</span>
                    </div>
                  </div>
                  
                  <div className="customer-details">
                    <h4>Delivery Address</h4>
                    <p>{formData.fullName}</p>
                    <p>{formData.address}</p>
                    <p>{formData.city}, {formData.state} {formData.zip}</p>
                    <p>Phone: {formData.phone}</p>
                    <p>Email: {formData.email}</p>
                    
                    <h4>Payment Method</h4>
                    <p>
                      {formData.paymentMethod === 'cod' && 'Cash on Delivery'}
                      {formData.paymentMethod === 'upi' && 'UPI Payment'}
                      {formData.paymentMethod === 'card' && 'Credit/Debit Card'}
                    </p>
                  </div>
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="back-btn" 
                      onClick={handlePrevStep}
                    >
                      Back
                    </button>
                    <button 
                      type="submit" 
                      className="place-order-btn"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? 'Processing...' : 'Place Order'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default CheckoutModal;