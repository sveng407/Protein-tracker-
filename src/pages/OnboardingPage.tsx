import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { FlowerGrowth } from '../components/today/FlowerGrowth';
import { FLOWER_PALETTE } from '../lib/flowerUtils';

export function OnboardingPage() {
  const { setGoal } = useApp();
  const navigate = useNavigate();
  const [value, setValue] = useState(150);

  function handleStart() {
    setGoal(value);
    navigate('/today');
  }

  // teaser: show flower at 40% to hint at what's coming
  const teaser = 0.42;

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-cream-50 to-white flex flex-col items-center justify-center px-6 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 80, damping: 18 }}
        className="w-full max-w-sm text-center"
      >
        {/* Teaser flower */}
        <div className="flex justify-center -mb-2">
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ width: 160 }}
          >
            <FlowerGrowth percent={teaser} color={FLOWER_PALETTE[0]} />
          </motion.div>
        </div>

        <h1 className="text-4xl font-black text-stone-900 tracking-tight mb-1">
          Lass uns wachsen 🌱
        </h1>
        <p className="text-stone-500 text-sm mb-8 leading-relaxed">
          Jeden Tag erblüht eine neue Blume — wenn du dein Proteinziel erreichst.
          Pflanz deinen Garten!
        </p>

        {/* Goal card */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-stone-100">
          <p className="text-sm font-semibold text-stone-400 uppercase tracking-wide mb-4">
            Dein tägliches Ziel
          </p>

          <motion.div key={value}
            initial={{ scale: 0.9 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 15 }}
            className="mb-6"
          >
            <span className="text-7xl font-black text-green-500">{value}</span>
            <span className="text-3xl font-bold text-stone-300 ml-1">g</span>
            <p className="text-xs text-stone-400 mt-1">Protein pro Tag</p>
          </motion.div>

          <input
            type="range" min={30} max={300} step={5} value={value}
            onChange={e => setValue(parseInt(e.target.value))}
            className="w-full mb-3"
          />
          <div className="flex justify-between text-xs text-stone-400 mb-5">
            <span>30g</span><span>300g</span>
          </div>

          <div className="flex gap-2">
            {[100, 150, 200].map(v => (
              <button key={v} onClick={() => setValue(v)}
                className={`flex-1 py-2.5 rounded-2xl text-sm font-bold transition-all ${
                  value === v
                    ? 'bg-green-500 text-white shadow-md shadow-green-200'
                    : 'bg-stone-100 text-stone-500'
                }`}
              >
                {v}g
              </button>
            ))}
          </div>
        </div>

        <motion.button
          onClick={handleStart}
          whileTap={{ scale: 0.95 }}
          className="mt-5 w-full py-4 bg-green-500 text-white font-black rounded-2xl text-lg"
          style={{ boxShadow: '0 6px 24px rgba(34,197,94,0.4)' }}
        >
          Garten anlegen 🌸
        </motion.button>

        <p className="text-xs text-stone-400 mt-3">Ziel jederzeit änderbar</p>
      </motion.div>
    </div>
  );
}
