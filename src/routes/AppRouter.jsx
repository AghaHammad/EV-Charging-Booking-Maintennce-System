import { Routes, Route, Navigate } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ClientLayout from "../components/layout/ClientLayout";
import ClientDashboard from "../pages/clientDashboard/ClientDashboard";
import ClientStations from "../pages/clientDashboard/ClientStations";
import ClientBookings from "../pages/clientDashboard/ClientBookings";
import ClientPayments from "../pages/clientDashboard/ClientPayments";
import ClientMaintenance from "../pages/clientDashboard/ClientMaintenance";
import ClientSettings from "../pages/clientDashboard/ClientSettings";
import StationManagement from "../pages/ownerDashboard/StationManagement";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/client-dashboard" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="/client-dashboard/stations" element={<ClientStations />} />
        <Route path="/client-dashboard/bookings" element={<ClientBookings />} />
        <Route path="/client-dashboard/payments" element={<ClientPayments />} />
        <Route path="/client-dashboard/maintenance" element={<ClientMaintenance />} />
        <Route path="/client-dashboard/settings" element={<ClientSettings />} />
      </Route>
       <Route path="/owner-dashboard">
        <Route index element={<Navigate to="/owner-dashboard/stations" replace />} />
        <Route path="/owner-dashboard/stations" element={<StationManagement />} />
      </Route>
    </Routes>
  );
}