import React, { useState } from "react";
import axios from "axios";
import { CalendarClock, Trash2 } from "lucide-react";
import { calendarEdit, getStatusStyle, taskCardIcon } from "../assets/assets";
import { Link } from "react-router";
import DeleteTask from "./DeleteTask";

const TaskCard = ({ task, fetchTasks }) => {
  const [open, setOpen] = useState(false);
  const statusStyle = getStatusStyle(task.status);

  return (
    <div
      className={`p-5 rounded-xl border border-gray-300 bg-white shadow-sm transition-all duration-300 hover:shadow-md`}
    >
      <div className="flex justify-between items-start gap-4 flex-wrap">
        <Link to={`/tasks/${task._id}`} className="flex-1 min-w-0">
          <div className="flex gap-3">
            <img
              src={taskCardIcon}
              className="w-10 h-10 shrink-0"
              alt="task icon"
            />
            <div className="min-w-0">
              <h3 className="text-xl font-semibold text-gray-800 truncate">
                {task.title}
              </h3>
              <p className="text-sm text-gray-600 truncate">
                {task.description}
              </p>
            </div>
          </div>
        </Link>

        <button
          onClick={() => setOpen(true)}
          className="text-red-600 hover:text-red-800 cursor-pointer shrink-0"
        >
          <Trash2 size={20} />
        </button>
      </div>

      <div className="flex justify-between items-center mt-7 text-sm">
        <div className="flex items-center gap-1 text-gray-900">
          <img className="w-6 h-6 mr-2" src={calendarEdit} alt="calendars" />
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
      {
        <DeleteTask
          open={open}
          setOpen={setOpen}
          id={task._id}
          fetchTasks={fetchTasks}
        />
      }
    </div>
  );
};

export default TaskCard;
