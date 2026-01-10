import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

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
  // ORBS CANVAS (mobile-friendly)
  // =========================
  useEffect(() => {
    const canvas = orbsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let running = true;

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

    const orbColors = [
      "rgba(184,164,255,1)",
      "rgba(214,204,255,1)",
      "rgba(110,201,255,1)",
      "rgba(127,240,198,1)",
      "rgba(255,204,235,1)",
    ];

    const resize = () => {
      dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const makeOrb = (x, y) => {
      // slightly smaller + lighter on tiny screens
      const base = clamp(w / 520, 0.75, 1.05);
      const r = rand(10, 26) * base;
      const c = orbColors[Math.floor(Math.random() * orbColors.length)];
      return {
        x,
        y,
        r,
        c,
        vx: rand(-0.14, 0.14),
        vy: rand(0.18, 0.62),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.02),
      };
    };

    const drawOrb = (o) => {
      // glow
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.0, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.0);
      g.addColorStop(0, o.c.replace("1)", "0.13)"));
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
      rg.addColorStop(1, o.c.replace("1)", "0.18)"));
      ctx.fillStyle = rg;
      ctx.fill();

      // rim
      ctx.strokeStyle = "rgba(123,92,255,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const init = () => {
      orbsRef.current = [];
      // density scales with screen width, but capped (mobile safe)
      const count = clamp(Math.floor(w / 170), 7, 15);
      for (let i = 0; i < count; i++) {
        orbsRef.current.push(makeOrb(rand(40, w - 40), rand(-h * 0.25, h)));
      }
    };

    const step = () => {
      if (!running) return;

      ctx.clearRect(0, 0, w, h);

      const gravity = 0.011;
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

        // floor bounce + respawn
        if (o.y + o.r > h) {
          o.y = h - o.r;
          o.vy = -Math.abs(o.vy) * bounce;
          o.vx *= 0.92;

          if (Math.abs(o.vy) < 0.08) {
            o.x = rand(40, w - 40);
            o.y = rand(-170, -30);
            o.vx = rand(-0.14, 0.14);
            o.vy = rand(0.22, 0.72);
            o.wobble = rand(0, Math.PI * 2);
          }
        }

        drawOrb(o);
      }

      rafOrbsRef.current = requestAnimationFrame(step);
    };

    const onVis = () => {
      const hidden = document.visibilityState === "hidden";
      running = !hidden;
      if (!hidden && !reducedMotion) {
        cancelAnimationFrame(rafOrbsRef.current);
        rafOrbsRef.current = requestAnimationFrame(step);
      }
    };

    resize();
    init();

    if (!reducedMotion) rafOrbsRef.current = requestAnimationFrame(step);
    else {
      ctx.clearRect(0, 0, w, h);
      for (const o of orbsRef.current) drawOrb(o);
    }

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);

    return () => {
      cancelAnimationFrame(rafOrbsRef.current);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, [reducedMotion]);

  return (
    <div className="gs-page">
      {/* Background */}
      <div
        className="gs-backdrop"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(900px 650px at 18% 18%, rgba(123,92,255,0.10), transparent 56%),
            radial-gradient(780px 600px at 86% 70%, rgba(184,164,255,0.18), transparent 60%),
            radial-gradient(720px 520px at 60% 12%, rgba(110,201,255,0.08), transparent 62%),
            linear-gradient(135deg, ${theme.bg0} 0%, ${theme.bg1} 40%, ${theme.bg2} 72%, ${theme.bg3} 100%)
          `,
        }}
      />
      <div className="gs-texture" aria-hidden="true" />

      {/* Falling orbs */}
      <canvas ref={orbsCanvasRef} className="gs-orbs" aria-hidden="true" />

      <main className="gs-center">
        <section className="gs-heart" aria-label="Welcome">
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

              {/* content clip so NOTHING can visually "escape" the heart */}
              <clipPath id="heartClip">
                <path
                  d="M300 482
                     C230 430 110 330 78 230
                     C52 145 105 78 180 78
                     C238 78 278 114 300 152
                     C322 114 362 78 420 78
                     C495 78 548 145 522 230
                     C490 330 370 430 300 482 Z"
                />
              </clipPath>
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
              style={{ filter: "drop-shadow(0 18px 50px rgba(90,60,190,0.18))" }}
            />

            <path
              d="M205 150 C150 152 120 212 140 255"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.22"
            />
          </svg>

          {/* Content (clipped + constrained) */}
          <div className="gs-contentShell">
            <div className="gs-content">
              <div className="gs-badges">
                <span className="gs-badge">✨ Full Stack Engineer</span>
                <span className="gs-badge">🤖 AI + UX</span>
              </div>

              <h1 className="gs-name">Jaqueline Smith</h1>

              {/* ✅ extra space between name + paragraph */}
              <p className="gs-blurb">
                I build cozy, high-quality products — from delightful frontends to reliable backends — with a
                special love for interactive UI and human-friendly design.
              </p>

              <div className="gs-cta">
                <Link to="/projects" className="gs-btn gs-btnPrimary">
                  See My Creations →
                </Link>
                <Link to="/about" className="gs-btn gs-btnSecondary">
                  About Me
                </Link>
              </div>

              <div className="gs-hint">✨</div>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* Page */
        .gs-page{
          position: relative;
          width: 100%;
          min-height: 100svh;
          overflow: hidden;
          font-family: Nunito, ui-sans-serif, system-ui;
        }

        .gs-backdrop{ position:absolute; inset:0; z-index:0; }
        .gs-texture{
          position:absolute; inset:0; z-index:1; pointer-events:none;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.5;
          mix-blend-mode: multiply;
        }

        .gs-orbs{ position:absolute; inset:0; z-index:2; pointer-events:none; }

        /* Centering: scrollable when height is tight (mobile + landscape) */
        .gs-center{
          position: relative;
          z-index: 3;
          min-height: 100svh;
          display: grid;
          place-items: center;
          padding: clamp(10px, 3vh, 28px);
          overflow: auto;
          overscroll-behavior: contain;
        }

        /* Heart scales by BOTH width & height so sideways stretch doesn't break it */
        .gs-heart{
          position: relative;
          width: min(920px, 94vw);
          aspect-ratio: 600 / 520;
          max-height: min(760px, 76svh);
          display: grid;
          place-items: center;
          margin: 0 auto;
        }

        .gs-heartSvg{
          position:absolute; inset:0;
          width:100%; height:100%;
        }

        /* Content shell: clips and bounds (no escaping) */
        .gs-contentShell{
          position: relative;
          width: 100%;
          height: 100%;
          display: grid;
          place-items: center;
          clip-path: url(#heartClip);
          /* extra safety so nothing can overflow visually */
          overflow: hidden;
        }

        /* Inner content constraints */
        .gs-content{
          width: min(520px, 78%);
          max-width: 520px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          /* ✅ spacing that scales up on bigger screens */
          gap: clamp(10px, 1.8vmin, 18px);

          /* keeps content comfortably inside heart */
          padding: clamp(12px, 2.2vmin, 20px) clamp(10px, 2vmin, 18px);
          transform: translateY(-2.6%);
        }

        .gs-badges{
          display:flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          max-width: 100%;
        }

        .gs-badge{
          border: 1px solid rgba(123,92,255,0.18);
          background: rgba(255,255,255,0.62);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: clamp(0.78rem, 1.35vmin, 0.92rem);
          color: #241B45;
          font-weight: 800;
          white-space: nowrap;
          user-select: none;
          max-width: 100%;
        }

        /* ✅ vmin-based sizing = better on big + sideways screens */
        .gs-name{
          margin: 0;
          font-family: 'Grand Hotel', cursive;
          font-weight: 400;
          color: ${theme.accent};
          text-shadow: 0 10px 30px rgba(123,92,255,0.16);
          letter-spacing: 0.2px;
          line-height: 0.92;
          font-size: clamp(2.8rem, 6.2vmin, 5.8rem);
        }

        /* ✅ explicit space between name and paragraph */
        .gs-blurb{
          margin: clamp(6px, 1.2vmin, 14px) 0 0 0;
          max-width: 48ch;
          font-weight: 800;
          color: rgba(26,22,48,0.72);

          /* mobile + landscape safe text sizing */
          font-size: clamp(0.95rem, 1.7vmin, 1.18rem);
          line-height: 1.52;

          /* prevents weird overflow on long widths */
          overflow-wrap: anywhere;
          word-break: break-word;
        }

        .gs-cta{
          width: min(520px, 92%);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
          margin-top: clamp(2px, 0.8vmin, 10px);
        }

        .gs-btn{
          width: 100%;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          text-decoration: none;
          font-weight: 900;
          border-radius: 14px;
          transition: transform 160ms ease, background 160ms ease;
          padding: 12px 14px;
        }

        .gs-btnPrimary{
          border: 1px solid rgba(123,92,255,0.24);
          color: #241B45;
          background: rgba(123,92,255,0.12);
          box-shadow: 0 10px 30px rgba(123,92,255,0.14);
        }

        .gs-btnSecondary{
          border: 1px solid rgba(123,92,255,0.20);
          color: rgba(26,22,48,0.72);
          background: transparent;
        }

        .gs-btn:hover{ transform: translateY(-1px); }

        .gs-hint{
          margin-top: 6px;
          font-weight: 800;
          opacity: 0.6;
          user-select: none;
        }

        /* Tablets */
        @media (max-width: 900px){
          .gs-heart{ max-height: min(720px, 72svh); }
          .gs-content{ width: min(520px, 82%); transform: translateY(-3.6%); }
        }

        /* Mobile */
        @media (max-width: 640px){
          .gs-heart{ max-height: min(680px, 66svh); }
          .gs-content{ width: min(520px, 86%); transform: translateY(-4.8%); }
          .gs-cta{
            grid-template-columns: 1fr;
            width: min(420px, 92%);
            gap: 10px;
          }
        }

        /* Tiny phones */
        @media (max-width: 420px){
          .gs-heart{ max-height: min(640px, 62svh); }
          .gs-content{ width: min(520px, 88%); transform: translateY(-5.6%); }
        }

        /* Short landscape screens (the "stretch sideways" case) */
        @media (max-height: 520px){
          .gs-heart{ max-height: 82svh; }
          .gs-content{ transform: translateY(-2.0%); }
          .gs-blurb{ line-height: 1.42; }
        }
      `}</style>
    </div>
  );
}
