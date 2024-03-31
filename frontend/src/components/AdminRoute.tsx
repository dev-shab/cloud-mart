import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootStateType } from "../store";

const AdminRoute = () => {
  const { userInfo } = useSelector((state: RootStateType) => state.auth);

  return userInfo && userInfo?.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to="/login"></Navigate>
  );
};

export default AdminRoute;
