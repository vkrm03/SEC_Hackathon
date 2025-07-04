import React, { useState } from 'react';
import axios from 'axios';
import '../src/assets/auth.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/login', formData);
      const { token, user } = res.data;

      toast.success('Login successful!');

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      setFormData({ email: '', password: '' }); 

      setTimeout(() => {
        window.location.href = "/dashboard";
      }, 1000);

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
        <p className="switch-msg">
          Don’t have an account? <a href="/register">Register</a>
        </p>
      </form>
    </div>
  );
}
