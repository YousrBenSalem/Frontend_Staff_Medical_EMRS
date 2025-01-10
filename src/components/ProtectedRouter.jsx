import { Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { hideloading, showLoading } from "../redux/features/alertSlice";
import axios from "axios";
import { setUser } from "../redux/features/userSlice";
import { useEffect } from "react";

// eslint-disable-next-line react/prop-types
function ProtectedRouter({ children }) {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  // get User
  // eslint-disable-next-line
  const getUser = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/api/doctor/profile",
        { token: localStorage.getItem("token") },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      dispatch(hideloading());
      if (res.data.success) {
        console.log(res.data.data);
        dispatch(setUser(res.data.data)); // Ensure the correct path to user data
      } else {
        return <Navigate to="/" />;
        // eslint-disable-next-line no-unreachable
        localStorage.clear();
      }
    } catch (error) {
      dispatch(hideloading());
      // eslint-disable-next-line no-unreachable
      localStorage.clear();
      console.log(error);
    }
  };

  useEffect(() => {
    if (!user) {
      getUser();
    }
  }, [user, getUser]);

  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRouter;
