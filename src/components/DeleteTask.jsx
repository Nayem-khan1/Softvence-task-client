import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import axios from "axios";
import { useNavigate } from "react-router";
import { deletePopup } from "../assets/assets";

const DeleteTask = ({ open, setOpen, id, fetchTasks }) => {
  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  // Delete task
  const handleDelete = async () => {
    try {
      await axios.delete(`${backendURL}/api/tasks/${id}`, {
        withCredentials: true,
      });
      navigate("/")
      setOpen(false)
      if(fetchTasks){
        fetchTasks()
      }
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl transition-all">
            <div className="flex flex-col justify-center items-center">
                <img className="object-fill" src={deletePopup}/>
            </div>
            <DialogTitle className="text-[40px] font-semibold text-gray-800 mb-4 text-center">
              Are you Sure!!
            </DialogTitle>
            <p className="text-center">Do you want to delete this Task on this app?</p>
            <div className="flex flex-col items-center justify-center mt-5 sm:mt-6">
              <div className="flex items-center gap-6">
                <button onClick={handleDelete} className="bg-primary px-6 sm:px-8 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer">
                  Yes
                </button>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-red-100 text-red-600 px-4 sm:px-8 py-2 rounded-md flex items-center gap-2 font-semibold cursor-pointer"
                >
                  NO
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteTask;
