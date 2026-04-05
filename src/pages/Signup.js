import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiMail, FiLock, FiUser, FiPhone, FiArrowLeft, FiArrowRight, FiCheckCircle } from 'react-icons/fi';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-dark:   #1E3A8A;
    --blue-soft:   #EFF6FF;
    --sky:         #BAE6FD;
    --ink:         #0F172A;
    --muted:       #64748B;
    --muted-2:     #94A3B8;
    --border:      #E2E8F0;
    --bg:          #F8FAFC;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ════ PAGE ════ */
  .su-page {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 480px 1fr;
    background: var(--bg);
  }

  /* ════ LEFT FORM PANEL ════ */
  .su-left {
    background: #fff;
    border-right: 1px solid var(--border);
    display: flex; flex-direction: column; justify-content: center;
    padding: 3rem 2.75rem;
    overflow-y: auto;
  }

  .su-back-link {
    display: inline-flex; align-items: center; gap: 6px;
    color: var(--muted); font-size: 0.82rem; font-weight: 500;
    text-decoration: none; margin-bottom: 2rem; transition: color 0.2s;
  }
  .su-back-link:hover { color: var(--blue); }

  .su-form-title {
    font-family: var(--serif);
    font-size: 2rem; font-weight: 400; color: var(--ink); margin-bottom: 0.45rem;
  }

  .su-form-sub {
    font-size: 0.87rem; color: var(--muted); line-height: 1.7; margin-bottom: 1.75rem;
  }

  .su-error-box {
    background: #FEF2F2; border: 1px solid #FECACA;
    border-radius: 12px; padding: 0.9rem 1rem; margin-bottom: 1.4rem;
    font-size: 0.82rem; color: #DC2626;
    display: flex; align-items: center; gap: 8px;
  }

  .su-form-group { margin-bottom: 1.15rem; }

  .su-label {
    display: flex; align-items: center; gap: 7px;
    font-size: 0.8rem; font-weight: 700;
    color: var(--ink); margin-bottom: 0.6rem;
  }

  .su-input-wrap { position: relative; }

  .su-input-icon {
    position: absolute; left: 1rem; top: 50%;
    transform: translateY(-50%); color: var(--muted-2);
  }

  .su-input {
    width: 100%;
    padding: 0.88rem 1rem 0.88rem 2.8rem;
    background: var(--bg);
    border: 1.5px solid var(--border);
    border-radius: 12px;
    font-family: var(--font); font-size: 0.9rem; color: var(--ink);
    transition: all 0.25s;
  }
  .su-input::placeholder { color: var(--muted-2); }
  .su-input:focus {
    outline: none; border-color: var(--blue); background: #fff;
    box-shadow: 0 0 0 3px rgba(37,99,235,0.1);
  }

  .su-btn {
    width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font); font-size: 0.9rem; font-weight: 700;
    padding: 1rem; border-radius: 12px; border: none; cursor: pointer;
    margin-top: 0.4rem;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }

  .su-btn-blue { background: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .su-btn-blue:hover:not(:disabled) {
    background: var(--blue-mid); transform: translateY(-3px);
    box-shadow: 0 12px 32px rgba(37,99,235,0.35);
  }
  .su-btn-blue:disabled { opacity: 0.6; cursor: not-allowed; transform: none; }

  .su-divider {
    display: flex; align-items: center; margin: 1.5rem 0;
    color: var(--muted-2); font-size: 0.75rem;
  }
  .su-divider::before, .su-divider::after { content:''; flex:1; height:1px; background: var(--border); }
  .su-divider span { padding: 0 1rem; }

  .su-login-link { text-align: center; font-size: 0.87rem; color: var(--muted); }
  .su-login-link a { color: var(--blue); text-decoration: none; font-weight: 700; transition: color 0.2s; }
  .su-login-link a:hover { color: var(--blue-mid); }

  /* ════ RIGHT BRAND PANEL ════ */
  .su-right {
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    display: flex; flex-direction: column; justify-content: center;
    padding: 4rem 3.5rem;
  }

  .su-right-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .su-right-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 100% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 0% 10%, rgba(186,230,253,0.1) 0%, transparent 50%);
  }

  .su-right-inner {
    position: relative; z-index: 1; max-width: 420px;
  }

  .su-right-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.69rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 2rem;
    animation: fadeUp 0.7s ease both;
  }

  .su-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  .su-right-title {
    font-family: var(--serif);
    font-size: clamp(2.2rem,3.5vw,3.2rem);
    font-weight: 400; line-height: 1.08; letter-spacing: -0.02em;
    color: #fff; margin-bottom: 1.2rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }
  .su-right-title em { color: #BAE6FD; font-style: italic; display: block; }

  .su-right-sub {
    font-size: 0.93rem; line-height: 1.8; color: rgba(255,255,255,0.65);
    margin-bottom: 2.5rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  /* Stats mini-grid */
  .su-stats {
    display: grid; grid-template-columns: 1fr 1fr;
    gap: 1px; background: rgba(255,255,255,0.14);
    border: 1px solid rgba(255,255,255,0.14); border-radius: 18px; overflow: hidden;
    box-shadow: 0 8px 32px rgba(15,23,42,0.2);
    animation: fadeUp 0.7s 0.3s ease both;
  }

  .su-stat {
    background: rgba(255,255,255,0.07); padding: 1.5rem 1.25rem;
  }
  .su-stat-num {
    font-family: var(--serif); font-size: 2rem; font-weight: 400; color: #fff; line-height: 1;
  }
  .su-stat-lbl {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase;
    color: rgba(255,255,255,0.4); margin-top: 4px;
  }

  /* Trust bullets */
  .su-checks {
    display: flex; flex-direction: column; gap: 0.75rem; margin-top: 2rem;
    animation: fadeUp 0.7s 0.4s ease both;
  }
  .su-check-item {
    display: flex; align-items: center; gap: 10px;
    font-size: 0.78rem; font-weight: 600; color: rgba(255,255,255,0.65);
  }
  .su-check-item svg { color: #6EE7B7; flex-shrink: 0; }

  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 900px) {
    .su-page { grid-template-columns: 1fr; }
    .su-right { display: none; }
    .su-left { min-height: 100vh; padding: 2.5rem 1.5rem; }
  }
`;

const Signup = () => {
  const navigate = useNavigate();
  const { signup, loading, error: authError } = useAuth();
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!formData.name || !formData.email || !formData.password || !formData.phone) {
      setError('All fields are required'); return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match'); return;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters'); return;
    }
    try {
      await signup({ name: formData.name, email: formData.email, password: formData.password, phone: formData.phone });
      navigate('/onboarding');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <>
      <style>{css}</style>
      <div className="su-page">

        {/* ── Left form ── */}
        <div className="su-left">
          <Link to="/" className="su-back-link"><FiArrowLeft size={15} /> Back to Home</Link>

          <h1 className="su-form-title">Create your account</h1>
          <p className="su-form-sub">Start your passport application in under a minute.</p>

          {(error || authError) && (
            <div className="su-error-box">⚠ {error || authError}</div>
          )}

          <form onSubmit={handleSubmit}>
            {[
              { name:'name',            label:'Full Name',        icon:<FiUser />,  type:'text',     placeholder:'John Doe'            },
              { name:'email',           label:'Email Address',    icon:<FiMail />,  type:'email',    placeholder:'you@example.com'     },
              { name:'phone',           label:'Phone Number',     icon:<FiPhone />, type:'tel',      placeholder:'+91 98765 43210'     },
              { name:'password',        label:'Password',         icon:<FiLock />,  type:'password', placeholder:'Enter password'      },
              { name:'confirmPassword', label:'Confirm Password', icon:<FiLock />,  type:'password', placeholder:'Confirm password'    },
            ].map(({ name, label, icon, type, placeholder }) => (
              <div className="su-form-group" key={name}>
                <label className="su-label">{React.cloneElement(icon, { size: 15 })} {label}</label>
                <div className="su-input-wrap">
                  {React.cloneElement(icon, { className: 'su-input-icon', size: 17 })}
                  <input type={type} name={name} className="su-input"
                    value={formData[name]} onChange={handleChange}
                    placeholder={placeholder} required />
                </div>
              </div>
            ))}

            <button type="submit" className="su-btn su-btn-blue" disabled={loading}>
              {loading ? 'Creating Account…' : 'Create Account'} <FiArrowRight />
            </button>
          </form>

          <div className="su-divider"><span>or</span></div>
          <p className="su-login-link">Already have an account? <Link to="/login">Sign in</Link></p>
        </div>

        {/* ── Right brand panel ── */}
        <div className="su-right">
          <div className="su-right-pattern" />
          <div className="su-right-glow" />
          <div className="su-right-inner">
            <div className="su-right-badge"><span className="su-live-dot" /> Official Passport Portal</div>
            <h2 className="su-right-title">
              Your passport,<br />
              <em>simplified.</em>
            </h2>
            <p className="su-right-sub">
              A modern, guided way to complete your passport application — secure, effortless, and designed to get you done in under 15 minutes.
            </p>

            <div className="su-stats">
              {[
                { num: '50K+', lbl: 'Applications' },
                { num: '99.8%', lbl: 'Success Rate' },
                { num: '4.9★', lbl: 'Rating' },
                { num: '<15m', lbl: 'Avg. Time' },
              ].map(({ num, lbl }) => (
                <div className="su-stat" key={lbl}>
                  <div className="su-stat-num">{num}</div>
                  <div className="su-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>

            <div className="su-checks">
              {['256-bit Encrypted', 'Auto-Save Enabled', 'Govt. Approved'].map(t => (
                <div className="su-check-item" key={t}><FiCheckCircle size={14} /> {t}</div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </>
  );
};

export default Signup;