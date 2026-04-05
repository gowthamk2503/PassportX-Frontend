import React, { useState } from 'react';
import { FiUploadCloud, FiCheck, FiX, FiFile } from 'react-icons/fi';
import Alert from './Alert';

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
    --blue-light:  #EFF6FF;
    --blue-ring:   rgba(37,99,235,0.16);
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
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── container ── */
  .du-wrap { display: flex; flex-direction: column; gap: 0; }

  /* ── header ── */
  .du-header { margin-bottom: 1.5rem; }

  .du-header h3 {
    font-family: var(--serif);
    font-size: 1.35rem; font-weight: 400; color: var(--ink);
    margin-bottom: 0.25rem;
  }

  .du-header-meta {
    display: flex; align-items: center; justify-content: space-between; gap: 1rem;
    flex-wrap: wrap; margin-bottom: 1rem;
  }

  .du-header-sub { font-size: 0.81rem; color: var(--muted); font-weight: 500; }

  .du-count-chip {
    font-size: 0.72rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    color: var(--blue); background: var(--blue-light);
    border: 1px solid #BFDBFE; border-radius: 20px;
    padding: 0.25rem 0.75rem;
  }

  /* ── progress ── */
  .du-prog-wrap { margin-bottom: 1.75rem; }
  .du-prog-track {
    width: 100%; height: 5px; background: var(--border);
    border-radius: 99px; overflow: hidden;
  }
  .du-prog-fill {
    height: 100%; border-radius: 99px;
    background: linear-gradient(90deg, var(--blue), #60A5FA);
    transition: width 0.4s cubic-bezier(0.16,1,0.3,1);
  }
  .du-prog-label {
    display: flex; justify-content: space-between;
    font-size: 0.72rem; font-weight: 600; color: var(--muted-2);
    margin-top: 0.4rem;
  }

  /* ── alerts ── */
  .du-alert { margin-bottom: 1rem; }

  /* ── list ── */
  .du-list { display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.25rem; }

  /* ── document card ── */
  .du-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--r, 14px);
    padding: 1.25rem 1.35rem;
    box-shadow: var(--shadow-sm);
    display: grid;
    grid-template-columns: 1fr auto;
    gap: 1.25rem;
    align-items: start;
    transition: border-color 0.22s, box-shadow 0.22s;
  }

  .du-card:hover { border-color: var(--border-2); box-shadow: var(--shadow-md); }

  .du-card.du-uploaded {
    border-color: var(--green-border);
    background: var(--green-bg);
  }

  /* ── doc label ── */
  .du-doc-name-row {
    display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.3rem;
    flex-wrap: wrap;
  }

  .du-doc-name { font-size: 0.9rem; font-weight: 700; color: var(--ink); }

  .du-badge {
    font-size: 0.6rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    padding: 0.18rem 0.55rem; border-radius: 6px;
  }

  .du-badge-req { background: var(--red-bg); color: var(--red); border: 1px solid var(--red-border); }
  .du-badge-opt { background: #F5F3FF; color: #6D28D9; border: 1px solid #DDD6FE; }

  .du-doc-desc { font-size: 0.78rem; color: var(--muted); line-height: 1.65; margin-bottom: 0.9rem; }

  /* ── upload zone ── */
  .du-zone {
    border: 2px dashed var(--border-2);
    border-radius: 10px;
    padding: 1.35rem 1rem;
    text-align: center;
    cursor: pointer;
    position: relative;
    transition: border-color 0.22s, background 0.22s;
  }

  .du-zone:hover { border-color: var(--blue); background: var(--blue-light); }

  .du-zone input[type="file"] {
    position: absolute; inset: 0;
    width: 100%; height: 100%;
    opacity: 0; cursor: pointer;
  }

  .du-zone-icon  { color: var(--blue); margin-bottom: 0.45rem; }
  .du-zone-title { font-size: 0.81rem; font-weight: 600; color: var(--ink); margin-bottom: 0.2rem; }
  .du-zone-hint  { font-size: 0.72rem; color: var(--muted-2); }

  /* ── uploaded file ── */
  .du-file-row {
    display: flex; align-items: center; gap: 0.85rem;
    padding: 0.85rem 1rem;
    background: white;
    border: 1px solid var(--green-border);
    border-radius: 10px;
  }

  .du-file-icon { color: var(--green); flex-shrink: 0; }
  .du-file-meta { flex: 1; min-width: 0; }
  .du-file-name { font-size: 0.82rem; font-weight: 700; color: var(--ink); margin-bottom: 1px;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .du-file-size { font-size: 0.71rem; color: var(--muted); }

  .du-remove-btn {
    flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    width: 30px; height: 30px;
    background: var(--red-bg); border: 1px solid var(--red-border);
    border-radius: 8px; color: var(--red); cursor: pointer;
    transition: background 0.18s, transform 0.18s;
  }
  .du-remove-btn:hover:not(:disabled) { background: #FEE2E2; transform: scale(1.08); }
  .du-remove-btn:disabled { opacity: 0.4; cursor: not-allowed; }

  /* ── status chip ── */
  .du-status {
    display: inline-flex; align-items: center; gap: 5px;
    font-size: 0.68rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase;
    padding: 0.28rem 0.68rem; border-radius: 8px; white-space: nowrap;
  }
  .du-status-done     { background: var(--green-bg);  color: var(--green);  border: 1px solid var(--green-border); }
  .du-status-required { background: var(--red-bg);    color: var(--red);    border: 1px solid var(--red-border);   }
  .du-status-optional { background: #F5F3FF;          color: #6D28D9;       border: 1px solid #DDD6FE;             }

  @media(max-width:560px){
    .du-card { grid-template-columns: 1fr; }
    .du-status { justify-self: start; }
  }
`;

/* ─── Document type definitions ─────────────────────────────────────── */
const DOC_TYPES = [
  { key: 'passportPhoto',    label: 'Passport Size Photo (4×6 cm)', desc: 'Recent colour photograph on plain white background.',              required: true  },
  { key: 'aadharCard',       label: 'Aadhar Card Copy',             desc: 'Clear copy of both sides of your Aadhar card.',                    required: true  },
  { key: 'birthCertificate', label: 'Birth Certificate',            desc: 'Original or attested copy issued by a competent authority.',       required: true  },
  { key: 'addressProof',     label: 'Address Proof',                desc: 'Electricity bill, water bill, ration card, or bank statement.',    required: true  },
  { key: 'incomeProof',      label: 'Income Proof',                 desc: 'IT returns, salary slip, or income certificate (optional).',       required: false },
  { key: 'identityProof',    label: 'Additional Identity Proof',    desc: 'PAN card, driving licence, or voter ID (optional).',              required: false },
];

/* ─── Component ──────────────────────────────────────────────────────── */
const DocumentUpload = ({ applicationId, onDocumentsUpdate, disabled = false }) => {
  const [documents, setDocuments] = useState(
    Object.fromEntries(DOC_TYPES.map(d => [d.key, null]))
  );
  const [error,   setError]   = useState(null);
  const [success, setSuccess] = useState(null);

  const uploadedCount  = Object.values(documents).filter(Boolean).length;
  const totalCount     = DOC_TYPES.length;
  const requiredCount  = DOC_TYPES.filter(d => d.required).length;
  const reqDone        = DOC_TYPES.filter(d => d.required).filter(d => documents[d.key]).length;
  const allReqUploaded = reqDone === requiredCount;
  const pct            = Math.round((uploadedCount / totalCount) * 100);

  const handleFile = (key, file) => {
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setError('File size must be under 5 MB.'); return; }
    const valid = ['application/pdf', 'image/jpeg', 'image/png'];
    if (!valid.includes(file.type)) { setError('Only PDF, JPEG, and PNG files are allowed.'); return; }

    setError(null);
    const doc = {
      name: file.name,
      size: (file.size / 1024).toFixed(1) + ' KB',
      type: file.type, file,
      uploadedAt: new Date().toLocaleTimeString(),
    };
    const updated = { ...documents, [key]: doc };
    setDocuments(updated);
    setSuccess(`"${file.name}" added successfully.`);
    setTimeout(() => setSuccess(null), 3500);
    if (onDocumentsUpdate) onDocumentsUpdate(updated);
  };

  const handleRemove = (key) => {
    const updated = { ...documents, [key]: null };
    setDocuments(updated);
    if (onDocumentsUpdate) onDocumentsUpdate(updated);
  };

  return (
    <>
      <style>{css}</style>
      <div className="du-wrap">

        {/* Header */}
        <div className="du-header">
          <h3>Document Upload</h3>
          <div className="du-header-meta">
            <span className="du-header-sub">{requiredCount} required documents · {uploadedCount} of {totalCount} uploaded</span>
            <span className="du-count-chip">{pct}% complete</span>
          </div>
          <div className="du-prog-wrap">
            <div className="du-prog-track">
              <div className="du-prog-fill" style={{ width: `${pct}%` }} />
            </div>
            <div className="du-prog-label">
              <span>{uploadedCount} uploaded</span>
              <span>{totalCount - uploadedCount} remaining</span>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {error   && <div className="du-alert"><Alert type="error"   message={error}   /></div>}
        {success && <div className="du-alert"><Alert type="success" message={success} /></div>}

        {/* Document list */}
        <div className="du-list">
          {DOC_TYPES.map(dt => {
            const doc = documents[dt.key];
            return (
              <div key={dt.key} className={`du-card${doc ? ' du-uploaded' : ''}`}>
                <div>
                  <div className="du-doc-name-row">
                    <span className="du-doc-name">{dt.label}</span>
                    <span className={`du-badge ${dt.required ? 'du-badge-req' : 'du-badge-opt'}`}>
                      {dt.required ? 'Required' : 'Optional'}
                    </span>
                  </div>
                  <p className="du-doc-desc">{dt.desc}</p>

                  {doc ? (
                    <div className="du-file-row">
                      <FiFile className="du-file-icon" size={20} />
                      <div className="du-file-meta">
                        <div className="du-file-name">{doc.name}</div>
                        <div className="du-file-size">{doc.size} · Added at {doc.uploadedAt}</div>
                      </div>
                      <button
                        type="button"
                        className="du-remove-btn"
                        onClick={() => handleRemove(dt.key)}
                        disabled={disabled}
                        aria-label="Remove document"
                      >
                        <FiX size={14} />
                      </button>
                    </div>
                  ) : (
                    <div className="du-zone">
                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        disabled={disabled}
                        onChange={e => handleFile(dt.key, e.target.files[0])}
                      />
                      <div className="du-zone-icon"><FiUploadCloud size={26} /></div>
                      <div className="du-zone-title">Click to upload or drag & drop</div>
                      <div className="du-zone-hint">PDF, JPG or PNG · max 5 MB</div>
                    </div>
                  )}
                </div>

                {/* Status chip */}
                <div>
                  {doc ? (
                    <span className="du-status du-status-done"><FiCheck size={11} /> Uploaded</span>
                  ) : dt.required ? (
                    <span className="du-status du-status-required">Required</span>
                  ) : (
                    <span className="du-status du-status-optional">Optional</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer status */}
        {allReqUploaded ? (
          <Alert type="success" title="All required documents uploaded"
            message="You're ready to proceed to the next step." />
        ) : (
          <Alert type="info"
            message={`Please upload ${requiredCount - reqDone} more required document${requiredCount - reqDone > 1 ? 's' : ''} to continue.`} />
        )}
      </div>
    </>
  );
};

export default DocumentUpload;