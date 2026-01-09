import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  const orbsCanvasRef = useRef(null);
  const sparkCanvasRef = useRef(null);

  const rafOrbsRef = useRef(0);
  const rafSparkRef = useRef(0);

  const orbsRef = useRef([]);
  const sparklesRef = useRef([]);

  const [reducedMotion, setReducedMotion] = useState(false);

  const ENABLE_ORBS = true;
  const ENABLE_FALLING_SPARKLES = false;

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
      // glow
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.2, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.2);
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
    <div className="gs-page" style={styles.page}>
      {/* Background */}
      <div
        aria-hidden="true"
        style={{
          ...styles.backdrop,
          background: `
            radial-gradient(900px 650px at 18% 18%, rgba(123,92,255,0.10), transparent 56%),
            radial-gradient(780px 600px at 86% 70%, rgba(184,164,255,0.18), transparent 60%),
            radial-gradient(720px 520px at 60% 12%, rgba(110,201,255,0.08), transparent 62%),
            linear-gradient(135deg, ${theme.bg0} 0%, ${theme.bg1} 40%, ${theme.bg2} 72%, ${theme.bg3} 100%)
          `,
        }}
      />
      <div aria-hidden="true" style={styles.texture} />

      <canvas ref={orbsCanvasRef} style={styles.canvasOrbs} />
      {ENABLE_FALLING_SPARKLES && <canvas ref={sparkCanvasRef} style={styles.canvasSpark} />}

      <main className="gs-centerWrap" style={styles.centerWrap}>
        <section className="gs-heartWrap" style={styles.heartWrap} aria-label="Welcome">
          <svg
            viewBox="0 0 600 520"
            className="gs-heartSvg"
            style={styles.heartSvg}
            aria-hidden="true"
          >
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

            <path
              d="M205 150 C150 152 120 212 140 255"
              fill="none"
              stroke="rgba(255,255,255,0.75)"
              strokeWidth="7"
              strokeLinecap="round"
              opacity="0.22"
            />
          </svg>

          {/* ✅ moved deeper into the heart + heart is slightly bigger */}
          <div className="gs-heartContent" style={styles.heartContent}>
            <div style={styles.badgeRow}>
              <span style={styles.badge}>✨ Full Stack Engineer</span>
              <span style={styles.badge}>🤖 AI + UX</span>
            </div>

            <h1 style={styles.name}>Jaqueline Smith</h1>

            <p style={styles.blurb}>
              I build cozy, high-quality products — from delightful frontends to reliable backends — with a
              special love for interactive UI and human-friendly design.
            </p>

            <div style={styles.ctaRow}>
              <Link to="/projects" style={styles.primaryBtn}>
                See My Creations →
              </Link>
              
            </div>

            <div style={styles.hintRow}>
              <span style={styles.hint}>✨</span>
            </div>
          </div>
        </section>
      </main>

      {/* ✅ Responsive sizing + content sits more INSIDE the heart */}
      <style>{`
        .gs-page{
          min-height: 100vh;
          min-height: 100dvh;
          width: 100%;
          overflow-x: hidden;
        }

        /* give the navbar breathing room without changing your navbar */
        .gs-centerWrap{
          min-height: 100vh;
          min-height: 100dvh;
          display: grid;
          place-items: center;
          padding: clamp(12px, 2.8vh, 28px);
          padding-top: clamp(64px, 10vh, 104px); /* ✅ pushes heart down from sticky nav */
          overflow-y: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* single source of truth via CSS vars */
        .gs-heartWrap{
          --heartMaxH: min(860px, 84dvh);        /* ✅ slightly bigger than before */
          --contentW: min(700px, 78%);           /* ✅ a touch wider */
          --contentY: 2.2%;                      /* ✅ moves content DOWN into heart */
          width: min(1020px, 96vw);              /* ✅ a bit wider */
          aspect-ratio: 600 / 520;
          max-height: var(--heartMaxH);
          position: relative;
          display: grid;
          place-items: center;
        }

        .gs-heartContent{
          width: var(--contentW);
          transform: translateY(var(--contentY));
        }

        /* Tablets / small laptops */
        @media (max-width: 900px){
          .gs-heartWrap{
            --heartMaxH: min(840px, 80dvh);
            --contentW: min(680px, 80%);
            --contentY: 2.8%;
            width: 96vw;
          }
        }

        /* Mobile */
        @media (max-width: 640px){
          .gs-centerWrap{
            padding-top: clamp(56px, 9vh, 90px);
          }

          .gs-heartWrap{
            --heartMaxH: min(760px, 78dvh);
            --contentW: min(560px, 88%);
            --contentY: 3.6%;
            width: 96vw;
          }

          .gs-heartContent{
            padding: 16px 10px !important;
            gap: 10px !important;
          }

          .gs-heartContent a{
            width: min(260px, 88vw);
          }
        }

        /* Tiny phones */
        @media (max-width: 420px){
          .gs-heartWrap{
            --heartMaxH: min(720px, 76dvh);
            --contentW: min(520px, 90%);
            --contentY: 4.2%;
            width: 98vw;
          }
        }

        a:hover{ transform: translateY(-1px); }
      `}</style>
    </div>
  );
}

