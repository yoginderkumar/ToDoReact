import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home, Login } from "../containers";
import ProtectedRoute from "./ProtectedRoute";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    </Routes>
  );
};

export default AppRouter;
