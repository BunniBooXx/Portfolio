import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  return (
    <nav className="navbar-container">
      <div className="navbar">
        <Link to="/" className="navbar-brand">♡ Home ♡</Link>
        <div className="navbar-menu">
          <Link to="/aboutme" className="navbar-item">About Me</Link>
          <div className="navbar-dropdown">
            <span className="navbar-item navbar-dropdown-toggle">More ♡</span>
            <div className="dropdown-content">
              <Link to="/projects" className="dropdown-item">Projects</Link>
              <Link to="/resume" className="dropdown-item">Resume</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}






