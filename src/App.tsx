import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthProvider, useAuth } from './context/AuthContext';
import { AppProvider, useApp } from './context/AppContext';
import { LanguageProvider } from './context/LanguageContext';
import { BottomNav } from './components/layout/BottomNav';
import { LanguagePicker } from './components/LanguagePicker';
import { LoginPage } from './pages/LoginPage';
import { OnboardingPage } from './pages/OnboardingPage';
import { TodayPage } from './pages/TodayPage';
import { HistoryPage } from './pages/HistoryPage';
import { BadgesPage } from './pages/BadgesPage';

const MAIN_ROUTES = ['/today', '/history', '/badges'];

function LoadingScreen() {
  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ background: 'linear-gradient(160deg, #FFF0F7 0%, #F5EEFF 50%, #F0FFF8 100%)' }}
    >
      <motion.span
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
        className="text-5xl"
      >
        🌸
      </motion.span>
    </div>
  );
}

function AppInner() {
  const { goal, dataLoading } = useApp();
  const { pathname } = useLocation();
  const showNav = MAIN_ROUTES.includes(pathname);

  if (dataLoading) return <LoadingScreen />;

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={goal === 0 ? '/onboarding' : '/today'} replace />} />
        <Route path="/onboarding" element={<OnboardingPage />} />
        <Route path="/today"   element={<TodayPage />} />
        <Route path="/history" element={<HistoryPage />} />
        <Route path="/badges"  element={<BadgesPage />} />
      </Routes>

      {showNav && (
        <>
          <BottomNav />
          <div className="fixed bottom-20 right-3 z-50">
            <LanguagePicker />
          </div>
        </>
      )}
    </>
  );
}

function AppRoutes() {
  const { user, authLoading } = useAuth();

  if (authLoading) return <LoadingScreen />;
  if (!user)       return <LoginPage />;

  return (
    <AppProvider>
      <AppInner />
    </AppProvider>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <LanguageProvider>
          <AppRoutes />
        </LanguageProvider>
      </AuthProvider>
    </HashRouter>
  );
}
