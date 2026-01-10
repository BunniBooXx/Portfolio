import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

/** ✅ Static flags outside the component (fixes exhaustive-deps warning) */
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

  // Fonts: cute script but readable + clean body font
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

  // =========================
  // ORBS CANVAS (FALLING BALLS)
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
      w = Math.floor(window.innerWidth);
      h = Math.floor(window.innerHeight);

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

        // floor: bounce then respawn from top
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

    const onResize = () => {
      resize();
      init();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(rafOrbsRef.current);
      window.removeEventListener("resize", onResize);
    };
  }, [reducedMotion]); // ✅ no warning now

  return (
    <div className="gs-page" style={styles.page}>
      {/* background */}
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

      {/* falling colorful balls */}
      <canvas ref={orbsCanvasRef} style={styles.canvasOrbs} />

      <main className="gs-centerWrap" style={styles.centerWrap}>
        <section className="gs-heartWrap" style={styles.heartWrap} aria-label="Welcome">
          <svg viewBox="0 0 600 520" className="gs-heartSvg" style={styles.heartSvg} aria-hidden="true">
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

          <div className="gs-heartContent" style={styles.heartContent}>
            <div className="gs-badges" style={styles.badgeRow}>
              <span className="gs-badge" style={styles.badge}>✨ Full Stack Engineer</span>
              <span className="gs-badge" style={styles.badge}>🤖 AI + UX</span>
            </div>

            <h1 className="gs-name" style={styles.name}>Jaqueline Smith</h1>

            <p className="gs-blurb" style={styles.blurb}>
              I build cozy, high-quality products — from delightful frontends to reliable backends — with a
              special love for interactive UI and human-friendly design.
            </p>

            <div className="gs-cta" style={styles.ctaRow}>
              <Link to="/projects" className="gs-btn gs-btnPrimary" style={styles.primaryBtn}>
                See My Creations →
              </Link>
              <Link to="/about" className="gs-btn gs-btnSecondary" style={styles.secondaryBtn}>
                About Me
              </Link>
            </div>

            <div style={styles.hintRow}>
              <span style={styles.hint}>✨</span>
            </div>
          </div>
        </section>
      </main>

      <style>{`
        .gs-page { min-height: 100svh; }
        .gs-centerWrap{
          min-height: 100svh;
          padding: clamp(10px, 3vh, 28px);
          display: grid;
          place-items: center;
          overflow: auto;
          overscroll-behavior: contain;
        }

        .gs-heartWrap{
          width: min(980px, 96vw);
          max-height: min(820px, 74svh);
          aspect-ratio: 600 / 520;
          display: grid;
          place-items: center;
          margin: 0 auto;
        }

        .gs-heartContent{
          width: min(520px, 78%);
          max-width: 520px;
          text-align: center;
          transform: translateY(-2.2%);
        }

        .gs-badges{ max-width: 100%; justify-content: center; gap: 10px; }
        .gs-badge{ max-width: 100%; white-space: nowrap; }

        .gs-cta{
          width: min(520px, 92%);
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 12px;
        }
        .gs-btn{
          width: 100%;
          min-height: 44px;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        @media (max-width: 640px){
          .gs-heartWrap{ max-height: 66svh; }
          .gs-heartContent{
            width: min(520px, 86%);
            transform: translateY(-4.6%);
            gap: 10px;
            padding: 14px 8px;
          }
          .gs-cta{
            grid-template-columns: 1fr;
            width: min(420px, 92%);
            gap: 10px;
          }
        }

        a:hover { transform: translateY(-1px); }
      `}</style>
    </div>
  );
}

const styles = {
  page: { position: "relative", width: "100%", height: "100vh", overflow: "hidden" },
  backdrop: { position: "absolute", inset: 0, zIndex: 0 },
  texture: {
    position: "absolute",
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
  canvasOrbs: { position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none" },

  centerWrap: {
    position: "relative",
    zIndex: 4,
    width: "100%",
    height: "100%",
    display: "grid",
    placeItems: "center",
    padding: "18px",
  },

  heartWrap: {
    position: "relative",
    width: "min(980px, 96vw)",
    aspectRatio: "600 / 520",
    display: "grid",
    placeItems: "center",
    margin: "0 auto",
  },

  heartSvg: { position: "absolute", inset: 0, width: "100%", height: "100%" },

  heartContent: {
    position: "relative",
    width: "min(520px, 78%)",
    maxWidth: "520px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    padding: "18px 10px",
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
    fontSize: "clamp(3.0rem, 5.2vw + 1rem, 6.0rem)",
    lineHeight: 0.92,
    letterSpacing: "0.2px",
    fontWeight: 400,
    color: "#7B5CFF",
    textShadow: "0 10px 30px rgba(123,92,255,0.16)",
  },

  blurb: {
    margin: 0,
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontSize: "clamp(1.0rem, 1vw + 0.72rem, 1.22rem)",
    lineHeight: 1.52,
    maxWidth: "56ch",
    fontWeight: 700,
    color: "rgba(26,22,48,0.72)",
  },

  ctaRow: {
    width: "min(520px, 92%)",
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    alignItems: "stretch",
    justifyItems: "stretch",
    marginTop: "6px",
  },

  primaryBtn: {
    borderRadius: "14px",
    border: "1px solid rgba(123,92,255,0.24)",
    textDecoration: "none",
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontWeight: 800,
    color: "#241B45",
    background: "rgba(123,92,255,0.12)",
    boxShadow: "0 10px 30px rgba(123,92,255,0.14)",
    transition: "transform 160ms ease, background 160ms ease",
    padding: "12px 14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    width: "100%",
  },

  secondaryBtn: {
    borderRadius: "14px",
    border: "1px solid rgba(123,92,255,0.20)",
    textDecoration: "none",
    fontFamily: "Nunito, ui-sans-serif, system-ui",
    fontWeight: 800,
    color: "rgba(26,22,48,0.72)",
    background: "transparent",
    transition: "transform 160ms ease",
    padding: "12px 14px",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "44px",
    width: "100%",
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

