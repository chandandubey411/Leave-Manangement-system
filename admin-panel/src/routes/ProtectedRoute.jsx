import { Navigate, Outlet } from 'react-router-dom';
import useAdminAuth from '../hooks/useAdminAuth';
import PageLoader from '../components/common/PageLoader';

export default function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAdminAuth();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
}
