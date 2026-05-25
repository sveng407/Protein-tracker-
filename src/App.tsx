import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNav } from './components/layout/BottomNav';
import { OnboardingPage } from './pages/OnboardingPage';
import { TodayPage } from './pages/TodayPage';
import { HistoryPage } from './pages/HistoryPage';
import { BadgesPage } from './pages/BadgesPage';

function AppRoutes() {
  const { goal } = useApp();

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={goal === 0 ? '/onboarding' : '/today'} replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/today" element={<TodayPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/badges" element={<BadgesPage />} />
      </Routes>
      {goal !== 0 && <BottomNav />}
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
    </BrowserRouter>
  );
}
