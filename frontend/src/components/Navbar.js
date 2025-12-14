import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Instagram Clone
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="navbar-link">Home</Link>
          <Link to="/create" className="navbar-link">Create</Link>
          <Link to={`/profile/${user?.id}`} className="navbar-link">Profile</Link>
          <button onClick={handleLogout} className="navbar-button">Logout</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;