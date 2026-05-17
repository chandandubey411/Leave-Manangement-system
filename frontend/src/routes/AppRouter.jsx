import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import AppLayout from '../components/layout/AppLayout';
import PublicLayout from '../components/layout/PublicLayout';
import PageLoader from '../components/common/PageLoader';

// Lazy-load pages for code splitting
const HomePage        = lazy(() => import('../pages/HomePage'));
const AboutPage       = lazy(() => import('../pages/AboutPage'));
const LoginPage       = lazy(() => import('../pages/LoginPage'));
const SignUpPage      = lazy(() => import('../pages/SignUpPage'));
const DashboardPage   = lazy(() => import('../pages/DashboardPage'));
const ApplyLeavePage  = lazy(() => import('../pages/ApplyLeavePage'));
const LeaveHistoryPage = lazy(() => import('../pages/LeaveHistoryPage'));
const ProfilePage     = lazy(() => import('../pages/ProfilePage'));
const NotFoundPage    = lazy(() => import('../pages/NotFoundPage'));

function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            {/* Public routes wrapped in PublicLayout */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
            </Route>

            {/* Auth routes guarded by PublicRoute (redirects to dashboard if logged in) */}
            <Route element={<PublicRoute />}>
              <Route path="/signin" element={<LoginPage />} />
              <Route path="/signup" element={<SignUpPage />} />
              <Route path="/login" element={<Navigate to="/signin" replace />} />
            </Route>

            {/* Protected routes wrapped in the sidebar layout */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/dashboard"     element={<DashboardPage />} />
                <Route path="/apply-leave"   element={<ApplyLeavePage />} />
                <Route path="/leave-history" element={<LeaveHistoryPage />} />
                <Route path="/profile"       element={<ProfilePage />} />
              </Route>
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default AppRouter;
