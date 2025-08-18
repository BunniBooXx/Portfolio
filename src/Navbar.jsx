import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav className="navbar-container">
        <Link
          to="/"
          className="navbar-brand"
        >
          <span className="heart-icon">♥</span>
          <span className="brand-text">Home</span>
          <span className="heart-icon">♥</span>
        </Link>

        <div
          className="navbar-menu"
        >
          <div
            className={`navbar-dropdown ${open ? 'open' : ''}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              className={`navbar-item navbar-dropdown-toggle ${open ? 'active' : ''}`}
              onClick={() => setOpen(v => !v)}
              aria-haspopup="true"
              aria-expanded={open}
            >
              <span className="icon">✨</span>More
            </button>

            <div className="dropdown-content" role="menu">
              <Link to="/aboutme" className="dropdown-item" role="menuitem">
                <span className="icon">👩‍💻</span>About Me
              </Link>
              <Link to="/projects" className="dropdown-item" role="menuitem">
                <span className="icon">🚀</span>Projects
              </Link>
              <Link to="/resume" className="dropdown-item" role="menuitem">
                <span className="icon">📝</span>Resume
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        .navbar-container {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(135deg, #fce4ec 0%, #f8bbd0 100%);
          padding: clamp(1rem, 3vw, 1.5rem) clamp(1rem, 4vw, 2rem);
          border-bottom: 3px solid #f48fb1;
          box-shadow: 0 4px 20px rgba(233, 129, 143, 0.9);
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        .navbar-brand {
          font-size: 1.5rem;
          font-weight: 600;
          color: #e91e63;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: transform 0.2s ease, text-shadow 0.2s ease;
        }
        .navbar-brand:hover { transform: scale(1.05); text-shadow: 0 0 5px #f8bbd0; }

        .heart-icon { color: #e91e63; animation: pulse 1.5s infinite; display: inline-block; }
        @keyframes pulse { 0%,100%{transform:scale(1);}50%{transform:scale(1.2);} }
        .brand-text { font-family: 'Cursive', sans-serif; }

        .navbar-menu { display: flex; align-items: center; gap: clamp(1rem, 2vw, 2rem); }

        .navbar-item {
          color: #e91e63;
          text-decoration: none;
          font-size: clamp(0.9rem, 1.5vw, 1.1rem);
          padding: 0.6rem 1.2rem;
          border-radius: 20px;
          background: rgba(255, 255, 255, 0.7);
          backdrop-filter: blur(5px);
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          white-space: nowrap;
          border: 0;
          cursor: pointer;
        }
        .navbar-item:hover, .navbar-item.active {
          color: #efa5b0;
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(233, 30, 99, 0.2);
        }

        .navbar-dropdown { position: relative; }
        .navbar-dropdown-toggle::after { content: ' ▼'; font-size: 0.7rem; }

        .dropdown-content {
          position: absolute;
          top: 100%;           /* was 110% (gap causes hover loss) */
          margin-top: 0.35rem; /* small, clickable spacing */
          right: 0;
          background: rgba(255, 255, 255, 0.95);
          border: 1px solid #f8bbd0;
          border-radius: 0.75rem;
          box-shadow: 0 2px 6px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          min-width: 180px;
          max-height: 70vh;
          overflow: auto;
          opacity: 0;
          visibility: hidden;
          transform: translateY(-6px);
          transition: opacity 0.18s ease, transform 0.18s ease, visibility 0.18s;
          z-index: 2000;       /* make sure it sits above page content */
        }

        /* show when open OR focused (keyboard) */
        .navbar-dropdown.open .dropdown-content,
        .navbar-dropdown:focus-within .dropdown-content {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }

        .dropdown-item {
          padding: 0.6rem 0.9rem;
          text-decoration: none;
          color: #e91e63;
          transition: background 0.2s ease, color 0.2s ease;
          background: rgba(255, 255, 255, 0.7);
        }
        .dropdown-item:hover { background: rgba(255, 255, 255, 0.9); color: #efa5b0; }

        .icon { margin-right: 0.25rem; }
      `}</style>
    </>
  );
}
