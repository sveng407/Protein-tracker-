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

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"
      style={{
        background: 'linear-gradient(160deg, #FFF0F7 0%, #F5EEFF 50%, #F0FFF8 100%)',
      }}
    >
      {/* decorative blobs */}
      <div className="fixed top-0 left-0 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: 'rgba(255,183,197,0.18)', filter: 'blur(40px)', transform: 'translate(-30%, -30%)' }} />
      <div className="fixed bottom-0 right-0 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: 'rgba(196,168,255,0.18)', filter: 'blur(50px)', transform: 'translate(30%, 30%)' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 70, damping: 16 }}
        className="w-full max-w-sm text-center relative"
      >
        {/* floating flower */}
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
          className="flex justify-center mb-0"
          style={{ width: 150, margin: '0 auto' }}
        >
          <FlowerGrowth percent={0.45} color={FLOWER_PALETTE[0]} />
        </motion.div>

        <h1 className="text-4xl font-black tracking-tight mb-1" style={{ color: '#3D2255' }}>
          Lass uns blühen! 🌸
        </h1>
        <p className="text-sm font-medium mb-7 leading-relaxed" style={{ color: '#9B7BE0' }}>
          Jeden Tag, den du dein Proteinziel erreichst,<br />
          wächst in deinem Garten eine neue Blume.
        </p>

        {/* goal card */}
        <div
          className="rounded-4xl p-6 mb-4"
          style={{
            background: 'white',
            border: '2.5px solid #FFE4EC',
            boxShadow: '0 6px 32px rgba(255,183,197,0.22)',
          }}
        >
          <p className="text-xs font-black uppercase tracking-widest mb-4" style={{ color: '#FFB7C5' }}>
            ✨ Dein tägliches Ziel ✨
          </p>

          <motion.div key={value}
            initial={{ scale: 0.85 }} animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 14 }}
            className="mb-5"
          >
            <span className="text-7xl font-black" style={{ color: '#C4A8FF' }}>{value}</span>
            <span className="text-3xl font-bold ml-1" style={{ color: '#E4D4FF' }}>g</span>
            <p className="text-xs font-semibold mt-1" style={{ color: '#C4A8FF' }}>Protein pro Tag</p>
          </motion.div>

          <input type="range" min={30} max={300} step={5} value={value}
            onChange={e => setValue(parseInt(e.target.value))}
            className="w-full mb-2"
          />
          <div className="flex justify-between text-xs font-medium mb-5" style={{ color: '#C4A8FF' }}>
            <span>30g</span><span>300g</span>
          </div>

          <div className="flex gap-2">
            {[100, 150, 200].map(v => (
              <motion.button key={v} onClick={() => setValue(v)}
                whileTap={{ scale: 0.92 }}
                className="flex-1 py-2.5 rounded-3xl text-sm font-black transition-all"
                style={value === v
                  ? { background: 'linear-gradient(135deg,#FFB7C5,#C4A8FF)', color: 'white', boxShadow: '0 3px 12px rgba(196,168,255,0.4)' }
                  : { background: '#F5F0FF', color: '#9B7BE0' }
                }
              >
                {v}g
              </motion.button>
            ))}
          </div>
        </div>

        <motion.button
          onClick={handleStart}
          whileTap={{ scale: 0.94 }}
          className="w-full py-4 rounded-4xl text-lg font-black text-white"
          style={{
            background: 'linear-gradient(135deg, #FFB7C5 0%, #C4A8FF 100%)',
            boxShadow: '0 6px 28px rgba(196,168,255,0.45)',
          }}
        >
          Garten anlegen 🌱
        </motion.button>
        <p className="text-xs mt-3" style={{ color: '#C4A8FF' }}>Ziel jederzeit änderbar 💕</p>
      </motion.div>
    </div>
  );
}
