
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";
import OrbField from "./OrbField";
import { RESUME_ORBS } from "./orbLayouts";

// react-pdf ships its own pdf.js version; point the worker at a matching
// build on a CDN so we don't have to fight CRA's webpack config to bundle
// pdf.worker as an asset.
pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;

const RESUME_PDF = "/Jaqueline-Smith-Resume.pdf";
// US Letter aspect ratio, used as a placeholder while a page is loading so
// the layout doesn't jump once the real canvas mounts.
const PAGE_ASPECT_RATIO = 11 / 8.5;

function useElementWidth() {
  const [width, setWidth] = useState(0);
  const observerRef = useRef(null);

  // A callback ref, not a plain ref + effect-on-mount: the target element
  // isn't always present at initial mount (e.g. .rm-sheet only exists
  // once react-pdf finishes loading and swaps out its loading fallback).
  // An effect with an empty dependency array runs exactly once and would
  // simply miss an element that attaches later. A callback ref fires
  // every time React actually attaches/detaches it, whenever that happens.
  const ref = useCallback((el) => {
    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }
    if (!el) return;
    // Seed synchronously from the current box — under React.StrictMode,
    // dev-mode double-invokes effects/callback-refs (attach → detach →
    // attach); if ResizeObserver's own async initial notification lands
    // in that gap it can be dropped, leaving width stuck at 0 with no
    // further resize ever firing. Reading the box directly here guards
    // against that race.
    setWidth(el.getBoundingClientRect().width);
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width);
      }
    });
    observer.observe(el);
    observerRef.current = observer;
  }, []);

  return [ref, width];
}

// Mounts its children only once the wrapper scrolls near the viewport, so
// page 2's canvas isn't rendered until it's actually about to be seen.
function LazyMount({ children, rootMargin = "600px" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (visible) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible, rootMargin]);

  return <div ref={ref}>{visible ? children : null}</div>;
}

