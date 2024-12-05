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
        <button className="social-button twitter">
          <span className="social-icon">🐦</span>
          <span className="social-tooltip">Twitter</span>
        </button>
        <button className="social-button youtube">
          <span className="social-icon">📺</span>
          <span className="social-tooltip">YouTube</span>
        </button>
        <button className="social-button github">
          <span className="social-icon">🐱</span>
          <span className="social-tooltip">GitHub</span>
        </button>
      </nav>
      <aside className="footer-copyright">
        <span className="heart-icon">♥</span>
        <p>Copyright © 2023 - All rights reserved by Jaqueline Smith</p>
        <span className="heart-icon">♥</span>
      </aside>
    </footer>
  );
}


