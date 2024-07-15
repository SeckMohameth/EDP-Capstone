import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext';
import './Nav.css';
import { Link } from 'react-router-dom';

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
      <Link to="/data-analysis">Data Analysis</Link>

      <div className="nav-right">
        <button onClick={handleLogout}>Logout</button>
      </div>
    </nav>
  );
}

export default Nav;