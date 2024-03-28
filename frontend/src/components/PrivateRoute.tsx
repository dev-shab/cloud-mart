import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateType } from "../store";

const PrivateRoute = () => {
  const userInfo = useSelector((state: RootStateType) => state.auth);

  return userInfo ? <Outlet /> : <Navigate to="/login"></Navigate>;
};

export default PrivateRoute;
