import { Navigate, Outlet, useLocation } from 'react-router-dom';
import AdminLayout from '../layouts/AdminLayout';
import { useAuth } from '../providers/useAuth';


export default function PrivateAdminRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || user?.role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <AdminLayout>
      <Outlet />
    </AdminLayout>
  );
}