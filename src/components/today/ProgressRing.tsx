import { motion } from 'framer-motion';

interface ProgressRingProps {
  percent: number; // 0-1+
  total: number;
  goal: number;
}

function ringColor(p: number): string {
  if (p >= 1.0) return '#16a34a';
  if (p >= 0.67) return '#4ade80';
  if (p >= 0.33) return '#facc15';
  return '#f87171';
}

export function ProgressRing({ percent, total, goal }: ProgressRingProps) {
  const size = 200;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(percent, 1);
  const offset = circumference - clamped * circumference;
  const color = ringColor(percent);

  return (
    <div className="flex items-center justify-center">
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="rotate-[-90deg]">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="#e5e7eb"
            strokeWidth={stroke}
          />
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            animate={{ strokeDashoffset: offset }}
            transition={{ type: 'spring', stiffness: 60, damping: 20 }}
            initial={{ strokeDashoffset: circumference }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-4xl font-bold text-gray-900">
            {Math.round(percent * 100)}%
          </span>
          <span className="text-sm text-gray-500 mt-1">
            {total}g / {goal}g
          </span>
        </div>
      </div>
    </div>
  );
}
