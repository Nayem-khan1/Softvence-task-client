import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import {
  logo,
  spinIcon,
  taskIcon,
  edit,
  taskDetailsIcon,
  calendarEdit,
  getStatusStyle,
} from "../assets/assets";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { User, ChevronDown, LogOut, Mail } from "lucide-react";
import Modal from "../components/Modal";
import DeleteTask from "../components/DeleteTask";
import SuccessModal from "../components/SuccessModal";

const TaskDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user, logout } = useAuth();
  const [openModal, setOpenModal] = useState(false);
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

  const navigate = useNavigate();

  const backendURL = import.meta.env.VITE_BACKEND_URL;

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/tasks/${id}`, {
          withCredentials: true,
        });
        setTask(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load task details.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id]);

  const handleLogout = async () => {
    await logout();
    navigate("/signin");
  };

  const handleStatusChange = async (newStatus) => {
    try {
      const res = await axios.put(
        `${backendURL}/api/tasks/${task._id}`,
        { ...task, status: newStatus },
        { withCredentials: true }
      );
      setTask(res.data);

      if (newStatus === "Done") {
        setSuccess(true);
      }
    } catch (err) {
      console.error("Status update failed:", err);
    }
  };

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  const statusStyle = getStatusStyle(task.status);
  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/header1.png)",
          backgroundSize: "cover",
          height: "170px",
        }}
      >
        <nav className="w-full container mx-auto flex justify-between items-center px-4 py-8">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/">
              <img
                src={logo}
                alt="Logo"
                className="h-8 sm:h-full object-contain"
              />
            </Link>
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
      </div>
      <div className=" min-h-[80vh] container mx-auto px-4 bg-white rounded-2xl shadow-lg -mt-15 relative">
        <div className="flex justify-between items-center px-4 py-4">
          <p className="text-2xl font-semibold">Task Details</p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpenModal(true)}
              disabled={task.status === "Done"}
              className={`px-4 sm:px-6 py-2 rounded-md flex items-center gap-2 font-semibold ${
                task.status === "Done"
                  ? "bg-gray-300 cursor-not-allowed text-gray-500"
                  : "bg-yellow-100 text-amber-600"
              }`}
            >
              <img className="w-4 h-4" src={edit} alt="" />
              Edit Task
            </button>
            <Link
              to="/"
              className="bg-primary px-6 sm:px-8 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer"
            >
              Back
            </Link>
          </div>
        </div>
        <hr className="text-gray-300" />
        <div className="mt-10 px-4">
          <div className="flex gap-6">
            <img src={taskDetailsIcon} className="w-16 h-16" alt="task icon" />
            <div className="">
              <h3 className="text-2xl font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>

              <div className="flex items-center mt-14">
                <div className="flex items-center gap-1 text-gray-900">
                  <img
                    className="w-6 h-6 sm:w-7 sm:h-7 mr-2"
                    src={calendarEdit}
                    alt="calendars"
                  />
                  <span className="text-sm sm:text-lg">
                    {new Date(task.endDate).toLocaleDateString("en-US", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                  <div className="ml-5  border-r border-gray-300 h-14"></div>
                </div>

                <div className="flex items-center gap-2 text-sm sm:text-lg ml-5">
                  <span
                    className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
                    title={task.status}
                  ></span>
                  <span
                    className={`capitalize font-medium ${statusStyle.text}`}
                  >
                    {task.status}
                  </span>
                </div>
              </div>

              <div className="mt-10 max-w-[300px]">
                <label className="">Change Status</label>
                <div className="mt-3 grid grid-cols-1">
                  <select
                    id="status"
                    name="status"
                    defaultValue={task.status}
                    onChange={(e) => handleStatusChange(e.target.value)}
                    className="col-start-1 row-start-1 appearance-none rounded-md bg-white py-1.5 pr-8 pl-3 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                  >
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
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-12 right-8">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setOpen(true)}
              className="bg-red-100 text-red-600 px-4 sm:px-6 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer"
            >
              Delete Task
            </button>
            <button className="bg-primary px-6 sm:px-8 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer">
              Submit
            </button>
          </div>
        </div>
      </div>
      <Modal
        open={openModal}
        setOpen={setOpenModal}
        fetchTasks={() => window.location.reload()}
        mode="edit"
        initialData={task}
      />
      {<DeleteTask open={open} setOpen={setOpen} id={task._id} />}
      {<SuccessModal open={success} setOpen={setSuccess} />}
    </div>
  );
};

export default TaskDetails;
