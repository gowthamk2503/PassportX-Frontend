import React, { useState } from 'react';
import ProgressBar from '../components/ProgressBar';
import DocumentUpload from '../components/DocumentUpload';
import AppointmentBooking from '../components/AppointmentBooking';
import Alert from '../components/Alert';
import {
  FiArrowRight, FiArrowLeft, FiCheck,
  FiUser, FiMapPin, FiShield, FiUploadCloud, FiCalendar,
  FiSave
} from 'react-icons/fi';
import { applicationService } from '../services/api';

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-dark:   #1E3A8A;
    --blue-light:  #EFF6FF;
    --blue-ring:   rgba(37,99,235,0.18);
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
    --green-border:#A7F3D0;
    --red:         #DC2626;
    --red-bg:      #FEF2F2;
    --red-border:  #FECACA;
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --r:           14px;
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-lg:   0 10px 40px rgba(15,23,42,0.10), 0 4px 16px rgba(15,23,42,0.06);
    --shadow-blue: 0 8px 24px rgba(37,99,235,0.18);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  body {
    font-family: var(--font);
    background: var(--bg);
    color: var(--ink);
    -webkit-font-smoothing: antialiased;
    overflow-x: hidden;
  }

  /* ── page shell ── */
  .af-page {
    min-height: 100vh;
    background: var(--bg);
    padding: 0 0 5rem;
  }

  /* ── top banner ── */
  .af-banner {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 60%, #3B82F6 100%);
    padding: 3.5rem 1.5rem 5.5rem;
    position: relative; overflow: hidden;
  }

  .af-banner::after {
    content: '';
    position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 28px 28px; pointer-events: none;
  }

  .af-banner-inner {
    max-width: 860px; margin: 0 auto; position: relative; z-index: 1;
  }

  .af-badge {
    display: inline-flex; align-items: center; gap: 7px;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.25);
    border-radius: 100px; padding: 0.32rem 0.95rem;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 1.1rem;
  }

  .af-banner-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 4vw, 2.8rem);
    font-weight: 400; line-height: 1.1;
    color: #fff; letter-spacing: -0.02em; margin-bottom: 0.6rem;
  }

  .af-banner-title em { font-style: italic; color: #BAE6FD; }

  .af-banner-sub { font-size: 0.9rem; color: rgba(255,255,255,0.65); line-height: 1.75; }

  /* ── step indicators in banner ── */
  .af-step-indicators {
    display: flex; gap: 0.5rem; flex-wrap: wrap; margin-top: 2.25rem;
  }

  .af-step-ind {
    display: flex; align-items: center; gap: 0.45rem;
    padding: 0.38rem 0.85rem; border-radius: 100px;
    font-size: 0.72rem; font-weight: 600;
    background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.6);
    border: 1px solid rgba(255,255,255,0.15);
    transition: all 0.22s;
  }

  .af-step-ind.active {
    background: rgba(255,255,255,0.22);
    color: #fff; border-color: rgba(255,255,255,0.35);
  }

  .af-step-ind.done {
    background: rgba(16,185,129,0.2);
    color: #A7F3D0; border-color: rgba(16,185,129,0.3);
  }

  .af-step-ind-dot {
    width: 6px; height: 6px; border-radius: 50%;
    background: currentColor; opacity: 0.7;
  }

  /* ── pull-up card ── */
  .af-card-outer {
    max-width: 860px; margin: -2.75rem auto 0;
    padding: 0 1.25rem;
    position: relative; z-index: 2;
  }

  .af-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 20px;
    padding: 2.25rem 2rem;
    box-shadow: var(--shadow-lg);
  }

  /* ── save chip ── */
  .af-save-chip {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.71rem; font-weight: 600; color: var(--green);
    background: var(--green-bg); border: 1px solid var(--green-border);
    border-radius: 20px; padding: 0.22rem 0.7rem; margin-bottom: 1.25rem;
    animation: alertIn 0.28s ease both;
  }

  @keyframes alertIn {
    from { opacity:0; transform:translateY(-4px); }
    to   { opacity:1; transform:translateY(0); }
  }

  /* ── step heading ── */
  .af-step-header {
    display: flex; align-items: center; gap: 0.75rem;
    margin-bottom: 0.4rem;
    padding-bottom: 1.25rem; border-bottom: 1px solid var(--border);
    margin-bottom: 1.5rem;
  }

  .af-step-icon {
    display: flex; align-items: center; justify-content: center;
    width: 40px; height: 40px; border-radius: 12px;
    background: var(--blue-light); color: var(--blue); flex-shrink: 0;
  }

  .af-step-title-wrap {}
  .af-step-title { font-family: var(--serif); font-size: 1.5rem; font-weight: 400; color: var(--ink); line-height: 1.2; }
  .af-step-sub   { font-size: 0.82rem; color: var(--muted); margin-top: 2px; }

  /* ── alerts ── */
  .af-alerts { display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; }

  /* ── form grid ── */
  .af-row        { display: grid; grid-template-columns: 1fr 1fr;      gap: 1.1rem; margin-bottom: 1.1rem; }
  .af-row.full   { grid-template-columns: 1fr; }
  .af-row.three  { grid-template-columns: 1fr 1fr 1fr; }

  @media(max-width:680px){
    .af-row, .af-row.three { grid-template-columns: 1fr; }
  }

  .af-group { display: flex; flex-direction: column; }

  .af-label {
    font-size: 0.81rem; font-weight: 700; color: var(--ink-2);
    margin-bottom: 0.48rem; display: flex; align-items: center; gap: 4px;
  }

  .af-label .req { color: var(--red); font-size: 0.9em; }

  .af-input,
  .af-textarea,
  .af-select {
    width: 100%;
    padding: 0.85rem 1rem;
    background: var(--surface);
    border: 1.5px solid var(--border);
    border-radius: 10px;
    font-family: var(--font); font-size: 0.9rem; color: var(--ink);
    transition: border-color 0.22s, box-shadow 0.22s, background 0.22s;
    box-shadow: var(--shadow-sm);
  }

  .af-input::placeholder, .af-textarea::placeholder { color: var(--muted-2); }

  .af-input:focus, .af-textarea:focus, .af-select:focus {
    outline: none;
    border-color: var(--blue);
    box-shadow: 0 0 0 3px var(--blue-ring);
  }

  .af-input:hover:not(:focus), .af-textarea:hover:not(:focus), .af-select:hover:not(:focus) {
    border-color: var(--border-2);
  }

  .af-textarea { min-height: 108px; resize: vertical; }

  .af-select {
    appearance: none; cursor: pointer;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%2394A3B8' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 0.85rem center; padding-right: 2.4rem;
  }

  .af-hint { font-size: 0.74rem; color: var(--muted-2); margin-top: 0.38rem; }

  /* ── section divider ── */
  .af-divider { height: 1px; background: var(--border); margin: 1.75rem 0; }

  /* ── review summary card ── */
  .af-summary-card {
    background: var(--blue-light); border: 1px solid #BFDBFE;
    border-radius: 14px; padding: 1.3rem 1.25rem; margin-bottom: 1.6rem;
  }

  .af-summary-card h4 {
    font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--ink);
    margin-bottom: 1rem; padding-bottom: 0.75rem; border-bottom: 1px solid #BFDBFE;
  }

  .af-summary-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(155px,1fr)); gap: 1rem;
  }

  .af-summary-item label {
    font-size: 0.7rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase;
    color: var(--muted); display: block; margin-bottom: 4px;
  }

  .af-summary-item p { font-size: 0.9rem; font-weight: 700; color: var(--ink); }

  /* ── checkboxes ── */
  .af-checks { margin-top: 1.5rem; }

  .af-checks h4 {
    font-family: var(--serif); font-size: 1.05rem; font-weight: 400; color: var(--ink); margin-bottom: 0.9rem;
  }

  .af-check-label {
    display: flex; gap: 0.75rem; align-items: flex-start;
    font-size: 0.86rem; color: var(--ink-2); cursor: pointer;
    margin-bottom: 0.75rem; line-height: 1.65; font-weight: 500;
  }

  .af-check-label input[type="checkbox"] {
    width: 17px; height: 17px; margin-top: 3px;
    accent-color: var(--blue); cursor: pointer; flex-shrink: 0;
  }

  /* ── navigation buttons ── */
  .af-actions { display: flex; gap: 0.85rem; margin-top: 2.25rem; flex-wrap: wrap; align-items: center; }

  .af-btn {
    display: inline-flex; align-items: center; justify-content: center; gap: 7px;
    font-family: var(--font); font-size: 0.88rem; font-weight: 700;
    padding: 0.9rem 1.6rem; border-radius: 12px;
    cursor: pointer; border: none;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
    white-space: nowrap;
  }

  .af-btn-back {
    background: var(--surface-2); color: var(--ink-2);
    border: 1.5px solid var(--border-2); box-shadow: var(--shadow-sm);
  }
  .af-btn-back:hover:not(:disabled) { background: var(--border); }

  .af-btn-next {
    flex: 1;
    background: var(--blue); color: #fff; box-shadow: var(--shadow-blue);
  }
  .af-btn-next:hover:not(:disabled) {
    background: var(--blue-mid);
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(37,99,235,0.28);
  }

  .af-btn-submit {
    flex: 1;
    background: var(--green); color: #fff;
    box-shadow: 0 8px 24px rgba(5,150,105,0.22);
  }
  .af-btn-submit:hover:not(:disabled) {
    background: #047857;
    transform: translateY(-2px);
    box-shadow: 0 12px 32px rgba(5,150,105,0.3);
  }

  .af-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none !important; }

  /* ── appointment section heading ── */
  .af-appt-head {
    font-family: var(--serif); font-size: 1.15rem; font-weight: 400; color: var(--ink); margin-bottom: 1.1rem;
  }

  @media(max-width:620px){
    .af-banner { padding: 2.5rem 1rem 4.5rem; }
    .af-card   { padding: 1.5rem 1.1rem; }
    .af-step-indicators { display: none; }
  }
