import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <footer className="footer" role="contentinfo">
        <div className="footer-card">
          {/* Navigation */}
          <nav className="footer-links" aria-label="Footer navigation">
            <Link to="/" className="footer-link">
              <span className="ico" aria-hidden="true">
                🏠
              </span>
              <span className="txt">Home</span>
            </Link>

            <Link to="/aboutme" className="footer-link">
              <span className="ico" aria-hidden="true">
                👩‍💻
              </span>
              <span className="txt">About</span>
            </Link>

            <Link to="/projects" className="footer-link">
              <span className="ico" aria-hidden="true">
                🚀
              </span>
              <span className="txt">Projects</span>
            </Link>

            <Link to="/contact" className="footer-link">
              <span className="ico" aria-hidden="true">
                ✉️
              </span>
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
              💼
            </a>

            <a
              href="https://github.com/BunniBooXx"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="GitHub"
              title="GitHub"
            >
              🐱
            </a>

            <a
              href="https://medium.com/@your-medium"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn"
              aria-label="Medium"
              title="Medium"
            >
              📝
            </a>
          </nav>

          {/* Copyright */}
          <div className="footer-copy">
            <span className="heart" aria-hidden="true">
              ♥
            </span>
            <span>© {new Date().getFullYear()} Jaqueline Smith</span>
            <span className="heart" aria-hidden="true">
              ♥
            </span>
          </div>
        </div>
      </footer>

      <style>{`
        /* =========================
           Footer — NO lavender rectangle bridge
           ========================= */

        .footer, .footer * { box-sizing: border-box; }

        /* ✅ Footer stays in flow */
        .footer{
          width: 100%;
          position: relative;
          margin: 0;
          padding: 0;
          background: transparent;
          border: 0;
          z-index: 20;
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
          gap: 0.45rem;

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

        .footer-link .ico{ font-size: 1.05em; line-height: 1; transform: translateY(-0.5px); }
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

        .heart{
          display: inline-block;
          animation: pulse 1.6s infinite;
        }

        @keyframes pulse{
          0%, 100%{ transform: scale(1); }
          50%{ transform: scale(1.22); }
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
            gap: 0.35rem;
          }

          .footer-link .ico{ font-size: 0.95em; }

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
