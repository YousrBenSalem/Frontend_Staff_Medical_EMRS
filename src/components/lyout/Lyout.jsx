import SideBar from "./../Sidebar/SideBar";
import Navbar from "./../NavBar/Navbar";
import { useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line react/prop-types
function Lyout({ children }) {
  const getUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("No token found");
      }

      const res = await axios.post(
        "http://localhost:3000/api/doctor/profile",
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );

      console.log("User data:", res.data);
    } catch (error) {
      console.error("Error fetching user data:", error.message);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <div className="main  ">
        <div className="layout flex  ">
          <div className="sidebar ">
            <SideBar />
          </div>
          <div className="content  w-full pl-4 pr-4  ">
            <div className="Header border-b border-primaryColor h-14 mb-1 bg-white shadow-sm  ">
              <Navbar />
            </div>
            <div className=" scroll   ">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Lyout;
