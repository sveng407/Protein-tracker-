import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export function OnboardingPage() {
  const { setGoal } = useApp();
  const navigate = useNavigate();
  const [value, setValue] = useState(150);

  function handleStart() {
    setGoal(value);
    navigate('/today');
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm text-center"
      >
        <div className="text-7xl mb-4">💪</div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Protein Tracker</h1>
        <p className="text-gray-500 mb-10">Tracke deine tägliche Proteinzufuhr und erreiche deine Ziele.</p>

        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <h2 className="text-lg font-bold text-gray-900 mb-1">Tägliches Ziel</h2>
          <p className="text-sm text-gray-400 mb-6">Wie viel Protein möchtest du täglich essen?</p>

          <div className="text-center mb-6">
            <span className="text-5xl font-bold text-green-600">{value}</span>
            <span className="text-2xl text-gray-400 ml-1">g</span>
          </div>

          <input
            type="range"
            min={30}
            max={300}
            step={5}
            value={value}
            onChange={e => setValue(parseInt(e.target.value))}
            className="w-full accent-green-500 mb-2"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>30g</span>
            <span>300g</span>
          </div>

          <div className="flex gap-3 mt-4">
            {[100, 150, 200].map(v => (
              <button
                key={v}
                onClick={() => setValue(v)}
                className={`flex-1 py-2 rounded-xl text-sm font-medium transition-colors ${
                  value === v
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {v}g
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleStart}
          className="mt-6 w-full py-4 bg-green-500 text-white font-bold rounded-2xl text-lg shadow-lg active:scale-95 transition-transform"
        >
          Los geht's! 🚀
        </button>
      </motion.div>
    </div>
  );
}
