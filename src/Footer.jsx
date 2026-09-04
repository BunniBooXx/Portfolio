import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="js-footer">
      <div className="js-footer-inner">
        <nav className="js-footer-links" aria-label="Footer navigation">
          <Link to="/" className="js-footer-link">Home</Link>
          <Link to="/aboutme" className="js-footer-link">About</Link>
          <Link to="/projects" className="js-footer-link">Projects</Link>
          <Link to="/contact" className="js-footer-link">Contact</Link>
        </nav>

        <nav className="js-footer-socials" aria-label="Social links">
          <a
            href="https://www.linkedin.com/in/jaqueline-smith-237366238/"
            target="_blank"
            rel="noopener noreferrer"
            className="js-footer-social-btn"
            aria-label="LinkedIn"
            title="LinkedIn"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M16 6.5v-1.25A2.25 2.25 0 0 0 13.75 3h-3.5A2.25 2.25 0 0 0 8 5.25V6.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M4.75 7.75h14.5c.966 0 1.75.784 1.75 1.75v9.5A2.75 2.75 0 0 1 18.25 21.75H5.75A2.75 2.75 0 0 1 3 19V9.5c0-.966.784-1.75 1.75-1.75Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9.25 21.75V10.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
              <path d="M9.25 12.25h4.5c1.518 0 2.75 1.232 2.75 2.75v6.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </a>

          <a
            href="https://github.com/BunniBooXx"
            target="_blank"
            rel="noopener noreferrer"
            className="js-footer-social-btn"
            aria-label="GitHub"
            title="GitHub"
          >
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 2.75c-5.11 0-9.25 4.14-9.25 9.25 0 4.09 2.65 7.56 6.32 8.78.46.08.63-.2.63-.44v-1.6c-2.57.56-3.11-1.1-3.11-1.1-.42-1.08-1.03-1.37-1.03-1.37-.84-.58.06-.57.06-.57.93.07 1.42.95 1.42.95.82 1.4 2.16 1 2.69.77.08-.6.32-1 .58-1.23-2.05-.23-4.2-1.02-4.2-4.55 0-1 .36-1.82.95-2.46-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.52.94a8.7 8.7 0 0 1 4.58 0c1.75-1.19 2.52-.94 2.52-.94.5 1.27.19 2.21.09 2.44.59.64.95 1.46.95 2.46 0 3.54-2.16 4.32-4.22 4.55.33.28.63.84.63 1.69v2.5c0 .24.17.52.63.44A9.26 9.26 0 0 0 21.25 12c0-5.11-4.14-9.25-9.25-9.25Z" fill="currentColor" />
            </svg>
          </a>

          <Link to="/resume" className="js-footer-social-btn" aria-label="View Resume" title="Resume">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6.75 3.75h7.5l4 4v11.5a1 1 0 0 1-1 1h-10.5a1 1 0 0 1-1-1V4.75a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M14.25 3.75v3.5a.5.5 0 0 0 .5.5h3.5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
              <path d="M9 13h6M9 16.25h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </Link>
        </nav>

        <div className="js-footer-copy">© {new Date().getFullYear()} Jaqueline Smith</div>
      </div>

      <style>{`
        .js-footer,
        .js-footer *,
        .js-footer *::before,
        .js-footer *::after {
          box-sizing: border-box;
        }

        /* Renamed off the generic .footer/.social-btn names this app used
           to use — those collided with DaisyUI component classes of the
           same name (this app pulls in Tailwind + the DaisyUI plugin
           globally via src/input.css), which was silently taking over
           layout here (DaisyUI's .footer{display:grid;...} plus a
           ".footer > *" rule that even grid-ified this component's own
           inline <style> tag, rendering ~1300px of raw CSS source as
           visible text). Every class in this file is now prefixed
           js-footer- specifically to rule that class of bug out — no
           DaisyUI component is named anything starting with js-footer,
           so nothing here can collide again regardless of load order or
           which properties this file does or doesn't set. */
        .js-footer {
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          box-shadow: none;
        }

        .js-footer-inner {
          width: 100%;
          min-width: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 0.55rem;
          text-align: center;
        }

        .js-footer-links {
          width: auto;
          max-width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin: 0;
          padding: 0;
        }

        .js-footer-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 32px;
          padding: 0.4rem 0.85rem;
          border-radius: 999px;
          color: var(--color-text-primary);
          text-decoration: none;
          font-size: 0.9rem;
          line-height: 1;
          white-space: nowrap;
          background: rgba(var(--color-surface-glass-rgb), 0.46);
          border: 1px solid rgba(var(--color-border-rgb), 0.28);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .js-footer-link:hover,
        .js-footer-link:focus-visible {
          transform: translateY(-1px);
          background: rgba(var(--color-surface-glass-rgb), 0.72);
          border-color: rgba(var(--color-glow-white-rgb), 0.4);
          box-shadow: 0 8px 18px rgba(var(--color-shadow-rgb), 0.22);
        }

        .js-footer-socials {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: nowrap;
          gap: 0.48rem;
          margin: 0;
          padding: 0;
        }

        .js-footer-social-btn {
          width: 35px;
          height: 35px;
          flex: 0 0 35px;
          display: grid;
          place-items: center;
          padding: 0;
          border-radius: 50%;
          color: var(--color-text-primary);
          text-decoration: none;
          background: rgba(var(--color-surface-glass-rgb), 0.48);
          border: 1px solid rgba(var(--color-border-rgb), 0.3);
          transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease, box-shadow 0.18s ease;
        }

        .js-footer-social-btn svg {
          display: block;
          width: 17px;
          height: 17px;
        }

        .js-footer-social-btn:hover,
        .js-footer-social-btn:focus-visible {
          transform: translateY(-1px);
          background: rgba(var(--color-surface-glass-rgb), 0.76);
          border-color: rgba(var(--color-glow-white-rgb), 0.42);
          box-shadow: 0 8px 18px rgba(var(--color-shadow-rgb), 0.22);
        }

        .js-footer-copy {
          margin: 0;
          color: var(--color-text-primary);
          font-size: 0.82rem;
          line-height: 1.2;
          white-space: nowrap;
        }

        @media (max-width: 520px) {
          .js-footer-inner { gap: 0.45rem; }

          .js-footer-links {
            width: min(100%, 360px);
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 0.38rem 0.5rem;
          }

          .js-footer-link {
            width: 100%;
            min-height: 30px;
            padding: 0.32rem 0.5rem;
            font-size: 0.81rem;
          }

          .js-footer-social-btn {
            width: 33px;
            height: 33px;
            flex-basis: 33px;
          }

          .js-footer-social-btn svg {
            width: 16px;
            height: 16px;
          }

          .js-footer-copy { font-size: 0.79rem; }
        }

        @media (max-width: 360px) {
          .js-footer-links { gap: 0.33rem 0.4rem; }
          .js-footer-link { font-size: 0.78rem; }
          .js-footer-social-btn { width: 31px; height: 31px; flex-basis: 31px; }
          .js-footer-social-btn svg { width: 15px; height: 15px; }
          .js-footer-copy { font-size: 0.76rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .js-footer-link,
          .js-footer-social-btn { transition: none; }

          .js-footer-link:hover,
          .js-footer-link:focus-visible,
          .js-footer-social-btn:hover,
          .js-footer-social-btn:focus-visible { transform: none; }
        }
      `}</style>
    </footer>
  );
}
