import { useState } from "react";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { showLoading, hideloading } from "../redux/features/alertSlice";
import axios from "axios";

const useLogin = () => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const loginUser = async (values) => {
    try {
      setError(null);
      dispatch(showLoading());
      const res = await axios.post(
        "http://localhost:3000/api/doctor/login",
        values
      );
      window.location.reload();
      dispatch(hideloading());
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        message.success(res.data.message);
        console.log(res.data);
      } else if (res.status === 404) {
        setError(res.data.message);
        message.error(res.data.message || "Login Failed");
      } else {
        message.error("Login Failed");
      }
    } catch (error) {
      dispatch(hideloading());
      setError(error.message);
      message.error(error.message || "Login Failed");
    }
  };
  return { error, loginUser };
};
export default useLogin;
