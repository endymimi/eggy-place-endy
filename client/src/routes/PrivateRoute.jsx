import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';
import LoadingRing from '../utils/Loader';
// import { Toaster,toast } from "react-hot-toast";
import { toast } from 'sonner';

const PrivateRoute = ({ children }) => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingRing />
      </div>
    );
  }

  if (!user) {
    toast.error("You must be signed in to access this page.");
    return <Navigate to="/" />;
  }

  return  children ;
  
};

export default PrivateRoute;
