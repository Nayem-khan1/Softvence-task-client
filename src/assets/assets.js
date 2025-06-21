import notFound from "./404.png";
import header1 from "./header1.png";
import logInImg from "./loginImg.png";
import signInImg from "./signupImg.png";
import header2 from "./header2.png";
import logo from './logo.png'
import taskIcon from './taskIcon.png';
import spinIcon from './spinIcon.png';
import noTask from './noTask.png'
import paperPlus from './PaperPlus.png';
import taskCardIcon from './Task.png';
import calendarEdit from './calendar-edit.png';
import edit from './edit-2.svg';
import taskDetailsIcon from './taskDetailsIcon.png'
import deletePopup from './deletePopup.png';

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

export { notFound, header1, logInImg, signInImg, header2, logo, taskIcon, spinIcon, noTask, paperPlus, taskCardIcon, calendarEdit, edit,  taskDetailsIcon, getStatusStyle, deletePopup };
