import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple validation - in a real app, you'd validate against a backend
    if (email && password) {
      // Redirect to schedule page after successful login
      navigate('/schedule');
    } else {
      alert('Please enter both email and password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>PAS-AID</h1>
          <p>Sign in to your account</p>
        </div>
        
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <button type="submit" className="login-button">
            Sign In
          </button>
        </form>
        
        <div className="login-footer">
          <a href="#" className="forgot-password">Forgot your password?</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
