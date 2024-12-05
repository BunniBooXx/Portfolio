import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <nav className="navbar-container">
      <div className="navbar">
        <Link to="/" className="navbar-brand" onMouseEnter={() => setActiveItem('home')}>
          <span className="heart-icon">♥</span> 
          <span className="brand-text">Home</span> 
          <span className="heart-icon">♥</span>
        </Link>
        <div className="navbar-menu">
          <Link 
            to="/aboutme" 
            className={`navbar-item ${activeItem === 'about' ? 'active' : ''}`}
            onMouseEnter={() => setActiveItem('about')}
          >
            <span className="icon">👩‍💻</span>About Me
          </Link>
          <div className="navbar-dropdown">
            <span 
              className={`navbar-item navbar-dropdown-toggle ${activeItem === 'more' ? 'active' : ''}`}
              onMouseEnter={() => setActiveItem('more')}
            >
              <span className="icon">✨</span>More
            </span>
            <div className="dropdown-content">
              <Link to="/projects" className="dropdown-item">
                <span className="icon">🚀</span>Projects
              </Link>
              <Link to="/resume" className="dropdown-item">
                <span className="icon">📝</span>Resume
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}







