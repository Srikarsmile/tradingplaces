import React from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import WorkspaceLayout from "./layouts/WorkspaceLayout";

import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Scenario from "./pages/Scenario";
import Report from "./pages/Report";
import Consent from "./pages/Consent";
import CulturePulse from "./pages/CulturePulse";
import Auth from "./pages/Auth";
import Terms from "./pages/Terms";
import Assessment from "./pages/Assessment";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
  const location = useLocation();
  const isWorkspace = location.pathname.startsWith("/workspace") ||
    ["/dashboard", "/scenario", "/report"].includes(location.pathname);

  return (
    <>
      {!isWorkspace && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/consent" element={<Consent />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/terms" element={<Terms />} />

        {/* Redirect old routes to workspace */}
        <Route path="/dashboard" element={<Navigate to="/workspace/dashboard" replace />} />
        <Route path="/scenario" element={<Navigate to="/workspace/scenario" replace />} />
        <Route path="/report" element={<Navigate to="/workspace/report" replace />} />

        {/* Unified workspace layout */}
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <WorkspaceLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/workspace/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="scenario" element={<Scenario />} />
          <Route path="report" element={<Report />} />
          <Route path="pulse" element={<CulturePulse />} />
          <Route path="assessment" element={<Assessment />} />
        </Route>
      </Routes>
    </>
  );
}
