import { useEffect, useRef } from "react";

// Shared pointer-tracking hook for the "liquid glass" / metallic-edge
// interaction prototypes. Sets, on the element itself:
//   --mx / --my   pointer position as a percentage within the element
//                 (drives radial-gradient fill/specular highlights)
//   --angle       pointer angle relative to the element's CENTER, in
//                 CSS conic-gradient degrees (0deg = top, clockwise) —
//                 drives perimeter-tracing conic-gradient border light,
//                 since "nearest border segment to the pointer" is an
//                 angular relationship, not a radial-distance one.
// and toggles a class while the pointer is inside.
//
// Gated to fine-pointer/hover-capable devices only — touch and
// keyboard users never depend on this; they get the plain CSS
// fallback (static border/background/color feedback via :hover/
// :focus-visible) defined alongside it in each component's styles.
export default function usePointerGlow() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    // Under reduced motion, skip the continuous pointer-tracking updates
    // (--mx/--my/--angle stay at their CSS defaults) but still toggle
    // the class so hover/focus shows a static, non-moving version of
    // the same highlight — feedback without motion.
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);

      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const rad = Math.atan2(e.clientY - cy, e.clientX - cx);
      // atan2: 0=east, 90=south, 180/-180=west, -90=north (clockwise,
      // screen-space). Convert to CSS conic-gradient convention:
      // 0deg=north(top), clockwise.
      const cssAngle = (rad * (180 / Math.PI) + 90 + 360) % 360;
      el.style.setProperty("--angle", `${cssAngle}deg`);
    };
    const onEnter = () => el.classList.add("is-glow-active");
    const onLeave = () => el.classList.remove("is-glow-active");

    if (!reduceMotion) el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerenter", onEnter);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return ref;
}
