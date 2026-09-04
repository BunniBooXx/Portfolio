// HomeOrbBackground.jsx
// Shell-level, fixed full-viewport background for the "/" route only:
// the soft gradient wash + grain texture + floating orb canvas that used
// to live entirely inside Welcome.jsx's .gs-hero. Extracted so it can sit
// BEHIND the navbar, hero, and footer as one continuous layer instead of
// being clipped to the hero's own box in the app-shell grid.
//
// Visual output, colors, and physics are unchanged from the previous
// hero-scoped version — only where it mounts and what it sizes itself to
// has changed (viewport instead of .gs-hero).

import React, { useEffect, useMemo, useRef, useState } from "react";
import { ORB_PALETTE } from "./orbTheme";

const ENABLE_ORBS = true;

export default function HomeOrbBackground() {
  const hostRef = useRef(null);
  const orbsCanvasRef = useRef(null);
  const rafOrbsRef = useRef(0);
  const orbsRef = useRef([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Background gradient stops — mapped to the global "Black + White
  // Light" tokens (src/index.css) instead of one-off hex values. Runs
  // from the lightest graphite surface down to the deepest near-black
  // corner for a subtle vignette.
  const theme = useMemo(
    () => ({
      bg0: "var(--color-surface-glass)",
      bg1: "var(--color-bg-page)",
      bg2: "var(--color-surface-recessed)",
      bg3: "var(--color-bg-deepest)",
    }),
    []
  );

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
    const host = hostRef.current;
    if (!canvas || !host) return;
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

    // Orb colors — smoky glass spheres with white/silver rim light for
    // the "Black + White Light" system. Shared with the lower-density
    // OrbField system used on every other page (see orbTheme.js) so both
    // read as the same visual language. Canvas 2D can't read CSS custom
    // properties directly, so this mirrors the token values.
    const orbColors = ORB_PALETTE;

    const makeOrb = (x, y) => {
      const r = rand(10, 26);
      const c = orbColors[Math.floor(Math.random() * orbColors.length)];
      return {
        x,
        y,
        r,
        c,
        // Wider horizontal velocity range than the original hero-scoped
        // version — see note above `init()` for why this matters now that
        // the canvas spans the full viewport width.
        vx: rand(-0.34, 0.34),
        vy: rand(0.2, 0.7),
        wobble: rand(0, Math.PI * 2),
        wobbleSpeed: rand(0.008, 0.018),
      };
    };

    const drawOrb = (o) => {
      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r * 3.15, 0, Math.PI * 2);
      const g = ctx.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r * 3.15);
      g.addColorStop(0, o.c.replace("1)", "0.16)"));
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(o.x, o.y, o.r, 0, Math.PI * 2);
      const rg = ctx.createRadialGradient(
        o.x - o.r * 0.35,
        o.y - o.r * 0.35,
        o.r * 0.16,
        o.x,
        o.y,
        o.r
      );
      rg.addColorStop(0, "rgba(255,255,255,0.82)");
      rg.addColorStop(0.34, o.c.replace("1)", "0.46)"));
      rg.addColorStop(1, o.c.replace("1)", "0.20)"));
      ctx.fillStyle = rg;
      ctx.fill();
      // Thin light rim — the "smoked glass with a thin light edge" detail,
      // scaled down to orb size.
      ctx.strokeStyle = "rgba(255,255,255,0.16)";
      ctx.lineWidth = 1;
      ctx.stroke();
    };

    // Orb count now scales against the full viewport width (previously
    // the hero-only width, which was similar in practice) — divisor
    // lowered slightly and the cap raised so wide viewports get enough
    // orbs to read as covering the whole width rather than a handful
    // clustered on one side.
    const init = () => {
      orbsRef.current = [];
      const count = clamp(Math.floor(w / 120), 10, 22);
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
        // Stronger sideways impulse than before — with the original tiny
        // value, orbs barely drifted horizontally once spawned, so their
        // resting position near the floor was essentially fixed at
        // whatever x they happened to land on. That, combined with a long
        // settle time (see `bounce`/threshold below), meant a snapshot at
        // any moment was dominated by a few static clusters rather than a
        // spread. This keeps the same organic sine-wobble character, just
        // with enough amplitude for orbs to actually wander left/right
        // across the viewport during their lifetime.
        o.vx += Math.sin(o.wobble) * 0.008;
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

          // Raised from 0.08: orbs used to keep bouncing in place near the
          // floor for many seconds before this triggered, which meant most
          // of the population was "parked" at whatever x it last landed on
          // for most of the animation. Respawning sooner keeps orbs cycling
          // back through fresh random positions more often, so the spread
          // stays even instead of settling into static clusters.
          if (Math.abs(o.vy) < 0.15) {
            o.x = rand(40, w - 40);
            o.y = rand(-160, -30);
            o.vx = rand(-0.34, 0.34);
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
    <div className="home-orbs-bg" ref={hostRef} aria-hidden="true">
      <div
        className="home-orbs-bg__gradient"
        style={{
          background: `
            radial-gradient(950px 680px at 18% 18%, rgba(var(--color-border-rgb),0.11), transparent 58%),
            radial-gradient(760px 560px at 86% 72%, rgba(var(--color-glow-silver-rgb),0.22), transparent 60%),
            radial-gradient(680px 480px at 58% 10%, rgba(var(--color-ice-rgb),0.10), transparent 62%),
            linear-gradient(135deg, ${theme.bg0} 0%, ${theme.bg1} 40%, ${theme.bg2} 72%, ${theme.bg3} 100%)
          `,
        }}
      />
      <div className="home-orbs-bg__texture" />
      <canvas ref={orbsCanvasRef} className="home-orbs-bg__canvas" />

      <style>{`
        .home-orbs-bg {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          overflow: hidden;
        }
        .home-orbs-bg__gradient,
        .home-orbs-bg__texture,
        .home-orbs-bg__canvas {
          position: absolute;
          inset: 0;
        }
        .home-orbs-bg__gradient { z-index: 0; }
        .home-orbs-bg__texture {
          /* Light grain on dark: the previous dark-speck/multiply
             combination is invisible against a near-black page, so this
             uses faint white specks with a normal blend instead. */
          z-index: 1;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(255,255,255,0.05) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(255,255,255,0.04) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(255,255,255,0.035) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(255,255,255,0.04) 0 1px, transparent 2px);
          background-size: 260px 260px;
          opacity: 0.6;
        }
        .home-orbs-bg__canvas { z-index: 2; }
      `}</style>
    </div>
  );
}
