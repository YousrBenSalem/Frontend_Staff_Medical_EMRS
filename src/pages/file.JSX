import { useEffect, useRef, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import profile from "../../assets/images/doctor-img02.png";
import { Breadcrumb, Dropdown, Menu, message } from "antd";
import { useLocation, useNavigate } from "react-router-dom";
import Notification from "../Notification/Notification";
import { useSelector } from "react-redux";
import io from "socket.io-client";

const socket = io("http://localhost:3000");

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const notificationRef = useRef(null);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    // Charger les notifications depuis localStorage
    const storedNotifications =
      JSON.parse(localStorage.getItem("notifications")) || [];
    setNotifications(storedNotifications);
    const unreadCount = storedNotifications.filter((n) => !n.isRead).length;
    setNotificationCount(unreadCount);

    socket.on("notification", (notification) => {
      const newNotification = { ...notification, isRead: false };
      setNotifications((prevNotifications) => {
        const updatedNotifications = [newNotification, ...prevNotifications];
        localStorage.setItem(
          "notifications",
          JSON.stringify(updatedNotifications)
        );
        const unreadCount = updatedNotifications.filter(
          (n) => !n.isRead
        ).length;
        setNotificationCount(unreadCount);
        return updatedNotifications;
      });
    });

    return () => {
      socket.off("notification");
    };
  }, []);

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
    if (!showNotifications) {
      // Marquer les notifications comme lues et mettre à jour localStorage
      const updatedNotifications = notifications.map((notification) => ({
        ...notification,
        isRead: true,
      }));
      setNotifications(updatedNotifications);
      setNotificationCount(0);
      localStorage.setItem(
        "notifications",
        JSON.stringify(updatedNotifications)
      );
    }
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    message.success("Logout Successfully");
    navigate("/");
  };

  const menu = (
    <Menu>
      <Menu.Item key="profile" onClick={goToProfile}>
        Your Profile
      </Menu.Item>

      <Menu.Item key="logout" onClick={handleLogout}>
        Log Out
      </Menu.Item>
    </Menu>
  );

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex items-center justify-between h-[50px] px-[25px]">
      <div className="flex items-center rounded-[5px]">
        <Breadcrumb
          items={[
            {
              title: location.pathname,
              href: location.pathname,
            },
          ]}
        />
      </div>
      <div className="flex items-center gap-[15px] relative">
        <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px] relative">
          <div className="relative">
            {user && (
              <div className="relative">
                <FaRegBell
                  onClick={toggleNotifications}
                  className="cursor-pointer text-blue-500"
                />
                {notificationCount > 0 && (
                  <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {notificationCount}
                  </div>
                )}
              </div>
            )}
            {showNotifications && (
              <div ref={notificationRef}>
                <Notification notifications={notifications} />
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-[15px] relative cursor-pointer">
          <p className="cursor-pointer lg:text-lg sm:text-sm md:text-sm">
            {user?.name} {user?.surname}
          </p>
          <Dropdown overlay={menu} trigger={["click"]}>
            <div
              className="h-[40px] w-[40px] rounded-full  cursor-pointer flex items-center justify-center relative"
              onClick={(e) => e.preventDefault()}
            >
              {user?.photo ? (
                <img
                  className="rounded-full h-[40px] w-[40px]"
                  src={`http://localhost:3000/api/admin/uploads/${user?.photo}`}
                  alt="profile"
                />
              ) : (
                <img
                  className="rounded-full h-[40px] w-[40px]"
                  src={profile}
                  alt="profile"
                />
              )}
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
