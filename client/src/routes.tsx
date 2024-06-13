import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';

export default function FuctionRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<SignIn />} />

        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
}
