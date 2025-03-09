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
        <a href="https://www.linkedin.com/in/jaqueline-smith-237366238/" target="_blank" rel="noopener noreferrer" className="social-button">
          <div className="icon-wrapper">
            <span className="social-icon">💼</span>
          </div>
          <span className="social-tooltip">LinkedIn</span>
        </a>
        <a href="https://github.com/BunniBooXx" target="_blank" rel="noopener noreferrer" className="social-button">
          <div className="icon-wrapper">
            <span className="social-icon">🐱</span>
          </div>
          <span className="social-tooltip">GitHub</span>
        </a>
        <a href="https://medium.com/@your-medium" target="_blank" rel="noopener noreferrer" className="social-button">
          <div className="icon-wrapper">
            <span className="social-icon">📝</span>
          </div>
          <span className="social-tooltip">Medium Blog</span>
        </a>
      </nav>
      <aside className="footer-copyright">
        <span className="heart-icon">♥</span>
        <p>Copyright © {new Date().getFullYear()} - All Rights Reserved by Jaqueline Smith.</p>
        <span className="heart-icon">♥</span>
      </aside>
    </footer>
  );
}
