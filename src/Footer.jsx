// Footer.jsx (fixed: no nested <footer> tags issues)
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      {/* ✅ Use a div instead of footer to avoid footer{} global CSS + nested footer problems */}
      <div className="footer" role="contentinfo">
        <div className="footer-card">
          {/* Navigation */}
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/" className="footer-link">
              <span className="txt">Home</span>
            </Link>

            <Link to="/aboutme" className="footer-link">
              <span className="txt">About</span>
            </Link>

            <Link to="/projects" className="footer-link">
              <span className="txt">Projects</span>
            </Link>

            <Link to="/contact" className="footer-link">
              <span className="txt">Contact</span>
            </Link>
          </nav>

          {/* Socials */}
          <nav className="footer-socials" aria-label="Social links">
            <a
              href="https://www.linkedin.com/in/jaqueline-smith-237366238/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="LinkedIn"
              title="LinkedIn"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M16 6.5v-1.25A2.25 2.25 0 0 0 13.75 3h-3.5A2.25 2.25 0 0 0 8 5.25V6.5"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M4.75 7.75h14.5c.966 0 1.75.784 1.75 1.75v9.5A2.75 2.75 0 0 1 18.25 21.75H5.75A2.75 2.75 0 0 1 3 19V9.5c0-.966.784-1.75 1.75-1.75Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M9.25 21.75V10.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
                <path
                  d="M9.25 12.25h4.5c1.518 0 2.75 1.232 2.75 2.75v6.75"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </a>

            <a
              href="https://github.com/BunniBooXx"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M12 2.75c-5.11 0-9.25 4.14-9.25 9.25 0 4.09 2.65 7.56 6.32 8.78.46.08.63-.2.63-.44v-1.6c-2.57.56-3.11-1.1-3.11-1.1-.42-1.08-1.03-1.37-1.03-1.37-.84-.58.06-.57.06-.57.93.07 1.42.95 1.42.95.82 1.4 2.16 1 2.69.77.08-.6.32-1 .58-1.23-2.05-.23-4.2-1.02-4.2-4.55 0-1 .36-1.82.95-2.46-.1-.23-.41-1.17.09-2.44 0 0 .77-.25 2.52.94a8.7 8.7 0 0 1 4.58 0c1.75-1.19 2.52-.94 2.52-.94.5 1.27.19 2.21.09 2.44.59.64.95 1.46.95 2.46 0 3.54-2.16 4.32-4.22 4.55.33.28.63.84.63 1.69v2.5c0 .24.17.52.63.44A9.26 9.26 0 0 0 21.25 12c0-5.11-4.14-9.25-9.25-9.25Z"
                  fill="currentColor"
                />
              </svg>
            </a>

            <Link
              to="/contact"
              className="social-btn"
              aria-label="Contact"
              title="Contact"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                focusable="false"
              >
                <path
                  d="M5.5 7.75h13c.966 0 1.75.784 1.75 1.75v9c0 .966-.784 1.75-1.75 1.75h-13c-.966 0-1.75-.784-1.75-1.75v-9c0-.966.784-1.75 1.75-1.75Z"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />
                <path
                  d="M4.25 10l7.22 5.05a1.1 1.1 0 0 0 1.26 0L19.75 10"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </nav>

          {/* Copyright */}
          <div className="footer-copy">
            <span>© {new Date().getFullYear()} Jaqueline Smith</span>
          </div>
        </div>
      </div>

      <style>{`
        /* =========================
           Footer — stable flow (no overlay)
           ========================= */

        .footer, .footer * { box-sizing: border-box; }

        /* ✅ Explicitly prevent sticky/fixed footer behavior (some deploy CSS resets do this) */
        .footer{
          width: 100%;
          position: relative !important;
          inset: auto !important;
          top: auto !important;
          right: auto !important;
          bottom: auto !important;
          left: auto !important;
          transform: none !important;

          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          z-index: 1;
        }

        .footer-card{
          width: 100%;
          margin: 0;

          background: #ede9fe;
          border-top: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: 0 14px 34px rgba(139, 92, 246, 0.14);

          border-radius: 40px 40px 0 0;

          padding: 1.1rem 1.25rem 1.05rem;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          gap: 0.9rem;
          text-align: center;
        }

        /* LINKS */
        .footer-links{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin: 0;
          padding: 0;
        }

        .footer-link{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 0.35rem;

          padding: 0.46rem 0.95rem;
          border-radius: 999px;

          text-decoration: none;
          color: #4c1d95;
          font-size: 0.95rem;

          background: rgba(255, 255, 255, 0.78);
          border: 1px solid rgba(139, 92, 246, 0.14);

          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
          white-space: nowrap;
          line-height: 1;
        }

        .footer-link:hover{
          background: rgba(255, 255, 255, 0.96);
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(139, 92, 246, 0.18);
        }

        .footer-link .txt{ font-size: 1em; line-height: 1; }

        /* SOCIAL */
        .footer-socials{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.75rem;
        }

        .social-btn{
          width: 40px;
          height: 40px;
          border-radius: 999px;
          display: grid;
          place-items: center;

          font-size: 1.2rem;
          line-height: 1;

          background: rgba(255, 255, 255, 0.94);
          border: 1px solid rgba(139, 92, 246, 0.14);
          text-decoration: none;

          box-shadow: 0 10px 18px rgba(139, 92, 246, 0.14);
          transition: transform 0.18s ease, box-shadow 0.18s ease, background 0.18s ease;
        }

        .social-btn:hover{
          transform: translateY(-3px) scale(1.05);
          background: #f5f3ff;
          box-shadow: 0 14px 26px rgba(139, 92, 246, 0.2);
        }

        /* COPYRIGHT */
        .footer-copy{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-wrap: wrap;
          gap: 0.4rem;
          color: #5b21b6;
          font-size: 0.88rem;
          text-align: center;
        }

        /* ✅ MOBILE: 2-column link grid */
        @media (max-width: 520px){
          .footer-card{
            border-radius: 30px 30px 0 0;
            padding: 0.95rem 0.85rem 0.9rem;
            gap: 0.75rem;
          }

          .footer-links{
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.55rem;
            max-width: 420px;
            margin: 0 auto;
          }

          .footer-link{
            width: 100%;
            padding: 0.38rem 0.55rem;
            font-size: 0.82rem;
            gap: 0.28rem;
          }

          .social-btn{
            width: 34px;
            height: 34px;
            font-size: 1.05rem;
          }

          .footer-copy{ font-size: 0.82rem; }
        }

        @media (max-width: 360px){
          .footer-link{
            padding: 0.34rem 0.48rem;
            font-size: 0.78rem;
          }

          .social-btn{
            width: 32px;
            height: 32px;
            font-size: 1rem;
          }
        }
      `}</style>
    </>
  );
}
