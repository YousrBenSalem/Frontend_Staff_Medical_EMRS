import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
function PublicRoute({ children }) {
  if (localStorage.getItem("token")) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

export default PublicRoute;
