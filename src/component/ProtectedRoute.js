import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/UserAuthContext";
const ProtectedRoute = ({ children }) => {
  const { currentuser } = useAuth();
console.log(currentuser + "in protected")
  if (!currentuser ) {
    return <Navigate to="/" />;
  }
  return children;
};

export default ProtectedRoute;