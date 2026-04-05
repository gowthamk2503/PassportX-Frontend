import React from 'react';
import { useAuth } from '../context/useAuth';
import { useNavigate } from 'react-router-dom';
import { FiLogOut, FiUser, FiHome, FiArrowRight } from 'react-icons/fi';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-dark:   #1E3A8A;
    --blue-light:  #EFF6FF;
    --sky:         #BAE6FD;
    --ink:         #0F172A;
    --muted:       #64748B;
    --muted-2:     #94A3B8;
    --border:      #E2E8F0;
    --surface:     #FFFFFF;
    --surface-2:   #F1F5F9;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
    --shadow-sm:   0 1px 3px rgba(0,0,0,0.1);
  }

  *, *::before, *::after { box-sizing: border-box; }

  /* ════ SHELL ════ */
  .nb-shell {
    position: sticky; top: 0; z-index: 1000;
    background: transparent;
    pointer-events: none;
    width: 100%;
    padding: 0;
  }

  /* ════ FLOATING BAR ════ */
  .nb-bar {
    width: 100%;
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    padding: 0.9rem 2rem;
    background: transparent;
    border: none;
    pointer-events: all;
  }

  /* ════ BRAND ════ */
  .nb-brand {
    display: inline-flex; align-items: center; gap: 0.85rem;
    text-decoration: none; cursor: pointer; min-width: 0;
    transition: opacity 0.2s;
  }
  .nb-brand:hover { opacity: 0.9; }

  .nb-brand-mark {
    width: 40px; height: 40px; border-radius: 12px; flex-shrink: 0;
    display: grid; place-items: center; font-size: 1.05rem;
    background: var(--blue-light); border: 1px solid var(--border);
    box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));
  }

  .nb-brand-name {
    font-family: var(--serif); font-size: 1.2rem; font-weight: 400;
    letter-spacing: -0.02em; color: var(--ink); line-height: 1;
  }

  .nb-brand-sub {
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase;
    color: var(--muted); margin-top: 3px;
  }

  /* ════ NAV ACTIONS ════ */
  .nb-nav {
    display: flex; align-items: center; gap: 0.65rem;
  }

  /* Base button */
  .nb-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    font-family: var(--font); font-size: 0.82rem; font-weight: 700;
    padding: 0.68rem 1.1rem; border-radius: 11px; border: none; cursor: pointer;
    text-decoration: none; white-space: nowrap;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }

  /* Ghost */
  .nb-btn-ghost {
    background: var(--surface-2, #f1f5f9); border: 1px solid var(--border);
    color: var(--ink);
  }
  .nb-btn-ghost:hover { background: var(--border); transform: translateY(-2px); }

  /* White (primary) */
  .nb-btn-white { background: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .nb-btn-white:hover { background: var(--blue-mid); transform: translateY(-3px); box-shadow: 0 12px 28px rgba(37,99,235,0.3); }

  /* Danger */
  .nb-btn-danger {
    background: rgba(239,68,68,0.1); border: 1px solid rgba(239,68,68,0.22); color: var(--red, #dc2626);
  }
  .nb-btn-danger:hover { background: rgba(239,68,68,0.18); transform: translateY(-2px); }

  /* ════ USER PILL ════ */
  .nb-user {
    display: inline-flex; align-items: center; gap: 0.65rem;
    padding: 0.55rem 0.85rem 0.55rem 0.6rem;
    border-radius: 11px;
    background: var(--surface, #fff); border: 1px solid var(--border);
  }

  .nb-user-avatar {
    width: 30px; height: 30px; border-radius: 8px; flex-shrink: 0;
    background: var(--blue-light); border: 1px solid var(--border);
    display: grid; place-items: center; color: var(--blue);
  }

  .nb-user-label {
    font-size: 0.58rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: var(--muted); line-height: 1;
  }

  .nb-user-name {
    font-size: 0.8rem; font-weight: 700; color: var(--ink);
    overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
    max-width: 160px; line-height: 1.3;
  }

  /* Divider between nav items */
  .nb-sep {
    width: 1px; height: 22px; background: var(--border); margin: 0 0.15rem;
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 820px) {
    .nb-bar {
      flex-direction: column; align-items: stretch; gap: 0.75rem;
      padding: 1rem 1rem 0.9rem;
    }

    .nb-nav { flex-direction: column; align-items: stretch; gap: 0.5rem; }

    .nb-btn, .nb-user { width: 100%; }

    .nb-user-name { max-width: none; }

    .nb-sep { display: none; }
  }
`;

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => { logout(); navigate('/'); };

  return (
    <>
      <style>{css}</style>
      <header className="nb-shell">
        <nav className="nb-bar">
          {/* Brand */}
          <div className="nb-brand" onClick={() => navigate('/')} role="button" tabIndex={0} onKeyDown={e => e.key === 'Enter' && navigate('/')}>
            <div className="nb-brand-mark">🛂</div>
            <div>
              <div className="nb-brand-name">PassportX</div>
              <div className="nb-brand-sub">Official Application Portal</div>
            </div>
          </div>

          {/* Actions */}
          {isAuthenticated ? (
            <div className="nb-nav">
              <button className="nb-btn nb-btn-ghost" onClick={() => navigate('/dashboard')}>
                <FiHome size={15} /> Dashboard
              </button>

              <div className="nb-sep" />

              <div className="nb-user">
                <div className="nb-user-avatar"><FiUser size={14} /></div>
                <div>
                  <div className="nb-user-label">Signed in as</div>
                  <div className="nb-user-name">{user?.name || 'User'}</div>
                </div>
              </div>

              <button className="nb-btn nb-btn-danger" onClick={handleLogout}>
                <FiLogOut size={14} /> Logout
              </button>
            </div>
          ) : (
            <div className="nb-nav">
              <button className="nb-btn nb-btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
              <button className="nb-btn nb-btn-white" onClick={() => navigate('/signup')}>
                Get Started <FiArrowRight size={14} />
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Navbar;