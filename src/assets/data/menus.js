import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { RiUserAddLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { LiaUserNurseSolid } from "react-icons/lia";
import { CiBoxList } from "react-icons/ci";
import { MdBatchPrediction } from "react-icons/md";

export const doctormenus = [
  { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "Calender", link: "/calender", icon: FaRegCalendarAlt },
  { name: "Patients list", link: "/patientslist", icon: FaTableList },
  {
    name: "Appointement",
    link: "/appointement",
    icon: FaRegCalendarCheck,
    margin: true,
  },
  { name: "Add Patient", link: "/addpatient", icon: RiUserAddLine },
  {
    name: "Patients Profiles",
    link: "/patientsprofiles",
    icon: FaRegAddressCard,
  },
  {
    name: "Providers List",
    link: "/providerList",
    icon: CiBoxList,
    margin: true,
  },
  { name: "To do list", link: "/todolist", icon: LuListTodo },
  { name: "Assistant List", link: "/assistantlist", icon: LiaUserNurseSolid },
  {
    name: "Pneumonia Detection",
    link: "/predict",
    icon: MdBatchPrediction,
    margin: true,
  },
];

export const Residentmenus = [
  { name: "Dashboard", link: "/dashboard", icon: MdOutlineDashboard },
  { name: "Calender", link: "/calender", icon: FaRegCalendarAlt },
  { name: "Add Patient", link: "/addpatient", icon: RiUserAddLine },
  {
    name: "Pneumonia Detection",
    link: "/predict",
    icon: MdBatchPrediction,
    margin: true,
  },
  { name: "To do list", link: "/todolist", icon: LuListTodo },
];
