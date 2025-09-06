import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Col } from 'react-bootstrap';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [popoverMessage, setPopoverMessage] = useState('');
  const [popoverType, setPopoverType] = useState('success'); // 'success' or 'error'
  const [userName, setUserName] = useState('');
  
  // Validation states
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [passwordValid, setPasswordValid] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  
  const navigate = useNavigate();
  const { register } = useAuth();

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
      navigate('/login'); // Navigate to login after successful signup
    }
  };

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    return emailRegex.test(email) && email.length <= 254;
  };

  const validatePasswordRequirements = (password) => {
    return {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      special: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)
    };
  };

  const isValidPassword = (password) => {
    const checks = validatePasswordRequirements(password);
    return checks.length && checks.uppercase && checks.lowercase && checks.number;
  };

  const calculatePasswordStrength = (password) => {
    const checks = validatePasswordRequirements(password);
    const score = Object.values(checks).filter(Boolean).length;
    
    if (score < 2) return 'Too weak';
    if (score < 4) return 'fair';
    if (score < 5) return 'Somthing good';
    return 'strong';
  };

  // Handle name input change with validation
  const handleNameChange = (e) => {
    const value = e.target.value.trim();
    setName(value);
    
    if (value === '') {
      setNameError('');
      setNameValid(false);
    } else if (value.length < 2) {
      setNameError('Name must be at least 2 characters long');
      setNameValid(false);
    } else {
      setNameError('');
      setNameValid(true);
    }
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
      setPasswordStrength('');
    } else {
      const strength = calculatePasswordStrength(value);
      setPasswordStrength(strength);
      
      if (value.length < 8) {
       // setPasswordError('Password must be at least 8 characters long');
        setPasswordValid(false);
      } else if (!isValidPassword(value)) {
        //setPasswordError('Password must contain uppercase, lowercase, and number');
        setPasswordValid(false);
      } else {
        setPasswordError('');
        setPasswordValid(true);
      }
    }
  };

  async function handlePost(e) {
    e.preventDefault();
    
    // Validate form before submission
    let isValid = true;
    
    if (!name) {
      setNameError('Name is required');
      setNameValid(false);
      isValid = false;
    } else if (name.length < 2) {
      setNameError('Name must be at least 2 characters long');
      setNameValid(false);
      isValid = false;
    }
    
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
    } else if (password.length < 8) {
     // setPasswordError('Password must be at least 8 characters long');
      setPasswordValid(false);
      isValid = false;
    } else if (!isValidPassword(password)) {
      //setPasswordError('Password must contain uppercase, lowercase, and number');
      setPasswordValid(false);
      isValid = false;
    }
    
    if (!isValid) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await register({ name, email, password });
      console.log("Signup successful:", response);
      showSuccessPopover(`Account created successfully!`, response.user?.name || response.name);
      setName('');
      setEmail('');
      setPassword('');
      // Clear validation states
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setNameValid(false);
      setEmailValid(false);
      setPasswordValid(false);
      setPasswordStrength('');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        showErrorPopover(`Signup failed: ${err.response.data.message}`);
      } else if (err.message) {
        showErrorPopover(`Signup failed: ${err.message}`);
      } else {
        showErrorPopover("Signup failed. Please try again.");
      }
      console.error("Signup error:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <StyledWrapper>
      <div className="login-main">
        <Col xs={11} sm={10} md={8} lg={6} xl={5} xxl={4}>
          <div className="login-box">
            <p>Sign Up</p>
            <form onSubmit={handlePost}>
              <div className="user-box">
                <input 
                  required 
                  type="text" 
                  value={name} 
                  onChange={handleNameChange}
                  className={nameError ? 'error' : nameValid ? 'success' : ''}
                />
                <label>Name</label>
                {nameError && <div className="error-message">{nameError}</div>}
              </div>
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
                {password && (
                  <div className="password-strength" style={{ marginTop: passwordError ? '10px' : '-20px' }}>
                    <div className="strength-bar">
                      <div className={`strength-fill ${passwordStrength}`}></div>
                    </div>
                    <div className="strength-text">
                      {passwordStrength && `${passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)} password`}
                    </div>
                  </div>
                )}
              </div>
              <button type="submit" className="signup-button-styled" disabled={isLoading}>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="animation-span"></span>
                <span className="button-text-content">
                  {isLoading ? (
                    <>
                      <span className="spinner"></span>
                      Signing up...
                    </>
                  ) : (
                    'Sign Up'
                  )}
                </span>
              </button>
            </form>
            <p>Already have an account? <Link to="/login" className="a2">Login</Link></p>
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
                <h3 className="mt-3">Welcome, {userName}!</h3>
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
                <h3 className="mt-3">Signup Failed</h3>
                <p>{popoverMessage}</p>
              </>
            )}
            <button 
              style={{
                marginTop: '20px',
                padding: '10px 30px',
                backgroundColor: '#2c1810',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '16px'
              }}
              onClick={handleClosePopover}
            >
              {popoverType === 'success' ? 'Continue to Login' : 'Try Again'}
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

  .login-box { /* Assuming this class is used for the main content box in Signup as well */
    /* position: absolute; */ /* REMOVED */
    /* top: 50%; */ /* REMOVED */
    /* left: 50%; */ /* REMOVED */
    width: 100%; /* CHANGED - takes width of parent Col */
    padding: 40px;
    /* margin: 20px auto; */ /* REMOVED or set to margin: 0; */
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
    height: 5px !important;
    display: block;
    animation: slideDown 0.3s ease-out;
  }

  .password-strength {
    margin-top: -20px;
    margin-bottom: 20px;
  }

  .strength-bar {
    width: 100%;
    height: 4px;
    background-color: #e0e0e0;
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 5px;
  }

  .strength-fill {
    height: 100%;
    transition: all 0.3s ease;
    border-radius: 2px;
  }

  .strength-fill.weak {
    width: 25%;
    background-color: #FF6B6B;
  }

  .strength-fill.fair {
    width: 50%;
    background-color: #FFA726;
  }

  .strength-fill.good {
    width: 75%;
    background-color: #b1bb66ff;
  }

  .strength-fill.strong {
    width: 100%;
    background-color: #4BB543;
  }

  .strength-text {
    font-size: 12px;
    color: #666;
    text-align: left;
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

  .signup-button-styled { /* Changed class name for clarity, can be same as login if styles are identical */
    display: block; 
    width: 100%; 
    margin-top: 40px; 
    color:rgb(255, 255, 255);
    padding: 0.5em 1.5em;
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
    position: relative; 
    overflow: hidden;   
  }

  .signup-button-styled .button-text-content {
    position: relative;
    z-index: 1; 
  }

  .signup-button-styled:hover {
    background: white;
    color: black; 
    border-color: white;
  }

  .signup-button-styled:disabled {
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

  .signup-button-styled .animation-span {
    position: absolute;
    display: block;
    z-index: 0; 
  }

  .signup-button-styled .animation-span:nth-child(1) {
    top: 0;
    left: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, transparent, #1B1B3A);
    animation: btn-anim1 1.5s linear infinite;
  }

  .signup-button-styled .animation-span:nth-child(2) {
    top: -100%;
    right: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(180deg, transparent, #1B1B3A);
    animation: btn-anim2 1.5s linear infinite;
    animation-delay: .375s;
  }

  .signup-button-styled .animation-span:nth-child(3) {
    bottom: 0;
    right: -100%;
    width: 100%;
    height: 2px;
    background: linear-gradient(270deg, transparent, #1B1B3A);
    animation: btn-anim3 1.5s linear infinite;
    animation-delay: .75s;
  }

  .signup-button-styled .animation-span:nth-child(4) {
    bottom: -100%;
    left: 0;
    width: 2px;
    height: 100%;
    background: linear-gradient(360deg, transparent, #1B1B3A);
    animation: btn-anim4 1.5s linear infinite;
    animation-delay: 1.125s;
  }

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
`;

export default Signup;