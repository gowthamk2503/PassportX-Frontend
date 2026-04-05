import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ApplicationForm from '../components/ApplicationForm';
import { applicationService } from '../services/api';
import Alert from '../components/Alert';
import { FiArrowLeft, FiDownload, FiCalendar, FiUser, FiMapPin, FiFileText, FiShield, FiClock } from 'react-icons/fi';

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
    --font:        'Plus Jakarta Sans', sans-serif;
    --serif:       'Instrument Serif', serif;
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-blue: 0 8px 28px rgba(37,99,235,0.22);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: var(--font); background: var(--bg); color: var(--ink); -webkit-font-smoothing: antialiased; overflow-x: hidden; }

  /* ════ HERO HEADER ════ */
  .ap-hero {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    padding: 5rem 1.5rem 3rem;
    position: relative; overflow: hidden;
  }

  .ap-hero-pattern {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 30px 30px;
  }

  .ap-hero-glow {
    position: absolute; inset: 0; z-index: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 70% at 5% 50%, rgba(255,255,255,0.12) 0%, transparent 55%),
      radial-gradient(ellipse 50% 50% at 95% 10%, rgba(186,230,253,0.1) 0%, transparent 50%);
  }

  .ap-hero-inner {
    position: relative; z-index: 1;
    max-width: 1100px; margin: 0 auto;
    display: flex; justify-content: space-between; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap;
  }

  .ap-hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,255,255,0.15); border: 1px solid rgba(255,255,255,0.28);
    border-radius: 100px; padding: 0.35rem 1rem;
    font-size: 0.66rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase;
    color: #fff; margin-bottom: 1.25rem;
  }

  .ap-live-dot {
    width: 6px; height: 6px; background: #6EE7B7; border-radius: 50%;
    animation: livePulse 2s infinite;
  }

  @keyframes livePulse {
    0%  { box-shadow: 0 0 0 0 rgba(110,231,183,0.5); }
    70% { box-shadow: 0 0 0 8px rgba(110,231,183,0); }
    100%{ box-shadow: 0 0 0 0 rgba(110,231,183,0); }
  }

  .ap-hero-title {
    font-family: var(--serif);
    font-size: clamp(2rem, 3.5vw, 2.8rem);
    font-weight: 400; line-height: 1.1; color: #fff; letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
  }
  .ap-hero-title em { font-style: italic; color: var(--sky); }

  .ap-hero-sub {
    font-size: 0.9rem; line-height: 1.75; color: rgba(255,255,255,0.65); max-width: 440px;
  }

  .ap-hero-actions { display: flex; gap: 1rem; flex-wrap: wrap; }

  /* ── Buttons ── */
  .ap-btn {
    display: inline-flex; align-items: center; gap: 8px;
    font-family: var(--font); font-size: 0.86rem; font-weight: 700;
    padding: 0.78rem 1.5rem; border-radius: 12px; border: none; cursor: pointer; text-decoration: none;
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1); white-space: nowrap;
  }

  .ap-btn-white { background: #fff; color: var(--blue); box-shadow: var(--shadow-blue); }
  .ap-btn-white:hover { background: var(--blue-light); transform: translateY(-3px); box-shadow: 0 12px 32px rgba(37,99,235,0.3); }

  .ap-btn-ghost { background: rgba(255,255,255,0.12); border: 1px solid rgba(255,255,255,0.25); color: #fff; backdrop-filter: blur(8px); }
  .ap-btn-ghost:hover { background: rgba(255,255,255,0.2); transform: translateY(-2px); }

  .ap-btn-blue { background: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .ap-btn-blue:hover { background: var(--blue-mid); transform: translateY(-3px); }

  /* ════ STAT STRIP ════ */
  .ap-stat-strip {
    background: var(--surface); border-bottom: 1px solid var(--border);
  }
  .ap-stat-row {
    max-width: 1100px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, 1fr);
  }
  .ap-stat-cell {
    padding: 1.6rem 2rem; border-right: 1px solid var(--border);
    position: relative; overflow: hidden; transition: background 0.25s;
  }
  .ap-stat-cell:last-child { border-right: none; }
  .ap-stat-cell::after {
    content: ''; position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, var(--blue), #60A5FA);
    transform: scaleX(0); transform-origin: left; transition: transform 0.4s ease;
  }
  .ap-stat-cell:hover::after { transform: scaleX(1); }
  .ap-stat-cell:hover { background: var(--blue-light); }
  .ap-stat-lbl { font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 4px; }
  .ap-stat-val { font-family: var(--serif); font-size: 1.3rem; font-weight: 400; color: var(--ink); }
  .ap-stat-val.mono { font-family: var(--font); font-size: 0.92rem; font-weight: 700; color: var(--blue); }

  /* ════ MAIN CONTENT ════ */
  .ap-main { max-width: 1100px; margin: 0 auto; padding: 3rem 1.5rem; }

  /* ════ STATUS CARD (submitted state) ════ */
  .ap-status-card {
    background: var(--surface); border: 1px solid var(--border); border-radius: 20px;
    overflow: hidden; box-shadow: var(--shadow-md);
  }

  .ap-status-header {
    background: linear-gradient(135deg, var(--blue-dark) 0%, var(--blue) 55%, #3B82F6 100%);
    padding: 2.5rem 2.5rem 2rem; position: relative; overflow: hidden;
  }
  .ap-status-header::before {
    content: ''; position: absolute; inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 26px 26px; pointer-events: none;
  }

  .ap-status-icon {
    width: 52px; height: 52px; border-radius: 14px;
    background: rgba(16,185,129,0.2); border: 1px solid rgba(16,185,129,0.35);
    display: flex; align-items: center; justify-content: center;
    color: #6EE7B7; margin-bottom: 1.25rem; position: relative; z-index: 1;
    box-shadow: 0 0 0 6px rgba(16,185,129,0.1);
  }

  .ap-status-title {
    font-family: var(--serif); font-size: 1.8rem; font-weight: 400; color: #fff;
    position: relative; z-index: 1; margin-bottom: 0.4rem;
  }
  .ap-status-title em { font-style: italic; color: var(--sky); }

  .ap-status-sub { font-size: 0.88rem; color: rgba(255,255,255,0.65); position: relative; z-index: 1; }

  .ap-status-body { padding: 2.25rem 2.5rem; }

  .ap-detail-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 1.25rem; margin-bottom: 2rem;
  }

  .ap-detail-card {
    background: var(--bg); border: 1px solid var(--border); border-radius: 14px;
    padding: 1.25rem 1.4rem; transition: all 0.25s; cursor: default;
    box-shadow: var(--shadow-sm);
  }
  .ap-detail-card:hover { border-color: #BFDBFE; background: var(--blue-light); box-shadow: var(--shadow-md); }

  .ap-detail-icon {
    width: 34px; height: 34px; border-radius: 9px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue); margin-bottom: 0.85rem;
  }

  .ap-detail-lbl { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.09em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 3px; }
  .ap-detail-val { font-size: 0.92rem; font-weight: 600; color: var(--ink); line-height: 1.5; }

  /* ════ SPINNER ════ */
  .ap-spinner-wrap {
    min-height: 60vh; display: flex; align-items: center; justify-content: center;
  }

  .ap-spinner {
    width: 44px; height: 44px;
    border: 3px solid rgba(37,99,235,0.15);
    border-top-color: var(--blue); border-radius: 50%;
    animation: spin 0.9s linear infinite;
  }

  @keyframes spin { to { transform: rotate(360deg); } }

  /* ════ ANIMATIONS ════ */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }

  .ap-fade { animation: fadeUp 0.6s ease both; }
  .ap-fade-1 { animation-delay: 0.05s; }
  .ap-fade-2 { animation-delay: 0.12s; }
  .ap-fade-3 { animation-delay: 0.19s; }
  .ap-fade-4 { animation-delay: 0.26s; }

  /* ════ RESPONSIVE ════ */
  @media (max-width: 780px) {
    .ap-hero-inner { flex-direction: column; align-items: flex-start; }
    .ap-stat-row { grid-template-columns: 1fr 1fr; }
    .ap-stat-cell:nth-child(2) { border-right: none; }
    .ap-stat-cell:nth-child(3) { border-top: 1px solid var(--border); grid-column: span 2; }
    .ap-detail-grid { grid-template-columns: 1fr; }
    .ap-status-header, .ap-status-body { padding: 1.75rem 1.5rem; }
  }

  /* ════ FULL DETAILS VIEW ════ */
  .ap-full-details {
    display: flex; flex-direction: column; gap: 1.5rem;
  }

  .ap-section {
    background: var(--surface); border: 1px solid var(--border); border-radius: 16px;
    overflow: hidden; box-shadow: var(--shadow-sm);
  }

  .ap-section-header {
    background: var(--surface-2); padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--border);
    display: flex; align-items: center; gap: 0.75rem;
  }

  .ap-section-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    display: flex; align-items: center; justify-content: center;
    color: var(--blue);
  }

  .ap-section-title {
    font-family: var(--serif); font-size: 1.1rem; font-weight: 400; color: var(--ink);
  }

  .ap-section-body {
    padding: 1.5rem;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1.25rem;
  }

  .ap-field {
    display: flex; flex-direction: column; gap: 0.25rem;
  }

  .ap-field-label {
    font-size: 0.65rem; font-weight: 700; letter-spacing: 0.08em;
    text-transform: uppercase; color: var(--muted-2);
  }

  .ap-field-value {
    font-size: 0.9rem; font-weight: 600; color: var(--ink);
  }

  .ap-field-value.masked {
    font-family: monospace; letter-spacing: 0.05em;
  }

  .ap-documents-list {
    display: flex; flex-direction: column; gap: 0.75rem;
  }

  .ap-doc-item {
    display: flex; align-items: center; gap: 0.75rem;
    padding: 0.85rem 1rem; background: var(--bg); border: 1px solid var(--border);
    border-radius: 10px;
  }

  .ap-doc-icon {
    width: 32px; height: 32px; border-radius: 8px;
    background: var(--green-bg); border: 1px solid var(--green-border);
    display: flex; align-items: center; justify-content: center;
    color: var(--green);
  }

  .ap-doc-name { font-size: 0.88rem; font-weight: 600; color: var(--ink); }
  .ap-doc-size { font-size: 0.75rem; color: var(--muted-2); }

  .ap-timeline {
    display: flex; flex-direction: column; gap: 0;
  }

  .ap-timeline-item {
    display: flex; gap: 1rem; padding: 1rem 1.5rem;
    position: relative;
  }

  .ap-timeline-item:not(:last-child)::before {
    content: ''; position: absolute; left: 27px; top: 48px; bottom: 0;
    width: 2px; background: var(--border);
  }

  .ap-timeline-dot {
    width: 16px; height: 16px; border-radius: 50%;
    background: var(--border); border: 2px solid var(--surface);
    flex-shrink: 0; margin-top: 3px;
  }

  .ap-timeline-dot.active {
    background: var(--green); border-color: var(--green-bg);
  }

  .ap-timeline-content { flex: 1; }

  .ap-timeline-title {
    font-size: 0.88rem; font-weight: 700; color: var(--ink);
  }

  .ap-timeline-date {
    font-size: 0.75rem; color: var(--muted-2); margin-top: 2px;
  }

  .ap-timeline-desc {
    font-size: 0.82rem; color: var(--muted); margin-top: 0.35rem; line-height: 1.5;
  }
