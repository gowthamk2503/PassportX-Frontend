import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import { FiArrowRight, FiCheckCircle, FiShield, FiClock, FiDownload, FiCalendar, FiPhone } from 'react-icons/fi';

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-dark:   #1E3A8A;
    --blue-light:  #EFF6FF;
    --sky:         #BAE6FD;
    --bg:          #F7F9FC;
    --surface:     #FFFFFF;
    --surface-2:   #F1F5F9;
    --border:      #E2E8F0;
    --border-2:    #CBD5E1;
    --ink:         #0F172A;
    --ink-2:       #1E293B;
    --muted:       #64748B;
    --muted-2:     #94A3B8;
    --green:       #059669;
    --green-bg:    #ECFDF5;
    --amber:       #D97706;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-lg:   0 10px 40px rgba(15,23,42,0.10), 0 4px 16px rgba(15,23,42,0.06);
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ════════════ HERO ════════════ */
  .h-hero {
    min-height: 100vh;
    display: flex; flex-direction: column; justify-content: center;
    position: relative; overflow: hidden;
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    padding: 7rem 1.5rem 5rem;
  }

  .h-hero-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .h-hero-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.15) 0%, transparent 50%);
  }

  .h-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: 1fr 420px;
    gap: 4rem; align-items: center;
  }

  .h-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15);
    border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.69rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 1.75rem;
    animation: fadeUp 0.7s ease both;
  }

  .h-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  .h-hero-title {
    font-family: var(--serif);
    font-size: clamp(3rem, 5vw, 5rem);
    font-weight: 400; line-height: 1.08; letter-spacing: -0.02em;
    color: #fff; margin-bottom: 1.4rem;
    animation: fadeUp 0.7s 0.1s ease both;
  }

  .h-hero-title .h-accent { color: #BAE6FD; font-style: italic; display: block; }

  .h-hero-sub {
    font-size: 1rem; font-weight: 400; line-height: 1.8;
    color: rgba(255,255,255,0.72); max-width: 460px;
    margin-bottom: 2.25rem;
    animation: fadeUp 0.7s 0.2s ease both;
  }

  .h-hero-actions {
    display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;
    animation: fadeUp 0.7s 0.3s ease both;
  }

  .h-hero-trust {
    display: flex; align-items: center; gap: 1.5rem; margin-top: 2.25rem; flex-wrap: wrap;
    animation: fadeUp 0.7s 0.4s ease both;
  }

  .h-trust-item {
    display: flex; align-items: center; gap: 6px;
    font-size: 0.73rem; font-weight: 600; color: rgba(255,255,255,0.6);
  }

  .h-trust-item svg { color: #6EE7B7; flex-shrink: 0; }

  /* ── Hero right card ── */
  .h-hero-card {
    background: rgba(255,255,255,0.12);
    border: 1px solid rgba(255,255,255,0.22);
    border-radius: 22px; padding: 1.85rem;
    backdrop-filter: blur(20px);
    animation: fadeUp 0.7s 0.25s ease both;
    box-shadow: 0 12px 40px rgba(15,23,42,0.2);
  }

  .h-card-header {
    display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.4rem;
  }

  .h-card-title { font-size: 0.76rem; font-weight: 700; color: rgba(255,255,255,0.65); letter-spacing: 0.06em; text-transform: uppercase; }

  .h-card-badge {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    background: rgba(110,231,183,0.18); color: #6EE7B7;
    border: 1px solid rgba(110,231,183,0.28); border-radius: 100px; padding: 0.2rem 0.65rem;
  }

  .h-prog-list { display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1.6rem; }
  .h-prog-item { display: flex; align-items: center; gap: 0.75rem; }
  .h-prog-label { font-size: 0.75rem; font-weight: 600; color: rgba(255,255,255,0.7); min-width: 110px; }
  .h-prog-track { flex:1; height:5px; background:rgba(255,255,255,0.15); border-radius:99px; overflow:hidden; }
  .h-prog-fill  { height:100%; border-radius:99px; background: rgba(255,255,255,0.8); }
  .h-prog-fill.done { background: #6EE7B7; }
  .h-prog-pct   { font-size: 0.67rem; font-weight: 600; color: rgba(255,255,255,0.45); min-width: 32px; text-align:right; }

  .h-card-rule { height:1px; background:rgba(255,255,255,0.14); margin: 1.2rem 0; }

  .h-card-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }

  .h-cstat { background:rgba(255,255,255,0.1); border-radius:12px; padding:0.85rem 1rem; }
  .h-cstat-num { font-family:var(--serif); font-size:1.55rem; font-weight:400; color:#fff; line-height:1; }
  .h-cstat-lbl { font-size:0.61rem; font-weight:700; letter-spacing:0.07em; text-transform:uppercase; color:rgba(255,255,255,0.45); margin-top:3px; }

  /* ════════════ BUTTONS ════════════ */
  .h-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font); font-size: 0.88rem; font-weight: 700;
    padding: 0.85rem 1.75rem; border-radius: 12px;
    border: none; cursor: pointer; text-decoration: none;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    white-space: nowrap;
  }

  .h-btn-white { background:#fff; color:var(--blue); box-shadow: var(--shadow-blue); }
  .h-btn-white:hover { background:var(--blue-light); transform:translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }

  .h-btn-ghost { background:rgba(255,255,255,0.12); border:1px solid rgba(255,255,255,0.25); color:#fff; backdrop-filter:blur(8px); }
  .h-btn-ghost:hover { background:rgba(255,255,255,0.2); transform:translateY(-2px); }

  .h-btn-blue { background:var(--blue); color:#fff; box-shadow: var(--shadow-blue); }
  .h-btn-blue:hover { background:var(--blue-mid); transform:translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.35); }

  .h-btn-outline { background:var(--surface); color:var(--blue); border:1.5px solid #BFDBFE; box-shadow: var(--shadow-sm); }
  .h-btn-outline:hover { background:var(--blue-light); border-color:var(--blue); transform:translateY(-2px); }

  /* ════════════ SECTION COMMONS ════════════ */
  .h-sec { padding: 6rem 1.5rem; }
  .h-wrap { max-width: 1100px; margin: 0 auto; }

  .h-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.68rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--blue); margin-bottom: 1rem;
  }
  .h-eyebrow::before { content:''; width:18px; height:2px; background:var(--blue); border-radius:2px; }

  .h-title {
    font-family: var(--serif);
    font-size: clamp(2rem,3.5vw,3rem); font-weight:400; line-height:1.15; letter-spacing:-0.02em;
    color: var(--ink); margin-bottom: 0.8rem;
  }
  .h-title em { font-style:italic; color:var(--blue); }
  .h-sub { font-size:0.93rem; font-weight:400; line-height:1.8; color:var(--muted); max-width:480px; }
  .h-sec-hd { margin-bottom:3.75rem; }
  .h-sec-hd.center { text-align:center; }
  .h-sec-hd.center .h-eyebrow { justify-content:center; }
  .h-sec-hd.center .h-sub { margin:0 auto; }

  /* ════════════ STATS BAR ════════════ */
  .h-stats-bar { background:var(--surface); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }
  .h-stats-row { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); }

  .h-stat-cell {
    padding:2.25rem 2rem; border-right:1px solid var(--border);
    position:relative; overflow:hidden; transition:background 0.25s; cursor:default;
  }
  .h-stat-cell:last-child { border-right:none; }

  .h-stat-cell::after {
    content:''; position:absolute; bottom:0; left:0; right:0;
    height:3px; background:linear-gradient(90deg,var(--blue),#60A5FA);
    transform:scaleX(0); transform-origin:left; transition:transform 0.4s ease;
  }
  .h-stat-cell:hover::after { transform:scaleX(1); }
  .h-stat-cell:hover { background:var(--blue-light); }

  .h-stat-num { font-family:var(--serif); font-size:2.4rem; font-weight:400; color:var(--ink); line-height:1; }
  .h-stat-num b { color:var(--blue); font-weight:400; }
  .h-stat-lbl { font-size:0.69rem; font-weight:700; letter-spacing:0.09em; text-transform:uppercase; color:var(--muted-2); margin-top:5px; }

  /* ════════════ FEATURES ════════════ */
  .h-feat-grid {
    display:grid; grid-template-columns:repeat(3,1fr);
    gap:1px; background:var(--border);
    border:1px solid var(--border); border-radius:18px; overflow:hidden;
    box-shadow: var(--shadow-md);
  }

  .h-feat {
    background:var(--surface); padding:2.5rem 2.25rem;
    position:relative; overflow:hidden; transition:background 0.25s; cursor:default;
  }
  .h-feat:hover { background:var(--blue-light); }

  .h-feat-glow {
    position:absolute; top:-50px; right:-50px;
    width:160px; height:160px; border-radius:50%;
    background:radial-gradient(circle,rgba(37,99,235,0.08),transparent 70%);
    opacity:0; transition:opacity 0.35s;
  }
  .h-feat:hover .h-feat-glow { opacity:1; }

  .h-feat-icon {
    width:50px; height:50px; border-radius:13px;
    background:var(--blue-light); border:1px solid #BFDBFE;
    display:flex; align-items:center; justify-content:center;
    color:var(--blue); margin-bottom:1.6rem;
    transition:all 0.3s cubic-bezier(0.34,1.56,0.64,1);
    position:relative; z-index:1;
    box-shadow: var(--shadow-sm);
  }
  .h-feat:hover .h-feat-icon { background:var(--blue); color:#fff; border-color:var(--blue); transform:scale(1.1) rotate(-4deg); box-shadow: var(--shadow-blue); }

  .h-feat-title { font-size:0.96rem; font-weight:700; color:var(--ink); margin-bottom:0.5rem; position:relative; z-index:1; }
  .h-feat-desc  { font-size:0.81rem; font-weight:400; line-height:1.78; color:var(--muted); position:relative; z-index:1; }

  /* ════════════ STEPS ════════════ */
  .h-steps-bg { background:var(--surface-2); border-top:1px solid var(--border); border-bottom:1px solid var(--border); }

  .h-steps-grid {
    display:grid; grid-template-columns:repeat(3,1fr);
    gap:1px; background:var(--border);
    border:1px solid var(--border); border-radius:18px; overflow:hidden;
    box-shadow: var(--shadow-md); margin-top:3.75rem;
  }

  .h-step {
    background:var(--surface); padding:2.25rem 2rem;
    position:relative; overflow:hidden; transition:background 0.25s; cursor:default;
  }
  .h-step:hover { background:var(--blue-light); }

  .h-step-badge {
    display:inline-flex; align-items:center; justify-content:center;
    width:36px; height:36px;
    background:var(--blue-light); border:1px solid #BFDBFE;
    border-radius:10px; font-size:0.74rem; font-weight:800; color:var(--blue);
    margin-bottom:1.4rem; transition:all 0.25s; box-shadow: var(--shadow-sm);
  }
  .h-step:hover .h-step-badge { background:var(--blue); color:#fff; border-color:var(--blue); box-shadow: var(--shadow-blue); }

  .h-step-title { font-size:0.95rem; font-weight:700; color:var(--ink); margin-bottom:0.45rem; }
  .h-step-desc  { font-size:0.79rem; font-weight:400; line-height:1.75; color:var(--muted); }

  .h-step-tag {
    display:inline-flex; margin-top:1.15rem;
    font-size:0.6rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;
    color:var(--blue); background:var(--blue-light);
    border:1px solid #BFDBFE; border-radius:6px; padding:0.24rem 0.6rem;
    transition:all 0.25s;
  }
  .h-step:hover .h-step-tag { background:var(--blue); color:#fff; border-color:var(--blue); }

  /* ════════════ TESTIMONIALS ════════════ */
  .h-testi-wrap { display:grid; grid-template-columns:1fr 1fr; gap:5rem; align-items:start; }

  .h-quote-mark { font-family:var(--serif); font-size:5rem; line-height:0.7; color:var(--blue); opacity:0.18; margin-bottom:1.5rem; display:block; }
  .h-quote-text { font-family:var(--serif); font-size:clamp(1.2rem,2vw,1.6rem); font-style:italic; font-weight:400; line-height:1.65; color:var(--ink); margin-bottom:2rem; }
  .h-quote-rule { width:36px; height:2px; background:var(--blue); border-radius:2px; margin-bottom:1.2rem; opacity:0.4; }
  .h-quote-name { font-size:0.88rem; font-weight:700; color:var(--ink); margin-bottom:2px; }
  .h-quote-role { font-size:0.75rem; color:var(--muted); }

  .h-reviews-col { display:flex; flex-direction:column; gap:1.1rem; }

  .h-review-card {
    background:var(--surface); border:1px solid var(--border); border-radius:16px;
    padding:1.5rem 1.6rem; transition:all 0.25s; cursor:default;
    box-shadow: var(--shadow-sm);
  }
  .h-review-card:hover { transform:translateX(6px); box-shadow: var(--shadow-md); border-color:#BFDBFE; }

  .h-review-stars { color:var(--amber); font-size:0.85rem; letter-spacing:2px; margin-bottom:0.7rem; }
  .h-review-text  { font-size:0.82rem; font-weight:400; line-height:1.72; color:var(--muted); margin-bottom:0.9rem; }
  .h-review-name  { font-size:0.78rem; font-weight:700; color:var(--ink); }
  .h-review-loc   { font-size:0.7rem;  color:var(--muted-2); }

  /* ════════════ CTA ════════════ */
  .h-cta-box {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    border-radius: 24px; padding: 5rem 4rem; text-align: center;
    position: relative; overflow: hidden;
    max-width: 1100px; margin: 0 auto;
    box-shadow: var(--shadow-lg);
  }

  .h-cta-box::before {
    content:''; position:absolute; top:-100px; left:50%; transform:translateX(-50%);
    width:500px; height:280px; border-radius:50%;
    background:radial-gradient(circle, rgba(255,255,255,0.12), transparent 65%);
    pointer-events:none;
  }

  .h-cta-box::after {
    content:''; position:absolute; inset:0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px);
    background-size: 26px 26px; pointer-events:none;
  }

  .h-cta-inner { position:relative; z-index:1; }
  .h-cta-box h2 { font-family:var(--serif); font-size:clamp(2rem,4vw,3.1rem); font-weight:400; color:#fff; letter-spacing:-0.02em; margin-bottom:0.7rem; }
  .h-cta-box h2 em { font-style:italic; color:var(--sky); }
  .h-cta-box p { font-size:0.93rem; color:rgba(255,255,255,0.62); margin-bottom:2.25rem; }
  .h-cta-acts { display:flex; gap:1rem; justify-content:center; flex-wrap:wrap; }

  /* ════════════ ANIMATIONS ════════════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(26px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .h-reveal { opacity:0; transform:translateY(22px); transition:opacity 0.75s cubic-bezier(0.16,1,0.3,1), transform 0.75s cubic-bezier(0.16,1,0.3,1); }
  .h-reveal.in { opacity:1; transform:translateY(0); }
  .h-d1{transition-delay:0.05s} .h-d2{transition-delay:0.12s} .h-d3{transition-delay:0.19s}
  .h-d4{transition-delay:0.26s} .h-d5{transition-delay:0.33s} .h-d6{transition-delay:0.40s}

  @media(max-width:900px){
    .h-hero-inner   { grid-template-columns:1fr }
    .h-hero-card    { display:none }
    .h-stats-row    { grid-template-columns:repeat(2,1fr) }
    .h-feat-grid    { grid-template-columns:1fr }
    .h-steps-grid   { grid-template-columns:1fr 1fr }
    .h-testi-wrap   { grid-template-columns:1fr }
    .h-cta-box      { padding:3.5rem 1.5rem }
  }
  @media(max-width:560px){
    .h-steps-grid   { grid-template-columns:1fr }
    .h-stats-row    { grid-template-columns:1fr 1fr }
  }
`;

/* ─── Data ─────────────────────────────────────────────────────────────── */
const features = [
  { icon: <FiCheckCircle size={21}/>, title:'Guided Multi-Step Form',    desc:'A structured 5-step form with real-time validation and clear prompts at every stage.' },
  { icon: <FiClock size={21}/>,       title:'Auto-Save at Every Step',   desc:'Your progress is saved silently — return days later and pick up exactly where you left off.' },
  { icon: <FiShield size={21}/>,      title:'Bank-Grade Encryption',     desc:'JWT authentication and encrypted storage protect your personal information at all times.' },
  { icon: <FiDownload size={21}/>,    title:'Instant PDF Download',      desc:'A formatted application summary is ready the moment you submit — download it anytime.' },
  { icon: <FiCalendar size={21}/>,    title:'Smart Appointment Booking', desc:'Pick from available slots at your nearest passport office, filtered by date and location.' },
  { icon: <FiPhone size={21}/>,       title:'Dedicated Support',         desc:'A responsive support team is always available — you should never feel stuck in the process.' },
];

const steps = [
  { n:'01', title:'Create Your Account',   desc:'Sign up with your email and phone number in under 60 seconds.',              tag:'Start here'   },
  { n:'02', title:'Complete the Form',     desc:'Walk through our intelligent guided multi-step application form.',            tag:'~10 minutes'  },
  { n:'03', title:'Upload Documents',      desc:'Securely submit your identity proof, address proof, and photograph.',         tag:'Encrypted'    },
  { n:'04', title:'Book an Appointment',  desc:'Pick a convenient slot at your nearest passport office.',                     tag:'Your schedule' },
  { n:'05', title:'Review & Submit',       desc:'Confirm every detail and officially submit your complete application.',       tag:'Final step'   },
  { n:'06', title:'Download Your PDF',    desc:'Receive a beautifully formatted copy of your full application instantly.',    tag:'Instant'      },
];

const reviews = [
  { stars:'★★★★★', text:'Incredibly smooth. I was dreading the paperwork but finished the whole thing in 12 minutes.', name:'Priya R.', loc:'Chennai, Tamil Nadu' },
  { stars:'★★★★★', text:'The auto-save feature saved me when my browser crashed. Everything was still there.', name:'Arjun M.', loc:'Bengaluru, Karnataka' },
  { stars:'★★★★☆', text:'Clean interface, clear instructions. Best government-related app experience I\'ve had.', name:'Sneha K.', loc:'Mumbai, Maharashtra' },
];

/* ─── Component ──────────────────────────────────────────────────────── */
const Home = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const revealRefs = useRef([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const reveal = (delay = '') => ({
    ref: el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); },
    className: `h-reveal${delay ? ` h-d${delay}` : ''}`,
  });

  return (
    <>
      <style>{css}</style>

      {/* ═══ HERO ═══ */}
      <section className="h-hero">
        <div className="h-hero-pattern" />
        <div className="h-hero-glow" />

        <div className="h-hero-inner">
          {/* Left */}
          <div>
            <div className="h-hero-badge"><span className="h-live-dot" /> Official Passport Application Portal</div>
            <h1 className="h-hero-title">
              Your passport,
              <span className="h-accent">simplified.</span>
            </h1>
            <p className="h-hero-sub">
              A modern, guided way to complete your passport application — secure,
              effortless, and designed to get you done in under 15 minutes.
            </p>
            <div className="h-hero-actions">
              {!isAuthenticated ? (
                <>
                  <button className="h-btn h-btn-white" onClick={() => navigate('/signup')}>Get Started <FiArrowRight /></button>
                  <button className="h-btn h-btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
                </>
              ) : (
                <button className="h-btn h-btn-white" onClick={() => navigate('/dashboard')}>Go to Dashboard <FiArrowRight /></button>
              )}
            </div>
            <div className="h-hero-trust">
              {['256-bit Encrypted', 'Auto-Save Enabled', 'Govt. Approved'].map(t => (
                <div className="h-trust-item" key={t}><FiCheckCircle size={13} /> {t}</div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="h-hero-card">
            <div className="h-card-header">
              <span className="h-card-title">Application Status</span>
              <span className="h-card-badge">Live</span>
            </div>
            <div className="h-prog-list">
              {[
                { label:'Personal Info', pct:100, done:true  },
                { label:'Documents',     pct:100, done:true  },
                { label:'Appointment',   pct:65,  done:false },
                { label:'Review',        pct:0,   done:false },
              ].map(({ label, pct, done }) => (
                <div className="h-prog-item" key={label}>
                  <span className="h-prog-label">{label}</span>
                  <div className="h-prog-track"><div className={`h-prog-fill${done?' done':''}`} style={{ width:`${pct}%` }} /></div>
                  <span className="h-prog-pct">{pct}%</span>
                </div>
              ))}
            </div>
            <div className="h-card-rule" />
            <div className="h-card-grid">
              {[
                { num:'50K+',  lbl:'Applications' },
                { num:'99.8%', lbl:'Success Rate'  },
                { num:'4.9★',  lbl:'Rating'        },
                { num:'<15m',  lbl:'Avg. Time'     },
              ].map(({ num, lbl }) => (
                <div className="h-cstat" key={lbl}>
                  <div className="h-cstat-num">{num}</div>
                  <div className="h-cstat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR ═══ */}
      <div className="h-stats-bar">
        <div className="h-stats-row">
          {[
            { num:'50', unit:'K+',  lbl:'Applications Processed' },
            { num:'99.8', unit:'%', lbl:'Success Rate'            },
            { num:'4.9', unit:'★',  lbl:'Average Rating'          },
            { num:'15', unit:'min', lbl:'Average Completion'      },
          ].map(({ num, unit, lbl }) => (
            <div className="h-stat-cell" key={lbl}>
              <div className="h-stat-num">{num}<b>{unit}</b></div>
              <div className="h-stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ═══ FEATURES ═══ */}
      <section className="h-sec" style={{ background:'var(--bg)' }}>
        <div className="h-wrap">
          <div className="h-sec-hd center" {...reveal()}>
            <div className="h-eyebrow">Why PassportX</div>
            <h2 className="h-title">Everything you need,<br /><em>nothing you don't.</em></h2>
            <p className="h-sub">Built to make passport applications feel effortless — not exhausting.</p>
          </div>
          <div className="h-feat-grid">
            {features.map((f, i) => (
              <div
                key={i}
                className={`h-feat h-reveal h-d${(i % 3) + 1}`}
                ref={el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }}
              >
                <div className="h-feat-glow" />
                <div className="h-feat-icon">{f.icon}</div>
                <div className="h-feat-title">{f.title}</div>
                <p className="h-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STEPS ═══ */}
      <section className="h-sec h-steps-bg">
        <div className="h-wrap">
          <div className="h-sec-hd center" {...reveal()}>
            <div className="h-eyebrow">How It Works</div>
            <h2 className="h-title">Six steps to your<br /><em>passport.</em></h2>
            <p className="h-sub">A clear, guided process from account creation to your final download.</p>
          </div>
          <div className="h-steps-grid">
            {steps.map((s, i) => (
              <div
                key={i}
                className={`h-step h-reveal h-d${(i % 3) + 1}`}
                ref={el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }}
              >
                <div className="h-step-badge">{s.n}</div>
                <div className="h-step-title">{s.title}</div>
                <p className="h-step-desc">{s.desc}</p>
                <span className="h-step-tag">{s.tag}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="h-sec" style={{ background:'var(--surface)' }}>
        <div className="h-wrap">
          <div className="h-testi-wrap">
            <div {...reveal()}>
              <div className="h-eyebrow">What People Say</div>
              <h2 className="h-title">Loved by thousands<br />of <em>travellers.</em></h2>
              <br />
              <span className="h-quote-mark">"</span>
              <p className="h-quote-text">PassportX turned what I dreaded into something I genuinely enjoyed. Finished the whole thing in under 12 minutes from my phone.</p>
              <div className="h-quote-rule" />
              <div className="h-quote-name">Priya Ramachandran</div>
              <div className="h-quote-role">Senior Manager, Chennai</div>
            </div>
            <div className="h-reviews-col">
              {reviews.map((rv, i) => (
                <div
                  key={i}
                  className={`h-review-card h-reveal h-d${i + 1}`}
                  ref={el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }}
                >
                  <div className="h-review-stars">{rv.stars}</div>
                  <p className="h-review-text">{rv.text}</p>
                  <div className="h-review-name">{rv.name}</div>
                  <div className="h-review-loc">{rv.loc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA ═══ */}
      <section className="h-sec">
        <div className="h-cta-box">
          <div className="h-cta-inner">
            <div className="h-eyebrow" style={{ color:'#BAE6FD', justifyContent:'center', marginBottom:'1.2rem' }}>
              Get Started Today
            </div>
            <h2>Ready to apply for<br /><em>your passport?</em></h2>
            <p>Join over 50,000 travellers who have simplified their passport journey.</p>
            <div className="h-cta-acts">
              {!isAuthenticated ? (
                <>
                  <button className="h-btn h-btn-white" onClick={() => navigate('/signup')}>Create Account Now <FiArrowRight /></button>
                  <button className="h-btn h-btn-ghost" onClick={() => navigate('/login')}>Sign In</button>
                </>
              ) : (
                <button className="h-btn h-btn-white" onClick={() => navigate('/dashboard')}>Go to Dashboard <FiArrowRight /></button>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;