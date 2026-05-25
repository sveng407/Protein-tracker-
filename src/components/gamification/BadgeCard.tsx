import type { Badge } from '../../types';

interface Props {
  badge: Badge;
  unlocked: boolean;
  unlockedDate?: string;
}

export function BadgeCard({ badge, unlocked, unlockedDate }: Props) {
  return (
    <div
      className={`rounded-2xl p-4 flex flex-col items-center text-center transition-all ${
        unlocked
          ? 'bg-white border-2 border-yellow-300 shadow-md'
          : 'bg-gray-100 border-2 border-transparent opacity-50'
      }`}
    >
      <span className={`text-4xl mb-2 ${unlocked ? '' : 'grayscale'}`}>{badge.emoji}</span>
      <p className={`font-bold text-sm ${unlocked ? 'text-gray-900' : 'text-gray-500'}`}>
        {badge.title}
      </p>
      <p className="text-xs text-gray-400 mt-1">{badge.description}</p>
      {unlocked && unlockedDate && (
        <p className="text-xs text-yellow-600 mt-2 font-medium">
          {new Date(unlockedDate + 'T12:00:00').toLocaleDateString('de-DE', { day: 'numeric', month: 'short' })}
        </p>
      )}
      {!unlocked && (
        <p className="text-xs text-gray-400 mt-2">🔒 Gesperrt</p>
      )}
    </div>
  );
}
