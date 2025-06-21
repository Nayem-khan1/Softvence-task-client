import React from "react";
import axios from "axios";
import { CalendarClock, Trash2 } from "lucide-react";
import { calendarEdit, taskCardIcon } from "../assets/assets";
import { Link } from "react-router";

const getStatusStyle = (status) => {
  switch (status) {
    case "Ongoing":
      return {
        bg: "bg-orange-100",
        text: "text-orange-600",
        dot: "bg-orange-500",
      };
    case "Pending":
      return { bg: "bg-pink-100", text: "text-pink-600", dot: "bg-pink-500" };
    case "Done":
      return {
        bg: "bg-green-100",
        text: "text-green-600",
        dot: "bg-green-500",
      };
    case "Collaborative Task":
      return {
        bg: "bg-indigo-100",
        text: "text-indigo-600",
        dot: "bg-indigo-500",
      };
    default:
      return { bg: "bg-gray-100", text: "text-gray-600", dot: "bg-gray-400" };
  }
};

const TaskCard = ({ task, fetchTasks }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

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

  const statusStyle = getStatusStyle(task.status);

  return (
    <Link to={`/tasks/${task._id}`}>
      <div
        className={`p-5 rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:shadow-md`}
      >
        <div className="flex justify-between items-start">
          <div className="flex gap-3">
            <img src={taskCardIcon} className="w-10 h-10" alt="task icon" />
            <div>
              <h3 className="text-2xl font-semibold text-gray-800">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600">{task.description}</p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(task._id)}
            className="text-red-600 hover:text-red-800 cursor-pointer"
          >
            <Trash2 size={20} />
          </button>
        </div>

        <div className="flex justify-between items-center mt-7 text-sm">
          <div className="flex items-center gap-1 text-gray-900">
            <img className="w-6 h-6 mr-2" src={calendarEdit} alt="calendars"/>
            <span className="text-sm">
              {new Date(task.endDate).toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <span
              className={`w-2 h-2 rounded-full ${statusStyle.dot}`}
              title={task.status}
            ></span>
            <span className={`capitalize font-medium ${statusStyle.text}`}>
              {task.status}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
