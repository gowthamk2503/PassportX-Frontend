import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiArrowRight, FiCheck, FiClock, FiFileText, FiCalendar, FiDownload, FiCheckCircle, FiShield } from 'react-icons/fi';

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
    --bg:          #F7F9FC;
    --green:       #059669;
    --green-bg:    #ECFDF5;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08);
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ════ PAGE ════ */
  .ob-page {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    display: flex; flex-direction: column; justify-content: center;
    padding: 5rem 1.5rem 4rem;
    position: relative; overflow: hidden;
  }

  .ob-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .ob-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.15) 0%, transparent 50%);
  }

  .ob-wrap {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto; width: 100%;
    display: grid; grid-template-columns: 1fr 380px;
    gap: 3.5rem; align-items: start;
  }

  /* ════ LEFT: STEP CONTENT ════ */
  .ob-left {}

  .ob-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.69rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 2rem;
    animation: fadeUp 0.6s ease both;
  }

  .ob-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  /* Step dot nav */
  .ob-step-nav {
    display: flex; align-items: center; gap: 0.55rem; margin-bottom: 2.5rem;
    animation: fadeUp 0.6s 0.05s ease both;
  }

  .ob-dot {
    width: 8px; height: 8px; border-radius: 50%;
    background: rgba(255,255,255,0.22); border: none; cursor: pointer; padding: 0;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }

  .ob-dot.active {
    width: 28px; border-radius: 4px;
    background: #fff;
  }

  .ob-dot.done { background: #6EE7B7; }

  /* Step card */
  .ob-step-card {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.14);
    border-radius: 24px; padding: 3rem 2.75rem;
    backdrop-filter: blur(20px); box-shadow: 0 16px 48px rgba(0,0,0,0.18);
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .ob-step-icon {
    width: 60px; height: 60px; border-radius: 16px;
    background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center;
    font-size: 1.65rem; margin-bottom: 2rem;
    box-shadow: 0 4px 16px rgba(0,0,0,0.15);
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1);
  }

  .ob-step-icon:hover { transform: scale(1.1) rotate(-4deg); }

  .ob-step-title {
    font-family: var(--serif);
    font-size: clamp(1.8rem, 3vw, 2.6rem);
    font-weight: 400; line-height: 1.1; letter-spacing: -0.02em;
    color: #fff; margin-bottom: 1rem;
  }

  .ob-step-title em { font-style: italic; color: var(--sky); }

  .ob-step-desc {
    font-size: 0.95rem; line-height: 1.85; color: rgba(255,255,255,0.65);
    max-width: 440px; margin-bottom: 2.5rem;
  }

  /* Process steps list */
  .ob-process-list { display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 2.5rem; }

  .ob-process-item {
    display: flex; align-items: center; gap: 1rem;
    background: rgba(255,255,255,0.07); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 14px; padding: 1rem 1.25rem;
    transition: all 0.25s; cursor: default;
  }

  .ob-process-item:hover {
    background: rgba(255,255,255,0.11); border-color: rgba(96,165,250,0.3);
    transform: translateX(4px);
  }

  .ob-process-icon {
    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0;
    background: rgba(37,99,235,0.25); border: 1px solid rgba(96,165,250,0.25);
    display: flex; align-items: center; justify-content: center; color: #93C5FD;
  }

  .ob-process-label { font-size: 0.88rem; font-weight: 600; color: rgba(255,255,255,0.85); }
  .ob-process-time  { font-size: 0.72rem; color: rgba(255,255,255,0.4); margin-top: 2px; }

  .ob-process-time-badge {
    margin-left: auto; flex-shrink: 0;
    font-size: 0.62rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.15);
    border-radius: 6px; padding: 0.22rem 0.55rem; color: rgba(255,255,255,0.55);
  }

  /* Nav buttons */
  .ob-actions { display: flex; align-items: center; gap: 1rem; }

  .ob-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font); font-size: 0.9rem; font-weight: 700;
    padding: 0.9rem 1.75rem; border-radius: 12px; border: none; cursor: pointer;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); white-space: nowrap;
  }

  .ob-btn-white { background: #fff; color: var(--blue); box-shadow: var(--shadow-blue); }
  .ob-btn-white:hover { background: var(--blue-light); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }

  .ob-btn-ghost { background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2); color: rgba(255,255,255,0.75); }
  .ob-btn-ghost:hover { background: rgba(255,255,255,0.17); transform: translateY(-2px); }

  /* ════ RIGHT: SIDEBAR ════ */
  .ob-right { display: flex; flex-direction: column; gap: 1.25rem; }

  /* Glass stat cards */
  .ob-stat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.12); border-radius: 18px; overflow: hidden; box-shadow: 0 8px 32px rgba(0,0,0,0.18); animation: fadeUp 0.7s 0.2s ease both; }

  .ob-stat {
    background: rgba(255,255,255,0.06); padding: 1.4rem 1.25rem;
    transition: background 0.25s; cursor: default;
  }
  .ob-stat:hover { background: rgba(255,255,255,0.1); }
  .ob-stat-num { font-family: var(--serif); font-size: 1.8rem; font-weight: 400; color: #fff; line-height: 1; }
  .ob-stat-lbl { font-size: 0.6rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: rgba(255,255,255,0.38); margin-top: 4px; }

  /* Feature cards */
  .ob-feature-card {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.12);
    border-radius: 18px; padding: 1.5rem;
    transition: all 0.25s; cursor: default;
    animation: fadeUp 0.7s 0.3s ease both;
  }
  .ob-feature-card:hover { background: rgba(255,255,255,0.1); border-color: rgba(96,165,250,0.25); transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.15); }

  .ob-feat-icon {
    width: 42px; height: 42px; border-radius: 11px;
    background: rgba(37,99,235,0.22); border: 1px solid rgba(96,165,250,0.25);
    display: flex; align-items: center; justify-content: center;
    color: #93C5FD; margin-bottom: 1rem;
    transition: all 0.3s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ob-feature-card:hover .ob-feat-icon { background: var(--blue); color: #fff; border-color: var(--blue); transform: scale(1.1) rotate(-4deg); }

  .ob-feat-title { font-size: 0.9rem; font-weight: 700; color: #fff; margin-bottom: 0.35rem; }
  .ob-feat-desc  { font-size: 0.78rem; line-height: 1.72; color: rgba(255,255,255,0.52); }

  /* Trust strip */
  .ob-trust { display: flex; flex-direction: column; gap: 0.6rem; animation: fadeUp 0.7s 0.4s ease both; }

  .ob-trust-item {
    display: flex; align-items: center; gap: 9px;
    font-size: 0.74rem; font-weight: 600; color: rgba(255,255,255,0.55);
  }
  .ob-trust-item svg { color: #6EE7B7; flex-shrink: 0; }

  /* ════ ANIMATIONS ════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 960px) {
    .ob-wrap { grid-template-columns: 1fr; gap: 2rem; }
    .ob-stat-grid { grid-template-columns: repeat(4, 1fr); }
    .ob-right { flex-direction: row; flex-wrap: wrap; }
    .ob-stat-grid { flex: 1 1 100%; }
    .ob-feature-card { flex: 1 1 calc(50% - 0.625rem); }
    .ob-trust { flex: 1 1 100%; flex-direction: row; flex-wrap: wrap; gap: 1rem; }
  }

  @media (max-width: 600px) {
    .ob-page { padding: 4rem 1rem 3rem; }
    .ob-step-card { padding: 2rem 1.5rem; }
    .ob-stat-grid { grid-template-columns: 1fr 1fr; }
    .ob-right { flex-direction: column; }
    .ob-feature-card { flex: 1 1 100%; }
  }
`;

const onboardingSteps = [
  {
    icon: '🎉',
    title: <>Welcome to <em>PassportX</em></>,
    desc: "Your journey to a passport has never been easier. We've simplified the entire process into clear, guided steps.",
    showProcess: false,
  },
  {
    icon: '✨',
    title: <>What to <em>expect.</em></>,
    desc: 'A smooth 5-step form to collect all necessary information. No confusing fields — just what you need.',
    showProcess: false,
  },
  {
    icon: '📋',
    title: <>Documents <em>needed.</em></>,
    desc: "We'll guide you through all required documents. A built-in checklist ensures you don't miss anything important.",
    showProcess: false,
  },
  {
    icon: '📅',
    title: <>Book your <em>appointment.</em></>,
    desc: 'Choose a convenient date and time at your nearest passport office. View real-time slot availability.',
    showProcess: false,
  },
  {
    icon: '✅',
    title: <>Ready to <em>apply?</em></>,
    desc: 'Review your complete application, get instant confirmation, and download as PDF for your records.',
    showProcess: true,
  },
];

const processItems = [
  { icon: <FiFileText size={18}/>, label: 'Fill the Form',      time: '~10 minutes' },
  { icon: <FiFileText size={18}/>, label: 'Upload Documents',   time: '~5 minutes'  },
  { icon: <FiCalendar size={18}/>, label: 'Book Appointment',   time: '~3 minutes'  },
  { icon: <FiCheck size={18}/>,    label: 'Review & Submit',    time: '~2 minutes'  },
];

const featureCards = [
  { icon: <FiClock size={18}/>,    title: 'Quick Process',     desc: '~20 minutes from start to submission.'         },
  { icon: <FiDownload size={18}/>, title: 'Instant PDF',       desc: 'Download your application the moment you submit.' },
  { icon: <FiCheck size={18}/>,    title: 'Auto-Save',         desc: 'Never lose progress — every step is saved.'    },
  { icon: <FiShield size={18}/>,   title: 'Bank-Grade Security', desc: 'JWT auth and encrypted storage at all times.'  },
];

const Onboarding = () => {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const step = onboardingSteps[current];
  const isLast = current === onboardingSteps.length - 1;

  return (
    <>
      <style>{css}</style>
      <div className="ob-page">
        <div className="ob-pattern" />
        <div className="ob-glow" />

        <div className="ob-wrap">
          {/* ── Left ── */}
          <div className="ob-left">
            <div className="ob-badge"><span className="ob-live-dot" /> Official Passport Portal</div>

            {/* Step dot nav */}
            <div className="ob-step-nav">
              {onboardingSteps.map((_, i) => (
                <button
                  key={i}
                  className={`ob-dot ${i === current ? 'active' : i < current ? 'done' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={`Step ${i + 1}`}
                />
              ))}
            </div>

            {/* Step card */}
            <div className="ob-step-card" key={current}>
              <div className="ob-step-icon">{step.icon}</div>
              <h1 className="ob-step-title">{step.title}</h1>
              <p className="ob-step-desc">{step.desc}</p>

              {step.showProcess && (
                <div className="ob-process-list">
                  {processItems.map(({ icon, label, time }) => (
                    <div className="ob-process-item" key={label}>
                      <div className="ob-process-icon">{icon}</div>
                      <div>
                        <div className="ob-process-label">{label}</div>
                        <div className="ob-process-time">{time}</div>
                      </div>
                      <span className="ob-process-time-badge">{time}</span>
                    </div>
                  ))}
                </div>
              )}

              <div className="ob-actions">
                <button className="ob-btn ob-btn-white" onClick={() => isLast ? navigate('/dashboard') : setCurrent(c => c + 1)}>
                  {isLast ? 'Start Application' : 'Next'} <FiArrowRight />
                </button>
                {!isLast && (
                  <button className="ob-btn ob-btn-ghost" onClick={() => navigate('/dashboard')}>
                    Skip Tour
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="ob-right">
            {/* Stats grid */}
            <div className="ob-stat-grid">
              {[
                { num: '50K+',  lbl: 'Applications' },
                { num: '99.8%', lbl: 'Success Rate'  },
                { num: '4.9★',  lbl: 'Rating'        },
                { num: '<15m',  lbl: 'Avg. Time'     },
              ].map(({ num, lbl }) => (
                <div className="ob-stat" key={lbl}>
                  <div className="ob-stat-num">{num}</div>
                  <div className="ob-stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>

            {/* Feature cards */}
            {featureCards.map(({ icon, title, desc }) => (
              <div className="ob-feature-card" key={title}>
                <div className="ob-feat-icon">{icon}</div>
                <div className="ob-feat-title">{title}</div>
                <p className="ob-feat-desc">{desc}</p>
              </div>
            ))}

            {/* Trust strip */}
            <div className="ob-trust">
              {['256-bit Encrypted', 'Auto-Save Enabled', 'Govt. Approved'].map(t => (
                <div className="ob-trust-item" key={t}><FiCheckCircle size={13} /> {t}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Onboarding;