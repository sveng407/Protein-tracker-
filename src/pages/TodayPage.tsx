import { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PageShell } from '../components/layout/PageShell';
import { ProgressRing } from '../components/today/ProgressRing';
import { ProgressBar } from '../components/today/ProgressBar';
import { MotivationalMessage } from '../components/today/MotivationalMessage';
import { FoodEntryList } from '../components/today/FoodEntryList';
import { AddFoodSheet } from '../components/today/AddFoodSheet';
import { StreakCounter } from '../components/gamification/StreakCounter';
import { CelebrationOverlay } from '../components/gamification/CelebrationOverlay';
import { NewBadgeToast } from '../components/gamification/NewBadgeToast';

export function TodayPage() {
  const {
    goal, todayEntries, todayTotal, todayPercent,
    addEntry, removeEntry,
    streakData, newlyUnlockedBadges, clearNewBadges,
    showCelebration, dismissCelebration,
  } = useApp();
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <CelebrationOverlay show={showCelebration} onDismiss={dismissCelebration} />
      <NewBadgeToast badgeIds={newlyUnlockedBadges} onDismiss={clearNewBadges} />

      <PageShell>
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold text-gray-900">Heute</h1>
          <StreakCounter streak={streakData.currentStreak} />
        </div>

        <div className="mb-4">
          <ProgressRing percent={todayPercent} total={todayTotal} goal={goal} />
        </div>

        <div className="mb-1">
          <ProgressBar percent={todayPercent} />
        </div>
        <MotivationalMessage percent={todayPercent} entryCount={todayEntries.length} />

        <div className="mt-6">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">
            Mahlzeiten
          </h2>
          <FoodEntryList entries={todayEntries} onRemove={removeEntry} />
        </div>
      </PageShell>

      <button
        onClick={() => setSheetOpen(true)}
        className="fixed bottom-24 right-4 w-14 h-14 bg-green-500 text-white rounded-full shadow-lg text-2xl flex items-center justify-center active:scale-95 transition-transform z-30"
        aria-label="Mahlzeit hinzufügen"
      >
        +
      </button>

      <AddFoodSheet
        open={sheetOpen}
        onClose={() => setSheetOpen(false)}
        onAdd={(name, protein) => addEntry({ name, protein })}
      />
    </>
  );
}
