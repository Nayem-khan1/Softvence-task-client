import { LayoutDashboard, PlusCircle, LogOut, Menu } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Sidebar = () => {
  const { logout } = useAuth();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const navigate = useNavigate();

  const menuItems = [
    {
      name: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      name: "Add Task",
      icon: PlusCircle,
      path: "/add-task",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } bg-white shadow-lg h-full transition-all duration-300 hidden md:flex flex-col`}
    >
      {/* Top brand/logo section */}
      <div className="flex items-center justify-between p-4 border-b">
        <h2
          className={`text-xl font-bold text-indigo-600 ${
            collapsed ? "hidden" : "block"
          }`}
        >
          TaskMaster
        </h2>
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-500 hover:text-indigo-500"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation links */}
      <nav className="flex-1 flex flex-col p-4 gap-3 text-gray-700">
        {menuItems.map(({ name, icon: Icon, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center gap-3 px-3 py-2 rounded-md hover:bg-indigo-50 transition ${
              location.pathname === path
                ? "bg-indigo-100 text-indigo-600 font-medium"
                : ""
            }`}
          >
            <Icon size={20} />
            {!collapsed && <span>{name}</span>}
          </Link>
        ))}
      </nav>

      {/* Logout button */}
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition"
        >
          <LogOut size={20} />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
