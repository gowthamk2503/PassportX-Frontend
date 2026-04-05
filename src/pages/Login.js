import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { FiMail, FiLock, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.email || !formData.password) {
      setError('Email and password are required');
      return;
    }

    try {
      setLoading(true);

      const res = await authService.login(formData);

      // Save user
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("token", res.data.token);

      navigate('/dashboard');

    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="l-page">
      <div className="l-right">

        <Link to="/" className="l-back-link">
          <FiArrowLeft /> Back
        </Link>

        <h1>Login</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Signing in..." : "Login"} <FiArrowRight />
          </button>
        </form>

        <p>Don't have account? <Link to="/signup">Signup</Link></p>
      </div>
    </div>
  );
};

export default Login;