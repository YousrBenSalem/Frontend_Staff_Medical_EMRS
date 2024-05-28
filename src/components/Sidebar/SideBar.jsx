import { HiMenuAlt3 } from "react-icons/hi";
import { menus } from "./../../assets/data/menus";
import { Link, useLocation } from "react-router-dom";
import React, { useState } from "react";
import logo from "../../assets/images/map.png";

function SideBar() {
  const [open, setOpen] = useState(true);
  const [activeMenu, setActiveMenu] = useState(null);
  const location = useLocation();

  const handleMenuClick = (index) => {
    setActiveMenu(index);
    if (!open) {
      return;
    }
    setOpen(!open);
  };

  return (
    <>
      <div className="gap-6 h-screen sticky top-0 bottom-0">
        <div
          className={`bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl ${
            open ? "w-72" : "w-16"
          } duration-500 text-gray-100 px-4 h-full`}
        >
          <div className="py-3 flex justify-end">
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <div className="flex items-center mb-8">
            <img
              src={logo}
              alt="Tunisie Logo"
              className="w-10 h-10 text-white"
            />
            <h1
              className={`ml-2 text-2xl font-bold ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
              style={{ transitionDelay: "200ms" }}
            >
              EMRS 🏥
            </h1>
          </div>
          <ul className="mt-4 flex flex-col gap-4 relative">
            {menus.map((menu, i) => (
              <li key={i} onClick={() => handleMenuClick(i)}>
                <Link
                  to={menu.link}
                  className={`${
                    menu.margin && "mt-5"
                  } group flex items-center text-l gap-3.5 font-medium p-2 ${
                    location.pathname === menu.link && activeMenu === i
                      ? "bg-gray-400 rounded-md"
                      : "hover:bg-gray-400 rounded-md"
                  }`}
                >
                  <div>{React.createElement(menu.icon, { size: 20 })}</div>
                  <h2
                    style={{ transitionDelay: `${i + 3}00ms` }}
                    className={`whitespace-pre duration-500 ${
                      !open && "opacity-0 translate-x-28 overflow-hidden"
                    }`}
                  >
                    {menu.name}
                  </h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default SideBar;
