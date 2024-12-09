import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import AuthProvider from './context/AuthContext';
import Login from './pages/Login/Login';
import AuthCode from './pages/AuthCode/AuthCode';
import Header from './components/Header/Header';
import Menu from './components/Menu/Menu';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import NewLoan from './pages/NewLoan/NewLoan';
import LoanDetails from './pages/LoanDetails/LoanDetails';
import NewService from './pages/NewService/NewService';
import ServiceDetails from './pages/ServiceDetails/ServiceDetails';
import NewBenefit from './pages/NewBenefit/NewBenefit';

const AppContent = () => {
  const location = useLocation();

  // Define routes where the Menu should not be displayed
  const excludeMenuRoutes = ['/', '/auth-code'];

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/auth-code" element={<AuthCode />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-loan"
          element={
            <ProtectedRoute>
              <NewLoan />
            </ProtectedRoute>
          }
        />
        <Route
          path="/loan-details/:id"
          element={
            <ProtectedRoute>
              <LoanDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-service"
          element={
            <ProtectedRoute>
              <NewService />
            </ProtectedRoute>
          }
        />
        <Route
          path="/service-details/:id"
          element={
            <ProtectedRoute>
              <ServiceDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-benefit"
          element={
            <ProtectedRoute>
              <NewBenefit />
            </ProtectedRoute>
          }
        />
      </Routes>
      {/* Only render the Menu if the current route is not in the excluded list */}
      {!excludeMenuRoutes.includes(location.pathname) && <Menu />}
    </>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppContent />
    </Router>
  </AuthProvider>
);

export default App;