`;

/* ─── Step metadata ─────────────────────────────────────────────────── */
const STEPS = [
  { icon: <FiUser size={18} />,        label: 'Personal Details',   sub: 'Name, date of birth, and nationality.'         },
  { icon: <FiMapPin size={18} />,      label: 'Address Details',    sub: 'Current and permanent address.'                 },
  { icon: <FiShield size={18} />,      label: 'Identity Details',   sub: 'Aadhar, PAN, and other ID numbers.'             },
  { icon: <FiUploadCloud size={18} />, label: 'Document Upload',    sub: 'Required supporting documents.'                 },
  { icon: <FiCalendar size={18} />,    label: 'Review & Appointment', sub: 'Confirm details and book your slot.'          },
];

/* ─── Component ──────────────────────────────────────────────────────── */
const ApplicationForm = ({ applicationId, onComplete }) => {
  const [step,      setStep]      = useState(1);
  const [loading,   setLoading]   = useState(false);
  const [lastSaved, setLastSaved] = useState(null);
  const [error,     setError]     = useState(null);
  const [success,   setSuccess]   = useState(false);

  const [formData, setFormData] = useState({
    personal: { firstName: '', lastName: '', dateOfBirth: '', gender: '', nationality: 'Indian', placeOfBirth: '' },
    address:  { currentAddress: '', city: '', state: '', pincode: '', country: 'India', permanentAddress: '' },
    identity: { aadharNumber: '', panNumber: '', drivingLicense: '', otherIdProof: '' },
    documents: [],
    review:   { applicantConsent: false, agreeToTerms: false },
  });

  const set = (section, field, value) =>
    setFormData(prev => ({ ...prev, [section]: { ...prev[section], [field]: value } }));

  const saveStep = async () => {
    setError(null);
    let stepName = '', data = {};

    if (step === 1) {
      const p = formData.personal;
      if (!p.firstName || !p.lastName || !p.dateOfBirth || !p.gender) {
        setError('Please fill in all required fields before continuing.'); return false;
      }
      stepName = 'personal'; data = p;
    } else if (step === 2) {
      const a = formData.address;
      if (!a.currentAddress || !a.city || !a.state || !a.pincode) {
        setError('Please fill in all required fields before continuing.'); return false;
      }
      stepName = 'address'; data = a;
    } else if (step === 3) {
      const id = formData.identity;
      if (!id.aadharNumber || id.aadharNumber.length !== 12) {
        setError('Please enter a valid 12-digit Aadhar number.'); return false;
      }
      stepName = 'identity'; data = id;
    } else if (step === 5) {
      if (!formData.review.applicantConsent || !formData.review.agreeToTerms) {
        setError('Please accept both confirmations to proceed.'); return false;
      }
      stepName = 'review'; data = formData.review;
    } else {
      return true;
    }

    try {
      setLoading(true);
      await applicationService.updateStep(applicationId, stepName, data);
      setLastSaved(new Date().toLocaleTimeString());
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3500);
      return true;
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save. Please try again.');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleNext = async () => {
    const ok = await saveStep();
    if (ok) { setStep(s => s + 1); window.scrollTo({ top: 0, behavior: 'smooth' }); }
  };

  const handleBack = () => {
    setStep(s => s - 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ok = await saveStep();
    if (!ok) return;
    try {
      setLoading(true);
      await applicationService.submitApplication(applicationId);
      setSuccess(true);
      if (onComplete) onComplete();
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const p  = formData.personal;
  const a  = formData.address;
  const id = formData.identity;
  const rv = formData.review;
  const meta = STEPS[step - 1];

  return (
    <>
      <style>{css}</style>

      <div className="af-page">
        {/* ── Top banner ── */}
        <div className="af-banner">
          <div className="af-banner-inner">
            <div className="af-badge">
              <FiShield size={11} /> Official Passport Application Portal
            </div>
            <h1 className="af-banner-title">
              Complete your <em>passport application.</em>
            </h1>
            <p className="af-banner-sub">
              Five guided steps. Your progress is saved automatically at every stage.
            </p>

            {/* Step pills */}
            <div className="af-step-indicators">
              {STEPS.map((s, i) => (
                <div
                  key={i}
                  className={`af-step-ind${i + 1 === step ? ' active' : ''}${i + 1 < step ? ' done' : ''}`}
                >
                  {i + 1 < step ? <FiCheck size={11} /> : <div className="af-step-ind-dot" />}
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Pull-up card ── */}
        <div className="af-card-outer">
          <div className="af-card">

            {/* Progress bar */}
            <ProgressBar currentStep={step} />
            <div style={{ height: '1.75rem' }} />

            {/* Auto-save indicator */}
            {lastSaved && (
              <div className="af-save-chip">
                <FiSave size={11} /> Saved at {lastSaved}
              </div>
            )}

            {/* Alerts */}
            {(error || success) && (
              <div className="af-alerts">
                {error   && <Alert type="error"   message={error} />}
                {success && <Alert type="success" message="Progress saved successfully." />}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Step header */}
              <div className="af-step-header">
                <div className="af-step-icon">{meta.icon}</div>
                <div className="af-step-title-wrap">
                  <div className="af-step-title">{meta.label}</div>
                  <div className="af-step-sub">{meta.sub}</div>
                </div>
              </div>

              {/* ── Step 1: Personal ── */}
              {step === 1 && (
                <>
                  <div className="af-row">
                    <div className="af-group">
                      <label className="af-label">First Name <span className="req">*</span></label>
                      <input className="af-input" type="text" value={p.firstName} placeholder="e.g. Arjun" onChange={e => set('personal','firstName',e.target.value)} required />
                    </div>
                    <div className="af-group">
                      <label className="af-label">Last Name <span className="req">*</span></label>
                      <input className="af-input" type="text" value={p.lastName}  placeholder="e.g. Sharma" onChange={e => set('personal','lastName',e.target.value)} required />
                    </div>
                  </div>
                  <div className="af-row">
                    <div className="af-group">
                      <label className="af-label">Date of Birth <span className="req">*</span></label>
                      <input className="af-input" type="date" value={p.dateOfBirth} onChange={e => set('personal','dateOfBirth',e.target.value)} required />
                    </div>
                    <div className="af-group">
                      <label className="af-label">Gender <span className="req">*</span></label>
                      <select className="af-select" value={p.gender} onChange={e => set('personal','gender',e.target.value)} required>
                        <option value="">Select gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="af-row">
                    <div className="af-group">
                      <label className="af-label">Nationality</label>
                      <input className="af-input" type="text" value={p.nationality} onChange={e => set('personal','nationality',e.target.value)} />
                    </div>
                    <div className="af-group">
                      <label className="af-label">Place of Birth</label>
                      <input className="af-input" type="text" value={p.placeOfBirth} placeholder="City, State" onChange={e => set('personal','placeOfBirth',e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Step 2: Address ── */}
              {step === 2 && (
                <>
                  <div className="af-row full">
                    <div className="af-group">
                      <label className="af-label">Current Address <span className="req">*</span></label>
                      <textarea className="af-textarea" value={a.currentAddress} placeholder="House No., Street, Locality, District" onChange={e => set('address','currentAddress',e.target.value)} required />
                    </div>
                  </div>
                  <div className="af-row three">
                    <div className="af-group">
                      <label className="af-label">City <span className="req">*</span></label>
                      <input className="af-input" type="text" value={a.city} placeholder="Chennai" onChange={e => set('address','city',e.target.value)} required />
                    </div>
                    <div className="af-group">
                      <label className="af-label">State <span className="req">*</span></label>
                      <input className="af-input" type="text" value={a.state} placeholder="Tamil Nadu" onChange={e => set('address','state',e.target.value)} required />
                    </div>
                    <div className="af-group">
                      <label className="af-label">Pincode <span className="req">*</span></label>
                      <input className="af-input" type="text" pattern="\d{6}" maxLength="6" value={a.pincode} placeholder="600001" onChange={e => set('address','pincode',e.target.value)} required />
                    </div>
                  </div>
                  <div className="af-divider" />
                  <div className="af-row full">
                    <div className="af-group">
                      <label className="af-label">
                        Permanent Address
                        <span style={{ fontSize:'0.72rem', color:'var(--muted-2)', fontWeight:400, marginLeft:5 }}>(leave blank if same as above)</span>
                      </label>
                      <textarea className="af-textarea" value={a.permanentAddress} placeholder="Optional — only fill if different from current address" onChange={e => set('address','permanentAddress',e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Step 3: Identity ── */}
              {step === 3 && (
                <>
                  <div className="af-row full">
                    <div className="af-group">
                      <label className="af-label">Aadhar Number <span className="req">*</span></label>
                      <input className="af-input" type="text" pattern="\d{12}" maxLength="12" value={id.aadharNumber} placeholder="12-digit Aadhar number" onChange={e => set('identity','aadharNumber',e.target.value)} required />
                      <span className="af-hint">Enter all 12 digits without spaces or dashes.</span>
                    </div>
                  </div>
                  <div className="af-row full">
                    <div className="af-group">
                      <label className="af-label">PAN Number</label>
                      <input className="af-input" type="text" pattern="[A-Z]{5}[0-9]{4}[A-Z]" value={id.panNumber} placeholder="e.g. ABCDE1234F" onChange={e => set('identity','panNumber',e.target.value.toUpperCase())} />
                      <span className="af-hint">Format: 5 letters, 4 digits, 1 letter (all uppercase).</span>
                    </div>
                  </div>
                  <div className="af-row">
                    <div className="af-group">
                      <label className="af-label">Driving Licence</label>
                      <input className="af-input" type="text" value={id.drivingLicense} placeholder="Optional" onChange={e => set('identity','drivingLicense',e.target.value)} />
                    </div>
                    <div className="af-group">
                      <label className="af-label">Other ID Proof</label>
                      <input className="af-input" type="text" value={id.otherIdProof} placeholder="Voter ID, Ration Card, etc." onChange={e => set('identity','otherIdProof',e.target.value)} />
                    </div>
                  </div>
                </>
              )}

              {/* ── Step 4: Documents ── */}
              {step === 4 && (
                <DocumentUpload applicationId={applicationId} />
              )}

              {/* ── Step 5: Review & Appointment ── */}
              {step === 5 && (
                <>
                  {/* Summary */}
                  <div className="af-summary-card">
                    <h4>Application Summary</h4>
                    <div className="af-summary-grid">
                      <div className="af-summary-item"><label>Full Name</label><p>{p.firstName} {p.lastName}</p></div>
                      <div className="af-summary-item"><label>Date of Birth</label><p>{p.dateOfBirth || '—'}</p></div>
                      <div className="af-summary-item"><label>Gender</label><p>{p.gender || '—'}</p></div>
                      <div className="af-summary-item"><label>City / State</label><p>{a.city && a.state ? `${a.city}, ${a.state}` : '—'}</p></div>
                      <div className="af-summary-item"><label>Aadhar (last 4)</label><p>{id.aadharNumber ? `••••••••${id.aadharNumber.slice(-4)}` : '—'}</p></div>
                      <div className="af-summary-item"><label>PAN</label><p>{id.panNumber || '—'}</p></div>
                    </div>
                  </div>

                  <div className="af-divider" />

                  <h3 className="af-appt-head">Book Your Appointment</h3>
                  <AppointmentBooking applicationId={applicationId} />

                  <div className="af-divider" />

                  {/* Confirmations */}
                  <div className="af-checks">
                    <h4>Declaration</h4>
                    <label className="af-check-label">
                      <input type="checkbox" checked={rv.applicantConsent}
                        onChange={e => set('review','applicantConsent',e.target.checked)} required />
                      I confirm that all information provided in this application is accurate, complete, and true to the best of my knowledge.
                    </label>
                    <label className="af-check-label">
                      <input type="checkbox" checked={rv.agreeToTerms}
                        onChange={e => set('review','agreeToTerms',e.target.checked)} required />
                      I agree to the terms and conditions governing the passport application process.
                    </label>
                  </div>
                </>
              )}

              {/* ── Navigation ── */}
              <div className="af-actions">
                {step > 1 && (
                  <button type="button" className="af-btn af-btn-back" onClick={handleBack} disabled={loading}>
                    <FiArrowLeft size={15} /> Back
                  </button>
                )}

                {step < 5 ? (
                  <button type="button" className="af-btn af-btn-next" onClick={handleNext} disabled={loading}>
                    {loading ? 'Saving…' : <> Save & Continue <FiArrowRight size={15} /></>}
                  </button>
                ) : (
                  <button type="submit" className="af-btn af-btn-submit"
                    disabled={loading || !rv.applicantConsent || !rv.agreeToTerms}>
                    {loading ? 'Submitting…' : <><FiCheck size={15} /> Submit Application</>}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;