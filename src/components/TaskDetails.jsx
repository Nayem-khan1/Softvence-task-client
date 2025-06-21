import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import axios from "axios";
import { CalendarClock, ArrowLeft } from "lucide-react";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  if (loading) return <div className="p-8">Loading...</div>;
  if (error) return <div className="p-8 text-red-500">{error}</div>;

  return (
    <div className="max-w-3xl mx-auto px-6 py-10 bg-white shadow rounded-md">
      <Link
        to="/"
        className="flex items-center gap-2 text-sm text-blue-600 hover:underline mb-6"
      >
        <ArrowLeft size={16} />
        Back to Tasks
      </Link>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{task.title}</h1>
      <p className="text-gray-600 mb-6">{task.description}</p>

      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
        <CalendarClock size={18} />
        <span>
          {new Date(task.endDate).toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </span>
      </div>

      <p className="text-sm text-gray-600">
        <strong>Status:</strong>{" "}
        <span
          className={`font-medium ${
            task.status === "Done"
              ? "text-green-600"
              : task.status === "Pending"
              ? "text-pink-500"
              : task.status === "Ongoing"
              ? "text-orange-500"
              : "text-blue-600"
          }`}
        >
          {task.status}
        </span>
      </p>

      <p className="text-sm text-gray-600 mt-1">
        <strong>Category:</strong> {task.category}
      </p>
    </div>
  );
};

export default TaskDetails;
