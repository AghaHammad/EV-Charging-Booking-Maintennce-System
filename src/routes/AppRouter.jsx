import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import ClientLayout from "../Components/Layout/ClientLayout";
import ClientDashboard from "../pages/clientModule/ClientDashboard";
import ClientStations from "../pages/clientModule/ClientStations";
import ClientBookings from "../pages/clientModule/ClientBookings";
import ClientPayments from "../pages/clientModule/ClientPayments";
import ClientMaintenance from "../pages/clientModule/ClientMaintenance";
import ClientSettings from "../pages/clientModule/ClientSettings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/clientmodule" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="/clientmodule/stations" element={<ClientStations />} />
        <Route path="/clientmodule/bookings" element={<ClientBookings />} />
        <Route path="/clientmodule/payments" element={<ClientPayments />} />
        <Route path="/clientmodule/maintenance" element={<ClientMaintenance />} />
        <Route path="/clientmodule/settings" element={<ClientSettings />} />
      </Route>
    </Routes>
  );
}