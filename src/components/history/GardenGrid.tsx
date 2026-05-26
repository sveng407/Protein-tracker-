import { motion } from 'framer-motion';
import type { DayLog } from '../../types';
import { today } from '../../lib/dateUtils';
import { getFlowerColorForDate } from '../../lib/flowerUtils';
import { GOAL_MET_THRESHOLD } from '../../constants';
import { useT } from '../../context/LanguageContext';

// A static, lightweight SVG flower for the grid (no framer-motion internally)
function MiniFlower({ percent, petal, center, leaf }: {
  percent: number; petal: string; center: string; leaf: string;
}) {
  const p = Math.min(percent, 1);
  const showLeaves  = p > 0.28;
  const showBud     = p > 0.52;
  const showPetals  = p > 0.72;
  const leafO = Math.min((p - 0.28) / 0.25, 1);
  const petalO = Math.min((p - 0.72) / 0.28, 1);
  const stemEnd = 100 - p * 60; // y2 of stem

  return (
    <svg viewBox="0 0 200 220" width="100%" height="100%">
      {/* soil */}
      <ellipse cx={100} cy={212} rx={72} ry={15} fill="#C9A87C" />
      <ellipse cx={100} cy={208} rx={56} ry={10} fill="#DEC09A" />
      {/* stem */}
      <line x1={100} y1={208} x2={100} y2={stemEnd}
        stroke={leaf} strokeWidth={6} strokeLinecap="round" />
      {/* leaves */}
      {showLeaves && (
        <>
          <ellipse cx={80} cy={155} rx={20} ry={9} fill={leaf}
            transform="rotate(-40, 80, 155)" opacity={0.9 * leafO} />
          <ellipse cx={120} cy={135} rx={20} ry={9} fill={leaf}
            transform="rotate(40, 120, 135)" opacity={0.85 * leafO} />
        </>
      )}
      {/* bud */}
      {showBud && !showPetals && (
        <ellipse cx={100} cy={stemEnd + 5} rx={12} ry={18} fill={petal} opacity={0.95} />
      )}
      {/* petals */}
      {showPetals && [0, 60, 120, 180, 240, 300].map(angle => (
        <g key={angle} transform={`rotate(${angle}, 100, ${stemEnd})`}>
          <ellipse cx={100} cy={stemEnd - 26} rx={12} ry={24}
            fill={petal} opacity={0.92 * petalO} />
        </g>
      ))}
      {/* center */}
      {showPetals && (
        <circle cx={100} cy={stemEnd} r={15 * petalO} fill={center} />
      )}
      {/* seed if very early */}
      {p < 0.1 && (
        <ellipse cx={100} cy={204} rx={7} ry={5.5} fill="#7C5A2A" />
      )}
    </svg>
  );
}

interface Props {
  logs: DayLog[];
  goal: number;
}

export function GardenGrid({ logs, goal }: Props) {
  const t = today();
  const tr = useT();
  const pastLogs = logs
    .filter(d => d.date !== t && d.entries.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date));

  if (pastLogs.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🌱</div>
        <p className="font-bold" style={{ color: 'var(--pt-text)' }}>{tr.history.gardenEmpty}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--pt-text-muted)' }}>{tr.history.gardenEmptyHint}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3">
      {pastLogs.map((log, i) => {
        const total = log.entries.reduce((s, e) => s + e.protein, 0);
        const percent = goal > 0 ? total / goal : 0;
        const goalMet = percent >= GOAL_MET_THRESHOLD;
        const color = getFlowerColorForDate(log.date);

        return (
          <motion.div key={log.date}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.04, type: 'spring', stiffness: 200 }}
            className="rounded-2xl p-2 pb-1 flex flex-col items-center"
            style={{ background: goalMet ? 'var(--pt-card)' : 'var(--pt-surface)', border: '1px solid var(--pt-border)' }}
          >
            <div className={`w-full aspect-square ${goalMet ? '' : 'opacity-50 grayscale'}`}>
              <MiniFlower
                percent={goalMet ? 1 : percent}
                petal={color.petal}
                center={color.center}
                leaf={color.leaf}
              />
            </div>
            <p className="text-xs font-semibold truncate w-full text-center mt-0.5" style={{ color: 'var(--pt-text-muted)' }}>
              {new Date(log.date + 'T12:00:00').toLocaleDateString(tr.locale, { day: 'numeric', month: 'short' })}
            </p>
            <p className="text-xs font-bold" style={{ color: goalMet ? '#6DC9A8' : 'var(--pt-text-muted)' }}>
              {Math.round(percent * 100)}%
            </p>
          </motion.div>
        );
      })}
    </div>
  );
}
