import { FaRegBell, FaEnvelope } from "react-icons/fa";
import profile from "../../assets/images/avatar-icon.png";
import { Breadcrumb } from "antd";
import { useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  return (
    <div className="flex items-center justify-between h-[50px]  px-[25px]">
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
        <div className="flex items-center gap-[25px] border-r-[1px] pr-[25px]">
          <FaRegBell />
          <FaEnvelope />
        </div>
        <div className="flex items-center gap-[15px] relative">
          <p>Docteur</p>
          <div className="h-[40px] w-[40px] rounded-full  bg-gradient-to-r from-cyan-500 to-blue-500 cursor-pointer flex items-center justify-center relative">
            <img className="h-[30px] w-[30px] " src={profile} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
