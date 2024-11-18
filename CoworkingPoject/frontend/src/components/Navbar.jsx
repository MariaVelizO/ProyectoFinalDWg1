import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ role, setIsAuthenticated }) {
  return (
    <div className="navbar-container">
      <nav>
        <ul className="navbar">
          <li><Link to="/">Home</Link></li>
          {role === 'admin' ? (
            <li><Link to="/adminpanel">Admin Panel</Link></li>
          ) : role === 'user' ? (
            <li><Link to="/userpanel">User Panel</Link></li>
          ) : null}
          <li>
            <button onClick={() => setIsAuthenticated(false)}>Logout</button>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
