import { Link } from 'react-router-dom';
import { useAuth } from '@/app/providers/useAuth';

const PublicHeader: React.FC = () => {
  const { user } = useAuth();
  return (
    <header className="border-b border-cyan-200 shadow-sm">
      <nav className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-cyan-500 text-2xl font-bold tracking-tight">
          <Link to="/">CurioCode</Link>
        </div>
        <ul className="flex space-x-6 items-center">
          <li><Link to="/" className="text-gray-700 hover:text-cyan-500 font-medium">Home</Link></li>
          {!user && <li><Link to="/login" className="bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600 font-semibold">Login / Sign Up</Link></li>}
          {user && (
            <li>
              <Link to="/profile" className="flex items-center gap-2 text-gray-700 hover:text-cyan-500">
                <span className="w-8 h-8 rounded-full bg-cyan-100 flex items-center justify-center font-bold text-cyan-700">
                  {user.name?.[0] || 'U'}
                </span>
                Perfil
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default PublicHeader;
