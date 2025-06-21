import { useEffect, useState } from "react";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import axios from "axios";
import {
  User,
  FilePlus,
  ChevronDown,
  LogOut,
  Mail,
} from "lucide-react";
import { logo, noTask, spinIcon, taskIcon } from "../assets/assets";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { useNavigate } from "react-router";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);

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

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  console.log(user);
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/header2.png)",
          backgroundSize: "cover",
          height: "300px",
        }}
      >
        <nav className="w-full container mx-auto flex justify-between items-center px-4 py-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Logo"
              className="h-8 sm:h-full object-contain"
            />
          </div>

          {/* Nav Links */}
          <ul className="flex gap-6 md:gap-10 text-white font-medium">
            <li className="flex items-center gap-2">
              <img
                src={taskIcon}
                alt="Task"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <span className="text-sm sm:text-base">Task List</span>
            </li>
            <li className="flex items-center gap-2">
              <img
                src={spinIcon}
                alt="Spin"
                className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6"
              />
              <span className="text-sm sm:text-base ">Spin</span>
            </li>
          </ul>

          {/* User */}

          {/* User Profile */}
          <Popover className="relative">
            <PopoverButton className="outline-none cursor-pointer">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
                <span className="text-sm sm:text-base text-white">
                  {user ? user.name : "User"}
                </span>
              </div>
            </PopoverButton>
            <PopoverPanel className="absolute right-0 z-10 w-56 sm:w-64 bg-white border border-gray-300 rounded-lg shadow-lg p-4">
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
      <div className=" min-h-screen container mx-auto px-4 bg-white rounded-2xl shadow-lg -mt-15">
        <div className="flex justify-between items-center px-4 py-4">
          <p className="text-2xl font-semibold">All Task List</p>
          <div className="flex items-center gap-2">
            <div className="grid grid-cols-1">
              <select
                id="location"
                name="location"
                defaultValue="Select Task Category"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              >
                <option>Select Task Category</option>
                <option>Nature</option>
                <option>Family</option>
                <option>Sport</option>
                <option>Friends</option>
                <option>Meditation</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            <div className=" grid grid-cols-1">
              <select
                id="status"
                name="status"
                defaultValue="All Task"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              >
                <option>All Task</option>
                <option>Ongoing</option>
                <option>Pending</option>
                <option>Collaborative Task</option>
                <option>Done</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            <button
              onClick={() => setOpenModal(true)}
              className="bg-primary px-4 sm:px-6 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer"
            >
              <FilePlus className="w-4 h-4" />
              Add New Task
            </button>
          </div>
        </div>
        {tasks.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 py-6">
            {tasks.map((task, idx) => (
              <TaskCard key={idx} task={task} fetchTasks={fetchTasks} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center py-24">
            <img src={noTask} />
            <h3 className="mt-10">
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