`;

const ApplicationPage = () => {
  const { applicationId } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pdfError, setPdfError] = useState(null);

  const fetchApplication = useCallback(async () => {
    try {
      setLoading(true);
      const response = await applicationService.getApplication(applicationId);
      setApplication(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to load application');
    } finally {
      setLoading(false);
    }
  }, [applicationId]);

  useEffect(() => { fetchApplication(); }, [fetchApplication]);

  const handleDownloadPDF = async (fileName) => {
    try {
      setPdfError(null);
      const response = await applicationService.downloadPDF(applicationId, fileName);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setPdfError(err.message);
      setError(err.message);
    }
  };

  const handleGeneratePDF = async () => {
    try {
      setPdfError(null);
      const response = await applicationService.generatePDF(applicationId);
      await handleDownloadPDF(response.data.fileName);
    } catch (err) {
      setPdfError(err.response?.data?.message || 'Failed to generate PDF');
      setError(err.response?.data?.message || 'Failed to generate PDF');
    }
  };

  const handleViewPDF = async () => {
    try {
      setPdfError(null);
      if (application.pdfUrl) {
        const fileName = application.pdfUrl.split('/').pop();
        await handleDownloadPDF(fileName);
      } else {
        await handleGeneratePDF();
      }
    } catch (err) {
      setPdfError(err.message);
    }
  };

  return (
    <>
      <style>{css}</style>

      {/* ── Hero header ── */}
      <div className="ap-hero">
        <div className="ap-hero-pattern" />
        <div className="ap-hero-glow" />
        <div className="ap-hero-inner">
          <div>
            <div className="ap-hero-badge"><span className="ap-live-dot" /> Official Passport Portal</div>
            <h1 className="ap-hero-title">
              Application <em>Details</em>
            </h1>
            <p className="ap-hero-sub">View and manage your passport application status and next steps.</p>
          </div>
          <div className="ap-hero-actions">
            <button onClick={() => navigate('/dashboard')} className="ap-btn ap-btn-ghost">
              <FiArrowLeft size={15} /> Dashboard
            </button>
            {application?.status === 'Submitted' && (
              <button 
                onClick={handleViewPDF}
                className="ap-btn ap-btn-white"
                disabled={loading}
              >
                <FiDownload size={15} /> {pdfError ? 'Regenerate PDF' : 'Download PDF'}
              </button>
            )}
          </div>
        </div>
      </div>

      {pdfError && (
        <Alert type="warning" title="PDF Issue" message={pdfError} />
      )}

      {/* ── Stat strip ── */}
      {application && (
        <div className="ap-stat-strip">
          <div className="ap-stat-row">
            <div className="ap-stat-cell">
              <div className="ap-stat-lbl">Application ID</div>
              <div className="ap-stat-val mono">{application.applicationId}</div>
            </div>
            <div className="ap-stat-cell">
              <div className="ap-stat-lbl">Status</div>
              <div className="ap-stat-val">{application.status}</div>
            </div>
            <div className="ap-stat-cell">
              <div className="ap-stat-lbl">Last Saved</div>
              <div className="ap-stat-val" style={{ fontSize: '0.88rem', fontFamily: 'var(--font)', fontWeight: 600 }}>
                {new Date(application.lastSaved).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Main ── */}
      <div className="ap-main">
        {error && <Alert type="error" message={error} />}

        {loading ? (
          <div className="ap-spinner-wrap"><div className="ap-spinner" /></div>
        ) : application?.status === 'Draft' ? (
          <ApplicationForm applicationId={applicationId} onComplete={() => fetchApplication()} />
        ) : application ? (
          <div className="ap-full-details">
            {/* Personal Details Section */}
            {application.personalDetails && (
              <div className="ap-section">
                <div className="ap-section-header">
                  <div className="ap-section-icon"><FiUser size={16} /></div>
                  <h3 className="ap-section-title">Personal Details</h3>
                </div>
                <div className="ap-section-body">
                  <div className="ap-field">
                    <span className="ap-field-label">Full Name</span>
                    <span className="ap-field-value">{application.personalDetails.firstName} {application.personalDetails.lastName}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Date of Birth</span>
                    <span className="ap-field-value">{application.personalDetails.dateOfBirth || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Gender</span>
                    <span className="ap-field-value">{application.personalDetails.gender || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Nationality</span>
                    <span className="ap-field-value">{application.personalDetails.nationality || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Place of Birth</span>
                    <span className="ap-field-value">{application.personalDetails.placeOfBirth || '—'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Address Details Section */}
            {application.addressDetails && (
              <div className="ap-section">
                <div className="ap-section-header">
                  <div className="ap-section-icon"><FiMapPin size={16} /></div>
                  <h3 className="ap-section-title">Address Details</h3>
                </div>
                <div className="ap-section-body">
                  <div className="ap-field">
                    <span className="ap-field-label">Current Address</span>
                    <span className="ap-field-value">{application.addressDetails.currentAddress || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">City</span>
                    <span className="ap-field-value">{application.addressDetails.city || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">State</span>
                    <span className="ap-field-value">{application.addressDetails.state || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Pincode</span>
                    <span className="ap-field-value">{application.addressDetails.pincode || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Permanent Address</span>
                    <span className="ap-field-value">{application.addressDetails.permanentAddress || application.addressDetails.currentAddress || '—'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Identity Details Section */}
            {application.identityDetails && (
              <div className="ap-section">
                <div className="ap-section-header">
                  <div className="ap-section-icon"><FiShield size={16} /></div>
                  <h3 className="ap-section-title">Identity Details</h3>
                </div>
                <div className="ap-section-body">
                  <div className="ap-field">
                    <span className="ap-field-label">Aadhar Number</span>
                    <span className="ap-field-value masked">
                      {application.identityDetails.aadharNumber ? `••••••••${application.identityDetails.aadharNumber.slice(-4)}` : '—'}
                    </span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">PAN Number</span>
                    <span className="ap-field-value masked">{application.identityDetails.panNumber || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Driving License</span>
                    <span className="ap-field-value">{application.identityDetails.drivingLicense || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Other ID Proof</span>
                    <span className="ap-field-value">{application.identityDetails.otherIdProof || '—'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Appointment Section */}
            {application.appointment && (
              <div className="ap-section">
                <div className="ap-section-header">
                  <div className="ap-section-icon"><FiCalendar size={16} /></div>
                  <h3 className="ap-section-title">Appointment Details</h3>
                </div>
                <div className="ap-section-body">
                  <div className="ap-field">
                    <span className="ap-field-label">Passport Office</span>
                    <span className="ap-field-value">{application.appointment.office || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Date</span>
                    <span className="ap-field-value">{application.appointment.date || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Time</span>
                    <span className="ap-field-value">{application.appointment.time || '—'}</span>
                  </div>
                  <div className="ap-field">
                    <span className="ap-field-label">Booking ID</span>
                    <span className="ap-field-value">{application.appointment.bookingId || '—'}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Documents Section */}
            {application.documents && application.documents.length > 0 && (
              <div className="ap-section">
                <div className="ap-section-header">
                  <div className="ap-section-icon"><FiFileText size={16} /></div>
                  <h3 className="ap-section-title">Uploaded Documents</h3>
                </div>
                <div className="ap-section-body">
                  <div className="ap-documents-list">
                    {application.documents.map((doc, idx) => (
                      <div className="ap-doc-item" key={idx}>
                        <div className="ap-doc-icon"><FiFileText size={14} /></div>
                        <div>
                          <div className="ap-doc-name">{doc.originalName || doc.fileName}</div>
                          <div className="ap-doc-size">{doc.fileType}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Timeline Section */}
            <div className="ap-section">
              <div className="ap-section-header">
                <div className="ap-section-icon"><FiClock size={16} /></div>
                <h3 className="ap-section-title">Application Timeline</h3>
              </div>
              <div className="ap-section-body">
                <div className="ap-timeline">
                  <div className="ap-timeline-item">
                    <div className="ap-timeline-dot active" />
                    <div className="ap-timeline-content">
                      <div className="ap-timeline-title">Application Created</div>
                      <div className="ap-timeline-date">{application.createdAt ? new Date(application.createdAt).toLocaleString() : '—'}</div>
                      <div className="ap-timeline-desc">Your application was initiated and saved as a draft.</div>
                    </div>
                  </div>
                  {application.lastSaved && (
                    <div className="ap-timeline-item">
                      <div className="ap-timeline-dot active" />
                      <div className="ap-timeline-content">
                        <div className="ap-timeline-title">Last Saved</div>
                        <div className="ap-timeline-date">{new Date(application.lastSaved).toLocaleString()}</div>
                        <div className="ap-timeline-desc">Your application data was last updated.</div>
                      </div>
                    </div>
                  )}
                  {application.submittedAt && (
                    <div className="ap-timeline-item">
                      <div className="ap-timeline-dot active" />
                      <div className="ap-timeline-content">
                        <div className="ap-timeline-title">Application Submitted</div>
                        <div className="ap-timeline-date">{new Date(application.submittedAt).toLocaleString()}</div>
                        <div className="ap-timeline-desc">Your application has been submitted for processing.</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/dashboard')} className="ap-btn ap-btn-blue">
                <FiArrowLeft size={15} /> Back to Dashboard
              </button>
              {application.status === 'Submitted' && application.pdfUrl && (
                <button onClick={() => window.open(application.pdfUrl, '_blank')} className="ap-btn ap-btn-white">
                  <FiDownload size={15} /> Download PDF
                </button>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default ApplicationPage;