import { useId } from 'react';
import { motion } from 'framer-motion';
import type { FlowerColor } from '../../lib/flowerUtils';
import { FLOWER_PALETTE } from '../../lib/flowerUtils';

interface Props {
  percent: number; // 0–1
  color?: FlowerColor;
}

function c01(t: number) { return Math.max(0, Math.min(1, t)); }
function lerp(a: number, b: number, t: number) { return a + (b - a) * c01(t); }
function easeOut(t: number) { const c = c01(t); return 1 - (1 - c) ** 3; }

const SPRING = { type: 'spring', stiffness: 110, damping: 14 } as const;
const STEM_SPRING = { type: 'spring', stiffness: 38, damping: 18 } as const;

export function FlowerGrowth({ percent, color = FLOWER_PALETTE[0] }: Props) {
  const uid = useId().replace(/:/g, '');
  const p = c01(percent);

  const stemT  = easeOut(p / 0.55);
  const leafT  = easeOut((p - 0.25) / 0.35);
  const budT   = easeOut((p - 0.52) / 0.25);
  const petalT = easeOut((p - 0.72) / 0.28);
  const budScale = c01(budT - petalT * 1.6);

  const PETALS = [0, 60, 120, 180, 240, 300];

  return (
    <svg
      viewBox="0 0 200 230"
      className="w-full"
      style={{ maxWidth: 280 }}
      aria-label={`Blume ${Math.round(p * 100)}% gewachsen`}
    >
      {/* ── bloom ambient glow ── */}
      {p >= 0.98 && (
        <motion.circle cx={100} cy={85} fill={color.petal}
          animate={{ r: [0, 60, 0], opacity: [0, 0.18, 0] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
        />
      )}

      {/* ── soil ── */}
      <ellipse cx={100} cy={214} rx={74} ry={16} fill="#C9A87C" />
      <ellipse cx={100} cy={210} rx={58} ry={11} fill="#DEC09A" />
      <circle cx={74}  cy={209} r={3}   fill="#B8905A" opacity={0.55} />
      <circle cx={126} cy={212} r={2.5} fill="#B8905A" opacity={0.50} />
      <circle cx={108} cy={214} r={2}   fill="#B8905A" opacity={0.40} />

      {/* ── seed ── */}
      <motion.g animate={{ opacity: lerp(1, 0, stemT * 3.5) }}>
        <ellipse cx={100} cy={206} rx={7} ry={5.5} fill="#7C5A2A" />
        <ellipse cx={101} cy={204} rx={3} ry={2}   fill="#9E7540" opacity={0.7} />
      </motion.g>
      {p < 0.06 && (
        <motion.ellipse cx={100} cy={206} rx={9} ry={7.5}
          fill="none" stroke="#C49A50" strokeWidth={1.5}
          animate={{ scale: [1, 1.35, 1], opacity: [0.7, 0, 0.7] }}
          transition={{ repeat: Infinity, duration: 2.2 }}
          style={{ transformOrigin: '100px 206px' }}
        />
      )}

      {/* ── stem (clip-path grow from soil upward) ── */}
      <defs>
        <clipPath id={`sc-${uid}`}>
          <motion.rect x={93} width={14}
            animate={{ y: lerp(214, 82, stemT), height: lerp(0, 132, stemT) }}
            transition={STEM_SPRING}
          />
        </clipPath>
      </defs>
      <path d={`M 100 210 C 97 190 103 145 100 86`}
        stroke={color.leaf} strokeWidth={5.5} strokeLinecap="round" fill="none"
        clipPath={`url(#sc-${uid})`}
      />

      {/* ── left leaf ── */}
      <motion.g style={{ transformOrigin: '100px 160px' }}
        animate={{ scale: leafT }} initial={{ scale: 0 }}
        transition={SPRING}
      >
        <ellipse cx={79} cy={152} rx={21} ry={9.5}
          fill={color.leaf} transform="rotate(-40, 79, 152)" opacity={0.9} />
        <line x1={100} y1={160} x2={79} y2={152}
          stroke={color.leaf} strokeWidth={1.5} opacity={0.35} />
      </motion.g>

      {/* ── right leaf ── */}
      <motion.g style={{ transformOrigin: '100px 133px' }}
        animate={{ scale: leafT }} initial={{ scale: 0 }}
        transition={{ ...SPRING, delay: 0.12 }}
      >
        <ellipse cx={121} cy={125} rx={21} ry={9.5}
          fill={color.leaf} transform="rotate(40, 121, 125)" opacity={0.85} />
        <line x1={100} y1={133} x2={121} y2={125}
          stroke={color.leaf} strokeWidth={1.5} opacity={0.35} />
      </motion.g>

      {/* ── bud ── */}
      <motion.g style={{ transformOrigin: '100px 86px' }}
        animate={{ scale: budScale }} initial={{ scale: 0 }}
        transition={SPRING}
      >
        {[0, 72, 144, 216, 288].map(a => (
          <ellipse key={a} cx={100} cy={97} rx={3.5} ry={9}
            fill={color.leaf} opacity={0.85} transform={`rotate(${a}, 100, 86)`} />
        ))}
        <ellipse cx={100} cy={75} rx={12} ry={17} fill={color.petal} opacity={0.95} />
        <ellipse cx={100} cy={72} rx={6}  ry={9}  fill={color.petal} />
      </motion.g>

      {/* ── petals (6, staggered spring) ── */}
      {PETALS.map((angle, i) => (
        <motion.g key={angle} style={{ transformOrigin: '100px 86px' }}
          animate={{ scale: petalT }} initial={{ scale: 0 }}
          transition={{ ...SPRING, delay: i * 0.045 }}
        >
          <ellipse cx={100} cy={56} rx={12.5} ry={24}
            fill={color.petal} opacity={0.93}
            transform={`rotate(${angle}, 100, 86)`} />
          {/* highlight */}
          <ellipse cx={100} cy={60} rx={5} ry={11}
            fill="white" opacity={0.22}
            transform={`rotate(${angle}, 100, 86)`} />
        </motion.g>
      ))}

      {/* ── flower center ── */}
      {petalT > 0.2 && (
        <>
          <motion.circle cx={100} cy={86}
            animate={{ r: lerp(0, 15, petalT) }}
            fill={color.center}
            transition={{ type: 'spring' }}
          />
          {petalT > 0.8 && (
            <>
              <circle cx={96} cy={83} r={2}   fill="white" opacity={0.45} />
              <circle cx={104} cy={89} r={1.5} fill="white" opacity={0.3} />
              <circle cx={100} cy={81} r={1.5} fill="white" opacity={0.35} />
            </>
          )}
        </>
      )}

      {/* ── sparkles at 100% ── */}
      {p >= 0.99 && [0, 72, 144, 216, 288].map((a, i) => {
        const rad = (a - 90) * Math.PI / 180;
        return (
          <motion.circle key={i}
            cx={100 + Math.cos(rad) * 56}
            cy={86  + Math.sin(rad) * 56}
            r={4.5} fill={color.center}
            animate={{ scale: [0, 1.6, 0], opacity: [0, 1, 0] }}
            transition={{ repeat: Infinity, duration: 2.2, delay: i * 0.44, ease: 'easeInOut' }}
          />
        );
      })}
    </svg>
  );
}
