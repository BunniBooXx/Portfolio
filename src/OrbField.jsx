// OrbField.jsx
// Shared, low-density reuse of the Home route's "dimensional glowing orb"
// visual language (see HomeOrbBackground.jsx / orbTheme.js) for every
// other page. Home keeps its own denser canvas-based physics simulation
// as the showcase composition; this component renders a handful of static-
// positioned orbs (per-page "safe zone" layouts live in orbLayouts.js)
// with the same rim-lit glass appearance, plus two restrained motion
// layers:
//
//   1. a very slow autonomous float (pure CSS keyframes, always on
//      unless prefers-reduced-motion is set)
//   2. on fine-pointer (mouse/trackpad) devices only, a small smoothed
//      parallax offset driven by cursor position
//
// The parallax loop never touches React state — it writes CSS custom
// properties directly to each orb's DOM node inside a single shared
// requestAnimationFrame loop, so cursor movement never triggers a
// re-render. Touch devices and prefers-reduced-motion simply never start
// the pointer listener / rAF work.
//
// The loop is idle-aware: once every orb's smoothed position has caught
// up to its target (within EPSILON), it snaps to the exact target, does
// one final write, and stops rescheduling itself entirely — no rAF, no
// lerp math, no style writes — until pointer movement (or a
// prefers-reduced-motion/pointer-type change) gives it a new target to
// chase, at which point it wakes itself back up. See wake()/step() below.
import React, { useEffect, useRef } from "react";
import { ORB_PALETTE } from "./orbTheme";

// Depth tiers → approximate max cursor-induced movement, per the brief:
// small ~4-8px, medium ~8-12px, large ~12-18px. Also drives the ambient
// float amplitude/speed so nearer (larger) orbs read as slightly more
// alive than distant (smaller) ones.
const DEPTH_CONFIG = {
  small:  { parallax: 6,  floatAmp: 8,  duration: 13 },
  medium: { parallax: 10, floatAmp: 12, duration: 17 },
  large:  { parallax: 15, floatAmp: 17, duration: 21 },
};

const LERP = 0.045; // smoothing factor — slow, no snapping

// How close (in px) smoothed can be to target before we treat it as
// "arrived" and stop the loop. Far below a visible sub-pixel threshold —
// at this LERP rate the orb has already been imperceptibly close to its
// target for several frames before this actually triggers, so there's no
// visible snap when it locks to the exact target value.
const EPSILON = 0.02;

