import { useApp } from '../context/AppContext';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { BADGE_DEFINITIONS } from '../constants';

export function BadgesPage() {
  const { streakData } = useApp();
  const unlocked = streakData.badges.length;
  const total = BADGE_DEFINITIONS.length;

  return (
    <div className="max-w-md mx-auto px-4 pt-5 pb-28">
      <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: '#3D2255' }}>
        Errungenschaften 🏅
      </h1>
      <p className="text-sm font-semibold mb-2" style={{ color: '#C4A8FF' }}>
        {unlocked === 0
          ? 'Deine Reise beginnt jetzt! ✨'
          : `${unlocked} von ${total} freigeschaltet 💕`}
      </p>
      {/* progress dots */}
      <div className="flex gap-1.5 mb-5">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className="flex-1 h-2 rounded-full"
            style={{ background: i < unlocked ? 'linear-gradient(90deg,#FFB7C5,#C4A8FF)' : '#EDE4FF' }}
          />
        ))}
      </div>
      <BadgeGrid streakData={streakData} />
    </div>
  );
}
