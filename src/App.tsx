import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { BottomNav } from './components/layout/BottomNav';
import { LanguagePicker } from './components/LanguagePicker';
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

      {goal !== 0 && (
        <>
          <BottomNav />
          {/* Always-visible language picker, above the nav bar */}
          <div className="fixed bottom-20 right-3 z-50">
            <LanguagePicker />
          </div>
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <HashRouter>
      <LanguageProvider>
        <AppProvider>
          <AppRoutes />
        </AppProvider>
      </LanguageProvider>
    </HashRouter>
  );
}
