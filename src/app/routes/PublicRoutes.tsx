import { Navigate, Outlet } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import { useAuth } from '../providers/useAuth';

export default function PublicRoutes() {
  const { user } = useAuth();
  const isAuthenticated = !!user;

  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}

