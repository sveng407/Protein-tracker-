import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useT } from '../context/LanguageContext';
import { LanguagePicker } from '../components/LanguagePicker';
import { FlowerGrowth } from '../components/today/FlowerGrowth';
import { FLOWER_PALETTE } from '../lib/flowerUtils';

function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden>
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"/>
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.18 1.48-4.97 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
    </svg>
  );
}

export function LoginPage() {
  const t = useT();
  const { signInWithGoogle } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch {
      setError(t.auth.error);
      setLoading(false);
    }
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{ background: 'linear-gradient(160deg, #FFF0F7 0%, #F5EEFF 50%, #F0FFF8 100%)' }}
    >
      {/* blobs */}
      <div className="fixed top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,183,197,0.18)', filter: 'blur(40px)', transform: 'translate(-30%,-30%)' }} />
      <div className="fixed bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'rgba(196,168,255,0.18)', filter: 'blur(50px)', transform: 'translate(30%,30%)' }} />

      <div className="fixed top-4 right-4 z-10">
        <LanguagePicker />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
        className="w-full max-w-sm text-center"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          style={{ width: 150, margin: '0 auto' }}
        >
          <FlowerGrowth percent={0.85} color={FLOWER_PALETTE[1]} />
        </motion.div>

        <h1 className="text-4xl font-black tracking-tight mb-2" style={{ color: '#3D2255' }}>
          {t.auth.headline}
        </h1>
        <p className="text-sm font-medium mb-8 leading-relaxed" style={{ color: '#9B7BE0', whiteSpace: 'pre-line' }}>
          {t.auth.subtitle}
        </p>

        {error && (
          <div className="mb-4 rounded-2xl px-4 py-3 text-sm font-semibold"
            style={{ background: '#FFF4DC', border: '2px solid #FFE4A0', color: '#B87840' }}>
            {error}
          </div>
        )}

        <motion.button
          onClick={handleSignIn}
          disabled={loading}
          whileTap={{ scale: 0.95 }}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-4xl font-black text-sm disabled:opacity-60"
          style={{
            background: 'white',
            border: '2.5px solid #FFE4EC',
            boxShadow: '0 6px 28px rgba(255,183,197,0.3)',
            color: '#3D2255',
          }}
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
              className="text-xl"
            >
              🌸
            </motion.span>
          ) : (
            <GoogleIcon />
          )}
          {loading ? t.auth.loading : t.auth.signInButton}
        </motion.button>
      </motion.div>
    </div>
  );
}
