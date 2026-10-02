import React, { useEffect, useRef, useState, type PointerEvent } from 'react';
import confetti from 'canvas-confetti';
import { Download, QrCode, Sparkles, TicketCheck, X } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type RegistrationStage = 'form' | 'generating' | 'ticket';
type PassType = 'scholar' | 'meraki' | 'patron';

const PASS_DETAILS = {
  scholar: { name: 'Scholar Delegate (Ψυχή)', price: '₹499', zone: 'Zone C • Upper Circle' },
  meraki: { name: 'Meraki Delegate (Μεράκι)', price: '₹999', zone: 'Zone B • Orchestra Tier' },
  patron: { name: 'Patron VIP (Αγάπη)', price: '₹2,499', zone: 'Zone A • Front Red Circle & Lounge' },
} as const;

const clamp = (value: number, minimum: number, maximum: number) => Math.min(maximum, Math.max(minimum, value));

interface TearablePassProps {
  fullName: string;
  passType: PassType;
  zone: string;
  torn: boolean;
  onTear: () => void;
}

const TearablePass: React.FC<TearablePassProps> = ({ fullName, passType, zone, torn, onTear }) => {
  const dragRef = useRef<{ pointerId: number; startX: number } | null>(null);
  const progressRef = useRef(0);
  const [progress, setProgress] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    if (torn) {
      progressRef.current = 1;
      setProgress(1);
    }
  }, [torn]);

  const updateProgress = (next: number) => {
    const value = clamp(next, 0, 1);
    progressRef.current = value;
    setProgress(value);
  };

  const completeTear = () => {
    if (progressRef.current >= 0.72) {
      updateProgress(1);
      onTear();
    } else {
      updateProgress(0);
    }
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (torn) return;
    dragRef.current = { pointerId: event.pointerId, startX: event.clientX };
    event.currentTarget.setPointerCapture(event.pointerId);
    setIsDragging(true);
  };

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId || torn) return;
    updateProgress((event.clientX - dragRef.current.startX) / 112);
  };

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!dragRef.current || dragRef.current.pointerId !== event.pointerId) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    dragRef.current = null;
    setIsDragging(false);
    completeTear();
  };

  return (
    <div className="tearable-pass" aria-label="Interactive delegate pass">
      <div className="tearable-pass__body">
        <div className="tearable-pass__brand">
          <span><strong>TED</strong><b>x</b>SIUH</span>
          <span className="tearable-pass__tier">{passType}</span>
        </div>
        <div className="tearable-pass__identity">
          <span>DELEGATE PASS</span>
          <strong>{fullName || 'Your Name'}</strong>
        </div>
        <div className="tearable-pass__metadata">
          <span>DATE <b>OCT 9, 2026</b></span>
          <span>ZONE <b>{zone.split('•')[1]?.trim() ?? 'Orchestra'}</b></span>
        </div>
        {torn && <div className="tearable-pass__validated"><TicketCheck size={15} /> VALIDATED</div>}
      </div>

      <div className="tearable-pass__perforation" aria-hidden="true" />
      <div
        className={`tearable-pass__stub${isDragging ? ' is-dragging' : ''}${torn ? ' is-torn' : ''}`}
        role="button"
        tabIndex={torn ? -1 : 0}
        aria-label="Drag right to tear off the pass stub"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onKeyDown={(event) => {
          if (!torn && (event.key === 'Enter' || event.key === ' ')) {
            event.preventDefault();
            updateProgress(1);
            onTear();
          }
        }}
        style={{ transform: `translateX(${progress * 124}px) rotate(${progress * 8}deg)` }}
      >
        <span>{torn ? 'VALIDATED' : 'DRAG TO TEAR'}</span>
        <QrCode size={38} />
        <small>#OCT09-S2</small>
      </div>
    </div>
  );
};

export const RegistrationModal: React.FC<RegistrationModalProps> = ({ isOpen, onClose }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [passType, setPassType] = useState<PassType>('meraki');
  const [stage, setStage] = useState<RegistrationStage>('form');
  const [isTorn, setIsTorn] = useState(false);
  const generationTimerRef = useRef<number | undefined>(undefined);
  const passDetails = PASS_DETAILS[passType];

  useEffect(() => () => {
    if (generationTimerRef.current) window.clearTimeout(generationTimerRef.current);
  }, []);

  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setStage('generating');
    generationTimerRef.current = window.setTimeout(() => {
      setStage('ticket');
      generationTimerRef.current = undefined;
    }, 1450);
  };

  const handleTear = () => {
    if (isTorn) return;
    setIsTorn(true);
    confetti({
      particleCount: 90,
      spread: 65,
      origin: { y: 0.62 },
      colors: ['#eb0028', '#e2c17c', '#ffffff'],
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="registration-modal glass-panel" onClick={(event) => event.stopPropagation()}>
        <button onClick={onClose} className="registration-modal__close" aria-label="Close registration">
          <X size={20} />
        </button>

        <div className="registration-modal__header">
          <h2 className="editorial-heading">Claim Your <span className="text-gradient-meraki meraki-wordmark">Meraki Pass</span></h2>
          <p>Generate a personalised, tearable pass for TEDxSIU Hyderabad.</p>
        </div>

        {stage === 'form' && (
          <form className="registration-form" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="registration-name">Full Legal Name</label>
              <input id="registration-name" type="text" required value={fullName} onChange={(event) => setFullName(event.target.value)} placeholder="Your full name" style={inputStyle} />
            </div>
            <div>
              <label htmlFor="registration-email">Email Address</label>
              <input id="registration-email" type="email" required value={email} onChange={(event) => setEmail(event.target.value)} placeholder="delegate@domain.com" style={inputStyle} />
            </div>
            <fieldset>
              <legend>Select Delegate Tier</legend>
              <div className="registration-form__tiers">
                {(Object.keys(PASS_DETAILS) as PassType[]).map((tier) => (
                  <button type="button" key={tier} onClick={() => setPassType(tier)} className={passType === tier ? 'is-selected' : ''}>
                    {tier}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="registration-form__price">
              <span>Admission Contribution</span>
              <strong>{passDetails.price}</strong>
            </div>
            <button type="submit" className="btn-primary registration-form__submit">
              Generate 9th Oct Pass <Sparkles size={16} />
            </button>
          </form>
        )}

        {stage === 'generating' && (
          <div className="pass-generation-loader" aria-live="polite">
            <div className="pass-generation-loader__seal"><span>m</span></div>
            <h3>Weaving your Meraki Pass</h3>
            <p>Binding your delegate details to a one-of-one ticket.</p>
            <div><i /> Personalising your archive token</div>
          </div>
        )}

        {stage === 'ticket' && (
          <div className="ticket-reveal">
            <span>YOUR PERSONALISED PASS</span>
            <h3>{passDetails.name}</h3>
            <p>{isTorn ? 'Pass validated. Your place in the circle is secured.' : 'Drag the red stub to the right to tear and validate your pass.'}</p>
            <TearablePass fullName={fullName} passType={passType} zone={passDetails.zone} torn={isTorn} onTear={handleTear} />
            {isTorn && (
              <button onClick={() => alert(`Downloading digital pass token for ${fullName}...`)} className="btn-primary ticket-reveal__download">
                <Download size={16} /> Download Pass
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  borderRadius: '10px',
  background: 'var(--bg-surface)',
  border: '1px solid var(--border-subtle)',
  color: 'var(--text-main)',
  fontSize: '14px',
  outline: 'none',
  fontFamily: 'var(--font-body)',
};
