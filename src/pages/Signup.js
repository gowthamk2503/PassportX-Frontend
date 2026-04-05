import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../services/api';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';

const Signup = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('All fields are required');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      const res = await authService.signup(formData);

      alert("Signup successful");

      navigate('/login');

    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="su-page">
      <div className="su-left">

        <Link to="/" className="su-back-link">
          <FiArrowLeft /> Back
        </Link>

        <h1>Create Account</h1>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            autoComplete="name"
            required
          />

          <input
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            autoComplete="tel"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
            required
          />

          <button type="submit" disabled={loading}>
            {loading ? "Creating..." : "Signup"} <FiArrowRight />
          </button>
        </form>

        <p>Already have account? <Link to="/login">Login</Link></p>
      </div>
    </div>
  );
};

export default Signup;