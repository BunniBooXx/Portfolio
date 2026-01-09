import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-card">
        {/* Navigation */}
        <nav className="footer-links">
          <Link to="/" className="footer-link">🏠 Home</Link>
          <Link to="/aboutme" className="footer-link">👩‍💻 About</Link>
          <Link to="/projects" className="footer-link">🚀 Projects</Link>
          <Link to="/contact" className="footer-link">✉️ Contact</Link>
        </nav>

        {/* Socials */}
        <nav className="footer-socials">
          <a
            href="https://www.linkedin.com/in/jaqueline-smith-237366238/"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="LinkedIn"
          >
            💼
          </a>

          <a
            href="https://github.com/BunniBooXx"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="GitHub"
          >
            🐱
          </a>

          <a
            href="https://medium.com/@your-medium"
            target="_blank"
            rel="noopener noreferrer"
            className="social-btn"
            aria-label="Medium"
          >
            📝
          </a>
        </nav>

        {/* Copyright */}
        <div className="footer-copy">
          <span className="heart">♥</span>
          <span>
            © {new Date().getFullYear()} Jaqueline Smith
          </span>
          <span className="heart">♥</span>
        </div>
      </div>
    </footer>
  );
}
