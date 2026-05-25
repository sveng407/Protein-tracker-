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

function ProteinProgress({ total, goal, percent }: { total: number; goal: number; percent: number }) {
  const pct = Math.min(percent, 1);
  const barColor =
    pct >= 1    ? 'bg-green-600' :
    pct >= 0.67 ? 'bg-green-400' :
    pct >= 0.33 ? 'bg-yellow-400' : 'bg-rose-400';

  return (
    <div className="text-center">
      <motion.div key={total} initial={{ scale: 0.85 }} animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      >
        <span className="text-6xl font-black text-stone-900 tracking-tight">{total}</span>
        <span className="text-2xl font-semibold text-stone-400 ml-1">g</span>
      </motion.div>
      <p className="text-sm text-stone-400 mt-0.5">von {goal}g Tagesziel</p>
      <div className="w-36 h-2 bg-stone-200 rounded-full mx-auto mt-3 overflow-hidden">
        <motion.div className={`h-full rounded-full ${barColor} ${pct >= 1 ? 'animate-bloom-pulse' : ''}`}
          animate={{ width: `${Math.round(pct * 100)}%` }}
          transition={{ type: 'spring', stiffness: 70, damping: 20 }}
          initial={{ width: '0%' }}
        />
      </div>
      <p className="text-xs text-stone-400 mt-1 font-medium">{Math.round(pct * 100)}%</p>
    </div>
  );
}

export function TodayPage() {
  const {
    goal, todayEntries, todayTotal, todayPercent,
    addEntry, removeEntry,
    streakData, newlyUnlockedBadges, clearNewBadges,
    showCelebration, dismissCelebration,
  } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);

  const flowerColor = FLOWER_PALETTE[0]; // today always gets rose pink

  return (
    <>
      <CelebrationOverlay show={showCelebration} onDismiss={dismissCelebration} flowerColor={flowerColor} />
      <NewBadgeToast badgeIds={newlyUnlockedBadges} onDismiss={clearNewBadges} />

      <div className="max-w-md mx-auto px-4 pt-5 pb-28">
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-2xl font-black text-stone-900 tracking-tight">Heute</h1>
            <p className="text-xs text-stone-400">
              {new Date().toLocaleDateString('de-DE', { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <StreakCounter streak={streakData.currentStreak} />
        </div>

        {/* Flower */}
        <div className="flex justify-center my-2">
          <AnimatePresence mode="wait">
            <motion.div key={Math.floor(todayPercent * 5)}
              initial={{ scale: 0.95, opacity: 0.8 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 18 }}
            >
              <FlowerGrowth percent={todayPercent} color={flowerColor} />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Progress text */}
        <ProteinProgress total={todayTotal} goal={goal} percent={todayPercent} />

        {/* Motivational message */}
        <MotivationalMessage percent={todayPercent} entryCount={todayEntries.length} />

        {/* Divider */}
        <div className="flex items-center gap-3 mt-7 mb-4">
          <div className="flex-1 h-px bg-stone-200" />
          <span className="text-xs font-semibold text-stone-400 uppercase tracking-widest">
            Mahlzeiten
          </span>
          <div className="flex-1 h-px bg-stone-200" />
        </div>

        <FoodEntryList entries={todayEntries} onRemove={removeEntry} />
      </div>

      {/* FAB */}
      <motion.button
        onClick={() => setSheetOpen(true)}
        whileTap={{ scale: 0.92 }}
        className="fixed bottom-24 right-4 w-14 h-14 bg-green-500 text-white rounded-full shadow-xl text-2xl flex items-center justify-center z-30"
        aria-label="Mahlzeit hinzufügen"
        style={{ boxShadow: '0 4px 20px rgba(34,197,94,0.45)' }}
      >
        +
      </motion.button>

      <AddFoodSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={(name, protein) => addEntry({ name, protein })}
      />
    </>
  );
}
