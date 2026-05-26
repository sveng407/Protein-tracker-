import type { Badge, BadgeId } from '../../types';
import { useT } from '../../context/LanguageContext';

interface Props {
  badge: Badge;
  unlocked: boolean;
  unlockedDate?: string;
}

export function BadgeCard({ badge, unlocked, unlockedDate }: Props) {
  const t = useT();
  const text = t.badges.definitions[badge.id as BadgeId];

  return (
    <div
      className="rounded-3xl p-4 flex flex-col items-center text-center transition-all"
      style={unlocked
        ? { background: 'var(--pt-card)', border: '2.5px solid #FFE4EC', boxShadow: '0 4px 20px rgba(255,183,197,0.22)' }
        : { background: 'var(--pt-input-bg)', border: '2.5px solid #EDE4FF', opacity: 0.55 }
      }
    >
      <div
        className="w-14 h-14 flex items-center justify-center rounded-3xl text-3xl mb-2"
        style={unlocked
          ? { background: 'linear-gradient(135deg,#FFE4EC,#EDE4FF)' }
          : { background: 'var(--pt-surface)', filter: 'grayscale(1)' }
        }
      >
        {badge.emoji}
      </div>
      <p className="text-xs font-black" style={{ color: unlocked ? 'var(--pt-text)' : 'var(--pt-text-muted)' }}>
        {text.title}
      </p>
      <p className="text-xs mt-0.5" style={{ color: 'var(--pt-text-sec)' }}>{text.description}</p>
      {unlocked && unlockedDate && (
        <p className="text-xs font-bold mt-1.5" style={{ color: '#FFB7C5' }}>
          {new Date(unlockedDate + 'T12:00:00').toLocaleDateString(t.locale, { day: 'numeric', month: 'short' })}
        </p>
      )}
      {!unlocked && (
        <p className="text-xs mt-1.5" style={{ color: 'var(--pt-text-muted)' }}>{t.badges.locked}</p>
      )}
    </div>
  );
}
