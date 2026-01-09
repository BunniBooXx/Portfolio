import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // ✅ click-to-toggle dropdown (stays open until you click outside or choose an item)
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  // close dropdown on route change
  useEffect(() => setOpen(false), [location.pathname]);

  // close on outside click / touch
  useEffect(() => {
    const onDown = (e) => {
      if (!dropRef.current) return;
      if (!dropRef.current.contains(e.target)) setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });

    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // close on Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const links = useMemo(
    () => [
      { to: "/aboutme", label: "About Me", icon: "👩‍💻" },
      { to: "/projects", label: "Projects", icon: "🚀" },
      { to: "/resume", label: "Resume", icon: "📝" },
    ],
    []
  );

  const isActive = (path) => location.pathname === path;
  const isHome = location.pathname === "/" || location.pathname === "";

  return (
    <>
      <nav
        className={`lav-navbar ${isHome ? "not-sticky" : "is-sticky"}`}
        aria-label="Primary"
      >
        <div className="lav-inner">
          <Link to="/" className="lav-brand" aria-label="Home">
            <span className="lav-heart">♥</span>
            <span className="lav-brandText">Home</span>
            <span className="lav-heart">♥</span>
          </Link>

          <div className="lav-right">
            <Link
              to="/projects"
              className={`lav-link ${isActive("/projects") ? "active" : ""}`}
            >
              🚀 <span className="lav-linkText">Projects</span>
            </Link>

            {/* ✅ CLICK dropdown */}
            <div className="lav-drop" ref={dropRef}>
              <button
                type="button"
                className={`lav-btn ${open ? "active" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={open}
              >
                ✨ <span className="lav-moreText">More</span>{" "}
                <span className="lav-caret">▾</span>
              </button>

              {/* ✅ stays visible when open */}
              <div className={`lav-menu ${open ? "open" : ""}`} role="menu">
                {links.map((l) => (
                  <Link
                    key={l.to}
                    to={l.to}
                    className="lav-item"
                    role="menuitem"
                    onClick={() => setOpen(false)} // ✅ closes after choosing
                  >
                    <span className="lav-itemIcon">{l.icon}</span>
                    <span className="lav-itemLabel">{l.label}</span>
                    <span className="lav-dot" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      <style>{`
        /* ✅ FULL-WIDTH LAVENDER BACKDROP */
        .lav-navbar{
          z-index: 1000;
          width: 100%;
          display: flex;
          justify-content: center;
          pointer-events: auto;
          margin-top: 0;
          padding: 14px 12px 16px;
          box-sizing: border-box;

          background:
            radial-gradient(900px 220px at 18% 0%, rgba(255,255,255,0.60) 0%, rgba(255,255,255,0) 60%),
            radial-gradient(900px 220px at 82% 0%, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(135deg, #F6F1FF 0%, #EDE2FF 48%, #E7D7FF 100%);

          box-shadow: 0 10px 24px rgba(40, 20, 80, 0.10);
        }

        .lav-navbar.is-sticky{
          position: sticky;
          top: 0;
        }

        .lav-navbar.not-sticky{
          position: relative;
          top: auto;
        }

        /* PILL */
        .lav-inner{
          position: relative;
          width: min(1100px, 100%);
          padding: 14px 18px;
          padding-right: 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;

          border-radius: 999px;
          background:
            radial-gradient(1200px 220px at 20% 20%, rgba(255,255,255,0.7), transparent 60%),
            linear-gradient(135deg, #f3eaff, #e6d9ff, #d7c7ff);

          border: 1px solid rgba(255,255,255,0.65);
          box-shadow:
            0 20px 60px rgba(140, 90, 200, 0.22),
            0 6px 18px rgba(140, 90, 200, 0.16);

          backdrop-filter: blur(14px);
          overflow: visible;
        }

        .lav-inner::before{
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 999px;
          pointer-events: none;

          background:
            radial-gradient(260px 260px at 0% 0%, rgba(217,201,255,0.45), transparent 65%),
            radial-gradient(260px 260px at 100% 0%, rgba(198,230,255,0.45), transparent 65%),
            radial-gradient(rgba(255,255,255,0.12) 1px, transparent 1px);

          background-size: auto, auto, 18px 18px;
          opacity: 0.28;

          -webkit-mask: radial-gradient(#000 98%, transparent 100%);
          mask: radial-gradient(#000 98%, transparent 100%);
        }

        /* BRAND */
        .lav-brand{
          display: inline-flex;
          align-items: center;
          gap: 6px;
          text-decoration: none;
          color: #5a2fa8;
          font-weight: 800;
          padding: 7px 12px;
          border-radius: 999px;
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.55);
          white-space: nowrap;
          position: relative;
          z-index: 1;
        }

        .lav-heart{ animation: pulse 1.6s infinite; }
        @keyframes pulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

        /* RIGHT */
        .lav-right{
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 0 1 auto;
          min-width: 0;
          position: relative;
          z-index: 1;
        }

        .lav-link,
        .lav-btn{
          border-radius: 999px;
          padding: 8px 14px;
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.55);
          font-weight: 700;
          color: #5a2fa8;
          cursor: pointer;
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          white-space: nowrap;
          transform: translateZ(0);
        }

        .lav-link.active,
        .lav-link:hover,
        .lav-btn:hover,
        .lav-btn.active{
          background: rgba(255,255,255,0.68);
        }

        .lav-btn:focus-visible,
        .lav-link:focus-visible,
        .lav-brand:focus-visible{
          outline: 3px solid rgba(123,92,255,0.35);
          outline-offset: 3px;
        }

        /* ✅ DROPDOWN (CLICK-OPEN) */
        .lav-drop{ position: relative; }

        .lav-menu{
          position: absolute;
          right: 0;
          top: calc(100% + 10px);
          width: 230px;
          padding: 8px;
          border-radius: 22px;
          background: rgba(255,255,255,0.86);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(123,92,255,0.16);
          box-shadow: 0 24px 60px rgba(120, 70, 180, 0.25);

          opacity: 0;
          transform: translateY(-6px) scale(0.98);
          pointer-events: none;
          transition: 0.18s ease;
          z-index: 3000;
        }

        .lav-menu.open{
          opacity: 1;
          transform: translateY(0) scale(1);
          pointer-events: auto;
        }

        .lav-item{
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 16px;
          color: #5a2fa8;
          text-decoration: none;
          background: rgba(255,255,255,0.62);
          border: 1px solid rgba(123,92,255,0.10);
        }

        .lav-item:hover{ background: rgba(255,255,255,0.78); }

        .lav-dot{
          margin-left: auto;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #cbb6ff;
        }

        @media (max-width: 520px){
          .lav-linkText{ display: none; }
          .lav-moreText{ display: none; }
          .lav-inner{ padding: 12px 14px; padding-right: 16px; }
          .lav-navbar{ padding: 12px 10px 14px; }
        }

        @media (prefers-reduced-motion: reduce){
          .lav-menu{ transition: none; }
        }
      `}</style>
    </>
  );
}
