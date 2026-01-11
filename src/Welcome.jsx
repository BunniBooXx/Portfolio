// Welcome.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** ✅ Static flag outside component (keeps deps clean) */
const ENABLE_ORBS = true;

export default function Welcome() {
  const orbsCanvasRef = useRef(null);
  const rafOrbsRef = useRef(0);
  const orbsRef = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(false);

  const theme = useMemo(
    () => ({
      bg0: "#FFFFFF",
      bg1: "#F8F3FF",
      bg2: "#EFE6FF",
      bg3: "#E7D8FF",
      accent: "#7B5CFF",
      heartGlow: "drop-shadow(0 18px 50px rgba(90,60,190,0.18))",
    }),
    []
  );

  // Fonts
  useEffect(() => {
    const id = "welcome-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Grand+Hotel&family=Nunito:wght@500;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  // Reduced motion
  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(Boolean(mq?.matches));
    set();
    mq?.addEventListener?.("change", set);
    return () => mq?.removeEventListener?.("change", set);
  }, []);

  // =========================
  // ORBS CANVAS (scoped to Welcome)
  // =========================
  useEffect(() => {
    if (!ENABLE_ORBS) return;

    const canvas = orbsCanvasRef.current;
    if (!canvas) return;

    // ✅ Use the hero as the sizing host (this is the main area, not footer)
    const host = canvas.closest(".gs-hero");
    if (!host) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

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
      const r = rand(12, 30);
      const c = orbColors[Math.floor(Math.random() * orbColors.length)];
      return {
        x,
        y,
        r,
        c,
        vx: rand(-0.16, 0.16),
        vy: rand(0.2, 0.7),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.02),
      };
    };

    const drawOrb = (o) => {
      // glow
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.1, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.1);
      g.addColorStop(0, o.c.replace("1)", "0.14)"));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fill();

      // core
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      const rg = ctx.createRadialGradient(
        o.x - o.r * 0.35,
        o.y - o.r * 0.35,
        o.r * 0.15,
        o.x,
        o.y,
        o.r
      );
      rg.addColorStop(0, "rgba(255,255,255,0.78)");
      rg.addColorStop(0.35, o.c.replace("1)", "0.45)"));
      rg.addColorStop(1, o.c.replace("1)", "0.20)"));
      ctx.fillStyle = rg;
      ctx.fill();

      // rim
      ctx.strokeStyle = "rgba(123,92,255,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const init = () => {
      orbsRef.current = [];
      const count = clamp(Math.floor(w / 140), 9, 16);
      for (let i = 0; i < count; i++) {
        orbsRef.current.push(makeOrb(rand(40, w - 40), rand(-h * 0.2, h)));
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      const gravity = 0.012;
      const air = 0.994;
      const bounce = 0.72;

      for (const o of orbsRef.current) {
        o.wobble += o.wobbleSpeed;
        o.vx += Math.sin(o.wobble) * 0.003;

        o.vy += gravity;
        o.x += o.vx;
        o.y += o.vy;

        o.vx *= air;
        o.vy *= air;

        // walls
        if (o.x - o.r < 0) {
          o.x = o.r;
          o.vx = Math.abs(o.vx) * bounce;
        }
        if (o.x + o.r > w) {
          o.x = w - o.r;
          o.vx = -Math.abs(o.vx) * bounce;
        }

        // floor + respawn
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

    if (!reducedMotion) rafOrbsRef.current = requestAnimationFrame(step);
    else {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbsRef.current) drawOrb(o);
    }

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
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
      {/* Background */}
      <div
        aria-hidden="true"
        className="gs-bg"
        style={{
          background: `
            radial-gradient(900px 650px at 18% 18%, rgba(123,92,255,0.10), transparent 56%),
            radial-gradient(780px 600px at 86% 70%, rgba(184,164,255,0.18), transparent 60%),
            radial-gradient(720px 520px at 60% 12%, rgba(110,201,255,0.08), transparent 62%),
            linear-gradient(135deg, ${theme.bg0} 0%, ${theme.bg1} 40%, ${theme.bg2} 72%, ${theme.bg3} 100%)
          `,
        }}
      />
      <div aria-hidden="true" className="gs-texture" />
      <canvas ref={orbsCanvasRef} className="gs-orbs" aria-hidden="true" />

      {/* Content */}
      <div className="gs-inner">
        <div className="gs-heartStage">
          <div className="gs-heartWrap">
            <svg viewBox="0 0 600 520" className="gs-heartSvg" aria-hidden="true">
              <defs>
                <linearGradient id="glassFill" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(255,255,255,0.78)" />
                  <stop offset="1" stopColor="rgba(255,255,255,0.46)" />
                </linearGradient>

                <linearGradient id="strokeGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0" stopColor="rgba(123,92,255,0.34)" />
                  <stop offset="0.55" stopColor="rgba(184,164,255,0.22)" />
                  <stop offset="1" stopColor="rgba(123,92,255,0.28)" />
                </linearGradient>

                <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="2.2" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              <path
                d="M300 482
                   C230 430 110 330 78 230
                   C52 145 105 78 180 78
                   C238 78 278 114 300 152
                   C322 114 362 78 420 78
                   C495 78 548 145 522 230
                   C490 330 370 430 300 482 Z"
                fill="none"
                stroke="url(#strokeGrad)"
                strokeWidth="12"
                opacity="0.55"
                filter="url(#softGlow)"
              />

              <path
                d="M300 482
                   C230 430 110 330 78 230
                   C52 145 105 78 180 78
                   C238 78 278 114 300 152
                   C322 114 362 78 420 78
                   C495 78 548 145 522 230
                   C490 330 370 430 300 482 Z"
                fill="url(#glassFill)"
                opacity="0.94"
                stroke="rgba(123,92,255,0.22)"
                strokeWidth="2.5"
                filter={theme.heartGlow}
              />
            </svg>

            <div className="gs-heartContent">
              <div className="gs-badges">
                <span className="gs-badge">✨ Full Stack Software Engineer</span>
                <span className="gs-badge">🤖 AI + UX</span>
              </div>

              <h1 className="gs-name">Jaqueline Smith</h1>

              <p className="gs-oneLiner">
                Cozy full-stack builds with a soft spot for interactive, human-friendly UI.
              </p>

              <div className="gs-cta">
                <Link to="/projects" className="gs-btn">
                  See My Creations →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .gs-hero, .gs-hero * , .gs-hero *::before, .gs-hero *::after { box-sizing: border-box; }

        /* ✅ Welcome fills .app-main */
        .gs-hero{
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          display: grid;

          /* ✅ default: no lift */
          --liftY: 0px;
        }

        .gs-bg, .gs-texture, .gs-orbs{
          position: absolute;
          inset: 0;
          pointer-events: none;
        }
        .gs-bg{ z-index: 0; }
        .gs-texture{
          z-index: 1;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.5;
          mix-blend-mode: multiply;
        }
        .gs-orbs{ z-index: 2; }

        /* ✅ main stage */
        .gs-inner{
          position: relative;
          z-index: 3;
          height: 100%;
          min-height: 0;

          display: grid;
          place-items: center;

          padding: 10px 12px;
        }

        .gs-heartStage{
          width: 100%;
          height: 100%;
          min-height: 0;
          display: grid;
          place-items: center;

          /* ✅ lift is controlled by media queries */
          transform: translateY(var(--liftY));
        }

        .gs-heartWrap{
          position: relative;
          width: min(980px, 96vw);
          aspect-ratio: 600 / 520;

          display: grid;
          place-items: center;

          /* ✅ stable sizing based on actual container */
          height: min(72vh, max(320px, 100%));
          max-height: 100%;

          transform-origin: center;
          scale: clamp(0.64, 0.92, 1);
        }

        /* ✅ 13" laptop sweet spot (common: 1366×768, 1440×900) */
        @media (min-width: 900px) and (max-width: 1500px) and (max-height: 860px){
          .gs-hero{
            /* lift the heart up a bit */
            --liftY: clamp(-78px, -7vh, -34px);
          }

          .gs-heartWrap{
            /* slightly reduce so it doesn't kiss the footer */
            scale: clamp(0.78, 0.88, 0.95);
          }
        }

        /* extra-tight laptop heights */
        @media (min-width: 900px) and (max-width: 1500px) and (max-height: 760px){
          .gs-hero{ --liftY: clamp(-92px, -9vh, -44px); }
          .gs-heartWrap{ scale: 0.84; }
        }

        @media (max-width: 520px){
          .gs-heartWrap{ width: min(980px, 96vw); }
        }

        .gs-heartSvg{
          position:absolute;
          inset:0;
          width:100%;
          height:100%;
        }

        .gs-heartContent{
          position: relative;
          width: min(520px, 74%);
          max-width: 520px;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;

          gap: 12px;
          padding: 10px 6px;

          transform: translateY(-1%);
        }

        .gs-badges{
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          gap: 10px;
        }

        .gs-badge{
          border: 1px solid rgba(123,92,255,0.18);
          background: rgba(255,255,255,0.62);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: clamp(0.78rem, 0.35vw + 0.72rem, 0.92rem);
          color: #241B45;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 800;
          white-space: nowrap;
          user-select: none;
        }

        .gs-name{
          margin: 0;
          font-family: 'Grand Hotel', cursive;
          font-size: clamp(3.1rem, 7.0vw, 5.6rem);
          line-height: 0.92;
          font-weight: 400;
          color: #7B5CFF;
          text-shadow: 0 10px 30px rgba(123,92,255,0.16);
        }

        .gs-oneLiner{
          margin: 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.86rem, 1.5vw, 1.06rem);
          line-height: 1.32;
          font-weight: 800;
          color: rgba(26,22,48,0.66);
          max-width: 34ch;
        }

        .gs-cta{
          width: 100%;
          display: flex;
          justify-content: center;
        }

        .gs-btn{
          border-radius: 999px;
          border: 1px solid rgba(123,92,255,0.24);
          text-decoration: none;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          color: #241B45;
          background: rgba(123,92,255,0.12);
          box-shadow: 0 10px 30px rgba(123,92,255,0.14);
          transition: transform 160ms ease, background 160ms ease;

          padding: 12px 18px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          min-height: 44px;
          white-space: nowrap;
        }

        .gs-btn:hover{
          transform: translateY(-1px);
          background: rgba(123,92,255,0.16);
        }

        @media (max-width: 520px){
          .gs-heartContent{ gap: 10px; }
          .gs-btn{ padding: 10px 16px; min-height: 40px; }
        }

        @media (max-height: 680px){
          .gs-heartContent{ gap: 9px; }
          .gs-btn{ padding: 9px 14px; min-height: 38px; }
        }

        @media (prefers-reduced-motion: reduce){
          .gs-btn{ transition: none; }
        }
      `}</style>
    </section>
  );
}
