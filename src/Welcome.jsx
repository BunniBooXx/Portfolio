import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** ✅ Move these OUTSIDE the component to satisfy react-hooks/exhaustive-deps */
const ENABLE_ORBS = true;
const ENABLE_FALLING_SPARKLES = false;

export default function Welcome() {
  const orbsCanvasRef = useRef(null);
  const sparkCanvasRef = useRef(null);

  const rafOrbsRef = useRef(0);
  const rafSparkRef = useRef(0);

  const orbsRef = useRef([]);
  const sparklesRef = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(false);

  const theme = useMemo(
    () => ({
      bg0: "#FFFFFF",
      bg1: "#F8F3FF",
      bg2: "#EFE6FF",
      bg3: "#E7D8FF",
      text: "#1A1630",
      subtext: "rgba(26,22,48,0.72)",
      accent: "#7B5CFF",
      glass: "rgba(255,255,255,0.62)",
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

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const set = () => setReducedMotion(Boolean(mq?.matches));
    set();
    mq?.addEventListener?.("change", set);
    return () => mq?.removeEventListener?.("change", set);
  }, []);

  // Helper: reliable viewport size (mobile address bar safe)
  const getViewport = () => {
    const vv = window.visualViewport;
    const w = Math.floor(vv?.width ?? window.innerWidth);
    const h = Math.floor(vv?.height ?? window.innerHeight);
    return { w, h };
  };

  // =========================
  // ORBS CANVAS
  // =========================
  useEffect(() => {
    if (!ENABLE_ORBS) return;

    const canvas = orbsCanvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const vp = getViewport();
      w = vp.w;
      h = vp.h;

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

    const makeOrb = (x, y, fromTop = false) => {
      const r = rand(14, 34);
      const c = orbColors[Math.floor(Math.random() * orbColors.length)];
      return {
        x,
        y,
        r,
        c,
        vx: rand(-0.18, 0.18),
        vy: fromTop ? rand(0.35, 0.95) : rand(0.05, 0.45),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.02),
      };
    };

    const drawOrb = (o) => {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.2, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.2);
      g.addColorStop(0, o.c.replace("1)", "0.14)"));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fill();

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

      ctx.strokeStyle = "rgba(123,92,255,0.10)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    const init = () => {
      orbsRef.current = [];
      const count = clamp(Math.floor(w / 120), 10, 18);
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

        if (o.x - o.r < 0) {
          o.x = o.r;
          o.vx = Math.abs(o.vx) * bounce;
        }
        if (o.x + o.r > w) {
          o.x = w - o.r;
          o.vx = -Math.abs(o.vx) * bounce;
        }

        if (o.y + o.r > h) {
          o.y = h - o.r;
          o.vy = -Math.abs(o.vy) * bounce;
          o.vx *= 0.92;

          if (Math.abs(o.vy) < 0.08) {
            o.x = rand(40, w - 40);
            o.y = rand(-140, -30);
            o.vx = rand(-0.18, 0.18);
            o.vy = rand(0.35, 0.95);
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

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onResize);

    return () => {
      cancelAnimationFrame(rafOrbsRef.current);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, [reducedMotion]);

  // =========================
  // OPTIONAL FALLING SPARKLES
  // =========================
  useEffect(() => {
    if (!ENABLE_FALLING_SPARKLES) return;

    const canvas = sparkCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const rand = (min, max) => min + Math.random() * (max - min);
    const clamp = (n, a, b) => Math.min(b, Math.max(a, n));

    const resize = () => {
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
      const vp = getViewport();
      w = vp.w;
      h = vp.h;

      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const make = () => ({
      x: rand(0, w),
      y: rand(-h, h),
      r: rand(0.8, 1.9),
      vy: rand(0.25, 0.7),
      vx: rand(-0.12, 0.12),
      a: rand(0.05, 0.14),
      t: rand(0, Math.PI * 2),
      tw: rand(0.01, 0.03),
    });

    const init = () => {
      sparklesRef.current = [];
      const count = clamp(Math.floor(w / 10), 90, 170);
      for (let i = 0; i < count; i++) sparklesRef.current.push(make());
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      for (const s of sparklesRef.current) {
        s.t += s.tw;
        const tw = 0.65 + 0.35 * Math.sin(s.t);
        const alpha = clamp(s.a * tw, 0.02, 0.18);

        s.x += s.vx;
        s.y += s.vy;

        if (s.y > h + 30) {
          s.y = rand(-120, -10);
          s.x = rand(0, w);
        }
        if (s.x < -40) s.x = w + 40;
        if (s.x > w + 40) s.x = -40;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r * 3.2, 0, Math.PI * 2);
        const g = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 3.2);
        g.addColorStop(0, `rgba(123,92,255,${alpha * 0.22})`);
        g.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = g;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(123,92,255,${alpha})`;
        ctx.fill();
      }

      rafSparkRef.current = requestAnimationFrame(step);
    };

    resize();
    init();
    if (!reducedMotion) rafSparkRef.current = requestAnimationFrame(step);

    const onResize = () => {
      resize();
      init();
    };

    window.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("resize", onResize);
    window.visualViewport?.addEventListener("scroll", onResize);

    return () => {
      cancelAnimationFrame(rafSparkRef.current);
      window.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("resize", onResize);
      window.visualViewport?.removeEventListener("scroll", onResize);
    };
  }, [reducedMotion]);

  return (
    <div className="gs-page">
      {/* Background */}
      <div
        aria-hidden="true"
        className="gs-backdrop"
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

      <canvas ref={orbsCanvasRef} className="gs-canvasOrbs" />
      {ENABLE_FALLING_SPARKLES && <canvas ref={sparkCanvasRef} className="gs-canvasSpark" />}

      <main className="gs-centerWrap">
        <section className="gs-heartWrap" aria-label="Welcome">
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
              style={{ filter: theme.heartGlow }}
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

          <div className="gs-heartContent">
            <div className="gs-badgeRow">
              <span className="gs-badge">✨ Full Stack Engineer</span>
              <span className="gs-badge">🤖 AI + UX</span>
            </div>

            <h1 className="gs-name">Jaqueline Smith</h1>

            <p className="gs-blurb">
              I build cozy, high-quality products — from delightful frontends to reliable backends — with a
              special love for interactive UI and human-friendly design.
            </p>

            <div className="gs-ctaRow">
              <Link to="/projects" className="gs-primaryBtn">
                See My Creations →
              </Link>
            </div>

            <div className="gs-hintRow" aria-hidden="true">
              ✨
            </div>
          </div>
        </section>
      </main>

      <style>{`
        /* ======================
           PAGE / BACKGROUND
        ====================== */
        .gs-page{
          position: relative;
          width: 100%;
          min-height: 100vh;
          min-height: 100dvh;
          overflow-x: hidden;
        }

        .gs-backdrop{
          position: fixed;
          inset: 0;
          z-index: 0;
        }

        .gs-texture{
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.5;
          mix-blend-mode: multiply;
        }

        .gs-canvasOrbs{
          position: fixed;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .gs-canvasSpark{
          position: fixed;
          inset: 0;
          z-index: 3;
          pointer-events: none;
        }

        /* ======================
           LAYOUT (RESPONSIVE)
           - uses svh/dvh for mobile address bar stability
        ====================== */
        .gs-centerWrap{
          position: relative;
          z-index: 4;

          /* ✅ avoids getting hidden under your sticky navbar */
          --nav-pad: clamp(72px, 10svh, 112px);

          min-height: 100vh;
          min-height: 100dvh;
          display: grid;
          place-items: center;

          padding:
            clamp(14px, 2.8svh, 28px)
            clamp(12px, 2.2vw, 22px);

          padding-top: calc(var(--nav-pad) + env(safe-area-inset-top, 0px));

          /* ✅ scroll only if needed (tiny phones) */
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* The heart scales by both width AND height so it never overflows on short screens */
        .gs-heartWrap{
          --heartW: min(980px, 96vw);
          --heartH: min(78svh, 840px);
          --contentW: min(720px, 78%);
          --contentY: 2.2%;

          width: var(--heartW);
          max-height: var(--heartH);
          aspect-ratio: 600 / 520;

          position: relative;
          display: grid;
          place-items: center;
        }

        .gs-heartSvg{
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
        }

        .gs-heartContent{
          position: relative;
          width: var(--contentW);
          transform: translateY(var(--contentY));
          text-align: center;

          display: flex;
          flex-direction: column;
          align-items: center;

          gap: clamp(10px, 1.2vw, 14px);
          padding: clamp(14px, 2.2vw, 26px) clamp(10px, 1.6vw, 18px);
        }

        /* ======================
           TYPOGRAPHY + UI
        ====================== */
        .gs-badgeRow{
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          justify-content: center;
        }

        .gs-badge{
          border: 1px solid rgba(123,92,255,0.18);
          background: rgba(255,255,255,0.62);
          padding: 6px 10px;
          border-radius: 999px;
          font-size: clamp(0.82rem, 1.6vw, 0.95rem);
          color: #241B45;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 700;
          user-select: none;
        }

        .gs-name{
          margin: 0;
          font-family: "Grand Hotel", cursive;
          font-size: clamp(2.6rem, 7.2vw, 6.2rem);
          line-height: 0.92;
          letter-spacing: 0.2px;
          font-weight: 400;
          color: #7B5CFF;
          text-shadow: 0 10px 30px rgba(123,92,255,0.16);
        }

        .gs-blurb{
          margin: 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.98rem, 2.6vw, 1.28rem);
          line-height: 1.55;
          max-width: 60ch;
          font-weight: 500;
          color: rgba(26,22,48,0.72);
        }

        .gs-ctaRow{
          display: flex;
          justify-content: center;
          margin-top: 4px;
          width: 100%;
        }

        .gs-primaryBtn{
          display: inline-flex;
          align-items: center;
          justify-content: center;

          padding: 12px 16px;
          border-radius: 14px;
          border: 1px solid rgba(123,92,255,0.24);
          text-decoration: none;

          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 800;
          color: #241B45;

          background: rgba(123,92,255,0.12);
          box-shadow: 0 10px 30px rgba(123,92,255,0.14);
          transition: transform 160ms ease, background 160ms ease;

          width: fit-content;
          min-width: 220px;
          max-width: min(360px, 92vw);
        }

        .gs-primaryBtn:hover{
          transform: translateY(-1px);
          background: rgba(123,92,255,0.16);
        }

        .gs-hintRow{
          margin-top: 6px;
          height: 18px;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.92rem;
          opacity: 0.6;
          user-select: none;
          font-weight: 700;
          color: rgba(26,22,48,0.72);
        }

        /* ======================
           MOBILE TUNING
        ====================== */
        @media (max-width: 640px){
          .gs-centerWrap{
            --nav-pad: clamp(62px, 9svh, 96px);
            padding-top: calc(var(--nav-pad) + env(safe-area-inset-top, 0px));
          }

          .gs-heartWrap{
            --heartW: 98vw;
            --heartH: min(74svh, 760px);
            --contentW: 90%;
            --contentY: 3.8%;
          }

          .gs-primaryBtn{
            width: min(320px, 90vw);
            min-width: 0;
          }
        }

        /* tiny phones: keep everything inside the heart */
        @media (max-width: 420px){
          .gs-heartWrap{
            --heartH: min(72svh, 720px);
            --contentY: 4.6%;
          }
          .gs-heartContent{
            gap: 10px;
            padding: 14px 10px;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .gs-primaryBtn{ transition: none; }
        }
      `}</style>
    </div>
  );
}
