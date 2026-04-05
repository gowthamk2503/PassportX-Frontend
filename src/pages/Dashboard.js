import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { applicationService } from '../services/api';
import { FiFilePlus, FiFileText, FiCheckCircle, FiXCircle, FiClock, FiPlus, FiArrowRight, FiCalendar } from 'react-icons/fi';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-dark:   #1E3A8A;
    --blue-light:  #EFF6FF;
    --sky:         #BAE6FD;
    --ink:         #0F172A;
    --ink-2:       #1E293B;
    --muted:       #64748B;
    --muted-2:     #94A3B8;
    --border:      #E2E8F0;
    --surface:     #FFFFFF;
    --surface-2:   #F1F5F9;
    --bg:          #F7F9FC;
    --green:       #059669;
    --green-bg:    #ECFDF5;
    --amber:       #D97706;
    --amber-bg:    #FFFBEB;
    --red:         #DC2626;
    --red-bg:      #FEF2F2;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ════ HERO ════ */
  .db-hero {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    padding: 5rem 1.5rem 3rem;
    position: relative; overflow: hidden;
  }

  .db-hero-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .db-hero-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.1) 0%, transparent 50%);
  }

  .db-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap;
  }

  .db-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 1.25rem;
    animation: fadeUp 0.6s ease both;
  }

  .db-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  .db-hero-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 400; line-height: 1.1; color: #fff; letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }
  .db-hero-title em { font-style: italic; color: var(--sky); }

  .db-hero-sub {
    font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.65);
    animation: fadeUp 0.6s 0.15s ease both;
  }

  .db-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font); font-size: 0.88rem; font-weight: 700;
    padding: 0.85rem 1.6rem; border-radius: 12px; border: none; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); white-space: nowrap;
    animation: fadeUp 0.6s 0.2s ease both;
  }
  .db-btn-white { background: #fff; color: var(--blue); box-shadow: var(--shadow-blue); }
  .db-btn-white:hover { background: var(--blue-light); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }

  /* ════ STAT STRIP ════ */
  .db-stats-bar { background: var(--surface); border-bottom: 1px solid var(--border); }
  .db-stats-row { max-width: 1100px; margin: 0 auto; display: grid; grid-template-columns: repeat(4, 1fr); }

  .db-stat-cell {
    padding: 1.75rem 2rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background 0.25s; cursor: default;
  }
  .db-stat-cell:last-child { border-right: none; }
  .db-stat-cell::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue), #60A5FA);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .db-stat-cell:hover::after { transform: scaleX(1); }
  .db-stat-cell:hover { background: var(--blue-light); }
  .db-stat-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 4px; }
  .db-stat-val { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; color: var(--ink); }
  .db-stat-val.accent { color: var(--blue); }

  /* ════ MAIN ════ */
  .db-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }

  /* ════ EMPTY STATE ════ */
  .db-empty-wrap { display: flex; justify-content: center; }

  .db-empty {
    background: var(--surface); border: 1px solid var(--border); border-radius: 24px;
    padding: 5rem 3rem; text-align: center; max-width: 520px; width: 100%;
    box-shadow: var(--shadow-md);
  }

  .db-empty-icon {
    width: 64px; height: 64px; border-radius: 18px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue); margin: 0 auto 1.75rem;
    box-shadow: var(--shadow-sm);
  }

  .db-empty-title { font-family: var(--serif); font-size: 1.75rem; font-weight: 400; color: var(--ink); margin-bottom: 0.6rem; }
  .db-empty-text  { font-size: 0.9rem; line-height: 1.75; color: var(--muted); margin-bottom: 2rem; }

  .db-empty-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font); font-size: 0.9rem; font-weight: 700;
    padding: 0.95rem 1.75rem; border-radius: 12px; border: none; cursor: pointer;
    background: var(--blue); color: #fff; box-shadow: var(--shadow-blue);
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .db-empty-btn:hover { background: var(--blue-mid); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.35); }

  /* ════ APPLICATIONS GRID ════ */
  .db-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(330px, 1fr)); gap: 1.5rem;
  }

  .db-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
    overflow: hidden; cursor: pointer; transition: all 0.3s ease;
    box-shadow: var(--shadow-sm);
    position: relative;
  }
  .db-card:hover { transform: translateY(-5px); box-shadow: var(--shadow-md); border-color: #BFDBFE; }
  .db-card::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue), #60A5FA);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .db-card:hover::after { transform: scaleX(1); }

  /* Card top color band per status */
  .db-card-band { height: 5px; }
  .db-card-band.draft     { background: linear-gradient(90deg, var(--muted-2), #CBD5E1); }
  .db-card-band.submitted { background: linear-gradient(90deg, var(--amber), #FCD34D); }
  .db-card-band.approved  { background: linear-gradient(90deg, var(--green), #34D399); }
  .db-card-band.rejected  { background: linear-gradient(90deg, var(--red), #F87171); }

  .db-card-body { padding: 1.75rem; }

  .db-card-head { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 1.25rem; }

  .db-app-id { font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--ink); margin-bottom: 3px; }
  .db-app-meta { font-size: 0.72rem; color: var(--muted-2); display: flex; align-items: center; gap: 5px; }

  .db-badge {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.67rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    padding: 0.32rem 0.75rem; border-radius: 100px; flex-shrink: 0;
  }
  .db-badge.draft     { background: var(--surface-2); border: 1px solid var(--border); color: var(--muted); }
  .db-badge.submitted { background: var(--amber-bg); border: 1px solid #FDE68A; color: var(--amber); }
  .db-badge.approved  { background: var(--green-bg); border: 1px solid #A7F3D0; color: var(--green); }
  .db-badge.rejected  { background: var(--red-bg); border: 1px solid #FECACA; color: var(--red); }

  .db-last-saved { font-size: 0.75rem; color: var(--muted-2); margin-bottom: 1.4rem; display: flex; align-items: center; gap: 5px; }

  .db-card-btn {
    width: 100%; display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    font-family: var(--font); font-size: 0.84rem; font-weight: 700;
    padding: 0.8rem; border-radius: 11px; border: 1.5px solid #BFDBFE;
    background: var(--blue-light); color: var(--blue); cursor: pointer;
    transition: all 0.25s ease;
  }
  .db-card-btn:hover { background: var(--blue); color: #fff; border-color: var(--blue); transform: translateY(-2px); box-shadow: var(--shadow-blue); }

  /* ════ ERROR ════ */
  .db-error-box {
    background: var(--red-bg); border: 1px solid #FECACA; border-radius: 12px;
    padding: 0.9rem 1rem; margin-bottom: 2rem; font-size: 0.84rem; color: var(--red);
    display: flex; align-items: center; gap: 8px;
  }

  /* ════ SPINNER ════ */
  .db-spinner-wrap { min-height: 50vh; display: flex; align-items: center; justify-content: center; }
  .db-spinner { width: 44px; height: 44px; border: 3px solid rgba(37,99,235,0.12); border-top-color: var(--blue); border-radius: 50%; animation: spin 0.9s linear infinite; }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* ════ ANIMATIONS ════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .db-reveal { opacity:0; transform:translateY(22px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .db-reveal.in { opacity:1; transform:translateY(0); }
  .db-d1 { transition-delay: 0.05s; } .db-d2 { transition-delay: 0.12s; } .db-d3 { transition-delay: 0.19s; }
  .db-d4 { transition-delay: 0.26s; } .db-d5 { transition-delay: 0.33s; } .db-d6 { transition-delay: 0.4s; }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 900px) {
    .db-stats-row { grid-template-columns: repeat(2, 1fr); }
    .db-stat-cell:nth-child(2) { border-right: none; }
  }
  @media (max-width: 640px) {
    .db-hero-inner { flex-direction: column; align-items: flex-start; }
    .db-btn { width: 100%; justify-content: center; }
    .db-grid { grid-template-columns: 1fr; }
    .db-stats-row { grid-template-columns: 1fr 1fr; }
  }
`;

const statusKey = (status) => status?.toLowerCase() || 'draft';

const statusBadgeIcon = (status) => {
  switch (status) {
    case 'Approved':  return <FiCheckCircle size={12} />;
    case 'Rejected':  return <FiXCircle size={12} />;
    case 'Submitted': return <FiClock size={12} />;
    default:          return <FiFileText size={12} />;
  }
};

const Dashboard = () => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const revealRefs = useRef([]);

  useEffect(() => {
    fetchApplications();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, [applications]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const response = await applicationService.getApplications();
      setApplications(response.data.applications);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateNew = async () => {
    try {
      const response = await applicationService.createApplication();
      navigate(`/application/${response.data.application._id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create application');
    }
  };

  const counts = {
    total: applications.length,
    draft: applications.filter(a => a.status === 'Draft').length,
    submitted: applications.filter(a => a.status === 'Submitted').length,
    approved: applications.filter(a => a.status === 'Approved').length,
  };

  return (
    <>
      <style>{css}</style>

      {/* ── Hero ── */}
      <div className="db-hero">
        <div className="db-hero-pattern" />
        <div className="db-hero-glow" />
        <div className="db-hero-inner">
          <div>
            <div className="db-hero-badge"><span className="db-live-dot" /> Official Passport Portal</div>
            <h1 className="db-hero-title">My <em>Applications</em></h1>
            <p className="db-hero-sub">Manage and continue your passport applications.</p>
          </div>
          <button className="db-btn db-btn-white" onClick={handleCreateNew}>
            <FiPlus size={16} /> New Application <FiArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div className="db-stats-bar">
        <div className="db-stats-row">
          <div className="db-stat-cell">
            <div className="db-stat-lbl">Total Applications</div>
            <div className="db-stat-val accent">{counts.total}</div>
          </div>
          <div className="db-stat-cell">
            <div className="db-stat-lbl">In Draft</div>
            <div className="db-stat-val">{counts.draft}</div>
          </div>
          <div className="db-stat-cell">
            <div className="db-stat-lbl">Submitted</div>
            <div className="db-stat-val">{counts.submitted}</div>
          </div>
          <div className="db-stat-cell">
            <div className="db-stat-lbl">Approved</div>
            <div className="db-stat-val">{counts.approved}</div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="db-main">
        {error && <div className="db-error-box">⚠ {error}</div>}

        {loading ? (
          <div className="db-spinner-wrap"><div className="db-spinner" /></div>
        ) : applications.length === 0 ? (
          <div className="db-empty-wrap">
            <div className="db-empty">
              <div className="db-empty-icon"><FiFileText size={28} /></div>
              <h2 className="db-empty-title">No applications yet</h2>
              <p className="db-empty-text">
                Create your first passport application to get started. It only takes about 10 minutes.
              </p>
              <button className="db-empty-btn" onClick={handleCreateNew}>
                <FiFilePlus size={16} /> Create Application <FiArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : (
          <div className="db-grid">
            {applications.map((app, i) => {
              const sk = statusKey(app.status);
              const delay = (i % 6) + 1;
              return (
                <div
                  key={app._id}
                  className={`db-card db-reveal db-d${delay}`}
                  ref={el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }}
                  onClick={() => navigate(`/application/${app._id}`)}
                >
                  <div className={`db-card-band ${sk}`} />
                  <div className="db-card-body">
                    <div className="db-card-head">
                      <div>
                        <div className="db-app-id">{app.applicationId}</div>
                        <div className="db-app-meta">
                          <FiCalendar size={11} />
                          Created {new Date(app.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </div>
                      </div>
                      <span className={`db-badge ${sk}`}>
                        {statusBadgeIcon(app.status)} {app.status}
                      </span>
                    </div>

                    {app.lastSaved && (
                      <div className="db-last-saved">
                        <FiClock size={12} />
                        Last saved {new Date(app.lastSaved).toLocaleString('en-IN', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                      </div>
                    )}

                    <button
                      className="db-card-btn"
                      onClick={(e) => { e.stopPropagation(); navigate(`/application/${app._id}`); }}
                    >
                      {app.status === 'Draft' ? 'Continue' : 'View'} Application <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
};

export default Dashboard;