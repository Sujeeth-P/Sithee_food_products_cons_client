import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Col } from 'react-bootstrap';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState('');
  const [popoverType, setPopoverType] = useState('success'); // 'success' or 'error'
  const [userName, setUserName] = useState('');
  
  // Validation states
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  // Get the page user was trying to access before login
  const from = location.state?.from?.pathname || '/home';

  // Check if user was redirected from a protected route
  const wasRedirected = location.state?.from?.pathname;
  const redirectMessage = wasRedirected ? `Please login to access ${wasRedirected === '/cart' ? 'your cart' : 'this page'}.` : '';

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  // Handle email input change with validation
  const handleEmailChange = (e) => {
    const value = e.target.value.trim();
    setEmail(value);
    
    if (value === '') {
      setEmailError('');
      setEmailValid(false);
    } else if (!validateEmail(value)) {
      setEmailError('Please enter a valid email address');
      setEmailValid(false);
    } else {
      setEmailError('');
      setEmailValid(true);
    }
  };

  // Handle password input change with validation
  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    
    if (value === '') {
      setPasswordError('');
      setPasswordValid(false);
    } else if (!validatePassword(value)) {
      setPasswordError('Password must be at least 6 characters long');
      setPasswordValid(false);
    } else {
      setPasswordError('');
      setPasswordValid(true);
    }
  };

  const showSuccessPopover = (message, name = '') => {
    setPopoverMessage(message);
    setPopoverType('success');
    setUserName(name);
    setShowPopover(true);
  };

  const showErrorPopover = (message) => {
    setPopoverMessage(message);
    setPopoverType('error');
    setShowPopover(true);
  };

  const handleClosePopover = () => {
    setShowPopover(false);
    if (popoverType === 'success') {
      navigate(from, { replace: true }); // Navigate to intended page or home
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    
    // Check if admin credentials are being used
    const isAdminLogin = (
      (email === 'admin@sithee.com' || email === 'admin') && 
      password === 'admin123'
    );
    
    if (isAdminLogin) {
      // Redirect to admin login with pre-filled credentials
      navigate('/admin/login', { 
        state: { 
          adminCredentials: { 
            username: email === 'admin@sithee.com' ? email : 'admin', 
            password: password 
          } 
        } 
      });
      return;
    }
    
    // Validate form before submission
    let isValid = true;
    
    if (!email) {
      setEmailError('Email is required');
      setEmailValid(false);
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      setEmailValid(false);
      isValid = false;
    }
    
    if (!password) {
      setPasswordError('Password is required');
      setPasswordValid(false);
      isValid = false;
    } else if (!validatePassword(password)) {
      setPasswordError('Password must be at least 6 characters long');
      setPasswordValid(false);
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await login(email, password);
      console.log("Login successful:", response);
      
      showSuccessPopover(`Welcome back!`, response.user?.name || response.name);
      setEmail('');
      setPassword('');
      // Clear validation states
      setEmailError('');
      setPasswordError('');
      setEmailValid(false);
      setPasswordValid(false);
    } catch (err) {
      // Provide more specific error feedback
      if (err.response && err.response.data && err.response.data.message) {
        showErrorPopover(`Login failed: ${err.response.data.message}`);
      } else if (err.message) {
        showErrorPopover(`Login failed: ${err.message}`);
      } else {
        showErrorPopover("Login failed. Please try again.");
      }
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper>
      <div className="login-main">
        <Col xs={11} sm={10} md={8} lg={6} xl={5} xxl={4}>
          <div className="login-box">
            <p>Login</p>
            {redirectMessage && (
              <div style={{
                background: 'rgba(255, 193, 7, 0.1)',
                border: '1px solid #ffc107',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '20px',
                textAlign: 'center',
                color: '#ffc107',
                fontSize: '14px'
              }}>
                <i className="fas fa-info-circle" style={{ marginRight: '8px' }}></i>
                {redirectMessage}
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="user-box">
                <input 
                  required 
                  type="email" 
                  value={email} 
                  onChange={handleEmailChange}
                  className={emailError ? 'error' : emailValid ? 'success' : ''}
                />
                <label>Email</label>
                {emailError && <div className="error-message">{emailError}</div>}
              </div>
              <div className="user-box">
                <input 
                  required 
                  type="password" 
                  value={password} 
                  onChange={handlePasswordChange}
                  className={passwordError ? 'error' : passwordValid ? 'success' : ''}
                />
                <label>Password</label>
                {passwordError && <div className="error-message">{passwordError}</div>}
              </div>
              <button type="submit" className="login-button-styled" disabled={isLoading}>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="button-text-content">
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </span>
              </button>
            </form>
            
            {/* Admin Access Info */}
            {/* <div style={{
              background: 'rgba(0, 123, 255, 0.1)',
              border: '1px solid #007bff',
              borderRadius: '8px',
              padding: '12px',
              marginTop: '15px',
              marginBottom: '15px',
              textAlign: 'center',
              fontSize: '12px',
              color: '#007bff'
            }}>
              <i className="fas fa-crown" style={{ marginRight: '6px' }}></i>
              <strong>Admin Access:</strong> Use <code>admin@dkart.com</code> and <code>admin123</code> to access admin panel
            </div> */}
            
            <p>Don't have an account? <Link to="/signup" className="a2">Sign up</Link></p>
          </div>
        </Col>
      </div>

      {/* Popover Overlay */}
      {showPopover && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          zIndex: 9999,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.25)',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
            backdropFilter: 'blur(10px)',
            textAlign: 'center',
            color: '#000',
            maxWidth: '90%',
          }}>
            {popoverType === 'success' ? (
              <>
                <div className="tick-animation mb-3">
                  <svg width="80" height="80" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" stroke="#4BB543" strokeWidth="2" />
                    <path fill="none" stroke="#4BB543" strokeWidth="5" d="M14 27 l7 7 l17 -17" />
                  </svg>
                </div>
                <h3 className="mt-3">Welcome back, {userName}!</h3>
                <p>{popoverMessage}</p>
              </>
            ) : (
              <>
                <div className="error-animation mb-3">
                  <svg width="80" height="80" viewBox="0 0 52 52">
                    <circle cx="26" cy="26" r="25" fill="none" stroke="#FF6B6B" strokeWidth="2" />
                    <path fill="none" stroke="#FF6B6B" strokeWidth="5" d="M16 16 l20 20" />
                    <path fill="none" stroke="#FF6B6B" strokeWidth="5" d="M36 16 l-20 20" />
                  </svg>
                </div>
                <h3 className="mt-3">Login Failed</h3>
                <p>{popoverMessage}</p>
              </>
            )}
            <button 
              style={{
                marginTop: '20px',
                padding: '10px 30px',
                backgroundColor: '#1B1B3A',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              onClick={handleClosePopover}
            >
              {popoverType === 'success' ? 'Continue' : 'Try Again'}
            </button>
          </div>
        </div>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .login-main {
    position: relative;
    width: 100%;
    height: 100vh;
    // background: linear-gradient(135deg, rgba(248, 151, 40, 0.9), rgba(254, 113, 62, 0.85));
  background-color: rgb(234, 231, 231);
    display: flex;  
    justify-content: center;
    align-items: center;
    overflow: hidden;
    z-index: 1;
  }

  .login-box {
    /* position: absolute; */ /* REMOVED for Bootstrap Col handling */
    /* top: 50%; */ /* REMOVED */
    /* left: 50%; */ /* REMOVED */
    width: 100%; /* CHANGED - takes width of parent Col */
    padding: 40px;
    /* margin: 20px auto; */ /* REMOVED or set to margin: 0; as Col and login-main handle centering */
    margin: 0;
    /* transform: translate(-50%, -55%); */ /* REMOVED */
    background-color: #F4F4F9;
    box-sizing: border-box;
    box-shadow: 0 15px 25px rgba(0,0,0,.6);
    border-radius: 10px;
  }

  .login-box p:first-child {
    margin: 0 0 30px;
    padding: 0;
    color: #2c1810;
    text-align: center;
    font-size: 1.5rem;
    font-weight: bold;
    letter-spacing: 1px;
  }

  .login-box .user-box {
    position: relative;
  }

  .login-box .user-box input {
    width: 100%;
    padding: 10px 0;
    font-size: 16px;
    color: #2c1810;
    margin-bottom: 30px;
    border: none;
    border-bottom: 1px solid #2c1810;
    outline: none;
    background: transparent;
    transition: border-color 0.3s;
  }

  .login-box .user-box input.error {
    border-bottom-color: #FF6B6B;
  }

  .login-box .user-box input.success {
    border-bottom-color: #4BB543;
  }

  .login-box .user-box .error-message {
    color: #FF6B6B;
    font-size: 12px;
    margin-top: -25px;
    margin-bottom: 15px;
    display: block;
    animation: slideDown 0.3s ease-out;
  }

  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .login-box .user-box label {
    position: absolute;
    top: 0;
    left: 0;
    padding: 10px 0;
    font-size: 16px;
    color: #2c1810;
    pointer-events: none;
    transition: .5s;
  }

  .login-box .user-box input:focus ~ label,
  .login-box .user-box input:valid ~ label {
    top: -20px;
    left: 0;
    color: #2c1810;
    font-size: 12px;
  }

  .login-button-styled {
    display: block; 
    width: 100%; 
    margin-top: 40px; /* Adjusted to match original a tag margin */
    color:rgb(255, 255, 255);
    padding: 0.5em 1.5em; /* This padding is for the content inside the button */
    font-size: 18px;
    font-weight: bold; 
    text-transform: uppercase; 
    letter-spacing: 3px; 
    border-radius: 0.5em;
    background:rgb(39, 68, 149) ;
    cursor: pointer;
    border: 1px solid rgb(39, 68, 149); 
    transition: all 0.3s;
    box-shadow: 6px 6px 12px rgba(0,0,0,0.1), -6px -6px 12px rgba(255,255,255,0.7); 
    text-decoration: none; 
    text-align: center;
    position: relative; /* Needed for positioning animation spans */
    overflow: hidden;   /* Needed to contain the animation spans */
  }

  .login-button-styled .button-text-content {
    position: relative;
    z-index: 1; /* Ensure text is above animation spans */
  }

  .login-button-styled:hover {
    background: white;
    color: black; 
    border-color: white;
  }

  .login-button-styled:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  .spinner {
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 2px solid transparent;
    border-top: 2px solid currentColor;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin-right: 8px;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  /* Animated border spans */
  .login-button-styled .animation-span {
    position: absolute;
    display: block;
    z-index: 0; /* Below button text */
  }

  .login-button-styled .animation-span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1B1B3A); /* Original animation color */
    animation: btn-anim1 1.5s linear infinite;
  }

  .login-button-styled .animation-span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #1B1B3A);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s;
  }

  .login-button-styled .animation-span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #1B1B3A);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s;
  }

  .login-button-styled .animation-span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #1B1B3A);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
  }

  /* Keyframes for button animation */
  @keyframes btn-anim1 {
    0% { left: -100%; }
    50%,100% { left: 100%; }
  }
  @keyframes btn-anim2 {
    0% { top: -100%; }
    50%,100% { top: 100%; }
  }
  @keyframes btn-anim3 {
    0% { right: -100%; }
    50%,100% { right: 100%; }
  }
  @keyframes btn-anim4 {
    0% { bottom: -100%; }
    50%,100% { bottom: 100%; }
  }
  
  .login-box p:last-child {
    margin-top: 20px;
    color: gray;
    font-size: 14px;
  }

  .login-box a.a2 {
    color: #2c1810;
    text-decoration: none;
  }

  .login-box a.a2:hover {
    background: transparent;
    color: #2c1810;
    border-radius: 5px;
  }
    
  /* The global button style might conflict or be redundant now, 
     preferring .login-button-styled or direct button styling within .login-box */
  /* button { ... } */
  /* button:hover { ... } */

`;




export default Login; 