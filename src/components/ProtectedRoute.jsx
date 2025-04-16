import React from "react";
import { Navigate } from "react-router-dom";
import { useUser } from "../context/userContext";

const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useUser();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />; 
  }

  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
