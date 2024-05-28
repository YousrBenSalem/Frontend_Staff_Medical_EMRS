import { useState } from "react";
import { message } from "antd";
import { useAuth } from "../contexts/AuthContext";

const useLogin = () => {
  const { login } = useAuth();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const loginUser = async (values) => {
    try {
      setError(null);
      setLoading(true);

      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await res.json();

      if (res.status === 200) {
        localStorage.setItem("token", data.token);
        message.success(data.message);
        login(data.token, data.user);
      } else if (res.status === 404) {
        setError(data.message);
        message.error(data.message || "Login Failed");
      } else {
        message.error("Login Failed");
      }
    } catch (error) {
      setError(error.message);
      message.error(error.message || "Login Failed");
    } finally {
      setLoading(false);
    }
  };
  return { loading, error, loginUser };
};
export default useLogin;
