import { useCallback, useEffect, useRef } from "react";

// Drives the navbar/footer "moving glass selection lens": a single
// element that slides + resizes to sit under whichever nav item is
// hovered/focused, and glides back to the active route when the
// pointer leaves. Positions are measured via getBoundingClientRect
// (percentage-based CSS alone can't track dynamic label widths), so
// this is JS-driven, but the resulting motion is a plain CSS
// transition on transform/width — cheap and easy to disable under
// reduced motion.
export default function useMovingLens(activeIndex) {
  const containerRef = useRef(null);
  const lensRef = useRef(null);
  const itemRefs = useRef([]);

  const moveTo = useCallback((index) => {
    const el = itemRefs.current[index];
    const lens = lensRef.current;
    const container = containerRef.current;
    if (!el || !lens || !container) {
      if (lens) lens.style.opacity = "0";
      return;
    }
    const elRect = el.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    lens.style.opacity = "1";
    lens.style.width = `${elRect.width}px`;
    lens.style.height = `${elRect.height}px`;
    lens.style.transform = `translate(${elRect.left - containerRect.left}px, ${elRect.top - containerRect.top}px)`;
  }, []);

  const resetToActive = useCallback(() => moveTo(activeIndex), [moveTo, activeIndex]);

  useEffect(() => {
    // Position on mount / whenever the active route changes, and keep
    // it correct across resizes (labels reflow, viewport changes).
    moveTo(activeIndex);
    const onResize = () => moveTo(activeIndex);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex]);

  return { containerRef, lensRef, itemRefs, moveTo, resetToActive };
}
