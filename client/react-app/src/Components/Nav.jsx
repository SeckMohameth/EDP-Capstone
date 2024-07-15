import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import './Nav.css';

function Nav() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="nav-container">
      <div className="nav-left">Dashboard</div>
      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Nav;