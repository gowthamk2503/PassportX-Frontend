import React from 'react';

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,400&family=Instrument+Serif:ital@0;1&display=swap');

  :root {
    --blue:       #2563EB;
    --blue-mid:   #1D4ED8;
    --blue-dark:  #1E3A8A;
    --blue-soft:  #EFF6FF;
    --sky:        #BAE6FD;
    --ink:        #0F172A;
    --muted:      #64748B;
    --border:     #E2E8F0;
    --green:      #10B981;
    --font:       'Plus Jakarta Sans', sans-serif;
    --serif:      'Instrument Serif', serif;
  }

  /* ════════════ PROGRESS BAR ════════════ */

  .pb-root {
    width: 100%;
    padding: 1.75rem 0 2rem;
  }

  /* ── Track line + steps wrapper ── */
  .pb-track-wrap {
    position: relative;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
  }

  /* Connector line behind circles */
  .pb-line {
    position: absolute;
    top: 18px; /* vertically centred on the 36px circle */
    left: calc(36px / 2);
    right: calc(36px / 2);
    height: 2px;
    background: rgba(255,255,255,0.12);
    z-index: 0;
    border-radius: 2px;
    overflow: hidden;
  }

  .pb-line-fill {
    height: 100%;
    border-radius: 2px;
    background: linear-gradient(90deg, #6EE7B7, var(--blue), #60A5FA);
    transition: width 0.55s cubic-bezier(0.16,1,0.3,1);
  }

  /* ── Individual step ── */
  .pb-step {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.65rem;
    position: relative;
    z-index: 1;
    flex: 1;
    cursor: default;
  }

  /* Circle */
  .pb-circle {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: var(--font);
    font-size: 0.72rem;
    font-weight: 800;
    border: 1.5px solid rgba(255,255,255,0.14);
    background: rgba(255,255,255,0.07);
    color: rgba(255,255,255,0.35);
    transition: all 0.35s cubic-bezier(0.34,1.56,0.64,1);
    box-shadow: 0 2px 8px rgba(0,0,0,0.18);
    letter-spacing: 0;
  }

  .pb-step.completed .pb-circle {
    background: rgba(16,185,129,0.18);
    border-color: rgba(16,185,129,0.45);
    color: #6EE7B7;
    transform: scale(1.05);
    box-shadow: 0 0 0 4px rgba(16,185,129,0.1), 0 4px 14px rgba(16,185,129,0.2);
  }

  .pb-step.active .pb-circle {
    background: var(--blue);
    border-color: rgba(96,165,250,0.6);
    color: #fff;
    transform: scale(1.15);
    box-shadow: 0 0 0 5px rgba(37,99,235,0.2), 0 6px 20px rgba(37,99,235,0.35);
  }

  /* Check icon (SVG inline) */
  .pb-check {
    width: 16px;
    height: 16px;
    stroke: #6EE7B7;
    fill: none;
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* Label */
  .pb-label {
    font-family: var(--font);
    font-size: 0.62rem;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    text-align: center;
    color: rgba(255,255,255,0.3);
    max-width: 72px;
    line-height: 1.4;
    transition: color 0.3s;
  }

  .pb-step.completed .pb-label { color: rgba(110,231,183,0.6); }
  .pb-step.active .pb-label    { color: rgba(255,255,255,0.85); }

  /* Active pulse ring */
  .pb-pulse {
    position: absolute;
    top: 0; left: 50%;
    transform: translateX(-50%);
    width: 36px;
    height: 36px;
    border-radius: 10px;
    border: 2px solid rgba(37,99,235,0.55);
    animation: pbPulse 2.2s ease-out infinite;
    pointer-events: none;
  }

  @keyframes pbPulse {
    0%   { transform: translateX(-50%) scale(1);   opacity: 0.7; }
    60%  { transform: translateX(-50%) scale(1.55); opacity: 0; }
    100% { transform: translateX(-50%) scale(1.55); opacity: 0; }
  }

  /* ── Step counter badge ── */
  .pb-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 1.4rem;
  }

  .pb-eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 0.65rem;
    font-weight: 800;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.45);
  }

  .pb-eyebrow::before {
    content: '';
    width: 14px;
    height: 2px;
    background: rgba(255,255,255,0.25);
    border-radius: 2px;
  }

  .pb-counter {
    font-family: var(--serif);
    font-size: 0.82rem;
    color: rgba(255,255,255,0.4);
    font-style: italic;
  }

  .pb-counter b {
    color: rgba(255,255,255,0.8);
    font-style: normal;
    font-family: var(--font);
    font-weight: 700;
  }

  /* ── Responsive ── */
  @media (max-width: 640px) {
    .pb-label { display: none; }
    .pb-line { top: 18px; }
  }
`;

const CheckIcon = () => (
  <svg className="pb-check" viewBox="0 0 16 16">
    <polyline points="2.5 8.5 6.5 12.5 13.5 4.5" />
  </svg>
);

const ProgressBar = ({ currentStep, totalSteps = 5 }) => {
  const steps = [
    { num: 1, label: 'Personal Details' },
    { num: 2, label: 'Address Details' },
    { num: 3, label: 'Identity Details' },
    { num: 4, label: 'Documents' },
    { num: 5, label: 'Review & Submit' },
  ];

  // Width % for the fill line: 0% at step 1, 100% at step 5
  const fillPct = ((currentStep - 1) / (totalSteps - 1)) * 100;

  return (
    <>
      <style>{css}</style>
      <div className="pb-root">
        {/* Meta row */}
        <div className="pb-meta">
          <span className="pb-eyebrow">Application Progress</span>
          <span className="pb-counter">
            Step <b>{currentStep}</b> of {totalSteps}
          </span>
        </div>

        {/* Track + steps */}
        <div className="pb-track-wrap">
          {/* Connector line */}
          <div className="pb-line">
            <div className="pb-line-fill" style={{ width: `${fillPct}%` }} />
          </div>

          {steps.map((step) => {
            const state =
              step.num < currentStep
                ? 'completed'
                : step.num === currentStep
                ? 'active'
                : '';

            return (
              <div key={step.num} className={`pb-step ${state}`}>
                {/* Active pulse ring */}
                {state === 'active' && <div className="pb-pulse" />}

                <div className="pb-circle">
                  {state === 'completed' ? <CheckIcon /> : step.num}
                </div>
                <div className="pb-label">{step.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default ProgressBar;