import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  // State variables to manage user input and error messages
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Function to validate email format
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  // Function to handle the login form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Attempt to authenticate user with provided email and password
      const response = await axios.post('http://localhost:4000/auth', {
        email: email,
        password: password,
      });

      console.log('Login successful:', response.data);

      // If authentication is successful, navigate to the finance page
      if (response.data.status === 200) {
        navigate('/finance');
        localStorage.setItem('id', response.data.user._id);
      }
    } catch (error) {
      // Handle login failure, display an error message to the user
      console.error('Login failed:', error.response.data);
      setLoginError('Invalid email or password. Please try again.'); // Set the login error message
    }
  };

  return (
    <div className='App'>
      {/* Header component */}
      <Header />
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              {/* Card header */}
              <div className="card-header bg-dark text-white text-center">
                <h4>Login</h4>
              </div>
              {/* Card body */}
              <div className="card-body">
                {/* Login form */}
                <form onSubmit={handleLogin}>
                  {/* Display login error message if exists */}
                  {loginError && <div className="alert alert-danger mb-3">{loginError}</div>}
                  {/* Email input */}
                  <div className="form-group mb-4">
                    <label htmlFor="email">Email:</label>
                    <input
                      type="email"
                      className={`form-control ${emailError ? 'is-invalid' : ''}`}
                      id="email"
                      placeholder="Enter your email"
                      value={email}
                      onBlur={validateEmail}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    {emailError && <div className="invalid-feedback">{emailError}</div>}
                  </div>
                  {/* Password input */}
                  <div className="form-group mb-4">
                    <label htmlFor="password">Password:</label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                  {/* Submit button */}
                  <button type="submit" className="btn btn-dark btn-block">
                    Login
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
