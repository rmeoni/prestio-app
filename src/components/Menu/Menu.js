import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import LogoutConfirmation from '../LogoutConfirmation/LogoutConfirmation'; // Import the LogoutConfirmation component
import './Menu.css';

const Menu = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutPrompt, setShowLogoutPrompt] = useState(false);

  const handleLogout = () => {
    setShowLogoutPrompt(true);
  };

  const handleConfirmLogout = () => {
    setShowLogoutPrompt(false);
    logout(); // Call the logout function from the auth context
    navigate('/'); // Redirect to the login page after logout
  };

  const handleCancelLogout = () => {
    setShowLogoutPrompt(false);
  };

  const handleNavigate = (view) => {
    navigate('/dashboard', { state: { view } }); // Pass the view state to Dashboard
  };

  if (!isAuthenticated) {
    return null; // Do not display the menu if the user is not authenticated
  }

  return (
    <>
      <div className="menu">
        <div className="menu-container">
          <Link to="/profile" className="menu-item">
            <span className="menu-icon"><img src="/images/IconProfile.svg" alt="Profile Icon"/></span>
            <span className="menu-text">Perfil</span>
          </Link>
          <button
            className="menu-item"
            onClick={() => handleNavigate('loans')}
          >
            <span className="menu-icon"><img src="/images/IconLoans.svg" alt="Loans Icon"/></span>
            <span className="menu-text">Préstamos</span>
          </button>
          <Link to="/new-benefit" className="menu-item" id="CTA">
            <span className="menu-icon"><img src="/images/IconNew.svg" alt="New Icon"/></span>
            <span className="menu-text">Nuevo</span>
          </Link>
          <button
            className="menu-item"
            onClick={() => handleNavigate('services')}
          >
            <span className="menu-icon"><img src="/images/IconServices.svg" alt="Services Icon"/></span>
            <span className="menu-text">Servicios</span>
          </button>
          <button className="menu-item" onClick={handleLogout}>
            <span className="menu-icon"><img src="/images/IconExit.svg" alt="Exit Icon"/></span>
            <span className="menu-text">Salir</span>
          </button>
        </div>
      </div>
      {showLogoutPrompt && (
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </>
  );
};

export default Menu;
