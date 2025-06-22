import { useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, LogOut, Mail, Menu, X } from "lucide-react";
import { logo, spinIcon, taskIcon } from "../assets/assets";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";

const Nav = () => {
  const { user, logout } = useAuth();
  const [mobileMnuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };
  return (
    <nav className="w-full bg-transparent relative z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex-shrink-0">
          <img src={logo} alt="Logo" className="h-8 sm:h-full object-contain" />
        </Link>

        {/* Desktop Nav Links */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          <li className="flex items-center gap-2">
            <img src={taskIcon} alt="Task" className="w-5 h-5" />
            <span className="text-sm sm:text-base">Task List</span>
          </li>
          <li className="flex items-center gap-2">
            <img src={spinIcon} alt="Spin" className="w-5 h-5" />
            <span className="text-sm sm:text-base">Spin</span>
          </li>
        </ul>

        {/* User Popover */}
        <Popover className="relative">
          <PopoverButton className="outline-none cursor-pointer">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-white" />
              <span className="text-sm sm:text-base text-white">
                {user ? user.name : "User"}
              </span>
            </div>
          </PopoverButton>
          <PopoverPanel className="absolute right-0 z-10 w-56 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
            <div className="text-sm">
              <div className="flex items-center space-x-2">
                <User className="text-gray-600 w-6" />
                <p className="text-gray-700">{user?.name}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 ml-0.5">
                <Mail className="text-gray-600 w-5" />
                <p className="text-gray-700">{user?.email}</p>
              </div>

              <hr className="my-3 text-gray-300" />

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 w-full text-left text-red-600 hover:bg-red-50 rounded-md transition cursor-pointer"
              >
                <LogOut size={20} />
                <span>Logout</span>
              </button>
            </div>
          </PopoverPanel>
        </Popover>

        {/* Mobile Menu Toggle (Optional for hamburger) */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMnuOpen)}
          className="md:hidden"
        >
          <Menu className="text-white w-6 h-6" />
        </button>
      </div>
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          mobileMnuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <span className="text-lg font-semibold text-gray-800">Menu</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <ul className="flex flex-col gap-4 p-4 text-gray-800 font-medium">
          <li className="flex items-center gap-2">
            <img src={taskIcon} alt="Task" className="w-5 h-5" />
            <span>Task List</span>
          </li>
          <li className="flex items-center gap-2">
            <img src={spinIcon} alt="Spin" className="w-5 h-5" />
            <span>Spin</span>
          </li>
          <hr className="text-gray-300" />
          <div className="text-sm">
            <div className="flex items-center gap-2">
              <User className="w-6 text-gray-600" />
              <span>{user?.name}</span>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Mail className="w-5 text-gray-600" />
              <span>{user?.email}</span>
            </div>
            <button
              onClick={handleLogout}
              className="mt-4 flex items-center gap-2 text-red-600 hover:underline"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Nav;
