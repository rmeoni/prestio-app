import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false); // Toggle dropdown visibility

  // Exclude bell icon on specific routes
  const excludeBellRoutes = ['/auth-code'];

  const toggleDropdown = () => {
    setShowDropdown((prev) => !prev); // Toggle dropdown visibility
  };

  return (
    <header className="header-container">
      <div className="header-content">
        {/* Logo in the center */}
        <div className="header-logo">
          <img src="/images/LogoDefault.svg" alt="Prestio Logo" />
        </div>
        {/* Bell Icon for notifications (only for authenticated users and not on excluded routes) */}
        {isAuthenticated && !excludeBellRoutes.includes(location.pathname) && (
          <div className="header-bell">
            <span
              role="img"
              aria-label="notifications"
              onClick={toggleDropdown}
              className="bell-icon"
            >
              <img src="/images/IconNotification.svg" alt="Notification Icon" />
            </span>
            {showDropdown && (
              <div className="notification-dropdown">
                <p>No tienes notificaciones</p>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
