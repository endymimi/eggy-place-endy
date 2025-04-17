// import {React,useRef,useEffect} from "react";
// import { useAuth } from "../context/AuthContext";
// import { Navigate,useNavigate,useLocation } from "react-router-dom";
// import toast from "react-hot-toast";

// const RoleBasedRoutes = ({ children, requiredRole }) => {
//   const { user, isLoading } = useAuth();
//   const location = useLocation();  
//   const navigate = useNavigate();
//   const hasRedirected = useRef(false);

//  useEffect(()=>{
//   if (isLoading ) {
//     return <div>Loading....</div>;
//   }
//   if (!requiredRole.includes(user.role) &&    !hasRedirected.current) {
//     hasRedirected.current = true;
//     const previousLocation = location.state?.from || '/';
//       navigate(previousLocation);
//       return;
//   }
//  },[user, isLoading, requiredRole, location, navigate])
//   return user ? children : <Navigate to="/"/>
// };

// export default RoleBasedRoutes;





import { React, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";

const RoleBasedRoutes = ({ children, requiredRole }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const hasRedirected = useRef(false); 

  useEffect(() => {
    if (
      !isLoading &&
      user &&
      !requiredRole.includes(user.role) &&
      !hasRedirected.current
    ) {
      hasRedirected.current = true; 
      const previousLocation = location.state?.from || "/";
      navigate(previousLocation, { replace: true });
      toast.error("Admins only");
    }
  }, [user, isLoading, requiredRole, location, navigate]);

  if (isLoading) {
    return <div>Loading....</div>;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  if (!requiredRole.includes(user.role)) {
    return null;
  }

  return children;
};

export default RoleBasedRoutes;



