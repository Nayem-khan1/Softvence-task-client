import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import {
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
import Nav from "../components/Nav";

const TaskDetails = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [task, setTask] = useState(null);
  const [open, setOpen] = useState(false);
  const [success, setSuccess] = useState(false);

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
        <div className="py-4">
          <Nav />
        </div>
      </div>
      <div className=" min-h-[85vh] container mx-auto px-4 bg-white rounded-2xl shadow-lg -mt-15 relative">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-4 py-8 gap-4 sm:gap-0">
          <p className="text-2xl font-semibold">Task Details</p>

          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 w-full sm:w-auto">
            <button
              onClick={() => setOpenModal(true)}
              disabled={task.status === "Done"}
              className={`px-4 sm:px-6 py-2 rounded-md flex items-center gap-2 font-semibold text-center ${
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
              className="bg-primary px-6 sm:px-8 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer text-center"
            >
              Back
            </Link>
          </div>
        </div>
        <hr className="text-gray-300" />
        <div className="mt-10 px-4">
          <div className="flex flex-col md:flex-row gap-6">
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

              <div className="mt-10 w-full max-w-[300px]">
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
        <div className="absolute bottom-4 sm:bottom-8 right-4 flex flex-col sm:flex-row gap-3 sm:gap-2">
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
