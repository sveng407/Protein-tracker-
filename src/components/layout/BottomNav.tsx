import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';

const tabs = [
  { to: '/today',   label: 'Heute',   icon: '🌱' },
  { to: '/history', label: 'Garten',  icon: '🌻' },
  { to: '/badges',  label: 'Erfolge', icon: '🏅' },
];

export function BottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(16px)',
        borderTop: '2px solid #FFE4EC',
      }}
    >
      <div className="max-w-md mx-auto flex">
        {tabs.map(tab => (
          <NavLink key={tab.to} to={tab.to}
            className="flex-1 flex flex-col items-center pt-3 pb-4 relative"
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <motion.div layoutId="nav-pill"
                    className="absolute top-2 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full"
                    style={{ background: 'linear-gradient(135deg, #FFE4EC, #EDE4FF)' }}
                    transition={{ type: 'spring', stiffness: 300, damping: 28 }}
                  />
                )}
                <motion.span
                  animate={{ scale: isActive ? 1.25 : 1 }}
                  transition={{ type: 'spring', stiffness: 350 }}
                  className="text-xl relative z-10"
                >
                  {tab.icon}
                </motion.span>
                <span
                  className="text-xs font-black mt-0.5 relative z-10"
                  style={{ color: isActive ? '#9B7BE0' : '#C4A8CC' }}
                >
                  {tab.label}
                </span>
              </>
            )}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