const styles = {
  page: { position: "relative", width: "100%", minHeight: "100dvh", overflowX: "hidden" },

  backdrop: { position: "fixed", inset: 0, zIndex: 0 },

  texture: {
    position: "fixed",
    inset: 0,
    zIndex: 1,
    pointerEvents: "none",
    backgroundImage: `
      radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
      radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
      radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
      radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px)
    `,
    backgroundSize: "260px 260px",
    opacity: 0.5,
    mixBlendMode: "multiply",
  },

  canvasOrbs: { position: "fixed", inset: 0, zIndex: 2, pointerEvents: "none" },
  canvasSpark: { position: "fixed", inset: 0, zIndex: 3, pointerEvents: "none" },

  centerWrap: {
    position: "relative",
    zIndex: 4,
    width: "100%",
    minHeight: "100dvh",
    display: "grid",
    placeItems: "center",
    padding: "18px",
  },

  heartWrap: {
    position: "relative",
    width: "min(1020px, 96vw)", // ✅ bigger
    aspectRatio: "600 / 520",
    display: "grid",
    placeItems: "center",
  },

  heartSvg: { position: "absolute", inset: 0, width: "100%", height: "100%" },

  heartContent: {
    position: "relative",
    width: "78%",              // ✅ slightly wider
    maxWidth: "700px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "22px 10px",
    transform: "translateY(2.2%)", // ✅ moved DOWN into the heart (more inside)
  },

  badgeRow: { display: "flex", gap: "10px", flexWrap: "wrap", justifyContent: "center" },
  badge: {
    border: "1px solid rgba(123,92,255,0.18)",
    background: "rgba(255,255,255,0.62)",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.9rem",
    color: "#241B45",
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontWeight: 700,
    userSelect: "none",
  },

  name: {
    margin: 0,
    fontFamily: "'Grand Hotel', cursive",
    fontSize: "clamp(3.0rem, 5.2vw + 1rem, 6.2rem)",
    lineHeight: 0.92,
    letterSpacing: "0.2px",
    fontWeight: 400,
    color: "#7B5CFF",
    textShadow: "0 10px 30px rgba(123,92,255,0.16)",
  },

  blurb: {
    margin: 0,
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontSize: "clamp(1.0rem, 1vw + 0.72rem, 1.28rem)",
    lineHeight: 1.55,
    maxWidth: "60ch",
    fontWeight: 500,
    color: "rgba(26,22,48,0.72)",
  },

  ctaRow: {
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "6px",
  },

  primaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 16px",
    borderRadius: "14px",
    border: "1px solid rgba(123,92,255,0.24)",
    textDecoration: "none",
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontWeight: 800,
    color: "#241B45",
    background: "rgba(123,92,255,0.12)",
    boxShadow: "0 10px 30px rgba(123,92,255,0.14)",
    transition: "transform 160ms ease, background 160ms ease",
  },

  secondaryBtn: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "12px 14px",
    borderRadius: "14px",
    border: "1px solid rgba(123,92,255,0.20)",
    textDecoration: "none",
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontWeight: 800,
    color: "rgba(26,22,48,0.72)",
    background: "transparent",
    transition: "transform 160ms ease",
  },

  hintRow: { marginTop: "8px", height: "18px" },
  hint: {
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontSize: "0.92rem",
    opacity: 0.6,
    userSelect: "none",
    fontWeight: 700,
    color: "rgba(26,22,48,0.72)",
  },
};
