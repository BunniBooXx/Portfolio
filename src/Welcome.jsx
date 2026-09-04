import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import usePointerGlow from "./usePointerGlow";
import useMagneticGlass from "./useMagneticGlass";

export default function Welcome() {
  const ghostGlowRef = usePointerGlow();
  const magnetRef = useMagneticGlass();

  useEffect(() => {
    const id = "welcome-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,500&family=Nunito:wght@500;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="gs-hero" aria-label="Welcome">
      {/* Background gradient, grain texture, and the floating orb canvas
          now live in <HomeOrbBackground /> (mounted at the app-shell level
          in App.jsx) so the animation runs as one continuous layer behind
          the navbar, this hero, and the footer — not just this section. */}

      <div className="gs-inner">
        <div className="gs-left" aria-hidden="true">
          <svg
            className="gs-deco"
            viewBox="0 0 120 320"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Delicate silver constellation — Black + White Light system.
                Varied white opacity gives it depth; the primary star (the
                diamond glyph + core dot) carries a faint soft-white glow. */}
            <defs>
              <filter id="gsStarGlow" x="-150%" y="-150%" width="400%" height="400%">
                <feGaussianBlur stdDeviation="2.2" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            <line
              x1="60"
              y1="0"
              x2="60"
              y2="320"
              stroke="rgba(255,255,255,0.14)"
              strokeWidth="1.5"
              strokeDasharray="4 8"
            />

            <path
              d="M60 30 L63 44 L77 44 L66 53 L70 67 L60 58 L50 67 L54 53 L43 44 L57 44 Z"
              fill="none"
              stroke="rgba(255,255,255,0.55)"
              strokeWidth="1.2"
              filter="url(#gsStarGlow)"
            />

            <circle cx="60" cy="100" r="3.5" fill="rgba(255,255,255,0.7)" filter="url(#gsStarGlow)" />
            <circle cx="48" cy="112" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="72" cy="112" r="2" fill="rgba(255,255,255,0.5)" />
            <circle cx="60" cy="124" r="2" fill="rgba(200,205,214,0.4)" />

            <line
              x1="44"
              y1="172"
              x2="76"
              y2="172"
              stroke="rgba(255,255,255,0.22)"
              strokeWidth="1.2"
            />
            <line
              x1="50"
              y1="182"
              x2="70"
              y2="182"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
            />
            <line
              x1="55"
              y1="192"
              x2="65"
              y2="192"
              stroke="rgba(255,255,255,0.1)"
              strokeWidth="1"
            />

            <path
              d="M60 240 L62 249 L71 249 L64 255 L66 264 L60 259 L54 264 L56 255 L49 249 L58 249 Z"
              fill="rgba(200,205,214,0.35)"
              stroke="rgba(255,255,255,0.3)"
              strokeWidth="1"
            />

            <line
              x1="60"
              y1="290"
              x2="60"
              y2="310"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.5"
            />
            <line
              x1="50"
              y1="300"
              x2="70"
              y2="300"
              stroke="rgba(255,255,255,0.28)"
              strokeWidth="1.5"
            />
          </svg>

          <div className="gs-roleStack">
            <span className="gs-roleTag">React</span>
            <span className="gs-roleTag">Django</span>
            <span className="gs-roleTag">AI</span>
          </div>
        </div>

        <div className="gs-card">
          <div className="gs-cardInner">
            <div className="gs-eyebrow">
              <span className="gs-dot" />
                 Available for work
            </div>

            <h1 className="gs-name">
              <span className="gs-nameLight">Jaqueline</span>
              <br />
              <span className="gs-nameBold">Smith</span>
            </h1>

            <p className="gs-tagline">
              Software Engineer Building AI Systems and Full-Stack Products
            </p>

            <p className="gs-bio">
              I build full-stack, AI-enabled products across React, React
              Native, and Django, combining polished interfaces with
              retrieval, LLM orchestration, and deterministic safeguards.
            </p>

            <div className="gs-actions">
              <Link to="/projects" className="gs-btnPrimary gs-magnetBtn" ref={magnetRef}>
                <span className="gs-magnet-glass" aria-hidden="true" />
                <span className="gs-liquid-label">See My Work</span>
              </Link>
              <Link to="/aboutme" className="gs-btnGhost gs-liquid gs-liquid--ghost" ref={ghostGlowRef}>
                <span className="gs-liquid-border" aria-hidden="true" />
                <span className="gs-liquid-fill" aria-hidden="true" />
                <span className="gs-liquid-label">About Me</span>
              </Link>
            </div>
          </div>

          <div className="gs-cornerTL" aria-hidden="true" />
          <div className="gs-cornerBR" aria-hidden="true" />
        </div>

        <div className="gs-right" aria-hidden="true">
          <div className="gs-stat">
            <strong>Full Stack</strong>
            <span>React · Django</span>
          </div>
          <div className="gs-stat">
            <strong>AI Systems</strong>
            <span>RAG · Gemini</span>
          </div>
          <div className="gs-stat">
            <strong>AI Evaluation</strong>
            <span>Agents · Testing</span>
          </div>
        </div>
      </div>

      <style>{`
        .gs-hero,
        .gs-hero *,
        .gs-hero *::before,
        .gs-hero *::after {
          box-sizing: border-box;
        }

        .gs-hero {
          position: relative;
          width: 100%;
          /* Natural flow: .gs-hero is sized by its own content, not
             forced to fill the viewport (that's .app-shell/.app-main's
             job — see App.css). overflow:visible so nothing here can
             clip the hover-lift or corner decorations. */
          height: auto;
          overflow: visible;
          font-family: Nunito, ui-sans-serif, system-ui;
        }

        .gs-inner {
          position: relative;
          z-index: 3;
          width: 100%;
          height: auto;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          justify-items: center;
          gap: clamp(12px, 2.5vw, 48px);
          padding: clamp(16px, 3vw, 56px);
        }

        .gs-left {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: clamp(12px, 2vw, 28px);
          width: 100%;
        }

        .gs-deco {
          width: clamp(48px, 6vw, 88px);
          height: auto;
          opacity: 0.9;
        }

        .gs-roleStack {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 6px;
        }

        .gs-roleTag {
          font-size: clamp(0.6rem, 1vw, 0.9rem);
          font-weight: 900;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--color-text-primary);
          padding: 4px 10px;
          border: 1px solid rgba(var(--color-border-rgb),0.22);
          border-radius: 4px;
          background: rgba(var(--color-surface-recessed-rgb),0.55);
          white-space: nowrap;
        }

        .gs-card {
          position: relative;
          width: clamp(300px, 42vw, 680px);
          flex-shrink: 0;
          /* Dark smoky glass — deliberately translucent (not the old
             0.72 near-opaque fill) so the fixed HomeOrbBackground canvas
             behind it visibly shows through, softened by the blur, as
             the orbs drift past. See index.css for the surface-glass
             token this is built on. */
          background: rgba(var(--color-surface-glass-rgb),0.62);
          backdrop-filter: blur(18px) saturate(1.15);
          -webkit-backdrop-filter: blur(18px) saturate(1.15);
          border: 1px solid rgba(var(--color-glow-white-rgb),0.14);
          border-radius: 28px;
          box-shadow:
            0 20px 60px rgba(0,0,0,0.55),
            0 4px 16px rgba(var(--color-glow-silver-rgb),0.08),
            inset 0 1px 0 rgba(255,255,255,0.16);
          padding: clamp(24px, 4vw, 52px) clamp(22px, 3.5vw, 46px);
          overflow: hidden;
        }

        .gs-cornerTL,
        .gs-cornerBR {
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 1;
        }

        .gs-cornerTL {
          top: 14px;
          left: 14px;
          border-top: 2px solid rgba(var(--color-border-rgb),0.35);
          border-left: 2px solid rgba(var(--color-border-rgb),0.35);
          border-radius: 4px 0 0 0;
        }

        .gs-cornerBR {
          bottom: 14px;
          right: 14px;
          border-bottom: 2px solid rgba(var(--color-border-rgb),0.35);
          border-right: 2px solid rgba(var(--color-border-rgb),0.35);
          border-radius: 0 0 4px 0;
        }

        .gs-cardInner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: clamp(10px, 1.6vw, 20px);
        }

        .gs-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: clamp(0.65rem, 0.9vw, 0.82rem);
          font-weight: 800;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--color-text-primary);
        }

        .gs-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--color-ice);
          box-shadow: 0 0 0 3px rgba(var(--color-ice-rgb),0.22);
          animation: pulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(var(--color-ice-rgb),0.22); }
          50% { box-shadow: 0 0 0 6px rgba(var(--color-ice-rgb),0.10); }
        }

        .gs-name {
          margin: 0;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }

        .gs-nameLight {
          display: block;
          font-family: "Source Serif 4", Georgia, serif;
          font-style: normal;
          font-weight: 500;
          font-size: clamp(2.1rem, 4.4vw, 4rem);
          letter-spacing: -0.005em;
          color: var(--color-text-primary);
          text-shadow: 0 8px 28px rgba(0,0,0,0.35);
        }

        .gs-nameBold {
          display: block;
          font-family: "Source Serif 4", Georgia, serif;
          font-style: normal;
          font-weight: 500;
          font-size: clamp(2.2rem, 4.55vw, 4.15rem);
          letter-spacing: -0.005em;
          color: var(--color-text-primary);
          text-shadow: 0 8px 28px rgba(0,0,0,0.35);
        }

        .gs-tagline {
          margin: 0;
          font-size: clamp(0.72rem, 1vw, 0.92rem);
          font-weight: 800;
          letter-spacing: 0.05em;
          color: var(--color-text-primary);
          text-transform: uppercase;
          max-width: 36ch;
        }

        .gs-bio {
          margin: 0;
          font-size: clamp(0.8rem, 1.1vw, 1rem);
          font-weight: 600;
          line-height: 1.65;
          color: var(--color-text-primary);
          opacity: 0.82;
          max-width: 48ch;
        }

        .gs-actions {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(8px, 1.2vw, 14px);
          flex-wrap: wrap;
        }

        /* ===== Liquid Glass / Refraction — prototype (§1) =====
           The button surface reacts to the pointer itself rather than
           playing a canned animation. --mx/--my (set by usePointerGlow)
           drive two layers: a border-hugging ring highlight
           (.gs-liquid-border, built with mask-composite so only the
           ring nearest the pointer is visible) and an interior fill
           highlight (.gs-liquid-fill, a broad soft glow + a tight
           specular fleck). Both fade in/out via the is-glow-active
           class rather than looping or sweeping automatically. */
        .gs-liquid {
          position: relative;
          isolation: isolate;
          transition: transform 120ms ease, box-shadow 160ms ease;
        }
        .gs-liquid:active { transform: scale(0.985); }

        .gs-liquid-border,
        .gs-liquid-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }
        .gs-liquid.is-glow-active .gs-liquid-border,
        .gs-liquid.is-glow-active .gs-liquid-fill { opacity: 1; }
        /* Keyboard focus: --mx/--my default to 50%/50% (see the
           radial-gradient fallbacks below), so focusing via keyboard
           shows the same glass reaction centered in the button rather
           than requiring pointer coordinates. */
        .gs-liquid:focus-visible .gs-liquid-border,
        .gs-liquid:focus-visible .gs-liquid-fill { opacity: 1; }
        .gs-liquid-label { position: relative; z-index: 1; }

        .gs-liquid-border {
          padding: 1px;
          background: radial-gradient(90px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.9), transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }

        .gs-liquid-fill {
          background:
            radial-gradient(140px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 60%),
            radial-gradient(40px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), transparent 70%);
        }

        .gs-btnPrimary {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.2vw, 14px) clamp(18px, 2vw, 28px);
          border-radius: 999px;
          border: 1px solid rgba(0,0,0,0.14);
          background: linear-gradient(135deg, var(--color-accent-hover) 0%, var(--color-accent) 100%);
          color: var(--color-text-on-accent);
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: clamp(0.75rem, 1vw, 0.95rem);
          letter-spacing: 0.02em;
          box-shadow: 0 10px 28px rgba(0,0,0,0.35), 0 2px 10px rgba(var(--color-glow-white-rgb),0.12), inset 0 1px 0 rgba(255,255,255,0.55);
          white-space: nowrap;
        }
        /* Magnetic glass (See My Work only) — distinct from the dark
           liquid-glass treatment on About Me. No traveling/looping
           animation: the button itself drifts a few px toward the
           pointer (soft ease, not springy) while a two-tone radial
           highlight — a pale specular layer plus a faint graphite
           shadow, both tracking the pointer — suggests depth moving
           beneath frosted white glass. --tx/--ty/--mx/--my come from
           useMagneticGlass.js; :active layers a compression scale on
           top of whatever translate is currently active. */
        .gs-magnetBtn {
          position: relative;
          isolation: isolate;
          --tx: 0px;
          --ty: 0px;
          transform: translate(var(--tx), var(--ty));
          transition: transform 260ms cubic-bezier(0.22, 1, 0.36, 1), border-color 220ms ease;
        }
        .gs-magnetBtn.is-glow-active,
        .gs-magnetBtn:hover,
        .gs-magnetBtn:focus-visible {
          border-color: rgba(20,22,26,0.24);
        }
        .gs-magnetBtn:active {
          transform: translate(var(--tx), var(--ty)) scale(0.985);
        }

        .gs-magnet-glass {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          pointer-events: none;
          opacity: 0;
          transition: opacity 260ms ease;
          background:
            radial-gradient(130px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.55), transparent 62%),
            radial-gradient(190px circle at var(--mx,50%) var(--my,50%), rgba(52,56,64,0.14), transparent 72%);
        }
        .gs-magnetBtn.is-glow-active .gs-magnet-glass,
        .gs-magnetBtn:focus-visible .gs-magnet-glass {
          opacity: 1;
        }

        .gs-btnGhost {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.2vw, 14px) clamp(18px, 2vw, 28px);
          border-radius: 999px;
          border: 1.5px solid rgba(var(--color-border-rgb),0.35);
          background: rgba(var(--color-surface-glass-rgb),0.55);
          color: var(--color-text-primary);
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: clamp(0.75rem, 1vw, 0.95rem);
          letter-spacing: 0.02em;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
          white-space: nowrap;
          transition: background 220ms ease, border-color 220ms ease;
        }
        .gs-liquid--ghost.is-glow-active,
        .gs-liquid--ghost:focus-visible {
          border-color: rgba(var(--color-glow-white-rgb),0.4);
          background: rgba(var(--color-surface-glass-rgb),0.72);
        }

        .gs-right {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: clamp(8px, 1.5vw, 18px);
          width: 100%;
        }

        .gs-stat {
          display: flex;
          flex-direction: column;
          gap: 2px;
          padding: clamp(8px, 1vw, 14px) clamp(12px, 1.4vw, 20px);
          border-radius: 14px;
          background: rgba(var(--color-surface-glass-rgb),0.55);
          border: 1px solid rgba(var(--color-border-rgb),0.2);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(var(--color-glow-silver-rgb),0.08);
          min-width: clamp(90px, 10vw, 150px);
        }

        .gs-stat strong {
          font-size: clamp(0.75rem, 1vw, 0.98rem);
          font-weight: 900;
          color: var(--color-text-primary);
          line-height: 1;
        }

        .gs-stat span {
          font-size: clamp(0.6rem, 0.8vw, 0.78rem);
          font-weight: 700;
          color: var(--color-text-secondary);
          letter-spacing: 0.04em;
        }

        /* Tablet/mobile: card becomes a fixed-height glass shell that
           fits fully between the navbar and footer, instead of the page
           growing taller than the viewport. .gs-hero keeps its BASE
           height: 100%/min-height: 0 (no override here anymore) so it
           stays sized to .app-main's actual available space.

           .gs-inner switches from grid to flex here. It's not just a
           centering preference: .gs-card needs a genuinely explicit
           height (not merely a max-height ceiling on an otherwise
           content-sized box) so that .gs-cardInner's own max-height:
           100% below has something valid to resolve against — per the
           CSS percentage-height rules, a child's percentage height is
           invalid (treated as none) against a parent whose height
           "depends on its content", which max-height-only sizing counts
           as even once resolved. A flex column with height: 100% on the
           item sidesteps that: flex hands out space from the
           container's own definite height directly, so .gs-card's
           height: 100% is genuinely definite, and .gs-cardInner's
           max-height: 100%/overflow-y: auto then actually clamps it
           (confirmed in-browser — the grid/align-content/max-height
           combination this replaced left .gs-cardInner unclamped, so it
           silently overflowed .gs-card and got clipped by its
           overflow: hidden instead of scrolling).

           .gs-card itself does not scroll — .gs-cardInner does (below)
           — so the corner decorations (.gs-cornerTL/.gs-cornerBR,
           absolutely positioned children of .gs-card) stay visually
           pinned to the shell's corners instead of scrolling away with
           the content. */
        @media (max-width: 860px) {
          /* justify-content:flex-start (not center) + padding-bottom
             (not the old calc(34px+safe-area) bottom inset) — content
             starts right after the shared navbar->content gap and ends
             with its own small breathing room; .app-content now owns
             the page->footer distance (see App.css --page-footer-gap),
             so this doesn't need to reserve its own large bottom inset
             for a footer that used to live inside this same viewport-
             filling box. */
          .gs-inner {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-start;
            width: 100%;
            gap: clamp(10px, 2vw, 20px);
            padding: clamp(12px, 3vw, 28px) clamp(12px, 3vw, 28px)
              clamp(16px, 3vw, 28px);
          }

          .gs-left,
          .gs-right {
            display: none;
          }

          /* height:auto (not 100%) — the card is sized by its own
             content in natural flow, not stretched to fill a
             viewport-height parent. */
          .gs-card {
            width: min(100%, 480px);
            height: auto;
          }

          /* No longer its own scroll region — .gs-card's content is
             short enough in natural flow that it never needs one
             (.app-main is the single scroll owner for anything taller
             than the viewport). */
          .gs-cardInner {
            max-height: none;
            overflow: visible;
          }
        }

        @media (max-width: 640px) {
          .gs-inner {
            gap: 0;
            padding: 18px 0;
          }

          .gs-left,
          .gs-right {
            display: none;
          }

          .gs-card {
            width: min(100%, 430px);
            padding: 22px 18px;
            border-radius: 22px;
          }

          .gs-cardInner {
            gap: 12px;
          }

          .gs-eyebrow {
            justify-content: center;
            text-align: center;
            font-size: 0.68rem;
            letter-spacing: 0.1em;
          }

          .gs-name {
            text-align: center;
          }

          .gs-nameLight {
            font-size: clamp(1.9rem, 9.5vw, 2.7rem);
          }

          .gs-nameBold {
            font-size: clamp(2rem, 9.9vw, 2.8rem);
            line-height: 0.92;
          }

          .gs-tagline {
            text-align: center;
            font-size: 0.73rem;
            line-height: 1.45;
            letter-spacing: 0.08em;
          }

          .gs-bio {
            max-width: 100%;
            text-align: center;
            font-size: 0.9rem;
            line-height: 1.6;
          }

          .gs-actions {
            width: 100%;
            justify-content: center;
            gap: 10px;
          }

          .gs-btnPrimary,
          .gs-btnGhost {
            min-height: 44px;
            padding: 11px 16px;
            font-size: 0.88rem;
          }
        }

        @media (max-width: 480px) {
          .gs-inner {
            padding: 16px 0;
          }

          .gs-card {
            width: 100%;
            padding: 20px 16px;
            border-radius: 20px;
          }

          .gs-cornerTL,
          .gs-cornerBR {
            display: none;
          }

          .gs-cardInner {
            gap: 11px;
          }

          .gs-eyebrow {
            font-size: 0.64rem;
          }

          .gs-nameLight {
            font-size: clamp(1.6rem, 8vw, 2.3rem);
          }

          .gs-nameBold {
            font-size: clamp(1.7rem, 8.3vw, 2.4rem);
          }

          .gs-tagline {
            font-size: 0.68rem;
          }

          .gs-bio {
            font-size: 0.86rem;
            line-height: 1.58;
          }

          .gs-actions {
            flex-direction: column;
            align-items: stretch;
            gap: 10px;
          }

          .gs-btnPrimary,
          .gs-btnGhost {
            width: 100%;
            min-height: 44px;
            padding: 12px 16px;
          }
        }

        @media (max-width: 360px) {
          .gs-inner {
            padding: 14px 0;
          }

          .gs-card {
            padding: 18px 14px;
            border-radius: 18px;
          }

          .gs-bio {
            font-size: 0.82rem;
          }

          .gs-btnPrimary,
          .gs-btnGhost {
            font-size: 0.84rem;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-dot  { animation: none; }
          .gs-liquid { transition: none; }
          .gs-liquid:active { transform: none; }
          .gs-liquid-border, .gs-liquid-fill { transition: none; }

          /* No magnetic translate — keep only the static hover
             contrast (border-color) and the glass highlight's opacity
             fade, both of which useMagneticGlass.js still toggles via
             pointerenter/leave under reduced motion. */
          .gs-magnetBtn { transition: border-color 220ms ease; transform: none !important; }
          .gs-magnetBtn:active { transform: none !important; }
          .gs-magnet-glass { transition: opacity 260ms ease; }
        }
      `}</style>
    </section>
  );
}
