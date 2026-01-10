import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();

  // dropdown open state (desktop + mobile)
  const [open, setOpen] = useState(false);
  const dropRef = useRef(null);

  // mobile “hamburger” open state
  const [mobileOpen, setMobileOpen] = useState(false);

  // close menus on route change
  useEffect(() => {
    setOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

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
      if (e.key === "Escape") {
        setOpen(false);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // prevent body scroll when mobile panel open
  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [mobileOpen]);

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
          {/* LEFT: Brand */}
          <Link to="/" className="lav-brand" aria-label="Home">
            <span className="lav-heart">♥</span>
            <span className="lav-brandText">Home</span>
            <span className="lav-heart">♥</span>
          </Link>

          {/* DESKTOP RIGHT */}
          <div className="lav-right lav-desktop">
            <Link
              to="/projects"
              className={`lav-link ${isActive("/projects") ? "active" : ""}`}
            >
              🚀 <span className="lav-linkText">Projects</span>
            </Link>

            {/* Click dropdown */}
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

              <div className={`lav-menu ${open ? "open" : ""}`} role="menu">
                {links
                  .filter((l) => l.to !== "/projects")
                  .map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className="lav-item"
                      role="menuitem"
                      onClick={() => setOpen(false)}
                    >
                      <span className="lav-itemIcon">{l.icon}</span>
                      <span className="lav-itemLabel">{l.label}</span>
                      <span className="lav-dot" aria-hidden />
                    </Link>
                  ))}
              </div>
            </div>
          </div>

          {/* MOBILE RIGHT */}
          <div className="lav-mobile">
            <button
              type="button"
              className={`lav-hamb ${mobileOpen ? "active" : ""}`}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              aria-controls="lav-mobile-panel"
            >
              <span className="lav-hambIcon" aria-hidden>
                <span className="bar b1" />
                <span className="bar b2" />
                <span className="bar b3" />
              </span>
            </button>
          </div>
        </div>

        {/* MOBILE PANEL */}
        <div
          id="lav-mobile-panel"
          className={`lav-mobilePanel ${mobileOpen ? "open" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <div className="lav-mobileSheet" role="document">
            <div className="lav-mobileTop">
              <div className="lav-mobileTitle">
                <span className="lav-mobileSpark">✨</span>
                <span>Menu</span>
              </div>

              <button
                type="button"
                className="lav-x"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <div className="lav-mobileList">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`lav-mItem ${isActive(l.to) ? "active" : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  <span className="lav-mIcon">{l.icon}</span>
                  <span className="lav-mLabel">{l.label}</span>
                  <span className="lav-mChevron">›</span>
                </Link>
              ))}
            </div>

            <div className="lav-mobileBottom">
              <Link
                to="/"
                className="lav-mHome"
                onClick={() => setMobileOpen(false)}
              >
                ♥ Back to Home ♥
              </Link>
            </div>
          </div>

          {/* tap outside to close */}
          <button
            type="button"
            className="lav-mobileBackdrop"
            aria-label="Close menu backdrop"
            onClick={() => setMobileOpen(false)}
            tabIndex={-1}
          />
        </div>
      </nav>

      <style>{`
        /* ==============
           NAV WRAPPER
        ============== */
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

        .lav-navbar.is-sticky{ position: sticky; top: 0; }
        .lav-navbar.not-sticky{ position: relative; top: auto; }

        /* ==============
           PILL CONTAINER
        ============== */
        .lav-inner{
          position: relative;
          width: min(1100px, 100%);
          padding: 14px 18px;
          padding-right: 18px;
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

        /* ==============
           BRAND
        ============== */
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
          min-width: 0;
        }

        .lav-brandText{
          display: inline-block;
          max-width: 40vw;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .lav-heart{ animation: pulse 1.6s infinite; }
        @keyframes pulse{ 0%,100%{transform:scale(1)} 50%{transform:scale(1.15)} }

        /* ==============
           DESKTOP RIGHT
        ============== */
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
          min-height: 40px;
        }

        .lav-link.active,
        .lav-link:hover,
        .lav-btn:hover,
        .lav-btn.active{
          background: rgba(255,255,255,0.68);
        }

        .lav-btn:focus-visible,
        .lav-link:focus-visible,
        .lav-brand:focus-visible,
        .lav-hamb:focus-visible,
        .lav-x:focus-visible,
        .lav-mItem:focus-visible{
          outline: 3px solid rgba(123,92,255,0.35);
          outline-offset: 3px;
        }

        /* DROPDOWN */
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

        /* ==============
           MOBILE TOGGLE
        ============== */
        .lav-mobile{ display: none; position: relative; z-index: 2; }

        .lav-hamb{
          border-radius: 999px;
          width: 44px;
          height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.45);
          border: 1px solid rgba(255,255,255,0.55);
          cursor: pointer;
        }

        .lav-hamb.active{ background: rgba(255,255,255,0.68); }

        .lav-hambIcon{
          width: 18px;
          height: 14px;
          position: relative;
          display: inline-block;
        }

        .lav-hambIcon .bar{
          position: absolute;
          left: 0;
          right: 0;
          height: 2px;
          border-radius: 999px;
          background: rgba(90,47,168,0.85);
          transition: transform 0.18s ease, opacity 0.18s ease, top 0.18s ease;
        }

        .lav-hambIcon .b1{ top: 0; }
        .lav-hambIcon .b2{ top: 6px; }
        .lav-hambIcon .b3{ top: 12px; }

        .lav-hamb.active .b1{ top: 6px; transform: rotate(45deg); }
        .lav-hamb.active .b2{ opacity: 0; }
        .lav-hamb.active .b3{ top: 6px; transform: rotate(-45deg); }

        /* ==============
           MOBILE PANEL (overlay + sheet)
        ============== */
        .lav-mobilePanel{
          position: fixed;
          inset: 0;
          z-index: 9999;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.18s ease;
        }

        .lav-mobilePanel.open{
          pointer-events: auto;
          opacity: 1;
        }

        .lav-mobileBackdrop{
          position: absolute;
          inset: 0;
          background: rgba(20, 10, 40, 0.35);
          border: 0;
          padding: 0;
          margin: 0;
          cursor: default;
        }

        .lav-mobileSheet{
          position: absolute;
          left: 12px;
          right: 12px;
          top: 12px;
          border-radius: 26px;
          background:
            radial-gradient(800px 240px at 20% 10%, rgba(255,255,255,0.75), transparent 60%),
            linear-gradient(135deg, rgba(255,255,255,0.92), rgba(255,255,255,0.80));
          backdrop-filter: blur(18px);
          border: 1px solid rgba(123,92,255,0.18);
          box-shadow: 0 28px 80px rgba(60, 20, 120, 0.35);

          transform: translateY(-8px) scale(0.98);
          transition: transform 0.18s ease;
          overflow: hidden;
        }

        .lav-mobilePanel.open .lav-mobileSheet{
          transform: translateY(0) scale(1);
        }

        .lav-mobileTop{
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 14px 14px 10px;
          border-bottom: 1px solid rgba(123,92,255,0.12);
        }

        .lav-mobileTitle{
          display: inline-flex;
          align-items: center;
          gap: 10px;
          font-weight: 900;
          color: #5a2fa8;
          letter-spacing: 0.2px;
        }

        .lav-mobileSpark{
          width: 28px;
          height: 28px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 999px;
          background: rgba(123,92,255,0.12);
          border: 1px solid rgba(123,92,255,0.14);
        }

        .lav-x{
          width: 40px;
          height: 40px;
          border-radius: 999px;
          background: rgba(255,255,255,0.60);
          border: 1px solid rgba(123,92,255,0.14);
          color: rgba(90,47,168,0.90);
          cursor: pointer;
          font-weight: 900;
        }

        .lav-mobileList{
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .lav-mItem{
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 14px;
          border-radius: 18px;
          text-decoration: none;
          color: #5a2fa8;
          background: rgba(255,255,255,0.65);
          border: 1px solid rgba(123,92,255,0.12);
          font-weight: 800;
        }

        .lav-mItem.active{
          background: rgba(255,255,255,0.82);
          border-color: rgba(123,92,255,0.18);
        }

        .lav-mIcon{
          width: 34px;
          height: 34px;
          border-radius: 14px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          background: rgba(123,92,255,0.10);
          border: 1px solid rgba(123,92,255,0.12);
          flex: 0 0 auto;
        }

        .lav-mLabel{
          flex: 1 1 auto;
          min-width: 0;
        }

        .lav-mChevron{
          opacity: 0.65;
          font-size: 18px;
          transform: translateY(-1px);
        }

        .lav-mobileBottom{
          padding: 12px 12px 14px;
          border-top: 1px solid rgba(123,92,255,0.12);
        }

        .lav-mHome{
          display: flex;
          align-items: center;
          justify-content: center;
          text-decoration: none;
          padding: 12px 14px;
          border-radius: 18px;
          font-weight: 900;
          color: #5a2fa8;
          background: rgba(255,255,255,0.70);
          border: 1px solid rgba(123,92,255,0.14);
        }

        /* ==============
           RESPONSIVE BREAKPOINTS
        ============== */
        /* On smaller screens: hide desktop links, show hamburger */
        @media (max-width: 720px){
          .lav-desktop{ display: none; }
          .lav-mobile{ display: inline-flex; }
          .lav-inner{
            padding: 12px 14px;
          }
          .lav-navbar{
            padding: 12px 10px 14px;
          }
          .lav-brand{
            padding: 7px 10px;
          }
        }

        /* Extra tiny phones */
        @media (max-width: 380px){
          .lav-brandText{ max-width: 32vw; }
        }

        @media (prefers-reduced-motion: reduce){
          .lav-menu,
          .lav-mobilePanel,
          .lav-mobileSheet,
          .lav-hambIcon .bar{
            transition: none;
          }
          .lav-heart{ animation: none; }
        }
      `}</style>
    </>
  );
}
