import React from 'react';
import { FiAlertCircle, FiCheckCircle, FiInfo, FiAlertTriangle } from 'react-icons/fi';

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');

  :root {
    --blue:         #2563EB;
    --green:        #059669;
    --green-bg:     #ECFDF5;
    --green-border: #A7F3D0;
    --red:          #DC2626;
    --red-bg:       #FEF2F2;
    --red-border:   #FECACA;
    --amber:        #D97706;
    --amber-bg:     #FFFBEB;
    --amber-border: #FDE68A;
    --blue-bg:      #EFF6FF;
    --blue-border:  #BFDBFE;
    --font:         'Plus Jakarta Sans', sans-serif;
  }

  .lx-alert {
    display: flex;
    align-items: flex-start;
    gap: 0.85rem;
    padding: 0.9rem 1.1rem;
    border-radius: 12px;
    border: 1px solid transparent;
    font-family: var(--font);
    animation: alertIn 0.28s cubic-bezier(0.16,1,0.3,1) both;
  }

  @keyframes alertIn {
    from { opacity: 0; transform: translateY(-5px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .lx-alert-icon {
    flex-shrink: 0;
    width: 32px; height: 32px; border-radius: 9px;
    display: flex; align-items: center; justify-content: center;
  }

  .lx-alert-body  { flex: 1; min-width: 0; }
  .lx-alert-title { font-size: 0.83rem; font-weight: 700; margin-bottom: 2px; line-height: 1.35; }
  .lx-alert-msg   { font-size: 0.81rem; font-weight: 500; line-height: 1.65; }

  .lx-info    { background: var(--blue-bg);   border-color: var(--blue-border);  }
  .lx-info    .lx-alert-icon  { background: #DBEAFE; color: var(--blue);  }
  .lx-info    .lx-alert-title { color: #1D4ED8; }
  .lx-info    .lx-alert-msg   { color: #1E40AF; }

  .lx-success { background: var(--green-bg);  border-color: var(--green-border); }
  .lx-success .lx-alert-icon  { background: #D1FAE5; color: var(--green); }
  .lx-success .lx-alert-title { color: #065F46; }
  .lx-success .lx-alert-msg   { color: #047857; }

  .lx-error   { background: var(--red-bg);    border-color: var(--red-border);   }
  .lx-error   .lx-alert-icon  { background: #FEE2E2; color: var(--red);   }
  .lx-error   .lx-alert-title { color: #991B1B; }
  .lx-error   .lx-alert-msg   { color: #B91C1C; }

  .lx-warning { background: var(--amber-bg);  border-color: var(--amber-border); }
  .lx-warning .lx-alert-icon  { background: #FEF3C7; color: var(--amber); }
  .lx-warning .lx-alert-title { color: #92400E; }
  .lx-warning .lx-alert-msg   { color: #B45309; }
`;

const CONFIG = {
  info:    { icon: <FiInfo size={15} />,          cls: 'lx-info'    },
  success: { icon: <FiCheckCircle size={15} />,   cls: 'lx-success' },
  error:   { icon: <FiAlertCircle size={15} />,   cls: 'lx-error'   },
  warning: { icon: <FiAlertTriangle size={15} />, cls: 'lx-warning' },
};

const Alert = ({ type = 'info', message, title }) => {
  const { icon, cls } = CONFIG[type] ?? CONFIG.info;
  return (
    <>
      <style>{css}</style>
      <div className={`lx-alert ${cls}`} role="alert" aria-live="polite">
        <div className="lx-alert-icon">{icon}</div>
        <div className="lx-alert-body">
          {title && <strong className="lx-alert-title">{title}</strong>}
          <div className="lx-alert-msg">{message}</div>
        </div>
      </div>
    </>
  );
};

export default Alert;