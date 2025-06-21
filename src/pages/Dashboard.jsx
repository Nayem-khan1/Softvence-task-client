import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, Pencil, Trash2, PlusCircle, User } from "lucide-react";
import { logo, spinIcon, taskIcon } from "../assets/assets";
import Container from "../components/Container";

const Dashboard = () => {
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

  return (
    <div>
      <div
        style={{
          backgroundImage: "url(/header2.png)",
          backgroundSize: "cover",
          height: "300px",
        }}
      >
        <nav className="w-full container mx-auto flex justify-between items-center py-8">
          {/* Logo */}
          <div>
            <img className="sm:w-4/5 w-full" src={logo} alt="Logo" />
          </div>

          {/* Nav Links */}
          <ul className="flex gap-4 sm:gap-12 text-white font-medium">
            <li className="flex items-center gap-2">
              <img className="w-4 h-4 sm:w-6 sm:h-6" src={taskIcon} alt="Task" />
              <span className="text-[12px] sm:text-lg">Task List</span>
            </li>
            <li className="flex items-center gap-2">
              <img className="w-4 h-4" src={spinIcon} alt="Spin" />
              <span className="text-[12px] sm:text-lg">Spin</span>
            </li>
          </ul>

          {/* User */}
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-white" />
            <span className="text-[12px] sm:text-lg text-white mt-1.5 inline-block">User</span>
          </div>
        </nav>
      </div>
      <h2 className="text-2xl font-bold mb-4">📝 Task Manager</h2>

      {/* Create / Update Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow p-4 rounded mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Task Title"
            className="border p-2 rounded w-full"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Description"
            className="border p-2 rounded w-full"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
          >
            {editingTask ? "Update" : "Add"}{" "}
            <PlusCircle className="inline w-4 h-4 ml-1" />
          </button>
        </div>
      </form>

      {/* Task List */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p className="text-gray-500">No tasks found. Add one!</p>
      ) : (
        <div className="grid gap-4">
          {tasks.map((task) => (
            <div
              key={task._id}
              className={`p-4 rounded shadow flex justify-between items-center ${
                task.completed
                  ? "bg-green-50 border border-green-300"
                  : "bg-white"
              }`}
            >
              <div>
                <h3
                  className={`font-semibold text-lg ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600">{task.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => toggleComplete(task)}
                  title="Mark Complete"
                >
                  <CheckCircle
                    className={`w-5 h-5 ${
                      task.completed ? "text-green-600" : "text-gray-500"
                    }`}
                  />
                </button>
                <button
                  onClick={() => {
                    setForm({
                      title: task.title,
                      description: task.description,
                    });
                    setEditingTask(task);
                  }}
                  title="Edit"
                >
                  <Pencil className="w-5 h-5 text-blue-500" />
                </button>
                <button onClick={() => handleDelete(task._id)} title="Delete">
                  <Trash2 className="w-5 h-5 text-red-500" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
