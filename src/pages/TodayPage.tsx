import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FlowerGrowth } from '../components/today/FlowerGrowth';
import { MotivationalMessage } from '../components/today/MotivationalMessage';
import { FoodEntryList } from '../components/today/FoodEntryList';
import { AddFoodSheet } from '../components/today/AddFoodSheet';
import { StreakCounter } from '../components/gamification/StreakCounter';
import { CelebrationOverlay } from '../components/gamification/CelebrationOverlay';
import { NewBadgeToast } from '../components/gamification/NewBadgeToast';
import { FLOWER_PALETTE } from '../lib/flowerUtils';

function PercentProgress({ percent }: { percent: number }) {
  const pct = Math.min(percent, 1);
  const pctRounded = Math.round(pct * 100);

  const color =
    pct >= 1    ? '#A8EED4' :
    pct >= 0.67 ? '#C4A8FF' :
    pct >= 0.33 ? '#FFE4A0' : '#FFB7C5';

  return (
    <div className="flex flex-col items-center gap-2 mt-1">
      <motion.div
        key={pctRounded}
        initial={{ scale: 0.8, opacity: 0.6 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 280, damping: 16 }}
        className="flex items-end leading-none"
      >
        <span className="text-7xl font-black tracking-tight" style={{ color: pct >= 1 ? '#6DC9A8' : '#3D2255' }}>
          {pctRounded}
        </span>
        <span className="text-3xl font-bold mb-1 ml-1" style={{ color: '#C4A8FF' }}>%</span>
      </motion.div>

      {/* bubbly bar */}
      <div className="w-40 h-3 rounded-full overflow-hidden" style={{ background: '#F0E8FF' }}>
        <motion.div
          className="h-full rounded-full"
          style={{ background: `linear-gradient(to right, #FFB7C5, ${color})` }}
          animate={{ width: `${Math.round(pct * 100)}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 18 }}
          initial={{ width: '0%' }}
        />
      </div>
    </div>
  );
}

export function TodayPage() {
  const {
    todayEntries, todayTotal, todayPercent,
    addEntry, removeEntry,
    streakData, newlyUnlockedBadges, clearNewBadges,
    showCelebration, dismissCelebration,
  } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);
  const flowerColor = FLOWER_PALETTE[0];

  return (
    <>
      <CelebrationOverlay show={showCelebration} onDismiss={dismissCelebration} flowerColor={flowerColor} />
      <NewBadgeToast badgeIds={newlyUnlockedBadges} onDismiss={clearNewBadges} />

      <div className="max-w-md mx-auto px-4 pt-5 pb-28">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight" style={{ color: '#3D2255' }}>
              Hallo! 🌸
            </h1>
            <p className="text-xs font-medium" style={{ color: '#C4A8FF' }}>
              {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <StreakCounter streak={streakData.currentStreak} />
        </div>

        {/* Flower card */}
        <div
          className="rounded-4xl p-4 mb-3 flex flex-col items-center"
          style={{
            background: 'white',
            border: '2.5px solid #FFE4EC',
            boxShadow: '0 6px 32px rgba(255,183,197,0.22)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={Math.floor(todayPercent * 6)}
              initial={{ scale: 0.94 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <FlowerGrowth percent={todayPercent} color={flowerColor} />
            </motion.div>
          </AnimatePresence>

          <PercentProgress percent={todayPercent} />
          <MotivationalMessage percent={todayPercent} entryCount={todayEntries.length} />
        </div>

        {/* Meal list */}
        <div
          className="rounded-4xl p-4"
          style={{
            background: 'white',
            border: '2.5px solid #EDE4FF',
            boxShadow: '0 4px 20px rgba(196,168,255,0.18)',
          }}
        >
          <div className="flex items-center gap-2 mb-3">
            <span className="text-base">🍽️</span>
            <span className="text-sm font-black tracking-wide" style={{ color: '#3D2255' }}>
              Heutige Mahlzeiten
            </span>
            {todayEntries.length > 0 && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#EDE4FF', color: '#9B7BE0' }}
              >
                {todayTotal}g
              </span>
            )}
          </div>
          <FoodEntryList entries={todayEntries} onRemove={removeEntry} />
        </div>
      </div>

      {/* FAB */}
      <motion.button
        onClick={() => setSheetOpen(true)}
        whileTap={{ scale: 0.88 }}
        whileHover={{ scale: 1.06 }}
        className="fixed bottom-24 right-4 w-14 h-14 rounded-full text-white text-2xl font-black flex items-center justify-center z-30"
        style={{
          background: 'linear-gradient(135deg, #FFB7C5 0%, #C4A8FF 100%)',
          boxShadow: '0 6px 24px rgba(196,168,255,0.5)',
        }}
        aria-label="Mahlzeit hinzufügen"
      >
        ＋
      </motion.button>

      <AddFoodSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={(name, protein) => addEntry({ name, protein })}
      />
    </>
  );
}
