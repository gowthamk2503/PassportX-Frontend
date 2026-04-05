import React, { useState } from 'react';
import { FiCalendar, FiClock, FiMapPin, FiCheck, FiAlertCircle, FiPrinter } from 'react-icons/fi';

/* ─── CSS ──────────────────────────────────────────────────────────────── */
const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:        #2563EB;
    --blue-mid:    #1D4ED8;
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
    --shadow-sm:   0 1px 3px rgba(15,23,42,0.06), 0 1px 2px rgba(15,23,42,0.04);
    --shadow-md:   0 4px 16px rgba(15,23,42,0.08), 0 2px 6px rgba(15,23,42,0.04);
    --shadow-blue: 0 8px 24px rgba(37,99,235,0.18);
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  /* ── section header ── */
  .ab-sec {
    display: flex; align-items: center; gap: 0.65rem; margin-bottom: 1.1rem;
  }
  .ab-sec-num {
    display: inline-flex; align-items: center; justify-content: center;
    width: 28px; height: 28px; border-radius: 8px;
    background: var(--blue-light); border: 1px solid #BFDBFE;
    font-size: 0.7rem; font-weight: 800; color: var(--blue); flex-shrink: 0;
  }
  .ab-sec-title {
    font-family: var(--serif);
    font-size: 1.15rem; font-weight: 400; color: var(--ink);
    letter-spacing: -0.01em;
  }

  /* ── divider ── */
  .ab-divider { height: 1px; background: var(--border); margin: 1.75rem 0; }

  /* ── error box ── */
  .ab-err {
    display: flex; align-items: center; gap: 0.65rem;
    background: var(--red-bg); border: 1px solid var(--red-border);
    border-radius: 10px; padding: 0.85rem 1rem;
    font-size: 0.83rem; color: var(--red); margin-bottom: 1.4rem; font-weight: 500;
  }

  /* ── office grid ── */
  .ab-office-grid { display: grid; grid-template-columns: 1fr; gap: 0.8rem; }

  .ab-office-card {
    display: flex; align-items: flex-start; gap: 0.9rem;
    background: var(--surface); border: 2px solid var(--border);
    border-radius: 12px; padding: 1.1rem 1.1rem;
    cursor: pointer; transition: all 0.22s ease;
    box-shadow: var(--shadow-sm);
  }
  .ab-office-card:hover    { border-color: #BFDBFE; box-shadow: var(--shadow-md); transform: translateY(-1px); }
  .ab-office-card.selected { border-color: var(--blue); background: var(--blue-light); box-shadow: var(--shadow-blue); }

  .ab-office-pin { flex-shrink: 0; color: var(--muted-2); margin-top: 2px; }
  .ab-office-card.selected .ab-office-pin { color: var(--blue); }

  .ab-office-info  { flex: 1; min-width: 0; }
  .ab-office-name  { font-size: 0.88rem; font-weight: 700; color: var(--ink); margin-bottom: 3px; }
  .ab-office-addr  { font-size: 0.75rem; color: var(--muted); line-height: 1.6; margin-bottom: 3px; }
  .ab-office-phone { font-size: 0.75rem; font-weight: 600; color: var(--blue); }
  .ab-office-tick  { flex-shrink: 0; color: var(--blue); }

  /* ── date grid ── */
  .ab-date-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
    gap: 0.6rem;
  }

  .ab-date-btn {
    padding: 0.8rem 0.4rem;
    border: 1.5px solid var(--border);
    border-radius: 10px;
    background: var(--surface);
    color: var(--ink-2);
    font-family: var(--font); font-size: 0.74rem; font-weight: 600;
    text-align: center; cursor: pointer; line-height: 1.5;
    transition: all 0.18s ease;
    box-shadow: var(--shadow-sm);
  }
  .ab-date-btn:hover:not(:disabled) { border-color: #BFDBFE; background: var(--blue-light); color: var(--blue); }
  .ab-date-btn.selected  { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .ab-date-btn:disabled  { opacity: 0.4; cursor: not-allowed; }

  /* ── time grid ── */
  .ab-time-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(108px, 1fr));
    gap: 0.6rem;
  }

  .ab-time-btn {
    padding: 0.85rem 0.4rem;
    border: 1.5px solid var(--border); border-radius: 10px;
    background: var(--surface); color: var(--ink-2);
    font-family: var(--font); font-size: 0.74rem; font-weight: 600;
    cursor: pointer; transition: all 0.18s ease;
    display: flex; flex-direction: column; align-items: center; gap: 3px;
    box-shadow: var(--shadow-sm);
  }
  .ab-time-btn:hover:not(:disabled) { border-color: #BFDBFE; background: var(--blue-light); color: var(--blue); }
  .ab-time-btn.selected  { background: var(--blue); border-color: var(--blue); color: #fff; box-shadow: var(--shadow-blue); }
  .ab-time-btn:disabled  { opacity: 0.38; cursor: not-allowed; }
  .ab-slot-count { font-size: 0.63rem; font-weight: 400; opacity: 0.8; }

  /* ── summary ── */
  .ab-summary {
    background: var(--blue-light); border: 1px solid #BFDBFE;
    border-radius: 14px; padding: 1.3rem 1.25rem;
    margin-top: 1.6rem; display: flex; flex-direction: column; gap: 0.9rem;
  }
  .ab-summary-head {
    font-family: var(--serif); font-size: 1rem; font-weight: 400; color: var(--ink);
    padding-bottom: 0.85rem; border-bottom: 1px solid #BFDBFE;
  }
  .ab-summary-row { display: flex; align-items: flex-start; gap: 0.8rem; padding-bottom: 0.85rem; border-bottom: 1px solid rgba(37,99,235,0.1); }
  .ab-summary-row:last-child { padding-bottom: 0; border-bottom: none; }
  .ab-summary-icon { flex-shrink: 0; color: var(--blue); margin-top: 2px; }
  .ab-summary-lbl  { font-size: 0.68rem; font-weight: 700; letter-spacing: 0.07em; text-transform: uppercase; color: var(--muted); margin-bottom: 3px; }
  .ab-summary-val  { font-size: 0.87rem; font-weight: 700; color: var(--ink); }

  /* ── confirm button ── */
  .ab-btn-confirm {
    width: 100%; margin-top: 1.6rem;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font); font-size: 0.9rem; font-weight: 700;
    padding: 1rem 1.25rem; border-radius: 12px; border: none; cursor: pointer;
    background: var(--blue); color: #fff;
    box-shadow: var(--shadow-blue);
    transition: all 0.25s cubic-bezier(0.34,1.56,0.64,1);
  }
  .ab-btn-confirm:hover:not(:disabled) { background: var(--blue-mid); transform: translateY(-2px); box-shadow: 0 12px 32px rgba(37,99,235,0.28); }
  .ab-btn-confirm:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }

  /* ── confirmation screen ── */
  .ab-confirmation { text-align: center; padding: 1rem 0.5rem 0.25rem; }

  .ab-confirm-icon {
    width: 72px; height: 72px; margin: 0 auto 1.2rem;
    border-radius: 50%; display: grid; place-items: center;
    background: var(--green-bg); border: 2px solid var(--green-border);
    color: var(--green);
  }

  .ab-confirm-title {
    font-family: var(--serif); font-size: 1.7rem; font-weight: 400;
    color: var(--green); margin-bottom: 0.6rem;
  }

  .ab-confirm-sub {
    font-size: 0.85rem; color: var(--muted); line-height: 1.75;
    max-width: 400px; margin: 0 auto 1.75rem;
  }

  .ab-booking-grid {
    display: grid; grid-template-columns: repeat(auto-fit, minmax(175px, 1fr));
    gap: 0.9rem; text-align: left; margin-bottom: 1.75rem;
  }

  .ab-booking-field {
    background: var(--surface); border: 1px solid var(--border);
    border-radius: 12px; padding: 1.05rem 1rem;
    box-shadow: var(--shadow-sm);
  }
  .ab-booking-lbl { font-size: 0.67rem; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--muted-2); margin-bottom: 5px; }
  .ab-booking-val { font-size: 0.87rem; font-weight: 700; color: var(--ink); line-height: 1.5; }

  .ab-bring {
    background: var(--surface-2); border: 1px solid var(--border);
    border-radius: 14px; padding: 1.3rem 1.2rem; text-align: left; margin-bottom: 1.5rem;
  }
  .ab-bring h3 {
    font-family: var(--serif); font-size: 1rem; font-weight: 400; color: var(--ink); margin-bottom: 0.85rem;
  }
  .ab-bring ul { padding-left: 1.15rem; color: var(--muted); font-size: 0.83rem; line-height: 1.9; }

  .ab-btn-print {
    width: 100%;
    display: inline-flex; align-items: center; justify-content: center; gap: 8px;
    font-family: var(--font); font-size: 0.88rem; font-weight: 600;
    padding: 0.9rem; border-radius: 12px;
    background: var(--surface); color: var(--ink-2);
    border: 1.5px solid var(--border-2);
    cursor: pointer; transition: all 0.22s ease;
    box-shadow: var(--shadow-sm);
  }
  .ab-btn-print:hover { border-color: var(--blue); color: var(--blue); background: var(--blue-light); transform: translateY(-1px); }

  @media(max-width:560px){
    .ab-date-grid { grid-template-columns: repeat(auto-fill, minmax(75px,1fr)); }
    .ab-time-grid { grid-template-columns: repeat(auto-fill, minmax(90px,1fr)); }
    .ab-booking-grid { grid-template-columns: 1fr; }
  }
