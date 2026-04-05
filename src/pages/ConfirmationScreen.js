import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FiCheckCircle, FiDownload, FiHome, FiShare2, FiUser, FiCalendar, FiMapPin, FiFileText, FiShield } from 'react-icons/fi';

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
  body { font-family: var(--font); background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ════ HERO ════ */
  .cf-hero {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    padding: 5rem 1.5rem 3rem;
    position: relative; overflow: hidden;
  }

  .cf-hero-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .cf-hero-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.1) 0%, transparent 50%);
  }

  .cf-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    text-align: center;
  }

  /* Success icon */
  .cf-success-ring {
    width: 80px; height: 80px; border-radius: 20px; margin: 0 auto 2rem;
    background: rgba(16,185,129,0.18); border: 1px solid rgba(16,185,129,0.35);
    display: flex; align-items: center; justify-content: center;
    color: #6EE7B7;
    box-shadow: 0 0 0 8px rgba(16,185,129,0.1), 0 8px 28px rgba(16,185,129,0.2);
    animation: popIn 0.5s cubic-bezier(0.34,1.56,0.64,1) both;
  }

  @keyframes popIn {
    from { opacity: 0; transform: scale(0.6); }
    to   { opacity: 1; transform: scale(1); }
  }

  .cf-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(16,185,129,0.15); border: 1px solid rgba(16,185,129,0.3);
    border-radius: 100px; padding: 0.38rem 1.1rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #6EE7B7; margin-bottom: 1.25rem;
    animation: fadeUp 0.6s 0.1s ease both;
  }

  .cf-hero-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 3.5vw, 3rem);
    font-weight: 400; line-height: 1.1; color: #fff; letter-spacing: -0.02em;
    margin-bottom: 0.65rem;
    animation: fadeUp 0.6s 0.15s ease both;
  }
  .cf-hero-title em { font-style: italic; color: var(--sky); }

  .cf-hero-sub {
    font-size: 0.93rem; color: rgba(255,255,255,0.65); line-height: 1.75;
    max-width: 500px; margin: 0 auto;
    animation: fadeUp 0.6s 0.2s ease both;
  }

  /* App ID pill */
  .cf-id-pill {
    display: inline-flex; align-items: center; gap: 10px;
    background: rgba(255,255,255,0.1); border: 1px solid rgba(255,255,255,0.2);
    border-radius: 12px; padding: 0.85rem 1.4rem; margin-top: 2rem;
    animation: fadeUp 0.6s 0.25s ease both;
  }
  .cf-id-label { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255,255,255,0.45); }
  .cf-id-value { font-family: var(--font); font-size: 1rem; font-weight: 700; color: #fff; letter-spacing: 0.04em; }

  /* ════ STAT STRIP ════ */
  .cf-stats-bar { background: var(--surface); border-bottom: 1px solid var(--border); }
  .cf-stats-row {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(4, 1fr);
  }
  .cf-stat-cell {
    padding: 1.75rem 2rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background 0.25s; cursor: default;
  }
  .cf-stat-cell:last-child { border-right: none; }
  .cf-stat-cell::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue), #60A5FA);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .cf-stat-cell:hover::after { transform: scaleX(1); }
  .cf-stat-cell:hover { background: var(--blue-light); }
  .cf-stat-num { font-family: var(--serif); font-size: 1.6rem; font-weight: 400; color: var(--ink); line-height: 1; }
  .cf-stat-num b { color: var(--blue); font-weight: 400; }
  .cf-stat-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted-2); margin-top: 4px; }

  /* ════ MAIN ════ */
  .cf-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem 4rem; }

  /* ════ SECTION TITLE ════ */
  .cf-eyebrow {
    display: inline-flex; align-items: center; gap: 8px;
    font-size: 0.67rem; font-weight: 800; letter-spacing: 0.14em; text-transform: uppercase;
    color: var(--blue); margin-bottom: 0.85rem;
  }
  .cf-eyebrow::before { content: ''; width: 14px; height: 2px; background: var(--blue); border-radius: 2px; }
  .cf-section-title { font-family: var(--serif); font-size: clamp(1.4rem, 2.5vw, 1.9rem); font-weight: 400; color: var(--ink); margin-bottom: 1.6rem; letter-spacing: -0.02em; }
  .cf-section-title em { font-style: italic; color: var(--blue); }

  /* ════ CARDS ════ */
  .cf-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
    padding: 2.25rem; box-shadow: var(--shadow-md); margin-bottom: 2rem;
  }

  /* Summary grid */
  .cf-summary-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(210px, 1fr)); gap: 1.25rem;
  }

  .cf-summary-cell {
    background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
    padding: 1.25rem 1.4rem; transition: all 0.25s; cursor: default;
  }
  .cf-summary-cell:hover { border-color: #BFDBFE; background: var(--blue-light); box-shadow: var(--shadow-md); }
  .cf-cell-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue); margin-bottom: 0.75rem;
  }
  .cf-cell-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 3px; }
  .cf-cell-val { font-size: 0.92rem; font-weight: 600; color: var(--ink); line-height: 1.5; }

  .cf-status-chip {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--green-bg); border: 1px solid #A7F3D0;
    border-radius: 100px; padding: 0.3rem 0.85rem;
    font-size: 0.72rem; font-weight: 700; color: var(--green);
  }

  /* Appointment grid */
  .cf-appt-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1.25rem; }

  .cf-appt-cell {
    background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
    padding: 1.25rem 1.4rem; transition: all 0.25s;
  }
  .cf-appt-cell:hover { border-color: #BFDBFE; background: var(--blue-light); }
  .cf-appt-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 6px; }
  .cf-appt-val { font-size: 0.92rem; font-weight: 600; color: var(--ink); line-height: 1.5; }

  /* Steps / What next */
  .cf-steps-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 1px;
    background: var(--border); border: 1px solid var(--border); border-radius: 18px; overflow: hidden;
    box-shadow: var(--shadow-md);
  }

  .cf-step-cell {
    background: var(--surface); padding: 2rem 1.75rem;
    position: relative; overflow: hidden; transition: background 0.25s; cursor: default;
  }
  .cf-step-cell:hover { background: var(--blue-light); }

  .cf-step-badge {
    display: inline-flex; align-items: center; justify-content: center;
    width: 34px; height: 34px; border-radius: 9px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    font-size: 0.72rem; font-weight: 800; color: var(--blue);
    margin-bottom: 1.25rem; transition: all 0.25s; box-shadow: var(--shadow-sm);
  }
  .cf-step-cell:hover .cf-step-badge { background: var(--blue); color: #fff; border-color: var(--blue); box-shadow: var(--shadow-blue); }
  .cf-step-title { font-size: 0.94rem; font-weight: 700; color: var(--ink); margin-bottom: 0.4rem; }
  .cf-step-desc  { font-size: 0.8rem; line-height: 1.75; color: var(--muted); }

  /* Important */
  .cf-important {
    background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px;
    padding: 2.25rem; margin-bottom: 2rem; box-shadow: var(--shadow-sm);
  }

  .cf-important-list { list-style: none; display: flex; flex-direction: column; gap: 0.7rem; }
  .cf-important-list li {
    display: flex; align-items: flex-start; gap: 10px;
    font-size: 0.86rem; line-height: 1.7; color: var(--muted);
  }
  .cf-important-list li::before { content: ''; width: 6px; height: 6px; border-radius: 50%; background: var(--blue); flex-shrink: 0; margin-top: 7px; opacity: 0.6; }

  /* Actions row */
  .cf-actions {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 2rem;
  }

  .cf-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font); font-size: 0.88rem; font-weight: 700;
    padding: 1rem 1.5rem; border-radius: 12px; border: none; cursor: pointer; text-decoration: none;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); white-space: nowrap;
  }

  .cf-btn-blue { background: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .cf-btn-blue:hover { background: var(--blue-mid); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.35); }

  .cf-btn-outline { background: var(--surface); color: var(--blue); border: 1.5px solid #BFDBFE; box-shadow: var(--shadow-sm); }
  .cf-btn-outline:hover { background: var(--blue-light); border-color: var(--blue); transform: translateY(-2px); }

  .cf-btn-green { background: var(--green-bg); color: var(--green); border: 1.5px solid #A7F3D0; box-shadow: var(--shadow-sm); }
  .cf-btn-green:hover { background: #D1FAE5; border-color: var(--green); transform: translateY(-2px); }

  /* Support CTA */
  .cf-support {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    border-radius: 20px; padding: 2.5rem; text-align: center;
    position: relative; overflow: hidden; box-shadow: var(--shadow-md);
  }
  .cf-support::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 26px 26px; pointer-events: none;
  }
  .cf-support-inner { position: relative; z-index: 1; }
  .cf-support h3 { font-family: var(--serif); font-size: 1.4rem; font-weight: 400; color: #fff; margin-bottom: 0.5rem; }
  .cf-support p  { font-size: 0.88rem; color: rgba(255,255,255,0.62); line-height: 1.75; }
  .cf-support strong { color: #BAE6FD; }

  /* ════ ANIMATIONS ════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .cf-reveal { opacity:0; transform:translateY(22px); transition: opacity 0.7s cubic-bezier(0.16,1,0.3,1), transform 0.7s cubic-bezier(0.16,1,0.3,1); }
  .cf-reveal.in { opacity:1; transform:translateY(0); }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 900px) {
    .cf-stats-row { grid-template-columns: repeat(2, 1fr); }
    .cf-stat-cell:nth-child(2) { border-right: none; }
    .cf-steps-grid { grid-template-columns: 1fr; }
    .cf-actions { grid-template-columns: 1fr; }
  }
  @media (max-width: 600px) {
    .cf-hero { padding: 4rem 1rem 2.5rem; }
    .cf-stats-row { grid-template-columns: 1fr 1fr; }
    .cf-card, .cf-important { padding: 1.5rem; }
  }
`;

const ConfirmationScreen = ({ applicationData }) => {
  const navigate = useNavigate();
  const revealRefs = React.useRef([]);

  React.useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); }),
      { threshold: 0.1 }
    );
    revealRefs.current.forEach(el => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  if (!applicationData) return null;

  const maskedAadhar = applicationData.identityDetails?.aadharNumber
    ? applicationData.identityDetails.aadharNumber.slice(-4).padStart(12, '*')
    : 'N/A';

  const handleDownloadPDF = () => {
    if (applicationData.pdfUrl) {
      window.open(applicationData.pdfUrl, '_blank');
    } else {
      alert('PDF not available yet. Please try again later.');
    }
  };

  const handleShare = () => {
    const details = `Passport Application\nID: ${applicationData.applicationId}\nStatus: ${applicationData.status}\nAppointment: ${applicationData.appointment?.date || 'N/A'} at ${applicationData.appointment?.time || 'N/A'}\n\nApply: ${window.location.origin}`;
    if (navigator.share) navigator.share({ title: 'Passport Application Confirmation', text: details });
    else alert(details);
  };

  const nextSteps = [
    { n: '01', title: 'Application Review',    desc: 'Our team reviews your application within 2–3 business days.'     },
    { n: '02', title: 'Document Verification', desc: 'All uploaded documents are verified against your application.'   },
    { n: '03', title: 'Visit Passport Office', desc: 'Attend your scheduled appointment with original documents.'       },
    { n: '04', title: 'Receive Your Passport', desc: 'Your passport is dispatched through your preferred delivery.'    },
  ];

  return (
    <>
      <style>{css}</style>

      {/* ── Hero ── */}
      <div className="cf-hero">
        <div className="cf-hero-pattern" />
        <div className="cf-hero-glow" />
        <div className="cf-hero-inner">
          <div className="cf-success-ring"><FiCheckCircle size={36} /></div>
          <div className="cf-hero-badge">✓ Application Submitted</div>
          <h1 className="cf-hero-title">Submitted <em>successfully!</em></h1>
          <p className="cf-hero-sub">Your passport application has been accepted and is now being processed.</p>
          <div className="cf-id-pill">
            <div><div className="cf-id-label">Application ID</div><div className="cf-id-value">{applicationData.applicationId}</div></div>
          </div>
        </div>
      </div>

      {/* ── Stat strip ── */}
      <div className="cf-stats-bar">
        <div className="cf-stats-row">
          {[
            { num: '2-3', unit: ' days', lbl: 'Initial Review' },
            { num: '99.8', unit: '%',    lbl: 'Success Rate'   },
            { num: '4.9',  unit: '★',   lbl: 'Avg. Rating'     },
            { num: '<20',  unit: ' days', lbl: 'Passport Ready' },
          ].map(({ num, unit, lbl }) => (
            <div className="cf-stat-cell" key={lbl}>
              <div className="cf-stat-num">{num}<b>{unit}</b></div>
              <div className="cf-stat-lbl">{lbl}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Main ── */}
      <div className="cf-main">

        {/* Summary */}
        <div className="cf-card" ref={el => { if (el && !revealRefs.current.includes(el)) revealRefs.current.push(el); }} style={{ opacity: 0, transform: 'translateY(22px)', transition: 'opacity 0.7s, transform 0.7s' }}>
          <div className="cf-eyebrow">Application Summary</div>
          <h2 className="cf-section-title">Your <em>details.</em></h2>
          <div className="cf-summary-grid">
            {[
              { icon: <FiUser size={15}/>,     lbl: 'Full Name',    val: `${applicationData.personalDetails?.firstName || 'N/A'} ${applicationData.personalDetails?.lastName || ''}` },
              { icon: <FiCalendar size={15}/>,  lbl: 'Date of Birth', val: applicationData.personalDetails?.dateOfBirth || 'N/A' },
              { icon: <FiMapPin size={15}/>,    lbl: 'Address',      val: `${applicationData.addressDetails?.city || 'N/A'}, ${applicationData.addressDetails?.state || 'N/A'}` },
              { icon: <FiShield size={15}/>,    lbl: 'Aadhar No.',   val: maskedAadhar },
              { icon: <FiFileText size={15}/>,  lbl: 'Passport Type', val: 'Regular Passport' },
              { icon: <FiCheckCircle size={15}/>, lbl: 'Status',     val: <span className="cf-status-chip">✓ {applicationData.status}</span> },
            ].map(({ icon, lbl, val }) => (
              <div className="cf-summary-cell" key={lbl}>
                <div className="cf-cell-icon">{icon}</div>
                <div className="cf-cell-lbl">{lbl}</div>
                <div className="cf-cell-val">{val}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Appointment */}
        {applicationData.appointment && (
          <div className="cf-card">
            <div className="cf-eyebrow">Appointment Confirmed</div>
            <h2 className="cf-section-title">Your <em>appointment.</em></h2>
            <div className="cf-appt-grid">
              {[
                { lbl: 'Passport Office', val: applicationData.appointment.office || 'Not specified' },
                { lbl: 'Date',            val: new Date(applicationData.appointment.date).toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                { lbl: 'Time',            val: applicationData.appointment.time || 'Not booked' },
                { lbl: 'Booking ID',      val: applicationData.appointment.bookingId || 'N/A' },
              ].map(({ lbl, val }) => (
                <div className="cf-appt-cell" key={lbl}>
                  <div className="cf-appt-lbl">{lbl}</div>
                  <div className="cf-appt-val">{val}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* What's next */}
        <div className="cf-card">
          <div className="cf-eyebrow">Timeline</div>
          <h2 className="cf-section-title">What happens <em>next?</em></h2>
          <div className="cf-steps-grid">
            {nextSteps.map((s) => (
              <div className="cf-step-cell" key={s.n}>
                <div className="cf-step-badge">{s.n}</div>
                <div className="cf-step-title">{s.title}</div>
                <p className="cf-step-desc">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important */}
        <div className="cf-important">
          <div className="cf-eyebrow">Before Your Visit</div>
          <h2 className="cf-section-title">Important <em>reminders.</em></h2>
          <ul className="cf-important-list">
            {[
              'Keep your Application ID safe — you will need it for all future correspondence.',
              'Arrive at least 15 minutes before your scheduled appointment.',
              'Bring all original documents along with photocopies.',
              'Missing your appointment without 24-hour notice may result in a fee deduction.',
              'You will receive email and SMS updates as your application progresses.',
            ].map(txt => <li key={txt}>{txt}</li>)}
          </ul>
        </div>

        {/* Action buttons */}
        <div className="cf-actions">
          <button className="cf-btn cf-btn-blue" onClick={handleDownloadPDF}>
            <FiDownload size={16} /> Download PDF
          </button>
          <button className="cf-btn cf-btn-outline" onClick={handleShare}>
            <FiShare2 size={16} /> Share Details
          </button>
          <button className="cf-btn cf-btn-green" onClick={() => navigate('/dashboard')}>
            <FiHome size={16} /> Back to Dashboard
          </button>
        </div>

        {/* Support CTA */}
        <div className="cf-support">
          <div className="cf-support-inner">
            <h3>Need Help?</h3>
            <p>Contact our support team at <strong>support@passportx.com</strong> or call <strong>1800-PASSPORT</strong>.</p>
          </div>
        </div>

      </div>
    </>
  );
};

export default ConfirmationScreen;