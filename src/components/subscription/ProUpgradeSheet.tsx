import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useT } from '../../context/LanguageContext';

interface Props {
  open: boolean;
  onClose: () => void;
  onActivate: (coupon?: string) => Promise<void>;
}

type Screen = 'pitch' | 'checkout';

const PERKS = [
  { icon: '🌸', key: 'perk1' as const },
  { icon: '📊', key: 'perk2' as const },
  { icon: '👑', key: 'perk3' as const },
  { icon: '☁️', key: 'perk4' as const },
];

function formatCardNumber(val: string) {
  return val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();
}
function formatExpiry(val: string) {
  const d = val.replace(/\D/g, '').slice(0, 4);
  return d.length > 2 ? d.slice(0, 2) + '/' + d.slice(2) : d;
}

export function ProUpgradeSheet({ open, onClose, onActivate }: Props) {
  const t = useT();
  const [screen, setScreen] = useState<Screen>('pitch');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [coupon, setCoupon] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleClose() {
    if (loading) return;
    setScreen('pitch');
    setCardNumber(''); setExpiry(''); setCvv(''); setCardName(''); setCoupon('');
    setLoading(false); setSuccess(false);
    onClose();
  }

  async function handlePay(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1800));
    await onActivate(coupon.trim() || undefined);
    setLoading(false);
    setSuccess(true);
    setTimeout(handleClose, 1500);
  }

  const inputStyle: React.CSSProperties = {
    background: '#FDFAFF', border: '2px solid #EDE4FF',
    borderRadius: '1rem', padding: '0.75rem 1rem',
    fontSize: '0.95rem', width: '100%', outline: 'none',
    color: '#3D2255', fontWeight: 600,
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: 'rgba(61,34,85,0.4)', backdropFilter: 'blur(4px)' }}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Sheet */}
          <motion.div
            className="fixed bottom-0 left-0 right-0 z-50 max-h-[92vh] overflow-y-auto"
            style={{ background: 'white', borderRadius: '2rem 2rem 0 0', boxShadow: '0 -8px 40px rgba(196,168,255,0.3)', border: '2.5px solid #EDE4FF', borderBottom: 'none' }}
            initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          >
            <div className="w-10 h-1.5 rounded-full mx-auto mt-3 mb-2" style={{ background: '#EDE4FF' }} />

            <AnimatePresence mode="wait">
              {/* ── SCREEN 1: SALES PITCH ── */}
              {screen === 'pitch' && (
                <motion.div key="pitch"
                  initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                  className="px-5 pb-10 pt-2"
                >
                  {/* Gradient PRO pill */}
                  <div className="flex justify-center mb-4">
                    <span
                      className="px-5 py-1.5 rounded-full text-sm font-black tracking-widest"
                      style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', color: 'white', letterSpacing: '0.1em' }}
                    >
                      🌸 PRO
                    </span>
                  </div>

                  <h2 className="text-2xl font-black text-center mb-1" style={{ color: '#3D2255' }}>
                    {t.pro.title}
                  </h2>
                  <p className="text-sm font-semibold text-center mb-5" style={{ color: '#C4A8FF' }}>
                    {t.pro.subtitle}
                  </p>

                  {/* Perks */}
                  <div className="flex flex-col gap-3 mb-5">
                    {PERKS.map(({ icon, key }) => (
                      <div key={key} className="flex items-center gap-3 px-4 py-3 rounded-2xl"
                        style={{ background: 'white', border: '2.5px solid #EDE4FF' }}>
                        <span style={{ fontSize: '1.3rem' }}>{icon}</span>
                        <span className="text-sm font-semibold" style={{ color: '#3D2255' }}>{t.pro[key]}</span>
                      </div>
                    ))}
                  </div>

                  {/* Price badge */}
                  <div className="flex justify-center mb-5">
                    <span
                      className="px-5 py-2 rounded-full text-sm font-black"
                      style={{ background: '#FFF9E6', border: '2px solid #F0C040', color: '#B8860B' }}
                    >
                      {t.pro.price}
                    </span>
                  </div>

                  {/* CTA */}
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={() => setScreen('checkout')}
                    className="w-full py-4 rounded-3xl text-white font-black text-base mb-3"
                    style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', boxShadow: '0 6px 24px rgba(196,168,255,0.45)' }}
                  >
                    {t.pro.upgradeBtn}
                  </motion.button>
                  <button onClick={handleClose}
                    className="w-full py-2 text-sm font-semibold"
                    style={{ color: '#C4A8CC' }}
                  >
                    {t.pro.dismiss}
                  </button>
                </motion.div>
              )}

              {/* ── SCREEN 2: CHECKOUT ── */}
              {screen === 'checkout' && (
                <motion.div key="checkout"
                  initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                  className="px-5 pb-10 pt-2"
                >
                  {/* Back + title */}
                  <div className="flex items-center gap-3 mb-4">
                    <button
                      onClick={() => { if (!loading) setScreen('pitch'); }}
                      className="w-8 h-8 rounded-full flex items-center justify-center font-black text-lg"
                      style={{ background: '#F5F0FF', color: '#9B7BE0' }}
                    >
                      ‹
                    </button>
                    <h2 className="text-lg font-black" style={{ color: '#3D2255' }}>{t.pro.checkoutTitle}</h2>
                    <span className="ml-auto text-xs font-black px-3 py-1 rounded-full"
                      style={{ background: '#FFF9E6', border: '2px solid #F0C040', color: '#B8860B' }}>
                      {t.pro.price}
                    </span>
                  </div>

                  {success ? (
                    <motion.div
                      initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
                      className="text-center py-10 flex flex-col items-center gap-4"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center text-3xl font-black"
                        style={{ background: '#D4F8E8', border: '3px solid #6DC9A8', color: '#6DC9A8' }}
                      >
                        ✓
                      </motion.div>
                      <p className="text-xl font-black" style={{ color: '#3D2255' }}>{t.pro.successMsg}</p>
                    </motion.div>
                  ) : (
                    <form onSubmit={handlePay} className="flex flex-col gap-3">
                      {/* Card number */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wide mb-1" style={{ color: '#C4A8FF' }}>
                          {t.pro.cardNumber}
                        </label>
                        <input
                          type="text" inputMode="numeric" placeholder="1234 5678 9012 3456"
                          value={cardNumber}
                          onChange={e => setCardNumber(formatCardNumber(e.target.value))}
                          style={inputStyle}
                          onFocus={e => (e.target.style.border = '2px solid #C4A8FF')}
                          onBlur={e => (e.target.style.border = '2px solid #EDE4FF')}
                          disabled={loading}
                        />
                      </div>

                      {/* Expiry + CVV */}
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wide mb-1" style={{ color: '#C4A8FF' }}>
                            {t.pro.expiry}
                          </label>
                          <input
                            type="text" inputMode="numeric" placeholder="MM/JJ"
                            value={expiry}
                            onChange={e => setExpiry(formatExpiry(e.target.value))}
                            style={inputStyle}
                            onFocus={e => (e.target.style.border = '2px solid #C4A8FF')}
                            onBlur={e => (e.target.style.border = '2px solid #EDE4FF')}
                            disabled={loading}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-black uppercase tracking-wide mb-1" style={{ color: '#C4A8FF' }}>
                            {t.pro.cvv}
                          </label>
                          <input
                            type="text" inputMode="numeric" placeholder="123"
                            value={cvv}
                            onChange={e => setCvv(e.target.value.replace(/\D/g, '').slice(0, 4))}
                            style={inputStyle}
                            onFocus={e => (e.target.style.border = '2px solid #C4A8FF')}
                            onBlur={e => (e.target.style.border = '2px solid #EDE4FF')}
                            disabled={loading}
                          />
                        </div>
                      </div>

                      {/* Name */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wide mb-1" style={{ color: '#C4A8FF' }}>
                          {t.pro.cardName}
                        </label>
                        <input
                          type="text" placeholder="Maria Muster"
                          value={cardName}
                          onChange={e => setCardName(e.target.value)}
                          style={inputStyle}
                          onFocus={e => (e.target.style.border = '2px solid #C4A8FF')}
                          onBlur={e => (e.target.style.border = '2px solid #EDE4FF')}
                          disabled={loading}
                        />
                      </div>

                      {/* Divider */}
                      <div className="flex items-center gap-2 my-1">
                        <div className="flex-1 h-px" style={{ background: '#EDE4FF' }} />
                        <span className="text-xs font-bold" style={{ color: '#C4A8CC' }}>— oder —</span>
                        <div className="flex-1 h-px" style={{ background: '#EDE4FF' }} />
                      </div>

                      {/* Coupon */}
                      <div>
                        <label className="block text-xs font-black uppercase tracking-wide mb-1" style={{ color: '#C4A8FF' }}>
                          🎁 {t.pro.coupon}
                        </label>
                        <input
                          type="text" placeholder="FLOWER2024"
                          value={coupon}
                          onChange={e => setCoupon(e.target.value.toUpperCase())}
                          style={inputStyle}
                          onFocus={e => (e.target.style.border = '2px solid #C4A8FF')}
                          onBlur={e => (e.target.style.border = '2px solid #EDE4FF')}
                          disabled={loading}
                        />
                        <p className="text-xs mt-1 font-medium" style={{ color: '#C4A8CC' }}>{t.pro.couponHint}</p>
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        whileTap={{ scale: 0.96 }}
                        disabled={loading}
                        className="w-full py-4 rounded-3xl text-white font-black text-base mt-1 flex items-center justify-center gap-2"
                        style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', boxShadow: '0 6px 24px rgba(196,168,255,0.45)', opacity: loading ? 0.7 : 1 }}
                      >
                        {loading ? (
                          <>
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="inline-block"
                            >🌸</motion.span>
                            {t.pro.processing}
                          </>
                        ) : (
                          t.pro.payBtn
                        )}
                      </motion.button>
                    </form>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
