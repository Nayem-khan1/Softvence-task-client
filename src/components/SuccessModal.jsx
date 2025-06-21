import React from "react";
import { success } from "../assets/assets";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
const SuccessModal = ({ open, setOpen }) => {
  return (
    <div>
      <Dialog open={open} onClose={setOpen} className="relative z-50">
        <DialogBackdrop className="fixed inset-0 bg-black/30 backdrop-blur-sm" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl transition-all">
            <div className="flex flex-col justify-center items-center">
              <img className="object-fill" src={success} />
            </div>
            <DialogTitle className="text-2xl font-semibold text-gray-800 mb-4 text-center">
              Successfully Completed the Task!
            </DialogTitle>
            <p className="text-center">
              Congratulations! you have successfully completed the task and you
              got 20 points.
            </p>
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  );
};

export default SuccessModal;
