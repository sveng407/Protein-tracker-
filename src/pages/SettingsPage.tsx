import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useT, useLang } from '../context/LanguageContext';
import { useInstallPrompt } from '../hooks/useInstallPrompt';
import { ProUpgradeSheet } from '../components/subscription/ProUpgradeSheet';
import { useTheme } from '../context/ThemeContext';
import type { Theme } from '../context/ThemeContext';
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
  const { theme, setTheme } = useTheme();
  const { deleteAccount } = useAuth();
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
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
              style={{ background: 'linear-gradient(135deg,var(--pt-grad-from),var(--pt-grad-to))', color: 'white', boxShadow: '0 4px 18px rgba(196,168,255,0.4)' }}
            >
              <span>👑</span> {t.pro.unlockBtn}
            </motion.button>
          )}
        </Section>

        <Section title={t.settings.themeSection}>
          <div className="grid grid-cols-2 gap-2">
            {([
              { id: 'default', label: t.settings.themeDefault, icon: '🌸', swatch: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)' },
              { id: 'dark',    label: t.settings.themeDark,    icon: '🌙', swatch: 'linear-gradient(135deg,#2E1C50,#1C1030)' },
              { id: 'carley',  label: 'Carley',                icon: '🌻', swatch: 'linear-gradient(135deg,#FFE566,#FFAA00)' },
              { id: 'vera',    label: 'Vera',                  icon: '🌷', swatch: 'linear-gradient(135deg,#FF80B8,#E0308A)' },
            ] as { id: Theme; label: string; icon: string; swatch: string }[]).map(({ id, label, icon, swatch }) => {
              const active = theme === id;
              return (
                <motion.button
                  key={id}
                  onClick={() => setTheme(id)}
                  whileTap={{ scale: 0.95 }}
                  className="flex flex-col items-center gap-2 py-3 px-2 rounded-3xl"
                  style={{
                    background: active ? 'var(--pt-surface)' : 'transparent',
                    border: active ? '2px solid var(--pt-accent)' : '2px solid var(--pt-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-2xl" style={{ background: swatch }} />
                  <span className="text-xs font-black" style={{ color: active ? 'var(--pt-accent)' : 'var(--pt-text-muted)' }}>
                    {icon} {label}
                  </span>
                </motion.button>
              );
            })}
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
                  background: 'linear-gradient(135deg,var(--pt-grad-from),var(--pt-grad-to))',
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
            className="w-full py-3 rounded-3xl text-sm font-black mb-2"
            style={{
              background: 'var(--pt-border-pink)',
              border: '2.5px solid var(--pt-border-pink)',
              color: '#E87BAA',
            }}
          >
            {t.settings.signOut}
          </motion.button>

          {!confirmDelete ? (
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-full py-2 text-xs font-bold"
              style={{ color: 'var(--pt-text-muted)' }}
            >
              {t.settings.deleteAccount}
            </button>
          ) : (
            <div className="rounded-2xl p-4 mt-1" style={{ background: 'var(--pt-border-pink)', border: '2px solid var(--pt-border-pink)' }}>
              <p className="text-xs font-semibold mb-3" style={{ color: '#E87BAA' }}>{t.settings.deleteConfirm}</p>
              <div className="flex gap-2">
                <button onClick={() => setConfirmDelete(false)}
                  className="flex-1 py-2 rounded-2xl text-sm font-black"
                  style={{ background: 'var(--pt-border)', color: 'var(--pt-accent)' }}>
                  {t.settings.deleteCancel}
                </button>
                <motion.button
                  whileTap={{ scale: 0.96 }}
                  disabled={deleting}
                  onClick={async () => {
                    setDeleting(true);
                    try { await deleteAccount(); } catch { setDeleting(false); setConfirmDelete(false); }
                  }}
                  className="flex-1 py-2 rounded-2xl text-sm font-black disabled:opacity-60"
                  style={{ background: 'var(--pt-border-pink)', color: '#E87BAA' }}>
                  {deleting ? '…' : t.settings.deleteConfirmBtn}
                </motion.button>
              </div>
            </div>
          )}
        </Section>

        <Section title={t.settings.legalSection}>
          <div className="flex flex-col gap-1">
            {[
              { to: '/impressum', label: t.settings.legalImpressum },
              { to: '/datenschutz', label: t.settings.legalDatenschutz },
              { to: '/agb', label: t.settings.legalAgb },
            ].map(({ to, label }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center justify-between px-3 py-2.5 rounded-2xl text-sm font-semibold"
                style={{ color: 'var(--pt-text)', background: 'var(--pt-surface)' }}
              >
                {label}
                <span style={{ color: 'var(--pt-text-muted)' }}>›</span>
              </Link>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
