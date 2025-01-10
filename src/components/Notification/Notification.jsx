/* eslint-disable react/prop-types */
import { Empty } from "antd";
import { FaUser } from "react-icons/fa";
import moment from "moment";

function Notification({ notifications }) {
  
  if (!Array.isArray(notifications)) {
    console.error(
      "Expected notifications to be an array, but got:",
      notifications
    );
    return null;
  }
  return (
    <div className="absolute top-12 right-0 w-80 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 max-h-96 overflow-y-auto scrollbar-hide">
      <h2 className="text-2xl font-semibold text-blue-600 mb-4">
        Notifications
      </h2>
      <div>
        {notifications.length === 0 ? (
          <Empty description="No notifications" />
        ) : (
          notifications.map((notif) => (
            <div
              key={notif.id}
              className="flex items-start space-x-3 p-3 border-b border-gray-200 hover:bg-gray-100 rounded-lg transition duration-150 ease-in-out"
            >
              <div className="flex-shrink-0">
                <div className="w-10 h-10 mt-4 rounded-full bg-blue-100 flex items-center justify-center">
                  <FaUser className="text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="font-bold  text-blue-600">{notif.type}</p>
                <p className="text-sm font-medium text-gray-800">
                  <span className="font-semibold text-blue-600">
                    {notif.patientName || "Unknown Patient"}
                    {"  "}
                  </span>
                  Have {notif.type} : {""}
                  {notif.detail || "No details available"}
                  {/*   <span className="text-gray-500">
                    {moment(notif.date).format("DD/MM/YYYY HH:mm:ss")}
                  </span> */}
                </p>
                <p className="text-gray-500">
                  {" "}
                  {notif.date ? moment(notif.date).fromNow() : "Unknown date"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Notification;
