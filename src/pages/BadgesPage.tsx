import { useApp } from '../context/AppContext';
import { useT } from '../context/LanguageContext';
import { BadgeGrid } from '../components/gamification/BadgeGrid';
import { BADGE_DEFINITIONS } from '../constants';

export function BadgesPage() {
  const t = useT();
  const { streakData } = useApp();
  const unlocked = streakData.badges.length;
  const total = BADGE_DEFINITIONS.length;

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(160deg, var(--pt-bg) 0%, var(--pt-bg-mid) 50%, var(--pt-bg-end) 100%)' }}>
      <div className="max-w-md mx-auto px-4 pt-5 pb-28">
        <h1 className="text-2xl font-black tracking-tight mb-1" style={{ color: 'var(--pt-text)' }}>
          {t.badges.title}
        </h1>
        <p className="text-sm font-semibold mb-2" style={{ color: 'var(--pt-text-sec)' }}>
          {unlocked === 0
            ? t.badges.empty
            : t.badges.progress(unlocked, total)}
        </p>
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: total }).map((_, i) => (
            <div key={i} className="flex-1 h-2 rounded-full"
              style={{ background: i < unlocked ? 'linear-gradient(90deg,#FFB7C5,#C4A8FF)' : 'var(--pt-border)' }}
            />
          ))}
        </div>
        <BadgeGrid streakData={streakData} />
      </div>
    </div>
  );
}
