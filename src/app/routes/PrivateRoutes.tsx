import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../providers/useAuth';


export default function PrivateRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isAdminRoute = location.pathname.startsWith('/admin') || location.pathname === '/approved-curiosities';
  if (isAdminRoute && user?.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}