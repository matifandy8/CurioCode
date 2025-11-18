
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../providers/useAuth';
import MainLayout from '../layouts/MainLayout';


export default function PrivateUserRoutes() {
  const { user } = useAuth();
  const location = useLocation();

  console.log("PrivateUserRoutes rendered", user);

  if (!user || user?.role !== 'user') {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <MainLayout>
      <Outlet />
    </MainLayout>
  );
}