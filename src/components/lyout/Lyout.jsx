import SideBar from "./../Sidebar/SideBar";
import Navbar from "./../NavBar/Navbar";
// eslint-disable-next-line react/prop-types
function Lyout({ children }) {
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
