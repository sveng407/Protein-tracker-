import { NavLink } from 'react-router-dom';

const tabs = [
  { to: '/today', label: 'Heute', icon: '🏠' },
  { to: '/history', label: 'Verlauf', icon: '📅' },
  { to: '/badges', label: 'Badges', icon: '🏆' },
];

export function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="max-w-md mx-auto flex">
        {tabs.map(tab => (
          <NavLink
            key={tab.to}
            to={tab.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                isActive ? 'text-green-600' : 'text-gray-500'
              }`
            }
          >
            <span className="text-xl mb-0.5">{tab.icon}</span>
            {tab.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
