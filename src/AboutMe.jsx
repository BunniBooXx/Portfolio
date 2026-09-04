import React, { useEffect } from "react";
import OrbField from "./OrbField";
import { ABOUT_ORBS } from "./orbLayouts";

const INCLUDE_JOB_SEARCH_LINE = false;

const STACK = ["React", "Django", "Python", "AI Integration"];

const FOCUS_COLUMNS = [
  {
    label: "Frontend",
    items: ["Responsive, accessible React UI", "Strong UX fundamentals"],
  },
  {
    label: "Full Stack",
    items: ["Django APIs", "Clean data flows"],
  },
  {
    label: "AI Systems",
    items: ["Model evaluation & iteration", "AI-aware product thinking"],
  },
];

export default function AboutMe() {
  // Load fonts once (safe + idempotent)
  useEffect(() => {
    const id = "aboutme-fonts";
    if (document.getElementById(id)) return;

    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@500;700;800;900&display=swap";

    document.head.appendChild(link);
  }, []);

  return (
    <section className="am-page" aria-label="About Me">
      {/* Background layers */}
      <div className="am-bg" aria-hidden="true" />
      <div className="am-texture" aria-hidden="true" />
      <OrbField orbs={ABOUT_ORBS} />

      <div className="am-center">
        <div className="am-card">
          {/* Profile hero: shares its column geometry with the editorial
              section below (see --am-col-label/--am-col-gap) instead of
              being independently centered — the portrait sits in the same
              left column as the "What I build" style labels, and the
              identity block starts at the same x-position as the body
              copy, so a single vertical line runs through the whole card. */}
          <div className="am-hero">
            <div className="am-heroPortraitCol">
              <span className="am-heroGlowBg" aria-hidden="true" />
              <div className="am-portraitWrap">
                <span className="am-portraitRingBase" aria-hidden="true" />
                <span className="am-portraitRingGlow" aria-hidden="true" />
                {/* Clips the image to the circle. Kept separate from
                    .am-portraitWrap (which the ring elements bleed
                    slightly outside of) so clipping the scaled-up crop
                    never also clips the ring. */}
                <div className="am-portraitClip">
                  <img
                    src="/linkedin-headshot.png"
                    alt="Jaqueline Smith"
                    className="am-img"
                  />
                </div>
              </div>
              {/* Anchored to the portrait column (not the story column) so
                  its position tracks the column's actual resolved width —
                  a percentage-based `left` can't be computed from a
                  minmax() track any other way. */}
              <span className="am-heroDivider" aria-hidden="true" />
            </div>

            <div className="am-heroIdentity">
              <p className="am-eyebrow">About Me</p>
              <h1 className="am-name">Jaqueline</h1>
              <p className="am-role">Full-Stack Engineer · AI Systems</p>
              <p className="am-stack" aria-label="Core technologies">
                {STACK.join(" · ")}
              </p>
            </div>
          </div>

          <div className="am-divider" aria-hidden="true" />

          {/* Editorial story — kicker + short copy, scannable instead of
              three same-weight paragraphs stacked into one block. */}
          <div className="am-story">
            <div className="am-storyBlock">
              <p className="am-storyLabel">What I build</p>
              <p className="am-p">
                I&rsquo;m a full-stack engineer who ships product-minded
                features end to end — polished React interfaces backed by
                reliable Python/Django systems. I trained in Full-Stack
                Engineering at <strong>Coding Temple</strong>, sharpening
                fundamentals in architecture, APIs, data modeling, testing,
                and deployment.
              </p>
            </div>

            <div className="am-storyBlock">
              <p className="am-storyLabel">Where engineering meets AI</p>
              <p className="am-p">
                Today I work at <strong>Outlier AI</strong> as an{" "}
                <strong>AI Trainer</strong>, evaluating and improving model
                outputs across UI, backend, and product reasoning with a
                focus on correctness and clarity. I also build real
                products—like <strong>Gentle Sprout</strong>—pairing
                practical engineering with AI-aware product thinking.
                {INCLUDE_JOB_SEARCH_LINE ? (
                  <>
                    {" "}
                    I&rsquo;m currently seeking a full-time role where I can
                    grow as an engineer and ship meaningful products.
                  </>
                ) : null}
              </p>
            </div>
          </div>

          <div className="am-divider" aria-hidden="true" />

          {/* Focus rail — a light three-column strip inside the same glass
              surface, replacing the old boxed "What I'm focused on" card. */}
          <div className="am-focus">
            {FOCUS_COLUMNS.map((col) => (
              <div className="am-focusCol" key={col.label}>
                <p className="am-focusLabel">{col.label}</p>
                <ul className="am-focusList">
                  {col.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        /* =========================================================
           ABOUT ME
           ========================================================= */

        .am-page,
        .am-page *,
        .am-page *::before,
        .am-page *::after {
          box-sizing: border-box;
        }

        .am-page {
          --am-ink: var(--color-text-primary);
          --am-ink-soft: rgba(var(--color-text-primary-rgb), 0.78);
          --am-ink-muted: rgba(var(--color-text-primary-rgb), 0.68);
          --am-primary: var(--color-text-primary);
          --am-primary-2: var(--color-accent);
          --am-border: rgba(var(--color-glow-silver-rgb), 0.16);
          --am-card-border: rgba(var(--color-border-rgb), 0.55);

          /* Shared editorial grid — the hero and the "What I build" /
             "Where engineering meets AI" blocks both use this exact
             label-column width + gap, so the portrait column and the
             body-copy column line up on one vertical axis instead of
             the hero using its own independently centered geometry. */
          --am-col-label: minmax(140px, 200px);
          --am-col-gap: clamp(10px, 2vw, 20px);

          position: relative;
          width: 100%;
          /* Natural flow — sized by its own content, not forced to fill
             the viewport (App.css's .app-shell/.app-main own that). */
          height: auto;
          overflow: visible;
          display: block;
        }

        /* Background — fixed to the viewport (not .am-page's own box) so
           it spans the full screen, continuing behind the navbar and
           footer instead of being clipped to the space between them. */
        .am-bg,
        .am-texture {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        .am-bg {
          z-index: 0;
          background:
            linear-gradient(
              135deg,
              var(--color-surface-glass) 0%,
              var(--color-bg-page) 45%,
              var(--color-surface-recessed) 100%
            );
        }

        .am-texture {
          z-index: 1;
          opacity: 0.55;

          background-image:
            radial-gradient(
              circle at 18% 22%,
              rgba(255, 255, 255, 0.04) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 70% 32%,
              rgba(255, 255, 255, 0.035) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 44% 74%,
              rgba(255, 255, 255, 0.03) 0 1px,
              transparent 2px
            ),
            radial-gradient(
              circle at 84% 82%,
              rgba(255, 255, 255, 0.035) 0 1px,
              transparent 2px
            );

          background-size: 260px 260px;
        }

        /* Main positioning — natural top-down flow (not centered in a
           viewport-height box: that requires a bounded/definite-height
           parent, which .am-page deliberately no longer is). Horizontal
           padding is 0 here on purpose — the shared .app-content gutter
           (App.css) already supplies it; a second horizontal padding
           here was previously stacking on top of that gutter (see the
           .am-card note below for how that was found). */
        .am-center {
          position: relative;
          z-index: 2;

          width: 100%;
          height: auto;

          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;

          padding: clamp(12px, 2.6vh, 22px) 0;
        }

        /* Card — a single glass surface; internal zones are separated with
           thin dividers rather than nested cards. A faint radial wash
           near the portrait gives the surface some depth without adding
           any moving decoration behind the copy. */
        .am-card {
          position: relative;
          width: min(1100px, 100%);

          background:
            radial-gradient(
              620px 340px at 14% 0%,
              rgba(var(--color-glow-silver-rgb), 0.07) 0%,
              transparent 60%
            ),
            linear-gradient(
              180deg,
              rgba(var(--color-surface-glass-rgb), 0.82) 0%,
              rgba(var(--color-surface-glass-rgb), 0.72) 100%
            );

          border-radius: 24px;
          border: 1px solid var(--am-card-border);

          box-shadow:
            0 20px 50px rgba(0, 0, 0, 0.5),
            0 4px 14px rgba(var(--color-glow-silver-rgb), 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.05);

          backdrop-filter: blur(8px);

          padding: clamp(16px, 2.8vh, 30px) clamp(18px, 3vw, 34px);

          /* Natural flow — the card is never its own scroll region;
             .app-main is the single page scroll owner (App.css). */
          max-height: none;
          overflow: visible;

          animation: fadeInUp 0.7s ease-out;
        }

        /* ---------------------------------------------------------
           Hero: uses the SAME column template as .am-storyBlock below
           (--am-col-label / --am-col-gap) — that's what makes the
           portrait column read as the visual equivalent of the
           "What I build" style labels, and puts the identity block's
           left edge on the same x-axis as the body copy beneath it.
           align-items is left at the grid default (stretch) so both
           columns share the row's full height.
           --------------------------------------------------------- */
        .am-hero {
          display: grid;
          grid-template-columns: var(--am-col-label) 1fr;
          column-gap: var(--am-col-gap);
        }

        .am-heroPortraitCol {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          /* Vertical padding is what gives the circle guaranteed
             breathing room above/below — the row can never size down
             to less than portrait + this padding, so the portrait can
             never end up flush against the hero top or the divider
             that follows .am-hero. */
          padding: clamp(14px, 2.6vh, 24px) 0;
        }

        /* Extremely subtle localized illumination behind the portrait —
           just enough to read as "this is its own zone" without another
           visible card/border. */
        .am-heroGlowBg {
          position: absolute;
          inset: -10%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(var(--color-ice-rgb), 0.07) 0%,
            rgba(var(--color-glow-silver-rgb), 0.04) 45%,
            transparent 72%
          );
          pointer-events: none;
        }

        .am-portraitWrap {
          position: relative;
          flex: 0 0 auto;
          width: clamp(118px, 15vh, 176px);
          height: clamp(118px, 15vh, 176px);
          border-radius: 50%;
        }

        /* Clips the (deliberately oversized, see .am-img) headshot to
           the circle. This is the fix for the portrait bleeding past
           its own box: object-fit: cover + transform: scale() paints
           the image ~22% larger than its layout box, and nothing was
           clipping that overflow, so the visible circle spilled
           downward into the divider below the hero. The ring elements
           below bleed slightly *outside* .am-portraitWrap on purpose
           (inset: -6px), so this clip lives on its own inner element
           sized exactly to the portrait rather than on .am-portraitWrap
           itself — clipping there would cut the ring off too. */
        .am-portraitClip {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          overflow: hidden;
        }

        .am-img {
          width: 100%;
          height: 100%;

          object-fit: cover;

          background: transparent;

          display: block;

          /* The source photo is a pre-composed circular headshot whose
             frame includes shoulders/chest below the chin. object-fit
             cover has no overflow to reposition into (the asset is
             already square) — scale the image up around a focal point
             near the eyes so the visible circle reads as a
             head-and-shoulders avatar crop instead, without touching
             the source asset. Tested and locked — do not change. */
          transform: scale(1.22);
          transform-origin: 50% 28%;
        }

        /* Thin vertical rule between the portrait and identity columns.
           It's positioned relative to .am-heroPortraitCol (not given its
           own grid track) and centered in --am-col-gap via the calc/
           translateX below — a grid track sized in px would shift the
           identity column's start away from the story column's, breaking
           the shared vertical axis this hero is built around. Height
           100% of the portrait column, which (grid default: stretch)
           already spans the full row. */
        .am-heroDivider {
          position: absolute;
          top: 0;
          bottom: 0;
          left: calc(100% + (var(--am-col-gap) / 2));
          transform: translateX(-50%);
          width: 1px;
          background: linear-gradient(
            180deg,
            transparent,
            var(--am-border) 18%,
            var(--am-border) 82%,
            transparent
          );
          pointer-events: none;
        }

        /* Resting frame: thin silver/charcoal border, a soft inner
           highlight, and a faint shadow separating the portrait from
           the card surface behind it. */
        .am-portraitRingBase {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          border: 1px solid rgba(var(--color-border-rgb), 0.4);
          box-shadow:
            inset 0 1px 1px rgba(255, 255, 255, 0.16),
            0 0 0 1px rgba(var(--color-ice-rgb), 0.1),
            0 10px 24px rgba(0, 0, 0, 0.35);
          pointer-events: none;
        }

        /* Animated illumination: a masked ring (not the whole disc) with
           a short bright arc that slowly travels the circumference.
           Rotating the ring element spins the conic-gradient with it —
           no JS, no @property needed. */
        .am-portraitRingGlow {
          position: absolute;
          inset: -6px;
          border-radius: 50%;
          pointer-events: none;

          background: conic-gradient(
            from 0deg,
            transparent 0deg,
            transparent 245deg,
            rgba(var(--color-border-rgb), 0.55) 275deg,
            rgba(255, 255, 255, 0.95) 300deg,
            rgba(var(--color-ice-rgb), 0.6) 318deg,
            rgba(var(--color-border-rgb), 0.4) 335deg,
            transparent 355deg,
            transparent 360deg
          );

          -webkit-mask-image: radial-gradient(
            farthest-side,
            transparent calc(100% - 3.5px),
            #000 calc(100% - 3.5px)
          );
          mask-image: radial-gradient(
            farthest-side,
            transparent calc(100% - 3.5px),
            #000 calc(100% - 3.5px)
          );

          animation: am-ringSpin 8s linear infinite;
        }

        @keyframes am-ringSpin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Identity block — a flex column, vertically centered as one
           unit within the row (not each line centered independently),
           left-aligned on desktop. */
        .am-heroIdentity {
          min-width: 0;
          display: flex;
          flex-direction: column;
          justify-content: center;
          text-align: left;
        }

        .am-eyebrow {
          margin: 0 0 6px 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.72rem, 0.85vw, 0.8rem);
          font-weight: 800;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: rgba(var(--color-ice-rgb), 0.85);
        }

        .am-name {
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(2rem, 3.4vw, 2.85rem);

          color: var(--am-ink);

          margin: 0 0 4px 0;

          letter-spacing: -0.03em;
          line-height: 1.05;

          font-weight: 900;
        }

        .am-role {
          margin: 0 0 10px 0;

          font-size: clamp(0.96rem, 1.25vw, 1.08rem);

          color: var(--am-ink-soft);

          line-height: 1.4;

          font-family: Nunito, ui-sans-serif, system-ui;

          font-weight: 700;
        }

        .am-stack {
          margin: 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.78rem, 0.95vw, 0.88rem);
          font-weight: 700;
          letter-spacing: 0.01em;
          color: var(--am-ink-muted);
        }

        /* Thin section separators instead of boxes-within-boxes */
        .am-divider {
          height: 1px;
          margin: clamp(14px, 2.2vh, 22px) 0;
          background: linear-gradient(
            90deg,
            transparent,
            var(--am-border) 12%,
            var(--am-border) 88%,
            transparent
          );
        }

        /* ---------------------------------------------------------
           Story: kicker + copy, two short blocks instead of a wall
           of same-weight paragraphs.
           --------------------------------------------------------- */
        .am-story {
          display: grid;
          gap: clamp(12px, 1.8vh, 18px);
        }

        .am-storyBlock {
          display: grid;
          grid-template-columns: var(--am-col-label) 1fr;
          column-gap: var(--am-col-gap);
          row-gap: clamp(10px, 2vw, 20px);
          align-items: start;
        }

        .am-storyLabel {
          margin: 0;
          padding-top: 0.15em;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.86rem, 1vw, 0.96rem);
          font-weight: 900;
          color: var(--am-primary);
          line-height: 1.35;
        }

        .am-p {
          font-size: clamp(0.92rem, 1.02vw, 1.02rem);

          line-height: 1.6;

          color: rgba(var(--color-text-primary-rgb), 0.88);

          margin: 0;

          font-family: Nunito, ui-sans-serif, system-ui;

          font-weight: 600;
        }

        /* ---------------------------------------------------------
           Focus rail: three light columns in the same glass surface
           --------------------------------------------------------- */
        .am-focus {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
        }

        .am-focusCol {
          padding: 0 clamp(10px, 1.6vw, 18px);
          border-left: 1px solid var(--am-border);
        }

        .am-focusCol:first-child {
          padding-left: 0;
          border-left: none;
        }

        .am-focusLabel {
          margin: 0 0 6px 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.72rem, 0.85vw, 0.78rem);
          font-weight: 800;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--am-ink-muted);
        }

        .am-focusList {
          margin: 0;
          padding: 0;
          list-style: none;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 700;
          color: rgba(var(--color-text-primary-rgb), 0.84);
        }

        .am-focusList li {
          font-size: clamp(0.84rem, 0.95vw, 0.94rem);
          line-height: 1.45;
        }

        /* Entrance animation */
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =========================================================
           TABLET / MOBILE
           ========================================================= */

        @media (max-width: 900px) {
          .am-center {
            padding: 14px 0;
          }

          .am-focus {
            grid-template-columns: 1fr;
            gap: 14px;
          }

          .am-focusCol {
            padding: 0;
            border-left: none;
            padding-top: 12px;
            border-top: 1px solid var(--am-border);
          }

          .am-focusCol:first-child {
            padding-top: 0;
            border-top: none;
          }
        }

        /* Small phones — the portrait/identity column split only makes
           sense with horizontal room; stack instead, drop the vertical
           divider, and center EVERYTHING in the card (hero, story,
           focus rail) so the whole surface reads as one centered mobile
           composition rather than a centered hero sitting above
           left-aligned editorial content. Spacing throughout this block
           is also tightened (divider margins, line-height, gaps,
           portrait size, card padding) — the card is a fixed-height
           panel here (see the 900px block: .am-card's own max-height/
           overflow: hidden auto, inherited unchanged, are what make it
           one), so this compaction shortens how far its INTERNAL
           scrollbar has to travel rather than shortening a page scroll. */
        @media (max-width: 420px) {
          .am-hero {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
          }

          .am-heroPortraitCol {
            padding: 0 0 12px;
          }

          .am-heroDivider {
            display: none;
          }

          .am-heroIdentity {
            align-items: center;
            text-align: center;
          }

          .am-portraitWrap {
            width: 104px;
            height: 104px;
          }

          .am-divider {
            margin: 12px 0;
          }

          .am-story {
            gap: 10px;
          }

          .am-storyBlock {
            grid-template-columns: 1fr;
            gap: 4px;
            justify-items: center;
            text-align: center;
          }

          .am-p {
            line-height: 1.48;
          }

          .am-focus {
            gap: 10px;
          }

          .am-focusCol {
            padding-top: 10px;
            text-align: center;
          }

          .am-focusList li {
            text-align: center;
          }

          .am-card {
            border-radius: 18px;
            padding: 14px 16px 22px 14px;
          }

          .am-center {
            padding: 12px 0;
          }
        }

        /* Short-height screens */
        @media (max-height: 720px) {
          .am-portraitWrap {
            width: 108px;
            height: 108px;
          }

          .am-p {
            line-height: 1.5;
          }

          .am-divider {
            margin: 10px 0;
          }
        }

        /* prefers-reduced-motion: keep a beautiful static silver/ice
           border instead of a moving one. */
        @media (prefers-reduced-motion: reduce) {
          .am-card {
            animation: none !important;
          }

          .am-portraitRingGlow {
            animation: none !important;
            background: conic-gradient(
              from 200deg,
              rgba(var(--color-border-rgb), 0.45),
              rgba(255, 255, 255, 0.7),
              rgba(var(--color-ice-rgb), 0.45),
              rgba(var(--color-border-rgb), 0.45)
            );
          }
        }

      `}</style>
    </section>
  );
}
