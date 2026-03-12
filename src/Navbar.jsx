// Navbar.jsx — refined glassmorphism navbar with shimmer, animated indicators, mobile drawer
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [dropOpen, setDropOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef(null);

  const isHome = location.pathname === "/" || location.pathname === "";

  // Close everything on route change
  useEffect(() => {
    setDropOpen(false);
    setMobileOpen(false);
  }, [location.pathname]);

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Outside click closes dropdown
  useEffect(() => {
    const onDown = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("touchstart", onDown);
    };
  }, []);

  // Escape key
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { setDropOpen(false); setMobileOpen(false); }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const moreLinks = useMemo(() => [
    { to: "/aboutme", label: "About Me",  icon: "👩‍💻" },
    { to: "/resume",  label: "Resume",    icon: "📝"   },
  ], []);

  const allLinks = useMemo(() => [
    { to: "/",        label: "Home",     icon: "♥"   },
    { to: "/projects",label: "Projects", icon: "🚀"  },
    { to: "/aboutme", label: "About Me", icon: "👩‍💻" },
    { to: "/resume",  label: "Resume",   icon: "📝"  },
  ], []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={[
          "lav-nav",
          isHome ? "lav-nav--home" : "lav-nav--sticky",
          scrolled ? "lav-nav--scrolled" : "",
        ].join(" ")}
        aria-label="Primary navigation"
      >
        {/* shimmer sweep line */}
        <div className="lav-shimmer" aria-hidden="true" />

        <div className="lav-pill">
          {/* Brand */}
          <Link to="/" className="lav-brand" aria-label="Home">
            <span className="lav-brandHeart" aria-hidden="true">♥</span>
            <span className="lav-brandName">Home</span>
            <span className="lav-brandHeart lav-brandHeart--r" aria-hidden="true">♥</span>
          </Link>

          {/* Desktop links */}
          <div className="lav-links" role="list">
            <Link
              to="/projects"
              role="listitem"
              className={`lav-link ${isActive("/projects") ? "lav-link--active" : ""}`}
            >
              <span className="lav-linkIcon" aria-hidden="true">🚀</span>
              <span className="lav-linkLabel">Projects</span>
              {isActive("/projects") && <span className="lav-activeDot" aria-hidden="true" />}
            </Link>

            {/* More dropdown */}
            <div className="lav-drop" ref={dropRef} role="listitem">
              <button
                type="button"
                className={`lav-link lav-dropTrigger ${dropOpen ? "lav-link--open" : ""}`}
                onClick={() => setDropOpen((v) => !v)}
                aria-haspopup="menu"
                aria-expanded={dropOpen}
              >
                <span className="lav-linkIcon" aria-hidden="true">✦</span>
                <span className="lav-linkLabel">More</span>
                <span className={`lav-chevron ${dropOpen ? "lav-chevron--up" : ""}`} aria-hidden="true">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              {/* Dropdown panel */}
              <div
                className={`lav-dropPanel ${dropOpen ? "lav-dropPanel--open" : ""}`}
                role="menu"
                aria-hidden={!dropOpen}
              >
                <div className="lav-dropInner">
                  {moreLinks.map((l, i) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      className={`lav-dropItem ${isActive(l.to) ? "lav-dropItem--active" : ""}`}
                      role="menuitem"
                      onClick={() => setDropOpen(false)}
                      style={{ animationDelay: dropOpen ? `${i * 55}ms` : "0ms" }}
                    >
                      <span className="lav-dropItemIcon">{l.icon}</span>
                      <span className="lav-dropItemLabel">{l.label}</span>
                      <span className="lav-dropItemArrow" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            className={`lav-burger ${mobileOpen ? "lav-burger--open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <span /><span /><span />
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className={`lav-drawer ${mobileOpen ? "lav-drawer--open" : ""}`}
          role="dialog"
          aria-label="Mobile navigation"
          aria-modal="true"
        >
          <div className="lav-drawerInner">
            {allLinks.map((l, i) => (
              <Link
                key={l.to}
                to={l.to}
                className={`lav-drawerLink ${isActive(l.to) ? "lav-drawerLink--active" : ""}`}
                onClick={() => setMobileOpen(false)}
                style={{ animationDelay: mobileOpen ? `${60 + i * 60}ms` : "0ms" }}
              >
                <span className="lav-drawerIcon">{l.icon}</span>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          className="lav-backdrop"
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <style>{`
        /* =============================================
           TOKENS
        ============================================= */
        .lav-nav {
          --c-purple:     #7c4fff;
          --c-purple-mid: #a47aff;
          --c-purple-pale:#d8c8ff;
          --c-bg-pill:    rgba(246,240,255,0.82);
          --c-border:     rgba(255,255,255,0.70);
          --c-shadow-sm:  0 4px 20px rgba(100,60,200,0.12);
          --c-shadow-lg:  0 12px 48px rgba(100,60,200,0.20);
          --pill-radius:  999px;
          --transition:   200ms cubic-bezier(0.34, 1.2, 0.64, 1);
          --font:         Nunito, ui-sans-serif, system-ui;
        }

        .lav-nav, .lav-nav * { box-sizing: border-box; }

        /* =============================================
           NAV WRAPPER
        ============================================= */
        .lav-nav {
          position: relative !important;
          inset: auto !important;
          z-index: 1000;
          width: 100%;
          padding: 10px 16px 12px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font);

          /* Seamless background that blends with page */
          background: linear-gradient(
            180deg,
            rgba(246,240,255,0.96) 0%,
            rgba(237,226,255,0.88) 100%
          );
          backdrop-filter: blur(20px) saturate(1.6);
          -webkit-backdrop-filter: blur(20px) saturate(1.6);
          border-bottom: 1px solid rgba(200,180,255,0.25);
          transition: box-shadow 300ms ease;
        }

        .lav-nav--sticky {
          position: sticky !important;
          top: 0 !important;
        }

        .lav-nav--home {
          position: relative !important;
          top: auto !important;
        }

        .lav-nav--scrolled {
          box-shadow: var(--c-shadow-lg);
        }

        /* shimmer sweep — purely decorative */
        .lav-shimmer {
          position: absolute;
          top: 0; left: -100%;
          width: 60%;
          height: 100%;
          background: linear-gradient(
            105deg,
            transparent 30%,
            rgba(255,255,255,0.28) 50%,
            transparent 70%
          );
          animation: shimmerSweep 6s ease-in-out infinite;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes shimmerSweep {
          0%   { left: -100%; opacity: 0; }
          10%  { opacity: 1; }
          60%  { left: 140%; opacity: 1; }
          61%  { opacity: 0; }
          100% { left: 140%; opacity: 0; }
        }

        /* =============================================
           PILL
        ============================================= */
        .lav-pill {
          position: relative;
          z-index: 1;
          width: min(1100px, 100%);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
          padding: 10px 10px 10px 16px;

          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.72) 0%,
            rgba(244,235,255,0.68) 50%,
            rgba(235,220,255,0.66) 100%
          );
          border: 1px solid var(--c-border);
          border-radius: var(--pill-radius);
          box-shadow:
            var(--c-shadow-sm),
            inset 0 1px 0 rgba(255,255,255,0.80),
            inset 0 -1px 0 rgba(160,120,255,0.08);
        }

        /* top-left inner glow */
        .lav-pill::before {
          content: "";
          position: absolute;
          top: 0; left: 0;
          width: 40%; height: 100%;
          border-radius: var(--pill-radius);
          background: radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.45), transparent 70%);
          pointer-events: none;
        }

        /* =============================================
           BRAND
        ============================================= */
        .lav-brand {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          text-decoration: none;
          padding: 6px 14px;
          border-radius: var(--pill-radius);
          border: 1px solid rgba(180,140,255,0.25);
          background: rgba(255,255,255,0.55);
          box-shadow: 0 2px 10px rgba(140,90,255,0.10);
          transition: background var(--transition), transform var(--transition), box-shadow var(--transition);
        }

        .lav-brand:hover {
          background: rgba(255,255,255,0.80);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(140,90,255,0.18);
        }

        .lav-brandHeart {
          font-size: 0.72rem;
          color: var(--c-purple);
          opacity: 0.7;
          transition: opacity 200ms;
        }

        .lav-brandHeart--r {
          animation: heartPulse 2.8s ease-in-out infinite;
        }

        @keyframes heartPulse {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.3); opacity: 1;   }
        }

        .lav-brandName {
          font-size: 0.82rem;
          font-weight: 900;
          letter-spacing: 0.04em;
          color: #3d1f8a;
        }

        /* =============================================
           DESKTOP LINKS
        ============================================= */
        .lav-links {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .lav-link {
          position: relative;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 7px 14px;
          border-radius: var(--pill-radius);
          border: 1px solid transparent;
          background: transparent;
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 800;
          color: #4a2a96;
          cursor: pointer;
          transition:
            background var(--transition),
            border-color var(--transition),
            color var(--transition),
            transform var(--transition),
            box-shadow var(--transition);
          white-space: nowrap;
          letter-spacing: 0.02em;
          font-family: var(--font);
        }

        .lav-link:hover {
          background: rgba(255,255,255,0.68);
          border-color: rgba(180,140,255,0.30);
          color: var(--c-purple);
          transform: translateY(-1px);
          box-shadow: 0 4px 14px rgba(140,90,255,0.14);
        }

        .lav-link--active {
          background: rgba(255,255,255,0.75);
          border-color: rgba(160,110,255,0.35);
          color: var(--c-purple);
          box-shadow: 0 4px 16px rgba(140,90,255,0.16);
        }

        .lav-link--open {
          background: rgba(255,255,255,0.65);
          border-color: rgba(160,110,255,0.30);
          color: var(--c-purple);
        }

        .lav-linkIcon { font-size: 0.82rem; line-height: 1; }
        .lav-linkLabel { line-height: 1; }

        /* active dot indicator */
        .lav-activeDot {
          position: absolute;
          bottom: 4px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: var(--c-purple);
          box-shadow: 0 0 6px rgba(124,79,255,0.6);
          animation: dotPop 300ms cubic-bezier(0.34,1.56,0.64,1) both;
        }

        @keyframes dotPop {
          from { transform: translateX(-50%) scale(0); opacity: 0; }
          to   { transform: translateX(-50%) scale(1); opacity: 1; }
        }

        /* chevron */
        .lav-chevron {
          display: inline-flex;
          align-items: center;
          transition: transform 220ms ease;
          color: var(--c-purple-mid);
        }
        .lav-chevron--up { transform: rotate(180deg); }

        /* =============================================
           DROPDOWN PANEL
        ============================================= */
        .lav-drop { position: relative; }

        .lav-dropPanel {
          position: absolute;
          top: calc(100% + 10px);
          right: 0;
          min-width: 200px;
          z-index: 200;

          background: rgba(250,246,255,0.96);
          backdrop-filter: blur(20px) saturate(1.5);
          -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid rgba(200,170,255,0.40);
          border-radius: 18px;
          box-shadow:
            0 20px 60px rgba(100,60,200,0.18),
            0 4px 16px rgba(100,60,200,0.10),
            inset 0 1px 0 rgba(255,255,255,0.80);

          overflow: hidden;
          pointer-events: none;
          opacity: 0;
          transform: translateY(-8px) scale(0.97);
          transform-origin: top right;
          transition:
            opacity 200ms ease,
            transform 220ms cubic-bezier(0.34,1.2,0.64,1);
        }

        .lav-dropPanel--open {
          pointer-events: auto;
          opacity: 1;
          transform: translateY(0) scale(1);
        }

        .lav-dropInner {
          padding: 8px;
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .lav-dropItem {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 12px;
          text-decoration: none;
          font-size: 0.84rem;
          font-weight: 800;
          color: #3d1f8a;
          border: 1px solid transparent;
          transition:
            background var(--transition),
            border-color var(--transition),
            transform var(--transition);
          animation: dropItemIn 200ms ease both;
        }

        @keyframes dropItemIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0);   }
        }

        .lav-dropItem:hover {
          background: rgba(220,200,255,0.35);
          border-color: rgba(180,140,255,0.25);
          transform: translateX(3px);
        }

        .lav-dropItem--active {
          background: rgba(200,175,255,0.28);
          border-color: rgba(180,140,255,0.30);
          color: var(--c-purple);
        }

        .lav-dropItemIcon { font-size: 1rem; line-height: 1; flex-shrink: 0; }
        .lav-dropItemLabel { flex: 1; }
        .lav-dropItemArrow {
          font-size: 0.75rem;
          color: var(--c-purple-mid);
          opacity: 0;
          transition: opacity 180ms, transform 180ms;
        }
        .lav-dropItem:hover .lav-dropItemArrow {
          opacity: 1;
          transform: translateX(3px);
        }

        /* =============================================
           MOBILE HAMBURGER
        ============================================= */
        .lav-burger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 4.5px;
          width: 38px;
          height: 38px;
          padding: 8px;
          border-radius: 12px;
          border: 1px solid rgba(180,140,255,0.28);
          background: rgba(255,255,255,0.55);
          cursor: pointer;
          transition: background var(--transition), box-shadow var(--transition);
          flex-shrink: 0;
        }

        .lav-burger:hover {
          background: rgba(255,255,255,0.80);
          box-shadow: 0 4px 14px rgba(140,90,255,0.14);
        }

        .lav-burger span {
          display: block;
          width: 18px;
          height: 1.8px;
          border-radius: 999px;
          background: var(--c-purple);
          transition: transform 260ms ease, opacity 200ms ease, width 260ms ease;
          transform-origin: center;
        }

        .lav-burger--open span:nth-child(1) { transform: translateY(6.3px) rotate(45deg); }
        .lav-burger--open span:nth-child(2) { opacity: 0; width: 0; }
        .lav-burger--open span:nth-child(3) { transform: translateY(-6.3px) rotate(-45deg); }

        /* =============================================
           MOBILE DRAWER
        ============================================= */
        .lav-drawer {
          display: none;
          width: 100%;
          overflow: hidden;
          max-height: 0;
          transition: max-height 320ms cubic-bezier(0.4,0,0.2,1);
        }

        .lav-drawer--open {
          max-height: 400px;
        }

        .lav-drawerInner {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 8px 14px;
        }

        .lav-drawerLink {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 16px;
          border-radius: 14px;
          text-decoration: none;
          font-size: 0.92rem;
          font-weight: 800;
          color: #3d1f8a;
          border: 1px solid transparent;
          opacity: 0;
          transform: translateX(-10px);
          animation: none;
          transition:
            background var(--transition),
            border-color var(--transition),
            color var(--transition);
        }

        .lav-drawer--open .lav-drawerLink {
          animation: drawerLinkIn 280ms ease both;
        }

        @keyframes drawerLinkIn {
          from { opacity: 0; transform: translateX(-10px); }
          to   { opacity: 1; transform: translateX(0);     }
        }

        .lav-drawerLink:hover {
          background: rgba(220,200,255,0.35);
          border-color: rgba(180,140,255,0.25);
          color: var(--c-purple);
        }

        .lav-drawerLink--active {
          background: rgba(210,185,255,0.30);
          border-color: rgba(170,130,255,0.30);
          color: var(--c-purple);
        }

        .lav-drawerIcon { font-size: 1.1rem; line-height: 1; }

        /* =============================================
           BACKDROP
        ============================================= */
        .lav-backdrop {
          position: fixed;
          inset: 0;
          z-index: 999;
          background: rgba(30,10,60,0.18);
          backdrop-filter: blur(2px);
          -webkit-backdrop-filter: blur(2px);
          animation: fadeIn 200ms ease both;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }

        /* =============================================
           RESPONSIVE
        ============================================= */
        @media (max-width: 680px) {
          .lav-links   { display: none; }
          .lav-burger  { display: flex; }
          .lav-drawer  { display: block; }
          .lav-nav     { padding: 8px 10px 10px; }
        }

        @media (max-width: 420px) {
          .lav-brandName { display: none; }
          .lav-brandHeart--r { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .lav-shimmer,
          .lav-brandHeart--r,
          .lav-activeDot { animation: none; }
          .lav-link,
          .lav-brand,
          .lav-dropPanel,
          .lav-dropItem,
          .lav-drawerLink,
          .lav-burger span { transition: none; }
        }
      `}</style>
    </>
  );
}