`;

/* ─── Data ─────────────────────────────────────────────────────────────── */
const OFFICES = [
  { id: 'delhi-1',     name: 'Passport Office, New Delhi (HQ)',  address: 'East Block 8, Level 2, R.K. Puram, New Delhi – 110066', phone: '011-2619-5701' },
  { id: 'mumbai-1',    name: 'Passport Office, Mumbai',          address: 'Mhatre Wada, K Dubhash Marg, Fort, Mumbai – 400001',    phone: '022-2267-5859' },
  { id: 'bangalore-1', name: 'Passport Office, Bangalore',       address: '7th Floor, Khanija Bhavan, Race Course Road – 560001',  phone: '080-2521-0404' },
  { id: 'hyderabad-1', name: 'Passport Office, Hyderabad',       address: '4-1-956, Secretariat Road, Hyderabad – 500063',         phone: '040-2323-5139' },
  { id: 'chennai-1',   name: 'Passport Office, Chennai',         address: '2nd Floor, Shastri Bhawan, 26 Haddows Road – 600006',   phone: '044-2827-9750' },
];

const TIME_SLOTS = [
  { time:'09:00', display:'09:00 AM', available:5 },
  { time:'09:30', display:'09:30 AM', available:4 },
  { time:'10:00', display:'10:00 AM', available:3 },
  { time:'10:30', display:'10:30 AM', available:6 },
  { time:'11:00', display:'11:00 AM', available:5 },
  { time:'14:00', display:'02:00 PM', available:7 },
  { time:'14:30', display:'02:30 PM', available:4 },
  { time:'15:00', display:'03:00 PM', available:5 },
];

const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; i <= 30; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() + i);
    if (d.getDay() !== 0) dates.push(d.toISOString().split('T')[0]);
  }
  return dates;
};

/* ─── Component ──────────────────────────────────────────────────────── */
const AppointmentBooking = ({ applicationId, onBookingComplete, disabled = false }) => {
  const [office,  setOffice]  = useState('');
  const [date,    setDate]    = useState('');
  const [time,    setTime]    = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const officeData     = OFFICES.find(o => o.id === office);
  const availableDates = getAvailableDates();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!office || !date || !time) { setError('Please complete all three selections.'); return; }
    setLoading(true); setError(null);
    try {
      const data = { bookingId: `APT-${Date.now()}`, date, time, office, bookedAt: new Date().toLocaleString() };
      setBooking(data);
      if (onBookingComplete) onBookingComplete(data);
    } catch (err) {
      setError(err.message || 'Failed to book appointment.');
    } finally {
      setLoading(false);
    }
  };

  /* ── Confirmation view ── */
  if (booking) {
    const bOffice = OFFICES.find(o => o.id === booking.office);
    const bSlot   = TIME_SLOTS.find(s => s.time === booking.time);
    return (
      <>
        <style>{css}</style>
        <div className="ab-confirmation">
          <div className="ab-confirm-icon"><FiCheck size={38} /></div>
          <h2 className="ab-confirm-title">Appointment Confirmed!</h2>
          <p className="ab-confirm-sub">
            Your appointment has been booked. You may reschedule up to 24 hours before your visit.
          </p>

          <div className="ab-booking-grid">
            <div className="ab-booking-field">
              <div className="ab-booking-lbl">Booking ID</div>
              <div className="ab-booking-val">{booking.bookingId}</div>
            </div>
            <div className="ab-booking-field">
              <div className="ab-booking-lbl">Passport Office</div>
              <div className="ab-booking-val">{bOffice?.name}</div>
            </div>
            <div className="ab-booking-field">
              <div className="ab-booking-lbl">Date & Time</div>
              <div className="ab-booking-val">
                {new Date(booking.date).toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
                {' at '}{bSlot?.display}
              </div>
            </div>
            <div className="ab-booking-field">
              <div className="ab-booking-lbl">Confirmed On</div>
              <div className="ab-booking-val">{booking.bookedAt}</div>
            </div>
          </div>

          <div className="ab-bring">
            <h3>What to Bring</h3>
            <ul>
              <li>Printed copy of your application form</li>
              <li>All uploaded original documents</li>
              <li>Original identity proof (Aadhar / PAN)</li>
              <li>Valid address proof</li>
              <li>This appointment confirmation receipt</li>
            </ul>
          </div>

          <button type="button" className="ab-btn-print" onClick={() => window.print()}>
            <FiPrinter size={16} /> Print Appointment Receipt
          </button>
        </div>
      </>
    );
  }

  /* ── Booking form ── */
  return (
    <>
      <style>{css}</style>
      <form onSubmit={handleSubmit}>

        {error && (
          <div className="ab-err">
            <FiAlertCircle size={17} /> {error}
          </div>
        )}

        {/* Step 1: Office */}
        <div className="ab-sec">
          <span className="ab-sec-num">1</span>
          <span className="ab-sec-title">Select Passport Office</span>
        </div>
        <div className="ab-office-grid">
          {OFFICES.map(o => (
            <div
              key={o.id}
              className={`ab-office-card${office === o.id ? ' selected' : ''}`}
              onClick={() => !disabled && setOffice(o.id)}
              role="button" tabIndex={disabled ? -1 : 0}
              onKeyDown={e => e.key === 'Enter' && !disabled && setOffice(o.id)}
              style={{ opacity: disabled ? 0.55 : 1 }}
            >
              <FiMapPin className="ab-office-pin" size={18} />
              <div className="ab-office-info">
                <p className="ab-office-name">{o.name}</p>
                <p className="ab-office-addr">{o.address}</p>
                <p className="ab-office-phone">{o.phone}</p>
              </div>
              {office === o.id && <FiCheck className="ab-office-tick" size={20} />}
            </div>
          ))}
        </div>

        <div className="ab-divider" />

        {/* Step 2: Date */}
        <div className="ab-sec">
          <span className="ab-sec-num">2</span>
          <span className="ab-sec-title">Select a Date</span>
        </div>
        <div className="ab-date-grid">
          {availableDates.map(d => (
            <button key={d} type="button"
              className={`ab-date-btn${date === d ? ' selected' : ''}`}
              onClick={() => !disabled && setDate(d)}
              disabled={disabled}
            >
              {new Date(d).toLocaleDateString('en-IN', { month:'short', day:'2-digit', weekday:'short' })}
            </button>
          ))}
        </div>

        <div className="ab-divider" />

        {/* Step 3: Time */}
        <div className="ab-sec">
          <span className="ab-sec-num">3</span>
          <span className="ab-sec-title">Select a Time Slot</span>
        </div>
        {date ? (
          <div className="ab-time-grid">
            {TIME_SLOTS.map(s => (
              <button key={s.time} type="button"
                className={`ab-time-btn${time === s.time ? ' selected' : ''}`}
                onClick={() => !disabled && setTime(s.time)}
                disabled={s.available === 0 || disabled}
              >
                <span>{s.display}</span>
                <span className="ab-slot-count">{s.available} slots left</span>
              </button>
            ))}
          </div>
        ) : (
          <p style={{ fontSize:'0.81rem', color:'var(--muted-2)', marginTop:'0.4rem' }}>
            Choose a date above to see available time slots.
          </p>
        )}

        {/* Summary */}
        {officeData && date && time && (
          <div className="ab-summary">
            <div className="ab-summary-head">Booking Summary</div>
            <div className="ab-summary-row">
              <FiMapPin className="ab-summary-icon" size={17} />
              <div>
                <div className="ab-summary-lbl">Office</div>
                <div className="ab-summary-val">{officeData.name}</div>
              </div>
            </div>
            <div className="ab-summary-row">
              <FiCalendar className="ab-summary-icon" size={17} />
              <div>
                <div className="ab-summary-lbl">Date</div>
                <div className="ab-summary-val">
                  {new Date(date).toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' })}
                </div>
              </div>
            </div>
            <div className="ab-summary-row">
              <FiClock className="ab-summary-icon" size={17} />
              <div>
                <div className="ab-summary-lbl">Time</div>
                <div className="ab-summary-val">{TIME_SLOTS.find(s => s.time === time)?.display}</div>
              </div>
            </div>
          </div>
        )}

        <button type="submit" className="ab-btn-confirm"
          disabled={loading || !officeData || !date || !time}>
          {loading ? 'Confirming…' : <><FiCheck size={16} /> Confirm Appointment</>}
        </button>
      </form>
    </>
  );
};

export default AppointmentBooking;