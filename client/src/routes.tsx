import { BrowserRouter, Routes, Route } from 'react-router-dom';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Header from './components/layout/Header';

export default function FuctionRoutes() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<SignIn />} />

        <Route path="/" element={<Dashboard />} />

      </Routes>
    </BrowserRouter>
  );
}