export default function Resume() {
  useEffect(() => {
    const id = "resume-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Nunito:wght@500;700;800;900&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const [wrapRef, wrapWidth] = useElementWidth();
  const [numPages, setNumPages] = useState(2);
  const [loadError, setLoadError] = useState(false);

  // wrapRef measures .rm-scroll-shell — a stable, always-full-width element
  // — rather than .rm-paper-window/.rm-sheets themselves. Those two now
  // size to fit-content (see CSS), which would otherwise create a circular
  // dependency: their width depends on pageWidth, which would depend on
  // measuring them. RESERVE covers .rm-sheets' small padding plus room for
  // .rm-paper-window's own scrollbar, so the fit-content paper window never
  // exceeds the shell's actual available width.
  const RESERVE = 24;
  const pageWidth = useMemo(() => {
    if (!wrapWidth) return undefined;
    return Math.min(Math.max(wrapWidth - RESERVE, 0), 760);
  }, [wrapWidth]);

  // Corner-mask overlays (see .rm-mask-* below): stationary, drawn on top
  // of the scrolling PDF, so the visible white area reads as rounded at
  // any scroll position regardless of how the browser handles
  // overflow+border-radius clipping underneath.
  //
  // The right-side masks are positioned off the page's ACTUAL rendered
  // width (sheetWidth, measured directly off the real .rm-sheet element
  // below) rather than back-computed from the `pageWidth` prop we pass
  // into react-pdf. Those two can legitimately differ by a few px — sheet
  // border, react-pdf's internal wrapper, canvas DPI rounding — and a
  // mask positioned from the wrong one leaves a thin unmasked sliver of
  // white between the curve and the dark gutter. Measuring the rendered
  // box directly is exact regardless of any of that.
  const [sheetRef, sheetWidth] = useElementWidth();
  const MASK_SIZE = 20;
  const SHEETS_PADDING = 4;
  // Measured directly against the rendered sheet (see above), this is
  // accurate to about a pixel — but getBoundingClientRect can still be a
  // fraction of a px short of the true edge depending on device pixel
  // ratio. OVERSCAN nudges the mask slightly further over the sheet
  // (rather than short of it) so no unmasked seam is ever left behind;
  // at 2px it's imperceptible against the 20px radius.
  const OVERSCAN = 2;
  const rightMaskLeft = sheetWidth
    ? SHEETS_PADDING + sheetWidth - MASK_SIZE + OVERSCAN
    : undefined;

  const documentFile = useMemo(() => ({ url: RESUME_PDF }), []);

  const handleLoadSuccess = ({ numPages: n }) => {
    setNumPages(n);
    setLoadError(false);
  };

  const handleLoadError = () => {
    setLoadError(true);
  };

  return (
    <section className="rm-page" aria-label="Resume page">
      <div className="rm-bg" aria-hidden="true" />
      <div className="rm-texture" aria-hidden="true" />
      <OrbField orbs={RESUME_ORBS} />

      <div className="rm-center">
        <header className="rm-header">
          <h1 className="rm-title">Resume</h1>

          <div className="rm-actions">
            <a
              className="rm-link"
              href={RESUME_PDF}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open resume PDF in a new tab"
            >
              Open PDF <span className="rm-link-icon" aria-hidden="true">↗</span>
            </a>

            <a
              className="rm-link"
              href={RESUME_PDF}
              download
              aria-label="Download resume PDF"
            >
              Download <span className="rm-link-icon" aria-hidden="true">↓</span>
            </a>
          </div>
        </header>

        {/* .rm-preview: the outer glass card — static, just sizing + rim.
            .rm-scroll-shell: always full-width/height, stable — purely a
            measuring anchor + horizontal centering context.
            .rm-paper-window: a STATIONARY rounded mask that also owns the
            one scrollbar, sized to fit-content (hugs the actual PDF page
            width) rather than stretched to the shell's full width. That's
            what makes its border-radius coincide with the *sheet's* own
            edges — not just the outer glass edge, far away from a page
            that's narrower than the container — so the visible crop reads
            rounded at every scroll position, not only when a page's
            literal top/bottom happens to be in view. */}
        <div className="rm-preview">
          <div className="rm-scroll-shell" ref={wrapRef}>
          <div className="rm-paper-window">
          <div className="rm-scroll-inner">
          <main className="rm-sheets">
            {loadError ? (
              <p className="rm-note">
                The resume preview couldn&rsquo;t load here — use Open PDF or
                Download above to view it.
              </p>
            ) : (
              <Document
                file={documentFile}
                onLoadSuccess={handleLoadSuccess}
                onLoadError={handleLoadError}
                loading={
                  <div
                    className="rm-sheet rm-sheetSkeleton"
                    style={{
                      width: pageWidth,
                      aspectRatio: `1 / ${PAGE_ASPECT_RATIO}`,
                    }}
                    aria-hidden="true"
                  />
                }
                error={null}
              >
                {Array.from({ length: numPages }, (_, i) => i + 1).map(
                  (pageNumber) => {
                    const pageEl = (
                      <div
                        className="rm-sheet"
                        role="img"
                        aria-label={`Resume, page ${pageNumber} of ${numPages}`}
                        ref={pageNumber === 1 ? sheetRef : undefined}
                      >
                        <Page
                          pageNumber={pageNumber}
                          width={pageWidth}
                          loading={
                            <div
                              className="rm-sheetSkeleton"
                              style={{
                                width: pageWidth,
                                aspectRatio: `1 / ${PAGE_ASPECT_RATIO}`,
                              }}
                            />
                          }
                        />
                      </div>
                    );

                    // First page renders immediately; later pages mount lazily.
                    return pageNumber === 1 ? (
                      <React.Fragment key={pageNumber}>{pageEl}</React.Fragment>
                    ) : (
                      <LazyMount key={pageNumber}>{pageEl}</LazyMount>
                    );
                  }
                )}
              </Document>
            )}
          </main>
          </div>

          {/* Stationary corner masks, drawn on top of the scrolling PDF.
              These carve the visible white area into a rounded rectangle
              directly, as a guaranteed visual fallback independent of
              however overflow+border-radius clipping renders underneath.
              Positioned off the page's actual measured edges (0 for left,
              rightMaskLeft for right) rather than the container's, so the
              right-side pair stops before the scrollbar gutter instead of
              covering it. */}
          <span className="rm-mask rm-mask-tl" aria-hidden="true" />
          <span
            className="rm-mask rm-mask-tr"
            aria-hidden="true"
            style={rightMaskLeft != null ? { left: rightMaskLeft } : undefined}
          />
          <span className="rm-mask rm-mask-bl" aria-hidden="true" />
          <span
            className="rm-mask rm-mask-br"
            aria-hidden="true"
            style={rightMaskLeft != null ? { left: rightMaskLeft } : undefined}
          />
          </div>
        </div>
      </div>
      </div>

      <style>{`
        .rm-page,
        .rm-page *,
        .rm-page *::before,
        .rm-page *::after{
          box-sizing:border-box;
        }

        /* .rm-page sizes itself via flex-grow against .app-content (its
           real parent — .app-content wraps every route), NOT via a
           height:100% percentage. A percentage here would need to resolve
           against .app-content's own height, but .app-content is itself a
           flex item one level up (in .app-page, alongside .app-footer)
           that grows to fill ITS available space — stacking two
           independent "give me all available height" flex mechanisms
           back to back double-claims space and starves the footer.
           Measured live: with height:100% here, .rm-preview's own
           intrinsic size (capped at its max-height) became .app-content's
           flex-shrink:0 floor, forcing .app-page taller than .app-main by
           exactly the footer's height on every common laptop viewport.
           flex-grow avoids that: it only claims whatever .app-content
           actually resolves to, after the footer's already been
           accounted for one level up. */
        .rm-page{
          position:relative;
          width:100%;
          flex:1 1 auto;
          min-height:0;
          display:flex;
          flex-direction:column;
        }

        /* Fixed to the viewport (not .rm-page's own box) so the background
           spans the full screen, continuing behind the navbar and footer
           instead of being clipped to the space between them. */
        .rm-bg,
        .rm-texture{
          position:fixed;
          inset:0;
          pointer-events:none;
        }

        .rm-bg{
          z-index:0;
          background:
            linear-gradient(135deg, var(--color-surface-glass) 0%, var(--color-bg-page) 45%, var(--color-surface-recessed) 100%);
        }

        .rm-texture{
          z-index:1;
          opacity:0.5;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(255,255,255,0.035) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(255,255,255,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(255,255,255,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(255,255,255,0.03) 0 1px, transparent 2px);
          background-size:260px 260px;
        }

        .rm-center{
          position:relative;
          z-index:2;
          width:100%;
          flex:1 1 auto;
          min-height:0;
          display:flex;
          flex-direction:column;
          align-items:center;
          /* The header is intrinsic height; the viewer below takes the
             flex:1 remainder of whatever's actually left over (see
             .rm-preview) instead of the two of them independently
             guessing vh percentages that can conflict. */
          padding:clamp(16px, 3vh, 32px) clamp(16px, 4vw, 32px) clamp(16px, 3vh, 28px);
        }

        .rm-header{
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          gap:8px;
          flex:0 0 auto;
          animation:rmFadeUp 0.7s ease-out;
        }

        .rm-title{
          margin:0;
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:clamp(1.8rem, 3.2vw + 1rem, 2.4rem);
          font-weight:900;
          line-height:1.1;
          letter-spacing:-0.01em;
          color:var(--color-text-primary);
        }

        .rm-actions{
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          align-items:center;
          gap:22px;
        }

        .rm-link{
          position:relative;
          display:inline-flex;
          align-items:baseline;
          gap:5px;
          padding-bottom:4px;
          background:none;
          border:none;
          text-decoration:none;
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:0.92rem;
          font-weight:700;
          letter-spacing:0.01em;
          color:rgba(var(--color-text-primary-rgb),0.7);
          transition:color 160ms ease, transform 160ms ease;
        }

        .rm-link::after{
          content:"";
          position:absolute;
          left:0;
          right:0;
          bottom:0;
          height:1px;
          background:rgba(var(--color-text-primary-rgb),0.3);
          transform:scaleX(0.5);
          transform-origin:center;
          transition:transform 220ms ease, background-color 220ms ease;
        }

        .rm-link-icon{
          font-size:0.85em;
          line-height:1;
        }

        .rm-link:hover,
        .rm-link:focus-visible{
          color:var(--color-text-primary);
          transform:translateY(-1px);
        }

        .rm-link:hover::after,
        .rm-link:focus-visible::after{
          transform:scaleX(1);
          background:rgba(var(--color-text-primary-rgb),0.8);
        }

        .rm-link:focus-visible{
          outline:2px solid rgba(var(--color-glow-white-rgb),0.55);
          outline-offset:5px;
          border-radius:2px;
        }

        .rm-note{
          margin:0;
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:0.92rem;
          line-height:1.45;
          font-weight:700;
          color:rgba(var(--color-text-primary-rgb),0.74);
          text-align:center;
          max-width: 60ch;
        }

        /* The outer glass card: purely static sizing + the visible dark
           rim. It no longer scrolls or clips content itself — that's
           .rm-paper-window's job — it just holds the padding that keeps
           the rounded paper window inset from the glass edge on all
           sides. */
        .rm-preview{
          position:relative;
          width:100%;
          max-width:820px;
          /* flex-basis:0 (not auto) claims whatever's actually left in
             .rm-center after the intrinsic header — the real available
             space — with min/max as sane guardrails for extreme
             viewports, instead of an independent vh guess competing with
             the header's own padding. Tested live: flex-basis:auto lets
             this item's own content (or its max-height cap) count as its
             "intrinsic" size for the OUTER .app-content's flex-shrink:0
             floor calculation, inflating that floor past the real
             available space on ordinary laptop heights. Starting the
             basis at 0 keeps that outer floor small and lets min/max-height
             do their job at every breakpoint instead. */
          flex:1 1 0;
          min-height:320px;
          max-height:640px;
          margin-top:clamp(16px, 3vh, 28px);
          display:flex;
          border-radius:22px;
          padding:clamp(8px, 1.6vw, 14px);
          background:rgba(var(--color-surface-glass-rgb),0.5);
          border:1px solid rgba(var(--color-border-rgb),0.24);
          box-shadow:
            0 24px 56px rgba(0,0,0,0.34),
            inset 0 1px 0 rgba(255,255,255,0.04);
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          animation:rmFadeUp 0.7s ease-out;
        }

        /* Always full width/height of .rm-preview's padded interior —
           purely a stable measuring anchor (see the RESERVE comment in
           Resume.jsx) and a horizontal centering context for the
           narrower, fit-content .rm-paper-window below. */
        .rm-scroll-shell{
          flex:1 1 auto;
          width:100%;
          min-width:0;
          display:flex;
          justify-content:center;
        }

        /* THE rounded viewport — a STATIONARY, non-scrolling clip mask.
           Deliberately split from the actual scrolling (.rm-scroll-inner,
           below) rather than combining overflow-y:auto + border-radius on
           one element: tested directly in-browser, that combination
           reliably rounds the edge nearest the scroll origin but NOT the
           far edge (the bottom, here) — a real rendering quirk, not a
           sizing issue. A non-scrolling overflow:hidden element purely
           for clipping, wrapping a plain overflow:auto scroller, rounds
           both edges correctly.

           Sized to fit-content (hugging the sheet), not 100% of the
           shell: a border-radius only rounds an element's OWN corners, so
           if this box were full-width while the page inside it renders
           narrower (capped at 760px, centered), the rounding would only
           ever touch the far-off outer edges — nowhere near the actual
           white page. Hugging the page's real width is what makes the
           radius coincide with the page's own edges instead. */
        .rm-paper-window{
          position:relative;
          flex:0 0 auto;
          width:fit-content;
          max-width:100%;
          height:100%;
          min-height:0;
          border-radius:18px;
          background:rgba(var(--color-surface-recessed-rgb),0.4);
          overflow:hidden;
        }

        /* The actual scroll container: plain, no radius of its own — it
           just fills .rm-paper-window, which clips it to the rounded
           shape from outside. */
        .rm-scroll-inner{
          width:fit-content;
          max-width:100%;
          height:100%;
          overflow-x:hidden;
          overflow-y:auto;
          scrollbar-width:thin;
          scrollbar-color:rgba(var(--color-border-rgb),0.5) transparent;
        }

        .rm-scroll-inner::-webkit-scrollbar{
          width:8px;
        }
        .rm-scroll-inner::-webkit-scrollbar-track{
          background:transparent;
        }
        .rm-scroll-inner::-webkit-scrollbar-thumb{
          background:rgba(var(--color-border-rgb),0.4);
          border-radius:4px;
        }
        .rm-scroll-inner::-webkit-scrollbar-thumb:hover{
          background:rgba(var(--color-border-rgb),0.6);
        }

        /* The pages stack inside the paper window's own small padding —
           this is the scrolling content, masked by .rm-paper-window, not
           a scroll container in its own right.

           width:fit-content (not 100%): .rm-paper-window sizes itself off
           THIS element, so if this stretched to 100% of a wider ancestor
           it would drag the mask wide again, undoing the fit-content fix
           above. Padding is deliberately small (well under the 16px
           radius) — any more and the mask's rounding would once again
           land on empty padding instead of the page's own corner. */
        .rm-sheets{
          width:fit-content;
          max-width:100%;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:clamp(16px, 2.5vh, 24px);
          padding:4px;
        }

        /* Same radius as .rm-paper-window: at an actual page boundary
           (very top of page 1, very bottom of page 2) the sheet's own
           corner and the mask's corner line up rather than fighting each
           other visually.

           Note: the visible page-to-page gap is set here as margin, not
           as .rm-sheets' own flex gap above — react-pdf wraps every page
           in its own .react-pdf__Document element, which ends up as the
           only flex child of .rm-sheets, so a flex gap between "pages"
           never actually had two siblings to apply between. Margin on
           the sheet itself works regardless of that wrapper. */
        .rm-sheet{
          background:#fff;
          border-radius:18px;
          border:1px solid rgba(var(--color-border-rgb),0.22);
          box-shadow:
            0 10px 22px rgba(0,0,0,0.22),
            0 2px 8px rgba(0,0,0,0.14);
          overflow:hidden;
          line-height:0;
          flex-shrink:0;
          margin-bottom:clamp(16px, 2.5vh, 24px);
        }

        /* Guaranteed visual corner treatment: four small stationary
           overlays, each a solid dark square with a radial-gradient hard
           edge cut into it. Within MASK_SIZE (20px) of the *inner* corner
           (the point diagonally opposite the true viewport corner) the
           gradient is transparent, letting the PDF show through in a
           clean arc; beyond that radius it's solid, covering the page's
           square corner pixels. This carves the visible white area into a
           rounded rectangle directly, regardless of how overflow+radius
           clipping renders on the scrolling element underneath. */
        .rm-mask{
          position:absolute;
          width:20px;
          height:20px;
          pointer-events:none;
          z-index:5;
        }
        .rm-mask-tl{
          top:0; left:0;
          background:radial-gradient(circle at bottom right, transparent 20px, rgba(var(--color-surface-recessed-rgb),0.9) 20px);
        }
        .rm-mask-tr{
          top:0; right:0;
          background:radial-gradient(circle at bottom left, transparent 20px, rgba(var(--color-surface-recessed-rgb),0.9) 20px);
        }
        .rm-mask-bl{
          bottom:0; left:0;
          background:radial-gradient(circle at top right, transparent 20px, rgba(var(--color-surface-recessed-rgb),0.9) 20px);
        }
        .rm-mask-br{
          bottom:0; right:0;
          background:radial-gradient(circle at top left, transparent 20px, rgba(var(--color-surface-recessed-rgb),0.9) 20px);
        }
        /* Once JS has measured the actual page width, .rm-mask-tr/-br get
           an inline left position off the page's real edge instead — this
           just cancels the CSS right:0 fallback so the two don't fight. */
        .rm-mask-tr[style],
        .rm-mask-br[style]{
          right:auto;
        }

        /* react-pdf's own page wrapper (and its canvas/text/annotation
           layers) are painted as normal descendants of .rm-sheet, so its
           overflow:hidden already clips them to the rounded corners above
           — this just keeps the wrapper itself from asserting a square
           edge underneath the radius. */
        .rm-sheet .react-pdf__Page{
          border-radius:inherit;
          overflow:hidden;
        }

        .rm-sheet canvas{
          display:block;
          max-width:100%;
          height:auto !important;
        }

        .rm-sheetSkeleton{
          display:block;
          background:
            linear-gradient(100deg,
              rgba(0,0,0,0.05) 0%,
              rgba(0,0,0,0.09) 30%,
              rgba(0,0,0,0.05) 60%);
          background-size:200% 100%;
          animation:rmShimmer 1.6s ease-in-out infinite;
        }

        @keyframes rmShimmer{
          0%{ background-position:200% 0; }
          100%{ background-position:-200% 0; }
        }

        @keyframes rmFadeUp{
          from{ opacity:0; transform:translateY(14px); }
          to{ opacity:1; transform:translateY(0); }
        }

        /* Mobile gets a tighter rim and a taller share of the (smaller)
           available space — real estate is scarce, so the viewer is
           allowed to claim more of it rather than being capped at the
           desktop max-height. */
        @media (max-width: 640px){
          .rm-center{
            padding:clamp(12px, 2.5vh, 20px) clamp(12px, 4vw, 20px) clamp(12px, 2.5vh, 20px);
          }

          .rm-preview{
            min-height:280px;
            max-height:none;
            margin-top:clamp(12px, 2.5vh, 20px);
            padding:6px;
            border-radius:18px;
          }

          .rm-paper-window{
            border-radius:15px;
          }

          .rm-sheets{
            padding:3px;
          }

          .rm-sheet{
            border-radius:15px;
            margin-bottom:14px;
          }
        }

        @media (max-width: 360px){
          .rm-actions{
            gap:16px;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .rm-header,
          .rm-preview,
          .rm-sheet,
          .rm-link,
          .rm-link::after,
          .rm-sheetSkeleton{
            transition:none !important;
            animation:none !important;
          }

          .rm-link:hover,
          .rm-link:focus-visible{
            transform:none !important;
          }
        }

      `}</style>
    </section>
  );
}