export default function OrbField({ orbs }) {
  const orbRefs = useRef([]);
  const rafRef = useRef(null); // null = loop is asleep, not scheduled
  const pointerTarget = useRef({ x: 0, y: 0 });
  const smoothedRef = useRef([]);
  const lastWrittenRef = useRef([]);

  useEffect(() => {
    if (!orbs || orbs.length === 0) return undefined;

    const reduceMQ = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const fineMQ = window.matchMedia?.("(pointer: fine)");
    let parallaxActive = Boolean(fineMQ?.matches) && !reduceMQ?.matches;

    smoothedRef.current = orbs.map(() => ({ x: 0, y: 0 }));
    // null sentinels so the very first frame always writes each custom
    // property at least once, regardless of what value it computes.
    lastWrittenRef.current = orbs.map(() => ({ x: null, y: null }));

    // Starts the rAF chain if (and only if) it isn't already running —
    // callable as often as we like (every pointermove) without ever
    // creating a second overlapping chain.
    const wake = () => {
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(step);
      }
    };

    const onPointerMove = (e) => {
      const w = window.innerWidth || 1;
      const h = window.innerHeight || 1;
      pointerTarget.current.x = (e.clientX / w) * 2 - 1;
      pointerTarget.current.y = (e.clientY / h) * 2 - 1;
      wake();
    };

    function step() {
      // Unchanged from before: while the tab is hidden, skip the work
      // but keep the chain alive so it resumes cleanly when visible
      // again — rAF is already throttled to ~1/s by the browser in a
      // hidden tab, so this stays cheap without needing its own sleep
      // logic layered on top.
      if (document.hidden) {
        rafRef.current = requestAnimationFrame(step);
        return;
      }

      let allSettled = true;
      for (let i = 0; i < orbs.length; i++) {
        const cfg = DEPTH_CONFIG[orbs[i].depth || "medium"];
        const tx = parallaxActive ? pointerTarget.current.x * cfg.parallax : 0;
        const ty = parallaxActive ? pointerTarget.current.y * cfg.parallax : 0;
        const s = smoothedRef.current[i];
        const dx = tx - s.x;
        const dy = ty - s.y;

        if (Math.abs(dx) <= EPSILON && Math.abs(dy) <= EPSILON) {
          // Close enough: snap the last imperceptible fraction away so
          // we land exactly on target instead of approaching it forever.
          s.x = tx;
          s.y = ty;
        } else {
          allSettled = false;
          s.x += dx * LERP;
          s.y += dy * LERP;
        }

        const el = orbRefs.current[i];
        if (el) {
          const lw = lastWrittenRef.current[i];
          // Skip the write when this frame's value is identical to what's
          // already on the element — cheap to check, avoids a redundant
          // style write on every settled/idle orb every frame.
          if (lw.x !== s.x) {
            el.style.setProperty("--px", `${s.x.toFixed(2)}px`);
            lw.x = s.x;
          }
          if (lw.y !== s.y) {
            el.style.setProperty("--py", `${s.y.toFixed(2)}px`);
            lw.y = s.y;
          }
        }
      }

      if (allSettled) {
        // Every orb has arrived — go to sleep. wake() (from pointermove,
        // or syncActive below) is what restarts this chain; nothing else
        // schedules another frame from here.
        rafRef.current = null;
        return;
      }

      rafRef.current = requestAnimationFrame(step);
    }

    const syncActive = () => {
      parallaxActive = Boolean(fineMQ?.matches) && !reduceMQ?.matches;
      if (parallaxActive) {
        window.addEventListener("pointermove", onPointerMove, { passive: true });
      } else {
        window.removeEventListener("pointermove", onPointerMove);
      }
      // Either direction can move the target (parallax turning off means
      // the target just became 0,0) — wake so the smoothing loop resumes
      // and can naturally converge to it, then sleep again on its own.
      wake();
    };

    syncActive();
    if (!reduceMQ?.matches) {
      wake();
    }

    reduceMQ?.addEventListener?.("change", syncActive);
    fineMQ?.addEventListener?.("change", syncActive);

    return () => {
      if (rafRef.current != null) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      window.removeEventListener("pointermove", onPointerMove);
      reduceMQ?.removeEventListener?.("change", syncActive);
      fineMQ?.removeEventListener?.("change", syncActive);
    };
  }, [orbs]);

  if (!orbs || orbs.length === 0) return null;

  return (
    <div className="orbf-field" aria-hidden="true">
      {orbs.map((orb, i) => {
        const cfg = DEPTH_CONFIG[orb.depth || "medium"];
        const base = ORB_PALETTE[orb.colorIndex ?? 0];
        const mid = base.replace("1)", "0.55)");
        const edge = base.replace("1)", "0.2)");
        const glow = base.replace("1)", "0.16)");
        return (
          <span
            key={i}
            className="orbf-orb"
            ref={(el) => { orbRefs.current[i] = el; }}
            style={{
              top: orb.top,
              left: orb.left,
              width: orb.size,
              height: orb.size,
              "--float-amp": `${cfg.floatAmp}px`,
              "--float-dur": `${cfg.duration}s`,
              "--float-delay": `${orb.delay ?? 0}s`,
              "--orb-mid": mid,
              "--orb-edge": edge,
              "--orb-glow": glow,
            }}
          >
            <span className="orbf-glow" />
            <span className="orbf-ball" />
          </span>
        );
      })}

      <style>{`
        .orbf-field {
          position: fixed;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          overflow: hidden;
        }

        .orbf-orb {
          position: absolute;
          transform: translate(-50%, -50%);
          animation: orbfFloat var(--float-dur, 16s) ease-in-out infinite;
          animation-delay: var(--float-delay, 0s);
          will-change: transform;
        }

        /* Ambient float (always on) composes with the JS-driven parallax
           offset (--px/--py, defaulted to 0 when parallax is inactive)
           via calc() inside the keyframe — the two never fight over the
           transform property. */
        @keyframes orbfFloat {
          0%, 100% {
            transform: translate(-50%, -50%) translate3d(var(--px, 0px), var(--py, 0px), 0);
          }
          50% {
            transform: translate(-50%, -50%) translate3d(calc(var(--px, 0px) + var(--float-amp, 10px) * 0.35), calc(var(--py, 0px) - var(--float-amp, 10px)), 0);
          }
        }

        .orbf-glow,
        .orbf-ball {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          pointer-events: none;
        }

        .orbf-glow {
          transform: scale(1.9);
          background: radial-gradient(circle, var(--orb-glow) 0%, rgba(0,0,0,0) 70%);
          filter: blur(6px);
          opacity: 0.55;
        }

        .orbf-ball {
          background: radial-gradient(circle at 34% 30%, rgba(255,255,255,0.8) 0%, var(--orb-mid) 42%, var(--orb-edge) 100%);
          box-shadow: inset 0 0 0 1px rgba(255,255,255,0.12), 0 0 16px rgba(255,255,255,0.06);
          opacity: 0.5;
        }

        /* Fewer orbs on smaller screens — later entries in the layout
           array are treated as lower priority. */
        @media (max-width: 640px) {
          .orbf-orb:nth-child(n+5) { display: none; }
        }
        @media (max-width: 480px) {
          .orbf-orb:nth-child(n+4) { display: none; }
        }

        @media (prefers-reduced-motion: reduce) {
          .orbf-orb { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
