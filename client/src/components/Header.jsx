// Header.jsx
import React from 'react';

function Header() {
  const navItemStyle = { color: '#E6AF2E' };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#051923', paddingLeft: '20px' }}>
      <a className="navbar-brand" href="/" >
        Our Logo
      </a>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item active">
            <a className="nav-link" href="/" style={navItemStyle}>
              Home 
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/login" style={navItemStyle}>
              Login
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/register" style={navItemStyle}>
              Register
            </a>
          </li>
          <li className="nav-item active">
            <a className="nav-link" href="/finance" style={navItemStyle}>
              Finance
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
