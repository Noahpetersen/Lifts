import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { ReactNode } from "react";

const ProtectedRoute = ({children} : {children : ReactNode}) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return user ? children : <Navigate to="/signin" />;
};

export default ProtectedRoute;