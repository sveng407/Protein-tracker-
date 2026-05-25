import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/today',   label: 'Heute',     icon: '🌱' },
  { to: '/history', label: 'Garten',    icon: '🌻' },
  { to: '/badges',  label: 'Erfolge',   icon: '🏆' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-stone-200 z-40">
      <div className="max-w-md mx-auto flex">
        {tabs.map(tab => (
          <NavLink key={tab.to} to={tab.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center pt-2.5 pb-3 text-xs font-bold transition-colors ${
                isActive ? 'text-green-600' : 'text-stone-400'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <motion.span
                  className="text-xl mb-0.5"
                  animate={{ scale: isActive ? 1.2 : 1 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  {tab.icon}
                </motion.span>
                {tab.label}
                {isActive && (
                  <motion.div layoutId="nav-dot"
                    className="w-1 h-1 rounded-full bg-green-500 mt-0.5"
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
