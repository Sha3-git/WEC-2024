import React, { useState } from 'react';
import Header from '../components/Header';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const navigate = useNavigate();

  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email) && email.length > 0) {
      setEmailError('Invalid email address');
    } else {
      setEmailError('');
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:4000/auth', {
        email: email,
        password: password,
      });

      console.log('Login successful:', response.data);
      if(response.data.status === 200){
        navigate('/finance')
        localStorage.setItem('id', response.data.user._id)
      }
    } catch (error) {
      
      console.error('Login failed:', error.response.data);
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
                <h4>Login</h4>
              </div>
              <div className="card-body">
                <form onSubmit={handleLogin}>
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
