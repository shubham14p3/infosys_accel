import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import SignInSide from "./components/SignInSide";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
      <Route path="/signin" element={<SignInSide />} />
      <Route path="/dashboard/*" element={<Dashboard />} />
      <Route path="/" element={<Navigate to="/signin" />} />
      <Route path="*" element={<Navigate to="/signin" replace />} />
    </Routes>
  );
}

export default App;
