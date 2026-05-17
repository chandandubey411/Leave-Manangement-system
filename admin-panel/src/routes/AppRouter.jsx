import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminAuthProvider } from '../context/AdminAuthContext';
import ProtectedRoute from './ProtectedRoute';
import AppLayout from '../components/layout/AppLayout';
import PageLoader from '../components/common/PageLoader';

const AdminLoginPage     = lazy(() => import('../pages/AdminLoginPage'));
const ManageLeavesPage   = lazy(() => import('../pages/ManageLeavesPage'));
const EmployeesPage      = lazy(() => import('../pages/EmployeesPage'));
const AdminProfilePage   = lazy(() => import('../pages/AdminProfilePage'));
const NotFoundPage       = lazy(() => import('../pages/NotFoundPage'));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AdminAuthProvider>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/login" element={<AdminLoginPage />} />

            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route index element={<Navigate to="/manage-leaves" replace />} />
                <Route path="/manage-leaves" element={<ManageLeavesPage />} />
                <Route path="/employees" element={<EmployeesPage />} />
                <Route path="/profile" element={<AdminProfilePage />} />
              </Route>
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </AdminAuthProvider>
    </BrowserRouter>
  );
}
