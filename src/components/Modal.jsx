import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";
import axios from "axios";
import { useEffect, useState } from "react";

const Modal = ({
  open,
  setOpen,
  fetchTasks,
  mode = "add",
  initialData = {},
}) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [category, setCategory] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === "edit" && initialData) {
      setTitle(initialData.title || "");
      setDescription(initialData.description || "");
      setEndDate(initialData.endDate ? initialData.endDate.slice(0, 10) : "");
      setCategory(initialData.category || "");
    }
  }, [initialData, mode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const taskData = {
      title,
      description,
      endDate,
      category,
    };

    try {
      if (mode === "edit") {
        setLoading(true);
        await axios.put(
          `${backendURL}/api/tasks/${initialData._id}`,
          taskData,
          {
            withCredentials: true,
          }
        );
        setLoading(false);
      } else {
        setLoading(true);
        await axios.post(`${backendURL}/api/tasks`, taskData, {
          withCredentials: true,
        });
        setTitle("");
        setDescription("");
        setEndDate("");
        setCategory("");

        setLoading(false);
      }

      if (fetchTasks) fetchTasks();
      setOpen(false);
    } catch (err) {
      console.error("Error submitting task:", err);
    }
  };

  if (!open) return null;

  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl transition-all">
            <DialogTitle className="text-lg font-bold text-gray-800 mb-4 text-center">
              {mode === "edit" ? "Edit Task" : "Add New Task"}
            </DialogTitle>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g., Finish assignment"
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Write a few sentences..."
                  rows={3}
                  required
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Date & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    End Date
                  </label>
                  <input
                    type="date"
                    name="endDate"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    required
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Category
                  </label>
                  <select
                    name="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-primary"
                  >
                    <option value="">Select Category</option>
                    <option value="Nature">Nature</option>
                    <option value="Family">Family</option>
                    <option value="Sport">Sport</option>
                    <option value="Friends">Friends</option>
                    <option value="Meditation">Meditation</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-[38px] h-5 w-5 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="text-sm font-semibold text-gray-700 hover:underline cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold hover:bg-primary/90 transition cursor-pointer"
                >
                  {loading ? "Saving..." : "Save Task"}
                </button>
              </div>
            </form>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default Modal;
