import { useApp } from '../context/AppContext';
import { useT } from '../context/LanguageContext';
import { GardenGrid } from '../components/history/GardenGrid';
import { ProUpgradeSheet } from '../components/subscription/ProUpgradeSheet';
import { GOAL_MET_THRESHOLD } from '../constants';
import { today } from '../lib/dateUtils';
import { useState } from 'react';
import { motion } from 'framer-motion';

const FREE_HISTORY_DAYS = 7;

export function HistoryPage() {
  const t = useT();
  const { allLogs, goal, streakData, isPro, activatePro } = useApp();
  const [upgradeOpen, setUpgradeOpen] = useState(false);

  const completedDays = allLogs.filter(d => {
    if (d.date === today()) return false;
    const total = d.entries.reduce((s, e) => s + e.protein, 0);
    return total >= goal * GOAL_MET_THRESHOLD;
  }).length;

  // Free users see only the last 7 days
  const cutoff = !isPro
    ? new Date(Date.now() - FREE_HISTORY_DAYS * 86400000).toISOString().slice(0, 10)
    : null;
  const visibleLogs = cutoff ? allLogs.filter(d => d.date >= cutoff!) : allLogs;
  const lockedCount = cutoff ? allLogs.filter(d => d.date < cutoff! && d.date !== today()).length : 0;

  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-28">
      <ProUpgradeSheet open={upgradeOpen} onClose={() => setUpgradeOpen(false)} onActivate={activatePro} />

      <div className="mb-5">
        <h1 className="text-2xl font-black tracking-tight" style={{ color: 'var(--pt-text)' }}>
          {t.history.title}
        </h1>
        <p className="text-sm font-semibold mt-0.5" style={{ color: 'var(--pt-text-sec)' }}>
          {completedDays === 0 ? t.history.noFlowers : t.history.flowers(completedDays)}
        </p>
        {streakData.longestStreak > 0 && (
          <div
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
            style={{ background: 'linear-gradient(135deg,#FFE4A0,#FFD4A8)', border: '2px solid #FFB899' }}
          >
            <span>🏆</span>
            <span className="text-xs font-black" style={{ color: '#B87840' }}>
              {t.history.record(streakData.longestStreak)}
            </span>
          </div>
        )}
      </div>

      <GardenGrid logs={visibleLogs} goal={goal} />

      {/* Locked history upsell for free users */}
      {lockedCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
          className="mt-4 rounded-3xl p-5 flex flex-col items-center text-center cursor-pointer"
          style={{ background: 'linear-gradient(135deg,#FFF4DC,#FFE4EC)', border: '2.5px solid #FFD4A8' }}
          onClick={() => setUpgradeOpen(true)}
        >
          <span style={{ fontSize: '2rem' }}>🔒</span>
          <p className="font-black mt-2" style={{ color: '#B87840' }}>
            {t.history.lockedTitle(lockedCount)}
          </p>
          <p className="text-xs mt-1 mb-3" style={{ color: '#C4A090' }}>
            {t.history.lockedHint}
          </p>
          <span
            className="px-5 py-2 rounded-full text-sm font-black text-white"
            style={{ background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)' }}
          >
            {t.pro.unlockBtn}
          </span>
        </motion.div>
      )}
    </div>
  );
}
