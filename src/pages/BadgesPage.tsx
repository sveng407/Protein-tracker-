import { useApp } from '../context/AppContext';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { BADGE_DEFINITIONS } from '../constants';

export function BadgesPage() {
  const { streakData } = useApp();
  const unlocked = streakData.badges.length;
  const total = BADGE_DEFINITIONS.length;

  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-28">
      <div className="mb-5">
        <h1 className="text-2xl font-black text-stone-900 tracking-tight">Errungenschaften</h1>
        <p className="text-sm text-stone-400 mt-0.5">
          {unlocked === 0
            ? 'Starte deine Reise, um Badges zu verdienen!'
            : `${unlocked} von ${total} Badges freigeschaltet`}
        </p>
        {unlocked > 0 && (
          <div className="flex mt-2">
            {Array.from({ length: total }).map((_, i) => (
              <div key={i}
                className={`h-1.5 flex-1 rounded-full mx-px ${i < unlocked ? 'bg-green-400' : 'bg-stone-200'}`}
              />
            ))}
          </div>
        )}
      </div>
      <BadgeGrid streakData={streakData} />
    </div>
  );
}
