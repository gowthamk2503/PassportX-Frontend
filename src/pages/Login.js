import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiMail, FiLock, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

/* ─── CSS ─────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:       #2563EB;
    --blue-mid:   #1D4ED8;
    --blue-dark:  #1E3A8A;
    --blue-soft:  #EFF6FF;
    --sky:        #BAE6FD;
    --ink:        #0F172A;
    --muted:      #64748B;
    --muted-2:    #94A3B8;
    --border:     #E2E8F0;
    --bg:         #F8FAFC;
    --green:      #10B981;
    --font:       'Plus Jakarta Sans', sans-serif;
    --serif:      'Instrument Serif', serif;
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ════ PAGE ════ */
  .l-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 480px;
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
  }

  /* ════ LEFT PANEL ════ */
  .l-panel {
    position: relative;
    overflow: hidden;
    padding: 4rem 3.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  .l-panel-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .l-panel-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.15) 0%, transparent 50%);
  }

  .l-panel-inner {
    position: relative; z-index: 1; max-width: 440px;
  }

  .l-panel-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.69rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 2rem;
    animation: fadeUp 0.7s ease both;
  }

  .l-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  .l-panel-title {
    font-family: var(--serif);
    font-size: clamp(2.2rem, 3.5vw, 3.4rem);
    font-weight: 400; line-height: 1.08; letter-spacing: -0.02em;
    color: #fff; margin-bottom: 1.2rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .l-panel-title em { color: #BAE6FD; font-style: italic; display: block; }

  .l-panel-sub {
    font-size: 0.93rem; line-height: 1.8; color: rgba(255,255,255,0.65);
    margin-bottom: 2.5rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .l-trust-list {
    display: flex; flex-direction: column; gap: 0.85rem;
    animation: fadeUp 0.7s 0.3s ease both;
  }

  .l-trust-item {
    display: flex; align-items: center; gap: 10px;
    font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.65);
  }

  .l-trust-icon {
    width: 28px; height: 28px; border-radius: 8px;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    color: #6EE7B7; flex-shrink: 0;
  }

  /* ════ RIGHT FORM PANEL ════ */
  .l-right {
    background: #fff;
    display: flex; flex-direction: column; justify-content: center;
    padding: 3.5rem 3rem;
    position: relative;
  }

  .l-back-link {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--muted); font-size: 0.82rem; font-weight: 500;
    text-decoration: none; margin-bottom: 2.5rem;
    transition: color 0.2s;
  }
  .l-back-link:hover { color: var(--blue); }

  .l-form-title {
    font-family: var(--serif);
    font-size: 2rem; font-weight: 400; color: var(--ink);
    margin-bottom: 0.45rem;
  }

  .l-form-sub {
    font-size: 0.88rem; color: var(--muted); line-height: 1.7; margin-bottom: 2rem;
  }

  .l-demo-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: var(--blue-soft);
    border: 1px solid #BFDBFE;
    border-radius: 100px; padding: 0.45rem 1rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em;
    color: var(--blue); margin-bottom: 1.75rem;
  }

  .l-error-box {
    background: #FEF2F2;
    border: 1px solid #FECACA;
    border-radius: 12px; padding: 0.9rem 1rem;
    margin-bottom: 1.5rem; font-size: 0.82rem; color: #DC2626;
    display: flex; align-items: center; gap: 8px;
  }

  .l-form-group { margin-bottom: 1.35rem; }

  .l-label {
    display: flex; align-items: center; gap: 7px;
    font-size: 0.8rem; font-weight: 700;
    color: var(--ink); margin-bottom: 0.6rem;
  }

  .l-input-wrap { position: relative; }

  .l-input-icon {
    position: absolute; left: 1rem; top: 50%;
    transform: translateY(-50%); color: var(--muted-2);
  }

  .l-input {
    width: 100%;
    padding: 0.9rem 1rem 0.9rem 2.8rem;
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    font-family: var(--font); font-size: 0.9rem; color: var(--ink);
    transition: all 0.25s;
  }

  .l-input::placeholder { color: var(--muted-2); }

  .l-input:focus {
    outline: none;
    border-color: var(--blue);
    background: #fff;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  /* ── Buttons ── */
  .l-btn {
    width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font); font-size: 0.9rem; font-weight: 700;
    padding: 1rem; border-radius: 12px; border: none; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }

  .l-btn-blue {
    background: var(--blue); color: #fff;
    box-shadow: var(--shadow-blue);
  }

  .l-btn-blue:hover:not(:disabled) {
    background: var(--blue-mid); transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(37,99,235,0.35);
  }

  .l-btn-blue:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .l-divider {
    display: flex; align-items: center; margin: 1.5rem 0;
    color: var(--muted-2); font-size: 0.75rem;
  }
  .l-divider::before, .l-divider::after {
    content: ''; flex: 1; height: 1px; background: var(--border);
  }
  .l-divider span { padding: 0 1rem; }

  .l-signup-link {
    text-align: center; font-size: 0.87rem; color: var(--muted);
  }
  .l-signup-link a {
    color: var(--blue); text-decoration: none; font-weight: 700;
    transition: color 0.2s;
  }
  .l-signup-link a:hover { color: var(--blue-mid); }

  /* ════ ANIMATIONS ════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 900px) {
    .l-page { grid-template-columns: 1fr; }
    .l-panel { display: none; }
    .l-right {
      min-height: 100vh;
      background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
      padding: 2.5rem 1.5rem;
    }
    .l-back-link { color: rgba(255,255,255,0.6); }
    .l-back-link:hover { color: #93C5FD; }
    .l-form-title { color: #fff; }
    .l-form-sub { color: rgba(255,255,255,0.55); }
    .l-demo-badge { background: rgba(255,255,255,0.12); border-color: rgba(255,255,255,0.2); color: #BAE6FD; }
    .l-label { color: rgba(255,255,255,0.8); }
    .l-input { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.15); color: #fff; }
    .l-input::placeholder { color: rgba(255,255,255,0.3); }
    .l-input:focus { border-color: rgba(96,165,250,0.6); background: rgba(255,255,255,0.12); box-shadow: 0 0 0 3px rgba(37,99,235,0.18); }
    .l-input-icon { color: rgba(255,255,255,0.4); }
    .l-btn-blue { background: #fff; color: var(--blue); }
    .l-btn-blue:hover:not(:disabled) { background: var(--blue-soft); }
    .l-divider { color: rgba(255,255,255,0.3); }
    .l-divider::before, .l-divider::after { background: rgba(255,255,255,0.15); }
    .l-signup-link { color: rgba(255,255,255,0.55); }
    .l-signup-link a { color: #93C5FD; }
    .l-error-box { background: rgba(239,68,68,0.12); border-color: rgba(239,68,68,0.3); color: #FCA5A5; }
  }
`;

const trustItems = [
  { icon: '🔒', text: '256-bit AES encrypted storage' },
  { icon: '✓',  text: 'Govt. approved application portal' },
  { icon: '⚡', text: 'Auto-save at every step' },
];

const Login = () => {
  const navigate = useNavigate();
  const { login, loading, error: authError } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: 'hire-me@anshumat.org',
    password: 'HireMe@2025!'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.email || !formData.password) { setError('Email and password are required'); return; }
    try {
      await login(formData);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="l-page">

        {/* ── Left brand panel ── */}
        <div className="l-panel">
          <div className="l-panel-pattern" />
          <div className="l-panel-glow" />
          <div className="l-panel-inner">
            <div className="l-panel-badge"><span className="l-live-dot" /> Official Passport Portal</div>
            <h1 className="l-panel-title">
              Welcome<br />
              <em>back.</em>
            </h1>
            <p className="l-panel-sub">
              Pick up exactly where you left off. Your application is saved and waiting for you.
            </p>
            <div className="l-trust-list">
              {trustItems.map(({ icon, text }) => (
                <div className="l-trust-item" key={text}>
                  <div className="l-trust-icon">{icon}</div>
                  {text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Right form panel ── */}
        <div className="l-right">
          <Link to="/" className="l-back-link">
            <FiArrowLeft size={15} /> Back to Home
          </Link>

          <h1 className="l-form-title">Sign in to your account</h1>
          <p className="l-form-sub">Continue your passport application journey.</p>

          <div className="l-demo-badge">
            <span>◉</span> Demo credentials pre-filled
          </div>

          {(error || authError) && (
            <div className="l-error-box">⚠ {error || authError}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="l-form-group">
              <label className="l-label"><FiMail size={15} /> Email Address</label>
              <div className="l-input-wrap">
                <FiMail className="l-input-icon" size={17} />
                <input type="email" name="email" className="l-input"
                  value={formData.email} onChange={handleChange}
                  placeholder="you@example.com" required />
              </div>
            </div>

            <div className="l-form-group">
              <label className="l-label"><FiLock size={15} /> Password</label>
              <div className="l-input-wrap">
                <FiLock className="l-input-icon" size={17} />
                <input type="password" name="password" className="l-input"
                  value={formData.password} onChange={handleChange}
                  placeholder="••••••••" required />
              </div>
            </div>

            <button type="submit" className="l-btn l-btn-blue" disabled={loading}>
              {loading ? 'Signing in…' : 'Sign in'} <FiArrowRight />
            </button>
          </form>

          <div className="l-divider"><span>or</span></div>

          <p className="l-signup-link">
            Don't have an account? <Link to="/signup">Create one now</Link>
          </p>
        </div>

      </div>
    </>
  );
};

export default Login;