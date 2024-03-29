import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [email, setEmail] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const validateConfirmPassword = () => {
    if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
    } else {
      setConfirmPasswordError('');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    //validate email and confirm password
    validateEmail();
    validateConfirmPassword();

    //check if there are any errors before proceeding with registration
    if (emailError || confirmPasswordError) {
      return;
    }

    try {
      const response = await axios.post('http://localhost:4000/register', {
        email: email,
        password: password,
      });

      //handle the response based on your backend API's structure
      console.log('Registration successful:', response.data);
      if(response.data.status === 200){
        navigate('/login')
      }
    } catch (error) {
      //handle errors, such as display an error message to the user
      console.error('Registration failed:', error.response.data);
    }
  };

  return (
    <div className='App'>
      <Header />
      <div className="container mt-5 pt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header bg-dark text-white text-center">
                <h4>Register</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleRegister}>
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
                  <div className="form-group mb-4">
                    <label htmlFor="confirmPassword">Confirm Password:</label>
                    <input
                      type="password"
                      className={`form-control ${confirmPasswordError ? 'is-invalid' : ''}`}
                      id="confirmPassword"
                      placeholder="Confirm your password"
                      value={confirmPassword}
                      onBlur={validateConfirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {confirmPasswordError && <div className="invalid-feedback">{confirmPasswordError}</div>}
                  </div>
                  <button type="submit" className="btn btn-dark btn-block">
                    Register
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

export default Register;
