import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "../pages/Home/Home";
import Login from "../pages/Login/Login";
import Standards from "../pages/Standards/Standards";
import Comparisons from "../pages/Comparisons/Comparisons";
import Process from "../pages/Process/Process";


const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      {/* Standard feature pages */}
      <Route path="/standards" element={<Standards />} />
      <Route path="/comparisons" element={<Comparisons />} />
      <Route path="/process" element={<Process />} />

     

      {/* Redirect from singular to plural */}
      <Route path="/comparison" element={<Navigate to="/comparisons" replace />} />
    </Routes>
  );
};

export default AppRoutes;
