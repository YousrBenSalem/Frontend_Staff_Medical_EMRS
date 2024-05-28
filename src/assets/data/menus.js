import { MdOutlineDashboard } from "react-icons/md";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaTableList } from "react-icons/fa6";
import { FaRegCalendarCheck } from "react-icons/fa6";
import { RiUserAddLine } from "react-icons/ri";
import { FaRegAddressCard } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { AiOutlineLogout } from "react-icons/ai";

export const menus = [
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
  { name: "To do list", link: "/todolist", icon: LuListTodo, margin: true },
  { name: "LogOut", link: "/logout", icon: AiOutlineLogout },
];
