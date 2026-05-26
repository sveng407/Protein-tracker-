import { motion } from 'framer-motion';
import { useLang } from '../context/LanguageContext';
import type { Lang } from '../i18n';

const LANGS: { code: Lang; label: string }[] = [
  { code: 'de', label: 'DE' },
  { code: 'en', label: 'EN' },
  { code: 'hu', label: 'HU' },
];

export function LanguagePicker() {
  const { lang, setLang } = useLang();

  return (
    <div className="flex gap-1 rounded-2xl p-0.5" style={{ background: 'var(--pt-border)' }}>
      {LANGS.map(({ code, label }) => (
        <motion.button
          key={code}
          onClick={() => setLang(code)}
          whileTap={{ scale: 0.9 }}
          className="relative px-2 py-1 rounded-xl text-xs font-black transition-colors"
          style={{ color: lang === code ? 'var(--pt-accent)' : 'var(--pt-text-sec)' }}
        >
          {lang === code && (
            <motion.div
              layoutId="lang-pill"
              className="absolute inset-0 rounded-xl"
              style={{ background: 'var(--pt-card)', boxShadow: '0 1px 6px rgba(196,168,255,0.3)' }}
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{label}</span>
        </motion.button>
      ))}
    </div>
  );
}
