import { Route, Routes } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import CreateCuriosity from '../../features/createcuriosity/pages/CreateCuriosity';
import ApprovedCuriosities from '../../features/approvedcuriosities/pages/ApprovedCuriosities';
import HomePage from '../../features/home/pages/Home';
import LoginPage from '../../features/auth/pages/login/login';
import RegisterPage from '../../features/auth/pages/register/Register';
import AdminPage from '../../features/admin/pages';
import NotFoundPage from '../../features/notfound/pages/NotFound';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      <Route element={<PrivateRoutes />}>
        <Route path="/admin/*" element={<AdminPage />} />
        <Route path="/createcuriosity" element={<CreateCuriosity />} />
        <Route path="/approved-curiosities" element={<ApprovedCuriosities />} />
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}