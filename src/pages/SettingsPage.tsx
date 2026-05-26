import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useApp } from '../context/AppContext';
import { useT } from '../context/LanguageContext';
import { LanguagePicker } from '../components/LanguagePicker';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div
      className="rounded-4xl p-5 mb-4"
      style={{ background: 'white', border: '2.5px solid #EDE4FF', boxShadow: '0 4px 20px rgba(196,168,255,0.12)' }}
    >
      <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#C4A8FF' }}>
        {title}
      </p>
      {children}
    </div>
  );
}

export function SettingsPage() {
  const t = useT();
  const { user, signOut } = useAuth();
  const { goal, setGoal } = useApp();
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

  return (
    <div
      className="min-h-screen"
      style={{ background: 'linear-gradient(160deg, #FFF0F7 0%, #F5EEFF 50%, #F0FFF8 100%)' }}
    >
      <div className="max-w-md mx-auto px-4 pt-5 pb-32">
        <h1 className="text-2xl font-black tracking-tight mb-6" style={{ color: '#3D2255' }}>
          {t.settings.title} ⚙️
        </h1>

        <Section title={t.settings.language}>
          <LanguagePicker />
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
                background: '#FDFAFF',
                border: '2px solid #EDE4FF',
                color: '#3D2255',
                outline: 'none',
              }}
            />
            <span className="text-lg font-black" style={{ color: '#C4A8FF' }}>g</span>
          </div>
          <p className="text-xs font-medium mt-2" style={{ color: saved ? '#6DC9A8' : '#D4C4E8' }}>
            {saved ? t.settings.savedLabel : t.settings.goalHint}
          </p>
        </Section>

        <Section title={t.settings.account}>
          <div className="flex items-center gap-3 mb-4">
            {user?.photoURL && (
              <img
                src={user.photoURL}
                alt=""
                className="w-10 h-10 rounded-full"
                style={{ border: '2px solid #EDE4FF' }}
              />
            )}
            <div>
              <p className="text-sm font-black" style={{ color: '#3D2255' }}>{user?.displayName}</p>
              <p className="text-xs font-medium" style={{ color: '#C4A8FF' }}>{user?.email}</p>
            </div>
          </div>
          <motion.button
            onClick={signOut}
            whileTap={{ scale: 0.95 }}
            className="w-full py-3 rounded-3xl text-sm font-black"
            style={{
              background: '#FFF5FA',
              border: '2.5px solid #FFE4EC',
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
