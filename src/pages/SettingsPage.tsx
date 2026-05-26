import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useT, useLang } from '../context/LanguageContext';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { ProUpgradeSheet } from '../components/subscription/ProUpgradeSheet';
import { useTheme } from '../context/ThemeContext';
import type { Lang } from '../i18n';

const LANGS: { code: Lang; flag: string; name: string }[] = [
  { code: 'de', flag: '🇩🇪', name: 'Deutsch' },
  { code: 'en', flag: '🇬🇧', name: 'English' },
  { code: 'hu', flag: '🇭🇺', name: 'Magyar' },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-4xl p-5 mb-4"
      style={{ background: 'var(--pt-card)', border: '2.5px solid var(--pt-border)', boxShadow: '0 4px 20px rgba(196,168,255,0.12)' }}
    >
      <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: 'var(--pt-text-sec)' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const t = useT();
  const { lang, setLang } = useLang();
  const { user, signOut } = useAuth();
  const { goal, setGoal } = useApp();
  const { installState, triggerInstall } = useInstallPrompt();
  const { isPro, sub, activatePro, cancelPro } = useApp();
  const { isDark, toggleDark } = useTheme();
  const [upgradeOpen, setUpgradeOpen] = useState(false);
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [goalInput, setGoalInput] = useState(String(goal));
  const [saved, setSaved] = useState(false);
  const saveTimer = { current: 0 as ReturnType<typeof setTimeout> };

  useEffect(() => { setGoalInput(String(goal)); }, [goal]);

  const handleGoalChange = useCallback((val: string) => {
    setGoalInput(val);
    const n = parseInt(val);
    if (!n || n < 10 || n > 500) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      setGoal(n);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 600);
  }, [setGoal]);

  const expiryLabel = sub.expiresAt
    ? new Date(sub.expiresAt).toLocaleDateString(t.locale, { day: 'numeric', month: 'long', year: 'numeric' })
    : '';

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, var(--pt-bg) 0%, var(--pt-bg-mid) 50%, var(--pt-bg-end) 100%)' }}
    >
      <ProUpgradeSheet open={upgradeOpen} onClose={() => setUpgradeOpen(false)} onActivate={activatePro} />

      <div className="max-w-md mx-auto px-4 pt-5 pb-32">
        <h1 className="text-2xl font-black tracking-tight mb-6" style={{ color: 'var(--pt-text)' }}>
          {t.settings.title} ⚙️
        </h1>

        {/* ── Subscription section ── */}
        <Section title={t.pro.settingsSection}>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl"
              style={{ background: isPro ? 'linear-gradient(135deg,#FFD700,#FFA500)' : 'var(--pt-surface)' }}>
              {isPro ? '👑' : '🌱'}
            </div>
            <div className="flex-1">
              <p className="text-sm font-black" style={{ color: 'var(--pt-text)' }}>
                Protein Tracker
                <span className="ml-2 text-xs font-black px-2 py-0.5 rounded-full"
                  style={isPro
                    ? { background: 'linear-gradient(135deg,#FFD700,#FFA500)', color: 'white' }
                    : { background: 'var(--pt-border)', color: 'var(--pt-accent)' }}>
                  {isPro ? t.pro.statusPro : t.pro.statusFree}
                </span>
              </p>
              <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--pt-text-sec)' }}>
                {isPro ? t.pro.activeUntil(expiryLabel) : t.pro.freeHint}
              </p>
            </div>
          </div>

          {isPro ? (
            <>
              {!confirmCancel ? (
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={() => setConfirmCancel(true)}
                  className="w-full py-3 rounded-3xl text-sm font-black"
                  style={{ background: 'var(--pt-border-pink)', border: '2.5px solid var(--pt-border-pink)', color: '#E87BAA' }}
                >
                  {t.pro.cancelBtn}
                </motion.button>
              ) : (
                <div className="rounded-2xl p-4" style={{ background: 'var(--pt-border-pink)', border: '2px solid var(--pt-border-pink)' }}>
                  <p className="text-xs font-semibold mb-3" style={{ color: '#E87BAA' }}>{t.pro.cancelConfirm}</p>
                  <div className="flex gap-2">
                    <button onClick={() => setConfirmCancel(false)}
                      className="flex-1 py-2 rounded-2xl text-sm font-black"
                      style={{ background: 'var(--pt-border)', color: 'var(--pt-accent)' }}>
                      Zurück
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.96 }}
                      onClick={async () => { await cancelPro(); setConfirmCancel(false); }}
                      className="flex-1 py-2 rounded-2xl text-sm font-black"
                      style={{ background: 'var(--pt-border-pink)', color: '#E87BAA' }}>
                      Kündigen
                    </motion.button>
                  </div>
                </div>
              )}
            </>
          ) : (
            <motion.button
              whileTap={{ scale: 0.96 }}
              onClick={() => setUpgradeOpen(true)}
              className="w-full py-3.5 rounded-3xl text-sm font-black flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', color: 'white', boxShadow: '0 4px 18px rgba(196,168,255,0.4)' }}
            >
              <span>👑</span> {t.pro.unlockBtn}
            </motion.button>
          )}
        </Section>

        <Section title={t.settings.darkMode}>
          <div className="flex items-center justify-between">
            <span className="text-sm font-black" style={{ color: 'var(--pt-text)' }}>
              {isDark ? '🌙' : '☀️'} {isDark ? t.settings.darkModeOn : t.settings.darkModeOff}
            </span>
            <motion.button
              onClick={toggleDark}
              whileTap={{ scale: 0.92 }}
              className="w-14 h-7 rounded-full relative transition-colors duration-200"
              style={{ background: isDark ? 'linear-gradient(135deg,#9B7BE0,#C4A8FF)' : 'var(--pt-border)' }}
              aria-label="Toggle dark mode"
            >
              <motion.div
                animate={{ x: isDark ? 28 : 2 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 rounded-full"
                style={{ background: 'var(--pt-card)', boxShadow: '0 1px 4px rgba(0,0,0,0.2)' }}
              />
            </motion.button>
          </div>
        </Section>

        <Section title={t.settings.language}>
          <div className="flex flex-col gap-2">
            {LANGS.map(({ code, flag, name }) => {
              const active = lang === code;
              return (
                <motion.button
                  key={code}
                  onClick={() => setLang(code)}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-2xl text-left"
                  style={{
                    background: active ? 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' : 'var(--pt-surface)',
                    border: active ? '2px solid var(--pt-text-sec)' : '2px solid transparent',
                  }}
                >
                  <span style={{ fontSize: '1.4rem' }}>{flag}</span>
                  <span className="text-sm font-black flex-1" style={{ color: active ? 'var(--pt-accent)' : 'var(--pt-text-muted)' }}>
                    {name}
                  </span>
                  {active && (
                    <span style={{ color: 'var(--pt-text-sec)', fontSize: '1rem' }}>✓</span>
                  )}
                </motion.button>
              );
            })}
          </div>
        </Section>

        <Section title={t.settings.goal}>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={10}
              max={500}
              value={goalInput}
              onChange={e => handleGoalChange(e.target.value)}
              className="flex-1 text-2xl font-black text-center py-3 rounded-3xl"
              style={{
                background: 'var(--pt-input-bg)',
                border: '2px solid var(--pt-input-border)',
                color: 'var(--pt-text)',
                outline: 'none',
              }}
            />
            <span className="text-lg font-black" style={{ color: 'var(--pt-text-sec)' }}>g</span>
          </div>
          <p className="text-xs font-medium mt-2" style={{ color: saved ? '#6DC9A8' : 'var(--pt-text-muted)' }}>
            {saved ? t.settings.savedLabel : t.settings.goalHint}
          </p>
        </Section>

        {/* Install section — hidden only on unsupported desktop browsers */}
        {installState !== 'unsupported' && (
          <Section title={t.settings.install}>

            {installState === 'installed' && (
              <p className="text-sm font-bold text-center py-2" style={{ color: '#6DC9A8' }}>
                {t.settings.installDone}
              </p>
            )}

            {installState === 'native' && (
              <motion.button
                onClick={triggerInstall}
                whileTap={{ scale: 0.96 }}
                className="w-full py-3.5 rounded-3xl text-sm font-black flex items-center justify-center gap-2"
                style={{
                  background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)',
                  color: 'white',
                  boxShadow: '0 4px 18px rgba(196,168,255,0.45)',
                }}
              >
                <span style={{ fontSize: '1.2rem' }}>📲</span>
                {t.settings.installButton}
              </motion.button>
            )}

            {(installState === 'ios' || installState === 'android') && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col gap-3"
              >
                {(installState === 'ios'
                  ? [
                      { step: '1', text: t.settings.installIosStep1 },
                      { step: '2', text: t.settings.installIosStep2 },
                      { step: '3', text: t.settings.installIosStep3 },
                    ]
                  : [
                      { step: '1', text: t.settings.installAndroidStep1 },
                      { step: '2', text: t.settings.installAndroidStep2 },
                    ]
                ).map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-black"
                      style={{ background: 'linear-gradient(135deg,#FFE4EC,#EDE4FF)', color: 'var(--pt-accent)' }}
                    >
                      {step}
                    </div>
                    <span className="text-sm font-semibold" style={{ color: 'var(--pt-text)' }}>{text}</span>
                  </div>
                ))}
              </motion.div>
            )}

          </Section>
        )}

        <Section title={t.settings.account}>
          <div className="flex items-center gap-3 mb-4">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="w-10 h-10 rounded-full"
                style={{ border: '2px solid var(--pt-border)' }}
              />
            )}
            <div>
              <p className="text-sm font-black" style={{ color: 'var(--pt-text)' }}>{user?.displayName}</p>
              <p className="text-xs font-medium" style={{ color: 'var(--pt-text-sec)' }}>{user?.email}</p>
            </div>
          </div>
          <motion.button
            onClick={signOut}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-3xl text-sm font-black"
            style={{
              background: 'var(--pt-border-pink)',
              border: '2.5px solid var(--pt-border-pink)',
              color: '#E87BAA',
            }}
          >
            {t.settings.signOut}
          </motion.button>
        </Section>
      </div>
    </div>
  );
}
