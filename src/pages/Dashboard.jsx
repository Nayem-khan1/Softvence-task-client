import { useEffect, useState } from "react";
import axios from "axios";
import {
  CheckCircle,
  Pencil,
  Trash2,
  PlusCircle,
  User,
  FilePlus,
  ChevronDown,
} from "lucide-react";
import { logo, noTask, spinIcon, taskIcon } from "../assets/assets";
import Container from "../components/Container";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);

  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  // Handle Create or Update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await axios.put(`${backendURL}/api/tasks/${editingTask._id}`, form, {
          withCredentials: true,
        });
      } else {
        await axios.post(`${backendURL}/api/tasks`, form, {
          withCredentials: true,
        });
      }
      setForm({ title: "", description: "" });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Delete task
  const handleDelete = async (id) => {
    if (!confirm("Are you sure?")) return;
    try {
      await axios.delete(`${backendURL}/api/tasks/${id}`, {
        withCredentials: true,
      });
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle complete
  const toggleComplete = async (task) => {
    try {
      await axios.put(
        `${backendURL}/api/tasks/${task._id}`,
        {
          ...task,
          completed: !task.completed,
        },
        { withCredentials: true }
      );
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
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
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white" />
            <span className="text-sm sm:text-base text-white">
              {user ? user.name : "User"}
            </span>
          </div>
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
      <div className="container mx-auto px-4 bg-white rounded-2xl shadow-lg -mt-15">
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
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            <div className=" grid grid-cols-1">
              <select
                id="location"
                name="location"
                defaultValue="All Task"
                className="col-start-1 row-start-1 w-full appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
              >
                <option>All Task</option>
                <option>Canada</option>
                <option>Mexico</option>
              </select>
              <ChevronDown
                aria-hidden="true"
                className="pointer-events-none col-start-1 row-start-1 mr-2 size-5 self-center justify-self-end text-gray-500 sm:size-4"
              />
            </div>
            <button className="bg-primary px-4 sm:px-6 py-2 rounded-md flex items-center gap-2 font-semibold">
              <FilePlus className="w-4 h-4" />
              Add New Task
            </button>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center py-24">
          <img src={noTask} />
          <h3>No Task is Available yet, Please Add your New Task</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
