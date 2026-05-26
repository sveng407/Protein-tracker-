import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';

import { useT } from '../context/LanguageContext';
import { FlowerGrowth } from '../components/today/FlowerGrowth';
import { MotivationalMessage } from '../components/today/MotivationalMessage';
import { FoodEntryList } from '../components/today/FoodEntryList';
import { AddFoodSheet } from '../components/today/AddFoodSheet';
import { StreakCounter } from '../components/gamification/StreakCounter';
import { CelebrationOverlay } from '../components/gamification/CelebrationOverlay';
import { NewBadgeToast } from '../components/gamification/NewBadgeToast';
import { FLOWER_PALETTE } from '../lib/flowerUtils';
import { today, addDays } from '../lib/dateUtils';
import type { MealType, FoodEntry } from '../types';

const MEAL_ORDER: MealType[] = ['breakfast', 'lunch', 'dinner', 'snack'];

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

function DateNav({ date, onChange }: { date: string; onChange: (d: string) => void }) {
  const t = useT();
  const todayStr = today();

  function label() {
    if (date === todayStr) return t.today.dateToday;
    if (date === addDays(todayStr, -1)) return t.today.dateYesterday;
    if (date === addDays(todayStr, 1)) return t.today.dateTomorrow;
    return new Date(date + 'T12:00:00').toLocaleDateString(t.locale, { weekday: 'short', day: 'numeric', month: 'short' });
  }

  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(addDays(date, -1))}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
        style={{ background: '#F5F0FF', color: '#9B7BE0' }}
      >
        ‹
      </motion.button>
      <motion.span
        key={date}
        initial={{ opacity: 0, y: -6 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-sm font-black px-3 py-1 rounded-2xl"
        style={{ background: date === todayStr ? 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' : '#F5F0FF', color: '#3D2255', minWidth: 90, textAlign: 'center' }}
      >
        {label()}
      </motion.span>
      <motion.button
        whileTap={{ scale: 0.85 }}
        onClick={() => onChange(addDays(date, 1))}
        className="w-8 h-8 rounded-full flex items-center justify-center text-sm font-black"
        style={{ background: '#F5F0FF', color: '#9B7BE0' }}
      >
        ›
      </motion.button>
    </div>
  );
}

function MealGroup({
  mealType,
  entries,
  onRemove,
  onEdit,
}: {
  mealType: MealType;
  entries: FoodEntry[];
  onRemove: (id: string) => void;
  onEdit: (entry: FoodEntry) => void;
}) {
  const t = useT();
  if (entries.length === 0) return null;
  const groupTotal = entries.reduce((s, e) => s + e.protein, 0);
  return (
    <div className="mb-3">
      <div className="flex items-center gap-2 mb-1 px-1">
        <span className="text-xs font-black" style={{ color: '#9B7BE0' }}>
          {t.mealTypes[mealType]}
        </span>
        <span className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full" style={{ background: '#EDE4FF', color: '#9B7BE0' }}>
          {groupTotal}{t.today.totalGrams}
        </span>
      </div>
      <FoodEntryList entries={entries} onRemove={onRemove} onEdit={onEdit} />
    </div>
  );
}

export function TodayPage() {
  const t = useT();
  const {
    goal,
    addEntry, removeEntry, updateEntry,
    allLogs, recentFoods,
    streakData, newlyUnlockedBadges, clearNewBadges,
    showCelebration, dismissCelebration,
    firstName,
  } = useApp();
  const [selectedDate, setSelectedDate] = useState(() => today());
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<FoodEntry | null>(null);
  const flowerColor = FLOWER_PALETTE[0];

  const selectedEntries = useMemo(
    () => allLogs.find(d => d.date === selectedDate)?.entries ?? [],
    [allLogs, selectedDate]
  );
  const selectedTotal = selectedEntries.reduce((s, e) => s + e.protein, 0);
  const selectedPercent = goal > 0 ? selectedTotal / goal : 0;
  const isToday = selectedDate === today();

  const grouped = useMemo(() => {
    const map = {} as Record<MealType, FoodEntry[]>;
    for (const m of MEAL_ORDER) map[m] = [];
    for (const e of selectedEntries) map[e.mealType].push(e);
    return map;
  }, [selectedEntries]);

  const hasAnyEntry = selectedEntries.length > 0;

  return (
    <>
      <CelebrationOverlay show={showCelebration} onDismiss={dismissCelebration} flowerColor={flowerColor} />
      <NewBadgeToast badgeIds={newlyUnlockedBadges} onDismiss={clearNewBadges} />

      <div className="max-w-md mx-auto px-4 pt-5 pb-28">

        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl font-black tracking-tight" style={{ color: '#3D2255' }}>
              {firstName ? `${t.today.greetingPrefix}, ${firstName}! 🌸` : t.today.greeting}
            </h1>
            <p className="text-xs font-medium" style={{ color: '#C4A8FF' }}>
              {new Date().toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' })}
            </p>
          </div>
          <StreakCounter streak={streakData.currentStreak} />
        </div>

        {/* Flower card — shows selected date's progress */}
        <div
          className="rounded-4xl p-4 mb-3 flex flex-col items-center"
          style={{
            background: 'white',
            border: '2.5px solid #FFE4EC',
            boxShadow: '0 6px 32px rgba(255,183,197,0.22)',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div key={selectedDate + Math.floor(selectedPercent * 6)}
              initial={{ scale: 0.94 }} animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 240, damping: 18 }}
            >
              <FlowerGrowth percent={selectedPercent} color={flowerColor} />
            </motion.div>
          </AnimatePresence>
          <PercentProgress percent={selectedPercent} />
          {isToday && <MotivationalMessage percent={selectedPercent} entryCount={selectedEntries.length} />}
        </div>

        {/* Meal list with date nav */}
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
              {t.today.mealsTitle}
            </span>
            {hasAnyEntry && (
              <span
                className="ml-auto text-xs font-bold px-2 py-0.5 rounded-full"
                style={{ background: '#EDE4FF', color: '#9B7BE0' }}
              >
                {selectedTotal}{t.today.totalGrams}
              </span>
            )}
          </div>

          <DateNav date={selectedDate} onChange={setSelectedDate} />

          {!hasAnyEntry ? (
            <div className="text-center py-6">
              <p className="text-4xl mb-2">🌱</p>
              <p className="text-sm font-bold" style={{ color: '#C4A8FF' }}>{t.today.noEntries}</p>
              <p className="text-xs mt-1" style={{ color: '#D4C4E8' }}>{t.today.noEntriesHint}</p>
            </div>
          ) : (
            MEAL_ORDER.map(m => (
              <MealGroup
                key={m}
                mealType={m}
                entries={grouped[m]}
                onRemove={removeEntry}
                onEdit={entry => { setEditingEntry(entry); setSheetOpen(true); }}
              />
            ))
          )}
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
        aria-label={t.today.addMeal}
      >
        ＋
      </motion.button>

      <AddFoodSheet
        open={sheetOpen}
        onClose={() => { setSheetOpen(false); setEditingEntry(null); }}
        onAdd={entry => {
          if (editingEntry) {
            updateEntry(editingEntry.id, entry);
          } else {
            addEntry(entry, selectedDate);
          }
        }}
        recentFoods={recentFoods}
        editEntry={editingEntry ?? undefined}
      />
    </>
  );
}
