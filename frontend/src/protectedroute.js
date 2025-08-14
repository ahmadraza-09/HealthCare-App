import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { verifyToken } from "./verifytoken";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const [isVerified, setIsVerified] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      const { valid, user } = await verifyToken();
      if (valid) {
        setIsVerified(true);
        setUser(user);
      } else {
        setIsVerified(false);
      }
    };
    checkAuth();
  }, []);

  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-gray-600 text-lg font-medium">Checking authentication...</p>
        </div>
      </div>
    );
  }

  if (!isVerified) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
