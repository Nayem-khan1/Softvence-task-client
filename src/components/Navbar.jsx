import { Bell, UserCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="flex justify-between items-center bg-white px-6 py-4 shadow-md">
      <h1 className="text-xl font-bold text-gray-800">Task Dashboard</h1>

      <div className="flex items-center gap-4">
        {/* Notification Icon */}
        <button className="relative">
          <Bell className="w-6 h-6 text-gray-600 hover:text-indigo-500 transition duration-150" />
          {/* Notification Dot */}
          <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 rounded-full shadow-sm">
          <UserCircle className="w-6 h-6 text-gray-700" />
          <span className="text-sm font-medium text-gray-800">
            {user?.name || 'User'}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
