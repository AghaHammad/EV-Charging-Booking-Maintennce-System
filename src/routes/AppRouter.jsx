import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import ClientLayout from '../components/layout/ClientLayout';
import ClientDashboard from '../pages/client/ClientDashboard';
import Stations from '../pages/client/Stations';
import Bookings from '../pages/client/Bookings';
import Payments from '../pages/client/Payments';
import Maintenance from '../pages/client/Maintenance';
import Settings from '../pages/client/Settings';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/client" element={<ClientLayout />}>
        <Route index element={<ClientDashboard />} />
        <Route path="/client/stations" element={<Stations />} />
        <Route path="/client/bookings" element={<Bookings />} />
        <Route path="/client/payments" element={<Payments />} />
        <Route path="/client/maintenance" element={<Maintenance />} />
        <Route path="/client/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}
