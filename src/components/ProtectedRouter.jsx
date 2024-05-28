import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function ProtectedRouter({ children }) {
  if (localStorage.getItem("token")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}

export default ProtectedRouter;
