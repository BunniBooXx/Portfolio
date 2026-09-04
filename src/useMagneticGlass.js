import { useEffect, useRef } from "react";

// "Magnetic glass" hover: the element drifts a few px toward the
// pointer (a soft, physical translate — not a spring/bounce) while an
// internal radial highlight tracks the pointer underneath, suggesting
// depth moving beneath frosted glass. Distinct from usePointerGlow.js,
// which only drives an internal highlight with no movement.
const MAX_TRANSLATE = 3.5; // px — subtle pull, not a full drag-toward-cursor

export default function useMagneticGlass() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia?.("(hover: hover) and (pointer: fine)").matches) {
      return;
    }
    // Under reduced motion, skip the translate/highlight-tracking
    // updates entirely but still toggle the active class, so hover
    // still shows the static contrast change (border/glass opacity)
    // defined in CSS — feedback without movement.
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty("--mx", `${x}%`);
      el.style.setProperty("--my", `${y}%`);

      // Fraction of the pointer's offset from center (-0.5..0.5 on each
      // axis), scaled into a small clamped translate so the button
      // drifts toward the cursor rather than chasing it 1:1.
      const fx = (e.clientX - (rect.left + rect.width / 2)) / rect.width;
      const fy = (e.clientY - (rect.top + rect.height / 2)) / rect.height;
      const tx = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, fx * MAX_TRANSLATE * 2));
      const ty = Math.max(-MAX_TRANSLATE, Math.min(MAX_TRANSLATE, fy * MAX_TRANSLATE * 2));
      el.style.setProperty("--tx", `${tx}px`);
      el.style.setProperty("--ty", `${ty}px`);
    };
    const onEnter = () => el.classList.add("is-glow-active");
    const onLeave = () => {
      el.classList.remove("is-glow-active");
      // Let the transition on transform ease this back to 0,0 rather
      // than snapping — "smoothly return to center".
      el.style.setProperty("--tx", "0px");
      el.style.setProperty("--ty", "0px");
    };

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
