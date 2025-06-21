import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { ChevronDown } from "lucide-react";

const Modal = ({ open, setOpen }) => {
  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-gray-900/5 px-4 py-2 text-sm font-semibold text-gray-900 hover:bg-gray-900/10"
      >
        Add Task
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl transition-all">
            <DialogTitle className="text-lg font-bold text-gray-800 mb-4 text-center">
              Add New Task
            </DialogTitle>

            <form className="space-y-6">
              {/* Title Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Task Title
                </label>
                <input
                  type="text"
                  placeholder="e.g., Finish assignment"
                  className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Write a few sentences about your task..."
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
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Task Category
                  </label>
                  <select className="w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-800 focus:ring-2 focus:ring-primary">
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

              {/* Actions */}
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
                  className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary/90 transition cursor-pointer"
                >
                  Save Task
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
