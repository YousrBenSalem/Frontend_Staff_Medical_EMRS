import Routers from "../routes/Routers.jsx";
import { useEffect } from "react";
import axios from "axios";
function Layout() {
  // Function to fetch user data
  const getUserData = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3001/api/auth/profile",
        {},
        {
          headers: {
            Authorization: "Bearer" + localStorage.getItem("token"),
          },
        }
      );

      console.log(res.data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };
  useEffect(() => {
    getUserData();
  }, []);
  return (
    <>
      <main>
        <Routers />
      </main>
    </>
  );
}

export default Layout;
