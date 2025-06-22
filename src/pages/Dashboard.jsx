import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import axios from "axios";
import {
  User,
  FilePlus,
  ChevronDown,
  LogOut,
  Mail,
  Menu,
  X,
} from "lucide-react";
import { logo, noTask, spinIcon, taskIcon } from "../assets/assets";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { Link, useNavigate } from "react-router";
import TaskCard from "../components/TaskCard";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [mobileMnuOpen, setMobileMenuOpen] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  // Fetch tasks
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${backendURL}/api/tasks`, {
        withCredentials: true,
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  useEffect(() => {
    if (!loading) {
      setCategoryFilter("All");
      setStatusFilter("All");
    }
  }, [tasks]);
  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const filteredTasks = tasks.filter((task) => {
    const categoryMatch =
      categoryFilter === "All" || task.category === categoryFilter;
    const statusMatch = statusFilter === "All" || task.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/header2.png)",
          backgroundSize: "cover",
          height: "300px",
        }}
      >
        <nav className="w-full bg-transparent relative z-50">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex-shrink-0">
              <img
                src={logo}
                alt="Logo"
                className="h-8 sm:h-full object-contain"
              />
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
              <hr />
              <div className="text-sm">
                <div className="flex items-center gap-2">
                  <User className="w-5 text-gray-600" />
                  <span>{user?.name}</span>
                </div>
                <div className="flex items-center gap-2 mt-1">
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
          {mobileMnuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMobileMenuOpen(false)}
        ></div>
      )}
        </nav>

        <div className="container mx-auto px-4">
          <h2 className="text-primary text-lg sm:text-xl md:text-2xl font-semibold">
            Hi {user.name}
          </h2>
          <h1 className="text-white font-bold text-3xl sm:text-4xl md:text-[40px] mt-4">
            Welcome to Dashboard
          </h1>
        </div>
      </div>
      <div className="min-h-[80vh] container mx-auto px-4 bg-white rounded-2xl shadow-lg -mt-15">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-8 gap-4 sm:gap-0">
          <p className="text-2xl font-semibold">All Task List</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
            <div className="relative w-full sm:w-auto">
              <select
                id="category"
                name="category"
                defaultValue="All"
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-primary sm:text-sm"
              >
                <option value="All">Select Task Category</option>
                <option value="Nature">Nature</option>
                <option value="Family">Family</option>
                <option value="Sport">Sport</option>
                <option value="Friends">Friends</option>
                <option value="Meditation">Meditation</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 text-gray-500" />
            </div>

            <div className="relative w-full sm:w-auto">
              <select
                id="status"
                name="status"
                defaultValue="All"
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full appearance-none rounded-md bg-white py-2 pr-8 pl-3 text-base text-gray-900 outline-1 outline-gray-300 focus:outline-2 focus:outline-primary sm:text-sm"
              >
                <option value="All">All Task</option>
                <option value="Ongoing">Ongoing</option>
                <option value="Pending">Pending</option>
                <option value="Collaborative Task">Collaborative Task</option>
                <option value="Done">Done</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-2.5 text-gray-500" />
            </div>

            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary w-full sm:w-auto px-4 sm:px-6 py-2 rounded-md flex items-center justify-center gap-2 font-semibold cursor-pointer"
            >
              <FilePlus className="w-4 h-4" />
              Add New Task
            </button>
          </div>
        </div>

        {loading ? (
          <Loader />
        ) : filteredTasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
            {filteredTasks.map((task, idx) => (
              <TaskCard key={idx} task={task} fetchTasks={fetchTasks} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-20">
            <img src={noTask} />
            <h3 className="mt-10 text-2xl font-semibold">
              No Task is Available yet, Please Add your New Task
            </h3>
          </div>
        )}
      </div>
      {
        <Modal
          open={openModal}
          setOpen={setOpenModal}
          fetchTasks={fetchTasks}
          mode="add"
        />
      }
    </div>
  );
};

export default Dashboard;
