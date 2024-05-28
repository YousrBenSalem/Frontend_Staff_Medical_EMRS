import signinImg from "../assets/images/signin.svg";
import { useState } from "react";
import useLogin from "../hooks/useLogin";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useLogin();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    await loginUser(formData);
    navigate("/dashboard");
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="px-5 xl:px-0 mx-auto">
      <div className="max-w-[1170px] mx-auto ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image Section */}
          <div className="hidden lg:block rounded-l-lg">
            <img
              src={signinImg}
              alt="Sign In"
              className="w-full rounded-l-lg"
            />
          </div>
          {/* Login Form */}
          <div className="rounded-l-lg lg:pl-16 py-10">
            <h3 className="text-headingColor text-center text-[22px] leading-9 font-bold mb-10">
              Login to
              <span className="text-primaryColor"> your account 🩺</span>
            </h3>
            <form className="py-4 md:py-0" onSubmit={handleLogin}>
              <div className="mb-10 text-center">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mb-20 text-center">
                <input
                  type="password"
                  placeholder="Enter Your Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>
              <div className="mt-7">
                <button
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
