import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

const ENABLE_ORBS = true;

export default function Welcome() {
  const orbsCanvasRef = useRef(null);
  const rafOrbsRef = useRef(0);
  const orbsRef = useRef([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  const theme = useMemo(
    () => ({
      bg0: "#fcfaff",
      bg1: "#f5efff",
      bg2: "#eee3ff",
      bg3: "#e6d7ff",
    }),
    []
  );

  useEffect(() => {
    const id = "welcome-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=Nunito:wght@500;700;800;900&display=swap";
    document.head.appendChild(link);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(Boolean(mq?.matches));
    set();
    mq?.addEventListener?.("change", set);
    return () => mq?.removeEventListener?.("change", set);
  }, []);

  useEffect(() => {
    if (!ENABLE_ORBS) return;
    const canvas = orbsCanvasRef.current;
    if (!canvas) return;
    const host = canvas.closest(".gs-hero");
    if (!host) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0, h = 0;
    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

    const resize = () => {
      const rect = host.getBoundingClientRect();
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.max(1, Math.floor(rect.width));
      h = Math.max(1, Math.floor(rect.height));
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const orbColors = [
      "rgba(184,164,255,1)",
      "rgba(214,204,255,1)",
      "rgba(110,201,255,1)",
      "rgba(127,240,198,1)",
      "rgba(255,204,235,1)",
    ];

    const makeOrb = (x, y) => {
      const r = rand(10, 26);
      const c = orbColors[Math.floor(Math.random() * orbColors.length)];
      return {
        x, y, r, c,
        vx: rand(-0.16, 0.16),
        vy: rand(0.2, 0.7),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.018),
      };
    };

    const drawOrb = (o) => {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.15, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.15);
      g.addColorStop(0, o.c.replace("1)", "0.13)"));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      const rg = ctx.createRadialGradient(
        o.x - o.r * 0.35, o.y - o.r * 0.35, o.r * 0.16,
        o.x, o.y, o.r
      );
      rg.addColorStop(0, "rgba(255,255,255,0.82)");
      rg.addColorStop(0.34, o.c.replace("1)", "0.46)"));
      rg.addColorStop(1, o.c.replace("1)", "0.20)"));
      ctx.fillStyle = rg;
      ctx.fill();
      ctx.strokeStyle = "rgba(123,92,255,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const init = () => {
      orbsRef.current = [];
      const count = clamp(Math.floor(w / 150), 8, 18);
      for (let i = 0; i < count; i++) {
        orbsRef.current.push(makeOrb(rand(40, w - 40), rand(-h * 0.2, h)));
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);
      const gravity = 0.012, air = 0.994, bounce = 0.72;
      for (const o of orbsRef.current) {
        o.wobble += o.wobbleSpeed;
        o.vx += Math.sin(o.wobble) * 0.003;
        o.vy += gravity;
        o.x += o.vx;
        o.y += o.vy;
        o.vx *= air;
        o.vy *= air;
        if (o.x - o.r < 0) { o.x = o.r; o.vx = Math.abs(o.vx) * bounce; }
        if (o.x + o.r > w) { o.x = w - o.r; o.vx = -Math.abs(o.vx) * bounce; }
        if (o.y + o.r > h) {
          o.y = h - o.r;
          o.vy = -Math.abs(o.vy) * bounce;
          o.vx *= 0.92;
          if (Math.abs(o.vy) < 0.08) {
            o.x = rand(40, w - 40);
            o.y = rand(-160, -30);
            o.vx = rand(-0.16, 0.16);
            o.vy = rand(0.25, 0.8);
            o.wobble = rand(0, Math.PI * 2);
          }
        }
        drawOrb(o);
      }
      rafOrbsRef.current = requestAnimationFrame(step);
    };

    resize();
    init();
    if (!reducedMotion) {
      rafOrbsRef.current = requestAnimationFrame(step);
    } else {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbsRef.current) drawOrb(o);
    }

    const ro = new ResizeObserver(() => { resize(); init(); });
    ro.observe(host);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafOrbsRef.current);
      window.removeEventListener("resize", resize);
      ro.disconnect();
    };
  }, [reducedMotion]);

  return (
    <section className="gs-hero" aria-label="Welcome">
      <div
        aria-hidden="true"
        className="gs-bg"
        style={{
          background: `
            radial-gradient(950px 680px at 18% 18%, rgba(123,92,255,0.11), transparent 58%),
            radial-gradient(760px 560px at 86% 72%, rgba(184,164,255,0.18), transparent 60%),
            radial-gradient(680px 480px at 58% 10%, rgba(110,201,255,0.08), transparent 62%),
            linear-gradient(135deg, ${theme.bg0} 0%, ${theme.bg1} 40%, ${theme.bg2} 72%, ${theme.bg3} 100%)
          `,
        }}
      />
      <div aria-hidden="true" className="gs-texture" />
      <canvas ref={orbsCanvasRef} className="gs-orbs" aria-hidden="true" />

      <div className="gs-inner">

        {/* Left: decorative SVG pattern */}
        <div className="gs-left" aria-hidden="true">
          <svg className="gs-deco" viewBox="0 0 120 320" fill="none" xmlns="http://www.w3.org/2000/svg">
            {/* vertical dashed line */}
            <line x1="60" y1="0" x2="60" y2="320" stroke="rgba(123,92,255,0.15)" strokeWidth="1.5" strokeDasharray="4 8" />

            {/* large 4-point star top */}
            <path d="M60 30 L63 44 L77 44 L66 53 L70 67 L60 58 L50 67 L54 53 L43 44 L57 44 Z"
              fill="none" stroke="rgba(123,92,255,0.28)" strokeWidth="1.2" />

            {/* small dot cluster */}
            <circle cx="60" cy="100" r="3.5" fill="rgba(123,92,255,0.22)" />
            <circle cx="48" cy="112" r="2" fill="rgba(184,164,255,0.35)" />
            <circle cx="72" cy="112" r="2" fill="rgba(184,164,255,0.35)" />
            <circle cx="60" cy="124" r="2" fill="rgba(110,201,255,0.30)" />

            {/* horizontal tick marks */}
            <line x1="44" y1="172" x2="76" y2="172" stroke="rgba(123,92,255,0.18)" strokeWidth="1.2" />
            <line x1="50" y1="182" x2="70" y2="182" stroke="rgba(123,92,255,0.12)" strokeWidth="1" />
            <line x1="55" y1="192" x2="65" y2="192" stroke="rgba(123,92,255,0.08)" strokeWidth="1" />

            {/* small 4-point star bottom */}
            <path d="M60 240 L62 249 L71 249 L64 255 L66 264 L60 259 L54 264 L56 255 L49 249 L58 249 Z"
              fill="rgba(184,164,255,0.30)" stroke="rgba(123,92,255,0.20)" strokeWidth="1" />

            {/* plus / cross */}
            <line x1="60" y1="290" x2="60" y2="310" stroke="rgba(123,92,255,0.22)" strokeWidth="1.5" />
            <line x1="50" y1="300" x2="70" y2="300" stroke="rgba(123,92,255,0.22)" strokeWidth="1.5" />
          </svg>

          <div className="gs-roleStack">
            <span className="gs-roleTag">React</span>
            <span className="gs-roleTag">Django</span>
            <span className="gs-roleTag">AI</span>
          </div>
        </div>

        {/* Center: main glass card */}
        <div className="gs-card">
          <div className="gs-blob" aria-hidden="true" />

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
              Frontend AI Trainer&nbsp;&amp;&nbsp;Full Stack Developer
            </p>

            <p className="gs-bio">
              I craft soft, interactive web experiences — React frontends,
              Django backends, and AI-aware product thinking that makes
              things feel alive.
            </p>

            <div className="gs-actions">
              <Link to="/projects" className="gs-btnPrimary">
                See My Work
              </Link>
              <Link to="/about" className="gs-btnGhost">
                About Me
              </Link>
            </div>
          </div>

          <div className="gs-cornerTL" aria-hidden="true" />
          <div className="gs-cornerBR" aria-hidden="true" />
        </div>

        {/* Right: floating stat chips */}
        <div className="gs-right" aria-hidden="true">
          <div className="gs-stat">
            <strong>Full Stack</strong>
            <span>React · Django</span>
          </div>
          <div className="gs-stat">
            <strong>AI Trainer</strong>
            <span>Outlier AI</span>
          </div>
          <div className="gs-stat">
            <strong>✦</strong>
            <span>Mid-level Dev</span>
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
          height: 100%;
          min-height: 0;
          overflow: hidden;
          font-family: Nunito, ui-sans-serif, system-ui;
        }

        .gs-bg, .gs-texture, .gs-orbs {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .gs-bg { z-index: 0; }
        .gs-texture {
          z-index: 1;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.022) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.018) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.020) 0 1px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.46;
          mix-blend-mode: multiply;
        }
        .gs-orbs { z-index: 2; }

        .gs-inner {
          position: relative;
          z-index: 3;
          width: 100%;
          height: 100%;
          min-height: 0;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          align-items: center;
          justify-items: center;
          gap: clamp(12px, 2.5vw, 48px);
          padding: clamp(16px, 3vw, 56px);
        }

        /* ---- left column ---- */
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
          color: rgba(123,92,255,0.55);
          padding: 4px 10px;
          border: 1px solid rgba(123,92,255,0.16);
          border-radius: 4px;
          background: rgba(255,255,255,0.42);
          white-space: nowrap;
        }

        /* ---- center card ---- */
        .gs-card {
          position: relative;
          width: clamp(280px, 36vw, 520px);
          flex-shrink: 0;
          background: rgba(255,255,255,0.62);
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.72);
          border-radius: 28px;
          box-shadow:
            0 8px 32px rgba(123,92,255,0.10),
            0 2px 8px rgba(123,92,255,0.06),
            inset 0 1px 0 rgba(255,255,255,0.85);
          padding: clamp(24px, 4vw, 52px) clamp(22px, 3.5vw, 46px);
          overflow: hidden;
        }

        .gs-blob {
          position: absolute;
          top: -40%;
          right: -30%;
          width: 70%;
          aspect-ratio: 1;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(184,164,255,0.38) 0%, rgba(110,201,255,0.18) 60%, transparent 80%);
          animation: blobDrift 8s ease-in-out infinite alternate;
          pointer-events: none;
          z-index: 0;
        }

        @keyframes blobDrift {
          0%   { transform: translate(0, 0)    scale(1);    }
          33%  { transform: translate(-8%, 6%) scale(1.06); }
          66%  { transform: translate(6%, -4%) scale(0.96); }
          100% { transform: translate(-4%, 8%) scale(1.04); }
        }

        .gs-cornerTL, .gs-cornerBR {
          position: absolute;
          width: 28px;
          height: 28px;
          pointer-events: none;
          z-index: 1;
        }
        .gs-cornerTL {
          top: 14px; left: 14px;
          border-top: 2px solid rgba(123,92,255,0.30);
          border-left: 2px solid rgba(123,92,255,0.30);
          border-radius: 4px 0 0 0;
        }
        .gs-cornerBR {
          bottom: 14px; right: 14px;
          border-bottom: 2px solid rgba(123,92,255,0.30);
          border-right: 2px solid rgba(123,92,255,0.30);
          border-radius: 0 0 4px 0;
        }

        .gs-cardInner {
          position: relative;
          z-index: 1;
          display: flex;
          flex-direction: column;
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
          color: rgba(123,92,255,0.72);
        }

        .gs-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #7b5cff;
          box-shadow: 0 0 0 3px rgba(123,92,255,0.18);
          animation: pulse 2.4s ease-in-out infinite;
          flex-shrink: 0;
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 0 0 3px rgba(123,92,255,0.18); }
          50%       { box-shadow: 0 0 0 6px rgba(123,92,255,0.08); }
        }

        .gs-name {
          margin: 0;
          line-height: 0.95;
          letter-spacing: -0.02em;
        }

        .gs-nameLight {
          display: block;
          font-family: "Playfair Display", Georgia, serif;
          font-style: italic;
          font-weight: 700;
          font-size: clamp(1.8rem, 4vw, 4.2rem);
          color: rgba(123,92,255,0.55);
        }

        .gs-nameBold {
          display: block;
          font-family: "Playfair Display", Georgia, serif;
          font-weight: 900;
          font-size: clamp(2.4rem, 5.5vw, 5.8rem);
          color: #3d2a8a;
          text-shadow: 0 8px 28px rgba(123,92,255,0.14);
        }

        .gs-tagline {
          margin: 0;
          font-size: clamp(0.72rem, 1vw, 0.92rem);
          font-weight: 800;
          letter-spacing: 0.05em;
          color: rgba(123,92,255,0.65);
          text-transform: uppercase;
        }

        .gs-bio {
          margin: 0;
          font-size: clamp(0.8rem, 1.1vw, 1rem);
          font-weight: 600;
          line-height: 1.65;
          color: rgba(40,30,70,0.68);
          max-width: 34ch;
        }

        .gs-actions {
          display: flex;
          align-items: center;
          gap: clamp(8px, 1.2vw, 14px);
          flex-wrap: wrap;
        }

        .gs-btnPrimary {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.2vw, 14px) clamp(18px, 2vw, 28px);
          border-radius: 999px;
          background: linear-gradient(135deg, #8b6bff 0%, #6344d4 100%);
          color: #fff;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: clamp(0.75rem, 1vw, 0.95rem);
          letter-spacing: 0.02em;
          box-shadow: 0 10px 28px rgba(123,92,255,0.28), inset 0 1px 0 rgba(255,255,255,0.18);
          transition: transform 160ms ease, box-shadow 160ms ease;
          white-space: nowrap;
        }

        .gs-btnPrimary:hover {
          transform: translateY(-2px);
          box-shadow: 0 16px 36px rgba(123,92,255,0.36), inset 0 1px 0 rgba(255,255,255,0.18);
        }

        .gs-btnGhost {
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: clamp(10px, 1.2vw, 14px) clamp(18px, 2vw, 28px);
          border-radius: 999px;
          border: 1.5px solid rgba(123,92,255,0.28);
          background: rgba(255,255,255,0.48);
          color: #5b3fc4;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: clamp(0.75rem, 1vw, 0.95rem);
          letter-spacing: 0.02em;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
          white-space: nowrap;
        }

        .gs-btnGhost:hover {
          transform: translateY(-2px);
          background: rgba(255,255,255,0.72);
          border-color: rgba(123,92,255,0.48);
        }

        /* ---- right column ---- */
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
          background: rgba(255,255,255,0.52);
          border: 1px solid rgba(123,92,255,0.12);
          backdrop-filter: blur(8px);
          box-shadow: 0 4px 16px rgba(123,92,255,0.07);
          min-width: clamp(90px, 10vw, 150px);
        }

        .gs-stat strong {
          font-size: clamp(0.75rem, 1vw, 0.98rem);
          font-weight: 900;
          color: #4a2faa;
          line-height: 1;
        }

        .gs-stat span {
          font-size: clamp(0.6rem, 0.8vw, 0.78rem);
          font-weight: 700;
          color: rgba(123,92,255,0.6);
          letter-spacing: 0.04em;
        }

        /* ---- tablet / mobile ---- */
        @media (max-width: 860px) {
          .gs-inner {
            grid-template-columns: 1fr;
            grid-template-rows: auto;
            justify-items: center;
            align-content: center;
            gap: clamp(10px, 2vw, 20px);
            padding: clamp(12px, 3vw, 28px);
          }

          .gs-left, .gs-right { display: none; }

          .gs-card {
            width: min(92vw, 480px);
          }
        }

        @media (max-width: 480px) {
          .gs-card {
            width: min(96vw, 420px);
            padding: 22px 18px;
            border-radius: 20px;
          }
          .gs-cornerTL, .gs-cornerBR { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .gs-blob { animation: none; }
          .gs-dot  { animation: none; }
          .gs-btnPrimary, .gs-btnGhost { transition: none; }
        }
      `}</style>
    </section>
  );
}