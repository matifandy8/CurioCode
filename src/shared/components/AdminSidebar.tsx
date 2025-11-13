import { Link, useLocation } from 'react-router-dom';
import { FaCheck, FaTimes, FaChartBar, FaPlus, FaListAlt } from 'react-icons/fa';

const adminNav = [
  { label: 'Pending', icon: <FaListAlt />, to: '/admin/pending' },
  { label: 'Approved', icon: <FaCheck />, to: '/admin/approved' },
  { label: 'Rejected', icon: <FaTimes />, to: '/admin/rejected' },
  { label: 'Create', icon: <FaPlus />, to: '/admin/create' },
  { label: 'Metrics', icon: <FaChartBar />, to: '/admin/metrics' },
];

const AdminSidebar: React.FC = () => {
  const location = useLocation();
  return (
    <aside className="fixed top-0 left-0 h-screen w-56 border-r border-cyan-700 flex flex-col py-8 px-4 shadow-lg z-50">
      <div className="text-cyan-300 text-2xl font-bold mb-10 text-center">Admin</div>
      <nav className="flex-1">
        <ul className="space-y-4">
          {adminNav.map((item) => (
            <li key={item.label}>
              <Link
                to={item.to}
                className={`flex items-center gap-3 px-4 py-2 rounded font-medium transition-colors duration-150 ${location.pathname === item.to ? 'bg-cyan-700 text-white' : 'text-cyan-300 hover:bg-cyan-800 hover:text-white'}`}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;
