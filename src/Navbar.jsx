// Navbar.jsx — ResizeObserver fix: drawer uses opacity/visibility/translateY NOT max-height
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Navbar() {
  const location = useLocation();
  const [dropOpen, setDropOpen]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);
  const dropRef = useRef(null);

  useEffect(() => { setDropOpen(false); setMobileOpen(false); }, [location.pathname]);

  useEffect(() => {
    const scrollEl = document.querySelector(".app-main");
    if (!scrollEl) return;
    const onScroll = () => setScrolled(scrollEl.scrollTop > 12);
    onScroll();
    scrollEl.addEventListener("scroll", onScroll, { passive: true });
    return () => scrollEl.removeEventListener("scroll", onScroll);
  }, [location.pathname]);

  useEffect(() => {
    const onDown = (e) => {
      if (dropRef.current && !dropRef.current.contains(e.target)) setDropOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("touchstart", onDown, { passive: true });
    return () => { document.removeEventListener("mousedown", onDown); document.removeEventListener("touchstart", onDown); };
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") { setDropOpen(false); setMobileOpen(false); } };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    const appMain = document.querySelector(".app-main");
    if (mobileOpen && appMain) appMain.style.overflow = "hidden";
    else if (appMain) appMain.style.overflow = "";
    return () => { if (appMain) appMain.style.overflow = ""; };
  }, [mobileOpen]);

  const moreLinks = useMemo(() => [
    { to: "/aboutme", label: "About Me" },
    { to: "/resume",  label: "Resume" },
  ], []);

  const allLinks = useMemo(() => [
    { to: "/",         label: "Home" },
    { to: "/projects", label: "Projects" },
    { to: "/aboutme",  label: "About Me" },
    { to: "/resume",   label: "Resume" },
  ], []);

  const isActive = (path) =>
    path === "/" ? location.pathname === "/" : location.pathname.startsWith(path);

  return (
    <>
      <nav
        className={["lav-nav", scrolled ? "lav-nav--scrolled" : ""].filter(Boolean).join(" ")}
        aria-label="Primary navigation"
      >
        <div className="lav-pill">
          <Link to="/" className="lav-brand" aria-label="Home">
            <span className="lav-brandName">Home</span>
          </Link>

          <div className="lav-links" role="list">
            <Link to="/projects" role="listitem" className={`lav-link ${isActive("/projects") ? "lav-link--active" : ""}`}>
              <span className="lav-linkLabel">Projects</span>
            </Link>

            <div className="lav-drop" ref={dropRef} role="listitem">
              <button type="button" className={`lav-link lav-dropTrigger ${dropOpen ? "lav-link--open" : ""}`}
                onClick={() => setDropOpen((v) => !v)} aria-haspopup="menu" aria-expanded={dropOpen}>
                <span className="lav-linkLabel">More</span>
                <span className={`lav-chevron ${dropOpen ? "lav-chevron--up" : ""}`} aria-hidden="true">
                  <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
                    <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>

              <div className={`lav-dropPanel ${dropOpen ? "lav-dropPanel--open" : ""}`} role="menu" aria-hidden={!dropOpen}>
                <div className="lav-dropInner">
                  {moreLinks.map((l, i) => (
                    <Link key={l.to} to={l.to}
                      className={`lav-dropItem ${isActive(l.to) ? "lav-dropItem--active" : ""}`}
                      role="menuitem" onClick={() => setDropOpen(false)}
                      style={{ animationDelay: dropOpen ? `${i * 55}ms` : "0ms" }}>
                      <span className="lav-dropItemLabel">{l.label}</span>
                      <span className="lav-dropItemArrow" aria-hidden="true">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <button type="button" className={`lav-burger ${mobileOpen ? "lav-burger--open" : ""}`}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"} aria-expanded={mobileOpen}>
            <span /><span /><span />
          </button>
        </div>

        {/*
          DRAWER — THE FIX:
          max-height animation was causing ResizeObserver loop errors because
          browsers fire resize events on every interpolated max-height frame.
          
          New approach: drawer is always rendered at full natural height,
          hidden via opacity + visibility + translateY only.
          Zero layout recalculation = zero ResizeObserver noise.
        */}
        <div className={`lav-drawer ${mobileOpen ? "lav-drawer--open" : ""}`}
          role="dialog" aria-label="Mobile navigation" aria-modal="true" aria-hidden={!mobileOpen}>
          <div className="lav-drawerInner">
            {allLinks.map((l, i) => (
              <Link key={l.to} to={l.to}
                className={`lav-drawerLink ${isActive(l.to) ? "lav-drawerLink--active" : ""}`}
                onClick={() => setMobileOpen(false)}
                tabIndex={mobileOpen ? 0 : -1}
                style={{ transitionDelay: mobileOpen ? `${i * 45}ms` : "0ms" }}>
                <span>{l.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {mobileOpen && (
        <div className="lav-backdrop" aria-hidden="true" onClick={() => setMobileOpen(false)} />
      )}

      <style>{`
        .lav-nav {
          --c-border:      rgba(255,255,255,0.16);
          /* Kept tight (small blur radius) on purpose: at the pill's near-
             full-width, a wide soft blur here reads as a horizontal light
             flare/halo across the top of the page rather than a normal
             grounding shadow under the pill. */
          --c-shadow-sm:   0 3px 8px rgba(var(--color-glow-silver-rgb),0.10);
          --c-shadow-lg:   0 12px 48px rgba(var(--color-glow-silver-rgb),0.20);
          --pill-radius:   999px;
          --transition:    200ms cubic-bezier(0.34, 1.2, 0.64, 1);
          --font:          Nunito, ui-sans-serif, system-ui;
        }

        .lav-nav, .lav-nav * { box-sizing: border-box; }

        .lav-nav {
          position: relative !important;
          inset: auto !important;
          z-index: 1000;
          width: 100%;
          flex-shrink: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: var(--font);
          /* Transparent shell everywhere — matches the home route: the
             nav pill floats directly over each page's own background
             instead of sitting inside a full-width glass/solid slab. */
          background: transparent;
          backdrop-filter: none;
          -webkit-backdrop-filter: none;
          border-bottom: none;
          transition: box-shadow 300ms ease;
        }

        .lav-nav--sticky   { position: sticky !important; top: 0 !important; }
        .lav-nav--home     { position: relative !important; top: auto !important; }
        .lav-nav--scrolled { box-shadow: none; }

        .lav-pill {
          position: relative; z-index: 1;
          width: min(1100px, 100%);
          display: flex; align-items: center;
          justify-content: space-between; gap: 8px;
          padding: 10px 10px 10px 16px;
          background: linear-gradient(135deg, rgba(var(--color-surface-glass-rgb),0.88) 0%, rgba(var(--color-surface-glass-rgb),0.7) 50%, rgba(var(--color-surface-recessed-rgb),0.68) 100%);
          border: 1px solid var(--c-border); border-radius: var(--pill-radius);
          box-shadow: var(--c-shadow-sm), inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -1px 0 rgba(0,0,0,0.3);
        }
        .lav-pill::before {
          content: ""; position: absolute; top: 0; left: 0;
          width: 40%; height: 100%; border-radius: var(--pill-radius);
          background: radial-gradient(ellipse at 0% 50%, rgba(255,255,255,0.08), transparent 70%);
          pointer-events: none;
        }

        .lav-brand {
          display: inline-flex; align-items: center; gap: 5px;
          text-decoration: none; padding: 6px 14px;
          border-radius: var(--pill-radius); border: 1px solid rgba(var(--color-border-rgb),0.22);
          background: rgba(var(--color-surface-recessed-rgb),0.6); box-shadow: 0 2px 10px rgba(0,0,0,0.2);
          transition: background var(--transition), border-color var(--transition), transform var(--transition), box-shadow var(--transition);
        }
        .lav-brand:hover,
        .lav-brand:focus-visible {
          background: rgba(var(--color-surface-recessed-rgb),0.85);
          border-color: rgba(var(--color-glow-white-rgb),0.3);
          transform: translateY(-1px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.3);
        }

        .lav-brandName { font-size: 0.82rem; font-weight: 900; letter-spacing: 0.04em; color: var(--color-text-primary); }

        .lav-links { display: flex; align-items: center; gap: 4px; }

        .lav-link {
          position: relative; display: inline-flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: var(--pill-radius);
          border: 1px solid transparent; background: transparent;
          text-decoration: none; font-size: 0.82rem; font-weight: 800;
          color: var(--color-text-primary); cursor: pointer; white-space: nowrap; letter-spacing: 0.02em;
          font-family: var(--font);
          transition: color var(--transition), opacity var(--transition);
        }
        /* Minimal/editorial hover — a slight text brightness lift only,
           no pill background/border/shadow. Keyboard focus keeps the
           global :focus-visible ring (index.css) since no outline is
           suppressed here — that's the "only for keyboard" ring. */
        .lav-link:hover {
          color: var(--color-glow-white);
        }
        /* Current-page signal (Projects only): a short underline sized to
           the label's own text width, not the whole pill hit-area —
           restrained neutral silver, no fill/border/glow/dot. This is a
           route-driven class (isActive("/projects")), independent of
           whatever .lav-link--open state the separate More trigger is
           in, so it stays put while More opens/closes. */
        .lav-link--active { color: var(--color-text-primary); }
        .lav-link--active .lav-linkLabel::after {
          content: "";
          position: absolute;
          left: 0;
          right: 0;
          bottom: -4px;
          height: 1px;
          background: rgba(var(--color-nav-active-rgb), 0.8);
        }
        /* "More" open state: no pill/outline — the dropdown panel
           appearing plus the chevron flip are feedback enough. */
        .lav-link--open { color: var(--color-glow-white); }
        .lav-linkLabel { position: relative; line-height: 1; }

        .lav-chevron { display: inline-flex; align-items: center; transition: transform 220ms ease; color: var(--color-text-secondary); }
        .lav-chevron--up { transform: rotate(180deg); }

        .lav-drop { position: relative; }

        .lav-dropPanel {
          position: absolute; top: calc(100% + 10px); right: 0; min-width: 200px; z-index: 200;
          background: rgba(var(--color-surface-glass-rgb),0.96);
          backdrop-filter: blur(20px) saturate(1.5); -webkit-backdrop-filter: blur(20px) saturate(1.5);
          border: 1px solid rgba(var(--color-border-rgb),0.60); border-radius: 18px;
          box-shadow: 0 20px 60px rgba(var(--color-glow-silver-rgb),0.18), 0 4px 16px rgba(var(--color-glow-silver-rgb),0.10), inset 0 1px 0 rgba(255,255,255,0.80);
          overflow: hidden; pointer-events: none; opacity: 0;
          transform: translateY(-8px) scale(0.97); transform-origin: top right;
          transition: opacity 200ms ease, transform 220ms cubic-bezier(0.34,1.2,0.64,1);
        }
        .lav-dropPanel--open { pointer-events: auto; opacity: 1; transform: translateY(0) scale(1); }

        .lav-dropInner { padding: 8px; display: flex; flex-direction: column; gap: 2px; }

        .lav-dropItem {
          display: flex; align-items: center; gap: 10px; padding: 10px 12px;
          border-radius: 12px; text-decoration: none; font-size: 0.84rem; font-weight: 800;
          color: var(--color-text-primary); border: 1px solid transparent;
          transition: background var(--transition), border-color var(--transition), transform var(--transition);
          animation: dropItemIn 200ms ease both;
        }
        @keyframes dropItemIn {
          from { opacity: 0; transform: translateX(6px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        .lav-dropItem:hover,
        .lav-dropItem:focus-visible { background: rgba(var(--color-surface-recessed-rgb),0.60); border-color: rgba(var(--color-glow-white-rgb),0.25); transform: translateX(3px); }
        /* Current-page row (About Me / Resume): text color alone signals
           it — no permanent outlined box or filled background. Hover/
           focus above still apply normally on top of this. */
        .lav-dropItem--active { color: var(--color-nav-active); }
        .lav-dropItemLabel { flex: 1; }
        .lav-dropItemArrow { font-size: 0.75rem; color: var(--color-text-secondary); opacity: 0; transition: opacity 180ms, transform 180ms; }
        .lav-dropItem:hover .lav-dropItemArrow,
        .lav-dropItem:focus-visible .lav-dropItemArrow { opacity: 1; transform: translateX(3px); }

        .lav-burger {
          display: none; flex-direction: column; justify-content: center; align-items: center;
          gap: 4.5px; width: 38px; height: 38px; padding: 8px; border-radius: 12px;
          border: 1px solid rgba(var(--color-border-rgb),0.28); background: rgba(var(--color-surface-recessed-rgb),0.6);
          cursor: pointer; flex-shrink: 0;
          transition: background var(--transition), border-color var(--transition), box-shadow var(--transition);
        }
        .lav-burger:hover,
        .lav-burger:focus-visible {
          background: rgba(var(--color-surface-recessed-rgb),0.85);
          border-color: rgba(var(--color-glow-white-rgb),0.3);
          box-shadow: 0 4px 14px rgba(0,0,0,0.25);
        }
        .lav-burger span {
          display: block; width: 18px; height: 1.8px; border-radius: 999px;
          background: var(--color-text-primary); transform-origin: center;
          transition: transform 260ms ease, opacity 200ms ease, width 260ms ease;
        }
        .lav-burger--open span:nth-child(1) { transform: translateY(6.3px) rotate(45deg); }
        .lav-burger--open span:nth-child(2) { opacity: 0; width: 0; }
        .lav-burger--open span:nth-child(3) { transform: translateY(-6.3px) rotate(-45deg); }

        /*
          DRAWER FIX — no max-height animation, AND no layout space when closed.
          
          Previously: display:block on mobile made the drawer take space in the
          nav's flex column even when hidden (opacity/visibility don't affect layout).
          This caused a huge blank gap below the pill.
          
          Solution: position:absolute so the drawer is taken out of flow. It
          overlays content below the nav when open, and takes zero space when closed.
        */
        .lav-drawer {
          display: none;
          position: absolute;
          top: 100%;
          left: 0;
          right: 0;
          width: 100%;
          z-index: 10;
          /* Hidden: visually gone, no interaction, no space taken */
          opacity: 0;
          visibility: hidden;
          transform: translateY(-8px);
          pointer-events: none;
          transition:
            opacity 260ms ease,
            visibility 260ms ease,
            transform 280ms cubic-bezier(0.34, 1.2, 0.64, 1);
        }
        .lav-drawer--open {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
          pointer-events: auto;
        }

        .lav-drawerInner {
          display: flex;
          flex-direction: column;
          gap: 4px;
          padding: 10px 8px 14px;
          background: linear-gradient(180deg, rgba(var(--color-surface-glass-rgb),0.98) 0%, rgba(var(--color-surface-recessed-rgb),0.95) 100%);
          border-bottom: 1px solid rgba(var(--color-border-rgb),0.5);
          box-shadow: 0 12px 24px rgba(var(--color-glow-silver-rgb),0.12);
          border-radius: 0 0 16px 16px;
        }

        .lav-drawerLink {
          display: flex; align-items: center; gap: 12px; padding: 12px 16px;
          border-radius: 14px; text-decoration: none; font-size: 0.92rem; font-weight: 800;
          color: var(--color-text-primary); border: 1px solid transparent;
          /* Staggered slide-in driven by transitionDelay on the element */
          opacity: 0;
          transform: translateY(-6px);
          transition:
            opacity 220ms ease,
            transform 240ms cubic-bezier(0.34, 1.2, 0.64, 1),
            background var(--transition),
            border-color var(--transition),
            color var(--transition);
        }
        .lav-drawer--open .lav-drawerLink {
          opacity: 1;
          transform: translateY(0);
        }
        .lav-drawerLink:hover,
        .lav-drawerLink:focus-visible { background: rgba(var(--color-surface-recessed-rgb),0.60); border-color: rgba(var(--color-glow-white-rgb),0.25); color: var(--color-text-primary); }
        .lav-drawerLink--active { background: rgba(var(--color-surface-recessed-rgb),0.70); border-color: rgba(var(--color-border-rgb),0.30); color: var(--color-nav-active); }

        .lav-backdrop {
          position: fixed; inset: 0; z-index: 999;
          background: rgba(var(--color-text-primary-rgb),0.25);
          backdrop-filter: blur(2px); -webkit-backdrop-filter: blur(2px);
          animation: fadeIn 200ms ease both;
        }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

        @media (max-width: 680px) {
          .lav-links  { display: none; }
          .lav-burger { display: flex; }
          .lav-drawer { display: block; }
          .lav-nav    { padding: 0; }
        }
        @media (max-width: 420px) {
          /* Home stays visible (text and all) at every width — this used
             to hide .lav-brandName entirely below 420px. Instead, only
             tighten the pill's horizontal padding/gaps a little so the
             "Home" pill + hamburger keep comfortable room down to very
             narrow phones (320px). */
          .lav-brand { padding: 6px 10px; }
          .lav-pill  { padding: 10px 8px 10px 12px; gap: 6px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .lav-link, .lav-brand, .lav-dropPanel, .lav-dropItem,
          .lav-drawerLink, .lav-drawer, .lav-burger, .lav-burger span { transition: none; }
        }
      `}</style>
    </>
  );
}