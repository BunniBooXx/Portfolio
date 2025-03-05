import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <nav className="footer-links">
        <Link to="/aboutme" className="footer-link">
          <span className="footer-icon">👩‍💻</span>
          About Me
        </Link>
        <Link to="/contact" className="footer-link">
          <span className="footer-icon">✉️</span>
          Contact
        </Link>
        <Link to="/projects" className="footer-link">
          <span className="footer-icon">🚀</span>
          Projects
        </Link>
        <Link to="/" className="footer-link">
          <span className="footer-icon">🏠</span>
          Home
        </Link>
      </nav>
      <nav className="social-icons">
          <div className="social-button">
            <div className="icon-wrapper">
              <span className="social-icon">🐦</span>
            </div>
            <span className="social-tooltip">Twitter</span>
          </div>
          <div className="social-button">
            <div className="icon-wrapper">
              <span className="social-icon">📺</span>
            </div>
            <span className="social-tooltip">YouTube</span>
          </div>
          <div className="social-button">
            <div className="icon-wrapper">
              <span className="social-icon">🐱</span>
            </div>
            <span className="social-tooltip">GitHub</span>
          </div>
        </nav>
      <aside className="footer-copyright">
        <span className="heart-icon">♥</span>
        <p>Copyright © {new Date().getFullYear()} - All Rights Reserved by Jaqueline Smith.</p>
        <span className="heart-icon">♥</span>
      </aside>
    </footer>
  );
}


