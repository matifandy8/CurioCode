import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import HomePage from '@/features/home/pages/Home';
import LoginPage from '@/features/auth/pages/login/login';
import RegisterPage from '@/features/auth/pages/register/Register';
import AdminPage from '@/features/admin/pages';
import NotFoundPage from '@/features/notfound/pages/NotFound';
import ForgotPasswordPage from '@/features/auth/pages/forgotpassword/forgot-password';
import { ResetPasswordPage } from '@/features/auth/pages/resetpassword/reset-password';
import CreateCuriosityPage from '@/features/curiosities/pages/CreateCuriosityPage';


export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/createcuriosity" element={<CreateCuriosityPage />} />
      </Route> 
    
    </Routes>
  );
}