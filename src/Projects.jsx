import React from "react";
import usePointerGlow from "./usePointerGlow";
import OrbField from "./OrbField";
import { PROJECTS_ORBS } from "./orbLayouts";

const PROJECTS = [
  {
    title: "Gentle Sprout",
    category: "AI Mental Wellness Companion",
    href: "https://gentle-sprout.com/",
    cta: "Explore Gentle Sprout Beta",
    emoji: null,
    tags: ["React Native", "Django", "Gemini 2.5 Flash", "Hybrid RAG"],
    featured: true,
    accent: "green",
    motif: "sprout",
  },
  {
    title: "Petite Planner",
    category: "Task & Productivity Web App",
    href: "https://petite-planner.netlify.app/",
    cta: "Explore Petite Planner",
    emoji: null,
    tags: ["React", "Firebase", "Responsive UI", "Product Architecture"],
    accent: "pink",
    motif: "planner",
  },
  {
    title: "Bunny Bubble Nails",
    category: "Custom Ecommerce Store",
    href: "https://nail-shop.onrender.com/",
    cta: "Visit Bunny Bubble Nails",
    emoji: null,
    tags: ["Flask", "Firebase", "Ecommerce UI", "Responsive Frontend"],
    accent: "rose",
    motif: "nails",
  },
  {
    title: "Otome Game",
    category: "Interactive Browser Story Game",
    href: "https://arielles-code.netlify.app/",
    cta: "Play Otome Game",
    emoji: null,
    tags: ["JavaScript", "Interactive UI", "State Logic", "Narrative UX"],
    accent: "lavender",
    motif: "game",
  },
  {
    title: "Pretty Links",
    category: "Bookmark Management Chrome Extension",
    href: "https://pretty-links.netlify.app",
    cta: "Explore Pretty Links",
    emoji: null,
    tags: ["Browser API", "JavaScript", "Local Storage", "Bookmarks"],
    accent: "blue",
    motif: "links",
  },
];

// Small, restrained per-project motifs — monochrome line icons (not
// literal illustrations) so each card gets a bit of identity without
// pulling focus from the title. Kept intentionally simple: 18-22px,
// currentColor strokes/fills, matching the site's "Black + White Light"
// system rather than introducing new colors.
const MOTIF_ICONS = {
  sprout: (
    <>
      <path d="M12 20V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 13c0-3.2 2.6-5.4 5.8-5.4-.3 3.2-2.8 5.6-5.8 5.4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 16.2c0-2.7-2.3-4.6-5-4.6.3 2.7 2.4 4.8 5 4.6Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
    </>
  ),
  planner: (
    <>
      <rect x="4.5" y="5.5" width="15" height="14" rx="2.6" stroke="currentColor" strokeWidth="1.4" />
      <path d="M4.5 9.6h15" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8.3 3.5v3.2M15.7 3.5v3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M8.7 14.1l2 1.9 4.1-4.3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  /* Bunny Bubble Nails — a simple shopping-bag silhouette (body + two
     short handles) communicates "ecommerce store" more directly at this
     tiny rendered size than the bunny or nail glyphs did. */
  nails: (
    <>
      <path d="M6.8 8.2h10.4l1 11a2 2 0 0 1-2 2.2H7.8a2 2 0 0 1-2-2.2l1-11Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M9 8.2V6.6a3 3 0 0 1 6 0v1.6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </>
  ),
  game: (
    <>
      <path d="M6.2 5.8h11.6a2.4 2.4 0 0 1 2.4 2.4v4.8a2.4 2.4 0 0 1-2.4 2.4h-7.6l-3.4 2.8v-2.8h-.6a2.4 2.4 0 0 1-2.4-2.4V8.2a2.4 2.4 0 0 1 2.4-2.4Z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" />
      <path d="M12 11.9c-1.8-1.3-2.9-2.2-2.9-3.4 0-.8.6-1.4 1.4-1.4.6 0 1 .3 1.5.8.5-.5.9-.8 1.5-.8.8 0 1.4.6 1.4 1.4 0 1.2-1.1 2.1-2.9 3.4Z" fill="currentColor" />
    </>
  ),
  /* Pretty Links — restored to the original standalone bookmark ribbon
     (a browser-window + ribbon variant was tried and reverted; the plain
     ribbon reads more intuitively at this size). */
  links: (
    <path d="M7.2 4h9.6a1 1 0 0 1 1 1v14.3l-5.8-3.8-5.8 3.8V5a1 1 0 0 1 1-1Z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  ),
};

function ProjectMotif({ type }) {
  if (!type || !MOTIF_ICONS[type]) return null;
  return (
    <div className={`pj-motif pj-motif--${type}`} aria-hidden="true">
      <span className="pj-motif-glow" />
      <svg className="pj-motif-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        {MOTIF_ICONS[type]}
      </svg>
    </div>
  );
}

function ProjectCard({ project, featured = false }) {
  // All cards share the Gentle Sprout dark-glass + liquid CTA treatment.
  const ctaGlowRef = usePointerGlow();

  return (
    <article
      className={`pj-card ${
        featured ? "pj-card-featured" : "pj-card-standard"
      } accent-${project.accent || "lavender"}`}
    >
      {/* Animated glass/aurora light — replaces the old floating-orb +
          sparkle decoration. Two blurred, drifting gradient layers behind
          all content, tinted per project (see accent-* rules below) so
          each card gets its own restrained color personality instead of
          the previous silver/white-only look. */}
      <div className="pj-aurora" aria-hidden="true">
        <span className="pj-aurora-a" />
        <span className="pj-aurora-b" />
      </div>
      {featured && <span className="pj-edge-light" aria-hidden="true" />}

      <ProjectMotif type={project.motif} />

      <div className="pj-heading">
        {/* Only rendered for the featured card now — standard cards no
           longer reserve an invisible slot for this line (see the old
           .pj-featured--placeholder, removed below), so their heading
           starts directly at the title instead of compensating for
           hidden space with negative margins further down. */}
        {featured && (
          <span className="pj-featured">
            <span className="pj-featured-dot" aria-hidden="true" />
            Featured
          </span>
        )}
        <h2 className="pj-title">{project.title}</h2>
        <p className="pj-kicker">{project.category}</p>
      </div>

      <div className="pj-tags" role="list" aria-label="Technologies used">
        {project.tags.map((tag) => (
          <span key={tag} className="pj-tagItem" role="listitem">
            {tag}
          </span>
        ))}
      </div>

      <div className="pj-footer">
        <a
          className="pj-cta pj-cta--dark gs-liquid gs-liquid--ghost"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          ref={ctaGlowRef}
        >
          <span className="gs-liquid-border" aria-hidden="true" />
          <span className="gs-liquid-fill" aria-hidden="true" />
          <span className="gs-liquid-label">
            <span>{project.cta}</span>
            <span className="pj-cta-arrow">→</span>
          </span>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section className="projects-page" aria-label="Portfolio projects">
      <div className="projects-bg"      aria-hidden="true" />
      <div className="projects-texture" aria-hidden="true" />
      <div className="projects-glow projects-glow-left"  aria-hidden="true" />
      <div className="projects-glow projects-glow-right" aria-hidden="true" />
      <OrbField orbs={PROJECTS_ORBS} />

      <div className="projects-center">
        <div className="projects-shell">
          <header className="projects-hero">
            <h1 className="projects-title">Selected Work</h1>
          </header>

          <div className="projects-content">
            <section className="projects-grid">
              {PROJECTS.map((project) => (
                <ProjectCard key={project.title} project={project} featured={project.featured} />
              ))}
            </section>
          </div>
        </div>
      </div>

      <style>{`
        .projects-page,
        .projects-page *,
        .projects-page *::before,
        .projects-page *::after {
          box-sizing: border-box;
        }

        /* Projects page base — natural flow, same contract every other
           route uses (App.css owns viewport height/scrolling; this page
           is sized by its own content). */
        .projects-page {
          position: relative;
          width: 100%;
          height: auto;
          overflow: visible;
          display: block;
          color: var(--color-text-primary);
          isolation: isolate;
        }

        /* Horizontal padding is 0 — the shared .app-content gutter
           (App.css) already supplies it. Vertical padding (18px/24px
           desktop, 16px/22px ≤900px below) is Projects' own top/bottom
           breathing room, same role as every other route's "-center"
           wrapper. */
        .projects-center {
          position: relative;
          z-index: 2;
          width: 100%;
          height: auto;
          max-height: none;
          overflow: visible;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: 18px 0 24px;
        }

        @media (max-width: 900px) {
          .projects-center {
            padding: 16px 0 22px;
          }
        }

        .projects-shell {
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          height: auto;
          max-height: none;
          overflow: visible;
          flex: none;
        }

        /* Fixed to the viewport (not .projects-page's own box) so the
           route background spans the full screen — continuing behind the
           navbar and footer instead of being clipped to the space between
           them. Stacking is unaffected: .projects-page's isolation:isolate
           keeps these layers under the navbar (z-index:1000) and footer
           (z-index:1) at the root stacking context regardless. */
        .projects-bg,
        .projects-texture,
        .projects-glow {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        .projects-bg {
          z-index: 0;
          /* The top-left highlight formerly here (radial-gradient at
             16% 8%) read fine when this layer was clipped to the content
             box below the navbar, but now that the background is fixed
             to the viewport (see .projects-bg/.projects-texture/.projects-glow
             above) that same 8%-from-top anchor sits behind/above the
             navbar itself, showing up as a bright top-edge flare. Removed;
             the lower-right highlight and base gradient are unchanged. */
          background:
            radial-gradient(920px 560px at 86% 86%, rgba(var(--color-ice-rgb),0.05) 0%, rgba(var(--color-ice-rgb),0) 62%),
            linear-gradient(135deg, var(--color-surface-glass) 0%, var(--color-bg-page) 50%, var(--color-surface-recessed) 100%);
        }

        .projects-texture {
          z-index: 1;
          opacity: 0.5;
          background-image:
            radial-gradient(circle at 20% 22%, rgba(255,255,255,0.035) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 28%, rgba(255,255,255,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 72%, rgba(255,255,255,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 80%, rgba(255,255,255,0.03) 0 1px, transparent 2px);
          background-size: 260px 260px;
        }

        .projects-glow {
          z-index: 0;
          border-radius: 50%;
          filter: blur(24px);
          opacity: 0.72;
        }
        .projects-glow-left {
          inset: auto;
          width: 260px; height: 260px;
          top: -72px; left: -78px;
          background: radial-gradient(circle, rgba(var(--color-glow-silver-rgb),0.40) 0%, rgba(var(--color-glow-silver-rgb),0) 68%);
        }
        .projects-glow-right {
          inset: auto;
          width: 320px; height: 320px;
          right: -110px; bottom: -42px;
          background: radial-gradient(circle, rgba(var(--color-glow-white-rgb),0.30) 0%, rgba(var(--color-glow-white-rgb),0) 68%);
        }

        .projects-shell {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .projects-hero {
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          /* Extra breathing room below the heading, on top of
             .projects-shell's own gap — so "Selected Work" reads as its
             own introduction rather than touching the card row. This is
             the spacious-desktop value (nets ~32px of actual visible gap
             once .projects-shell's gap and .projects-content's -4px
             hover-lift compensation are accounted for — verified with
             getBoundingClientRect, not just assumed). Smaller at
             tablet/mobile widths and at the compact short-viewport
             breakpoints below, where the vertical budget is tighter. */
          margin-bottom: 17px;
        }

        /* Mobile: net ~20px visible gap (6px margin + .projects-shell's
           14px gap; no -4px content compensation at this width, since
           that trick only applies in the 901px+ fit-viewport system
           below). */
        @media (max-width: 640px) {
          .projects-hero { margin-bottom: 6px; }
        }

        /* Tablet: net ~24px visible gap (10px + 14px, same reasoning). */
        @media (min-width: 641px) and (max-width: 900px) {
          .projects-hero { margin-bottom: 10px; }
        }

        .projects-title {
          margin: 0;
          max-width: 980px;
          font-size: clamp(1.85rem, 8vw, 2.75rem);
          line-height: 1.02;
          letter-spacing: -0.02em;
          font-weight: 600;
          color: var(--color-text-primary);
          /* Cool-toned text gradient — soft white → silver → very pale
             icy blue → silver → white — rather than flat white. Stays
             within the site's existing white/silver/ice palette (the
             same family as the navbar accent, the page orbs, and Gentle
             Sprout's featured glow) rather than pulling in the cards'
             individual accent colors, so it still reads primarily as
             white/silver from a distance. */
          background: linear-gradient(
            100deg,
            #fff 0%,
            rgba(var(--color-glow-silver-rgb),1) 24%,
            #e4f3fb 50%,
            rgba(var(--color-glow-silver-rgb),1) 76%,
            #fff 100%
          );
          background-size: 200% 100%;
          background-position: 0% 50%;
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 0 20px rgba(var(--color-ice-rgb),0.1);
          /* Very slow, barely-perceptible sheen — a metallic/ice
             reflection drifting across the gradient, not a spinning
             rainbow. Disabled under prefers-reduced-motion below. */
          animation: pjHeadingSheen 9s ease-in-out infinite;
        }

        @keyframes pjHeadingSheen {
          0%, 100% { background-position: 0% 50%; }
          50%      { background-position: 100% 50%; }
        }


        /* Mobile: single column — flow layout, no nested scroll/clip */
        .projects-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
          width: 100%;
          height: auto;
          max-height: none;
          overflow: visible;
          flex: none;
        }

        /* Balanced wrapping grid: cards wrap 1/2/3-up by breakpoint below,
           and justify-content: center means any incomplete last row
           (e.g. the trailing 2 cards under a 3-up row) centers itself
           under the row above automatically. */
        .projects-grid {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 14px;
          width: 100%;
          height: auto;
          max-height: none;
          overflow: visible;
          flex: none;
        }

        .projects-grid > .pj-card {
          flex: 1 1 100%;
          max-width: 100%;
        }

        /* Tablet: 2 columns */
        @media (min-width: 641px) {
          .projects-grid > .pj-card {
            flex: 1 1 calc(50% - 7px);
            max-width: calc(50% - 7px);
          }

          /* Equal outer card height across every row, in any 2-or-3-column
             layout this width can produce (tablet 2-col here, desktop 3+2
             below, plus tablet's own extra Bunny Bubble Nails+Otome Game /
             Pretty Links rows that have no featured row-mate to stretch
             against). Row 1 already reaches this height naturally — Gentle
             Sprout's own content is the tallest — so this only ever adds
             height to rows that would otherwise be shorter; it can't affect
             Gentle Sprout itself. 275px is Gentle Sprout's own measured
             rendered height at both plain tablet width and spacious desktop
             (getBoundingClientRect — identical at both, so one shared value
             covers both; the short-viewport breakpoints further down
             override this with their own measured, smaller values since
             Gentle Sprout itself renders shorter there too). Scoped to
             .pj-card-standard only, never Gentle Sprout, per the same
             "don't touch the featured card" rule as its compact-spacing
             overrides above. Written as .pj-card.pj-card-standard (not
             .pj-card-standard alone) because the 901px+ "fit viewport"
             block further down sets .pj-card{min-height:0} — same
             specificity, later in source — which would otherwise win
             and silently cancel this out on desktop; the compound
             selector beats it regardless of source order, same pattern
             already used for .pj-card.pj-card-standard{gap} above. */
          .pj-card.pj-card-standard {
            min-height: 275px;
          }
        }

        /* Desktop: 3 + 2, centered second row */
        @media (min-width: 1100px) {
          .projects-grid > .pj-card {
            flex: 1 1 calc(33.333% - 10px);
            max-width: calc(33.333% - 10px);
          }

          /* Visually move Gentle Sprout (1st in the DOM) to the center
             of the first row — directly beneath the centered "Selected
             Work" heading — using flex order rather than reordering
             PROJECTS or duplicating cards. DOM/reading/tab order stays
             Gentle Sprout, Petite Planner, Bunny Bubble Nails, Otome
             Game, Pretty Links (screen readers and mobile/tablet, which
             don't get this override, see the featured project first as
             intended); only the on-screen desktop position changes. All
             five get an explicit order so the reordered three don't
             collide with the other two's default order of 0. */
          .projects-grid > .pj-card:nth-child(1) { order: 2; } /* Gentle Sprout → center */
          .projects-grid > .pj-card:nth-child(2) { order: 1; } /* Petite Planner → left */
          .projects-grid > .pj-card:nth-child(3) { order: 3; } /* Bunny Bubble Nails → right */
          .projects-grid > .pj-card:nth-child(4) { order: 4; } /* Otome Game */
          .projects-grid > .pj-card:nth-child(5) { order: 5; } /* Pretty Links */
        }

        /* Cards — content is centered as a deliberate composition (not
           left-aligned text sitting in a centered layout). Children stay
           full-width (default align-items: stretch) so .pj-tags' wrapping
           measures against the card's actual width; centering comes from
           text-align plus each element's own alignment, not from
           shrinking the flex items themselves. */
        .pj-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 14px;
          padding: 15px;
          border-radius: 20px;
          border: 1px solid rgba(var(--color-border-rgb),0.18);
          background: linear-gradient(180deg, rgba(var(--color-surface-glass-rgb),0.82) 0%, rgba(var(--color-surface-glass-rgb),0.68) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 14px 32px rgba(0,0,0,0.4);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          text-align: center;
        }

        .pj-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 18px 40px rgba(0,0,0,0.5), 0 4px 16px rgba(var(--color-glow-white-rgb),0.08);
          border-color: rgba(var(--color-glow-white-rgb),0.30);
        }

        /* Gentle Sprout is back in the shared grid at the same geometry
           as the other four cards — its hierarchy comes entirely from
           this surface treatment (plus the larger title above and the
           edge-light below), so it's tuned a bit richer than before now
           that it no longer also has an isolated row/position to lean
           on: brighter, more opaque glass surface, more backdrop blur
           (greater glass depth), a brighter cyan/ice edge, a stronger
           shadow, and a soft cyan/mint ambient glow (a fourth box-shadow
           layer — box-shadow isn't clipped by the card's own
           overflow:hidden, so this reads as light escaping the glass
           rather than being cut off at the border). */
        .pj-card-featured {
          background: linear-gradient(145deg, rgba(var(--color-surface-glass-rgb),0.93) 0%, rgba(var(--color-surface-glass-rgb),0.82) 50%, rgba(var(--color-glow-white-rgb),0.06) 100%);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-color: rgba(var(--color-glow-white-rgb),0.36);
          box-shadow:
            0 20px 48px rgba(0,0,0,0.52),
            0 0 0 1px rgba(var(--color-glow-white-rgb),0.06),
            0 0 36px rgba(125,211,252,0.14);
        }

        .pj-card-featured:hover {
          border-color: rgba(var(--color-glow-white-rgb),0.48);
          box-shadow:
            0 22px 52px rgba(0,0,0,0.55),
            0 4px 16px rgba(var(--color-glow-white-rgb),0.12),
            0 0 44px rgba(125,211,252,0.2);
        }

        /* Small per-project motif — sits above the title, centered, with
           a soft glow behind it. Fixed size + margin:auto centers it
           without needing to change the card's own alignment (see note
           on .pj-card above). This -2px is Gentle Sprout's value —
           it has a real "Featured" line directly under the icon and
           keeps its own breathing room. Standard cards override this
           below now that they no longer have any reserved/invisible
           space above the title to compensate for. */
        .pj-motif {
          position: relative; z-index: 1;
          width: 38px; height: 38px;
          margin: 0 auto -2px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }

        /* ── Standard-card layout ─────────────────────────────────────
           The four non-featured cards no longer render a Featured slot
           at all (see the JSX — it's conditional now, not always-present
           +visibility:hidden), and no longer reserve two-line/two-row
           minimum heights for the kicker or tags (see the .pj-kicker and
           .pj-tags overrides further down). With nothing invisible left
           to compensate for, the icon→title→subtitle→tags→CTA rhythm is
           just a smaller, genuinely fixed flex gap (9px, vs. the 14px
           .pj-card default) plus the motif/footer's own natural margins
           — no negative-margin pull-ups needed anywhere. Written as
           .pj-card.pj-card-standard (not .pj-card-standard alone) so
           this beats every breakpoint's own .pj-card{gap} override
           by specificity regardless of source order; the compact/short-
           viewport breakpoints still each set their own smaller value to
           stay at or under that breakpoint's own tuned, already-verified
           no-clip budget (see each media query below). */
        .pj-card.pj-card-standard {
          gap: 9px;
        }

        /* No extra pull-up needed — the reduced card gap above already
           puts this in the ~8-10px target range. */
        .pj-card-standard .pj-motif {
          margin-bottom: 0;
        }

        /* If a row's height ends up taller than this card's own compact
           content needs (e.g. row 1, stretched to match Gentle Sprout),
           the leftover space centers around the whole cluster as a unit
           instead of collecting inside any one gap. */
        .pj-card-standard {
          justify-content: center;
        }

        /* The CTA sits naturally right after the tags now — no more
           margin-top:auto pinning it to the card's bottom edge (that's
           what let the tags→CTA gap stretch to fill whatever room was
           left). Gentle Sprout keeps the original auto-margin/bottom-
           pinned behavior untouched. */
        .pj-card-standard .pj-footer {
          margin-top: 0;
        }

        .pj-motif-glow {
          position: absolute; inset: -8px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 70%);
          filter: blur(5px);
          opacity: 0.85;
        }

        .pj-motif-icon {
          position: relative;
          width: 22px; height: 22px;
          color: var(--color-text-primary);
          opacity: 0.92;
        }

        /* Gentle Sprout's motif gets a slow, soft breathing pulse — its
           one intentional bit of motion, distinct from Home's bouncing
           orbs and not repeated on every other card. */
        .pj-motif--sprout .pj-motif-glow { animation: pjMotifGlowPulse 3.8s ease-in-out infinite; }
        .pj-motif--sprout .pj-motif-icon { animation: pjMotifBreathe 3.8s ease-in-out infinite; }
        @keyframes pjMotifGlowPulse {
          0%, 100% { opacity: 0.5; transform: scale(0.9); }
          50%      { opacity: 1;   transform: scale(1.12); }
        }
        @keyframes pjMotifBreathe {
          0%, 100% { opacity: 0.82; transform: scale(1); }
          50%      { opacity: 1;    transform: scale(1.06); }
        }

        /* Heading block — title, kicker, and (when present) the Featured
           indicator stack and center together as one unit. */
        .pj-heading {
          position: relative; z-index: 1;
          display: flex; flex-direction: column; align-items: center;
        }

        .pj-title {
          margin: 0; font-size: 1.2rem;
          line-height: 1.08; letter-spacing: -0.03em;
          font-weight: 900; word-break: break-word;
        }

        /* Gentle Sprout's title reads ~6% larger than the other four —
           all five cards share the same geometry, so this (plus the
           richer glass/aurora/edge-light below) is what establishes it
           as the one the eye lands on first, not size or position of the
           card itself. em-relative so it scales with .pj-title's own
           responsive font-size at every breakpoint. */
        .pj-card-featured .pj-title {
          font-size: 1.06em;
        }

        /* Short project/category descriptor — clearly secondary to the
           title: small, muted, no background. */
        .pj-kicker {
          margin: 3px 0 0;
          font-size: 0.74rem; font-weight: 700;
          line-height: 1.3;
          letter-spacing: 0.02em;
          color: var(--color-text-secondary);
          opacity: 0.75;
          /* Reserve room for two lines (em-relative, so it tracks the
             font-size at every breakpoint automatically) — some
             categories ("Bookmark Management Chrome Extension") wrap on
             narrower cards while others don't, and without this the tags
             below would start at a different height depending on which.
             Standard cards drop this reservation entirely (see below):
             letting each card's kicker take only the height its own text
             actually needs is what keeps their content genuinely compact
             rather than padded out to match whichever card wraps most. */
          min-height: 2.6em;
        }

        /* Standard cards: no reserved two-line minimum — a one-line
           category (most of them) sits directly above the tags with no
           leftover gap baked in. Higher specificity than .pj-kicker
           above, so this wins at every breakpoint regardless of source
           order. */
        .pj-card-standard .pj-kicker {
          min-height: 0;
        }

        /* Subtle "Featured" indicator — a dot + word, centered on its own
           line above the title, never louder than the title itself.
           Replaces the old large capsule. */
        .pj-featured {
          display: inline-flex; align-items: center; gap: 5px;
          margin-bottom: 4px;
          font-size: 0.62rem; font-weight: 800;
          letter-spacing: 0.05em; text-transform: uppercase;
          color: var(--color-ice);
          white-space: nowrap;
        }

        .pj-featured-dot {
          width: 5px; height: 5px; border-radius: 50%;
          background: var(--color-ice);
          box-shadow: 0 0 6px rgba(var(--color-ice-rgb),0.6);
          flex-shrink: 0;
        }

        /* Tech rail — each technology is its own lightweight outlined
           label (not a chunky pill: tight radius, hairline border,
           minimal padding, near-transparent fill) so the stack reads as
           scannable facts. Wraps and centers like everything else in the
           card. */
        .pj-tags {
          position: relative; z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-wrap: wrap;
          align-content: flex-start;
          gap: 7px;
          /* Reserve space for two rows of chips so the CTA below starts
             at the same height whether a card's tags wrap (Pretty Links)
             or fit on one line (everyone else). align-content:flex-start
             keeps a single row pinned to the top of this reserved zone
             rather than centering/stretching into the extra space.
             Standard cards drop this reservation (see below) — most of
             them fit on one row and shouldn't pay for the two-row case. */
          min-height: 58px;
        }

        /* Standard cards: no reserved two-row minimum — a card whose tags
           fit on one line (most of them) has its CTA start right after
           that one line, not after an invisible second row's worth of
           space. Pretty Links, whose four tags do wrap to two rows, is
           simply as tall as that content actually is — real height from
           real content, not a shared reservation every card pays for.
           Higher specificity than .pj-tags above, so this wins at every
           breakpoint regardless of source order. */
        .pj-card-standard .pj-tags {
          min-height: 0;
        }

        /* Resting state only — a restrained hairline border and bright,
           fully-legible text. This box itself no longer animates (see
           the performance note below); the breathing motion lives
           entirely on the ::after overlay beneath it. */
        .pj-tagItem {
          position: relative;
          isolation: isolate;
          display: inline-flex;
          align-items: center;
          padding: 3px 8px;
          border-radius: 6px;
          border: 1px solid rgba(var(--color-border-rgb),0.24);
          background: rgba(var(--color-surface-glass-rgb),0.04);
          box-shadow: 0 0 2px rgba(var(--color-glow-white-rgb),0.04);
          font-size: 0.8rem; font-weight: 800;
          letter-spacing: 0.01em; line-height: 1.3;
          color: var(--color-text-primary);
          transition: border-color 200ms ease, box-shadow 200ms ease, background 200ms ease;
        }

        /* Continuous, synchronized breathing — performance rewrite.
           The old version animated border-color/background/box-shadow/
           text-shadow directly on 20 .pj-tagItem elements at once, which
           forces the browser to repaint each one every frame (none of
           those are compositor-only properties) — confirmed via
           document.getAnimations()[].effect.getKeyframes() during a
           profiling pass. Same visual target, cheaper mechanism: the
           bright/glowing state is pre-painted, at full strength, as a
           static ::after positioned over the resting tag (isolation:
           isolate + z-index:-1 keep it behind this tag's own text but
           above its own resting border/background — see z-index below).
           Only that overlay's opacity and a near-imperceptible scale are
           animated, both compositor-only, so the browser can composite
           the crossfade on the GPU instead of repainting 20 boxes every
           frame. Text-shadow's peak glow (barely visible at 0.18 alpha
           to begin with) isn't reproduced — animating it would need a
           second, text-duplicating pseudo-element, which isn't worth it
           for an effect this subtle; everything else matches exactly. */
        .pj-tagItem::after {
          content: "";
          position: absolute;
          inset: -1px;
          z-index: -1;
          border-radius: inherit;
          pointer-events: none;
          border: 1px solid rgba(var(--color-glow-white-rgb),0.65);
          background: rgba(var(--color-surface-glass-rgb),0.08);
          box-shadow:
            0 0 4px rgba(var(--color-glow-white-rgb),0.28),
            0 0 9px rgba(var(--color-ice-rgb),0.16),
            0 0 13px rgba(var(--color-ice-rgb),0.07);
          opacity: 0;
          transform: scale(0.99);
          animation: pjTagBreathe 3.8s ease-in-out infinite;
        }

        @keyframes pjTagBreathe {
          0%, 100% { opacity: 0; transform: scale(0.99); }
          50%      { opacity: 1; transform: scale(1); }
        }

        /* Hovering one label individually holds a slightly stronger lit
           state — brighter border, a touch more glow, a faint fill —
           without any movement. Independent of the synced loop above. */
        .pj-tagItem:hover {
          border-color: rgba(var(--color-glow-white-rgb),0.65);
          background: rgba(var(--color-surface-glass-rgb),0.14);
          box-shadow:
            0 0 5px rgba(var(--color-glow-white-rgb),0.22),
            0 0 10px rgba(var(--color-ice-rgb),0.12);
        }

        .pj-footer {
          position: relative; z-index: 1;
          margin-top: auto;
          display: flex; align-items: flex-end;
          justify-content: center; gap: 10px; min-width: 0;
        }

        .pj-cta {
          position: relative;
          overflow: hidden;
          display: inline-flex; align-items: center;
          justify-content: center; gap: 8px;
          width: 100%; min-height: 36px;
          padding: 8px 12px; border-radius: 999px;
          text-decoration: none; color: var(--color-text-on-accent);
          font-size: 0.78rem; font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, var(--color-accent-hover) 0%, var(--color-accent) 100%);
          box-shadow: 0 12px 24px rgba(0,0,0,0.35);
          transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
          white-space: normal;
        }

        .pj-cta::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
          transform: translateX(-130%);
          transition: transform 550ms ease;
          pointer-events: none;
        }

        .pj-cta:hover,
        .pj-cta:focus-visible {
          transform: translateY(-2px);
          filter: brightness(1.04);
          box-shadow: 0 16px 32px rgba(0,0,0,0.45), 0 2px 12px rgba(var(--color-glow-white-rgb),0.15);
        }
        .pj-cta:hover::after,
        .pj-cta:focus-visible::after {
          transform: translateX(130%);
        }

        .pj-cta-arrow { font-size: 0.92rem; display: inline-block; transition: transform 200ms ease; }
        .pj-cta:hover .pj-cta-arrow,
        .pj-cta:focus-visible .pj-cta-arrow { transform: translateX(3px); }

        /* ===== Dark-glass CTA + Liquid Glass interaction — prototype =====
           Applied to the featured (Gentle Sprout) card's CTA only, for
           now. Same recipe as the homepage "About Me" button (see
           Welcome.jsx) — duplicated here because component styles
           aren't shared across files in this codebase, but the CSS is
           kept identical on purpose so the two read as one material.
           --mx/--my come from usePointerGlow. */
        .gs-liquid {
          position: relative;
          isolation: isolate;
          transition: transform 120ms ease, box-shadow 160ms ease;
        }
        .gs-liquid:active { transform: scale(0.985); }

        .gs-liquid-border,
        .gs-liquid-fill {
          position: absolute;
          inset: 0;
          border-radius: inherit;
          opacity: 0;
          transition: opacity 220ms ease;
          pointer-events: none;
        }
        .gs-liquid.is-glow-active .gs-liquid-border,
        .gs-liquid.is-glow-active .gs-liquid-fill,
        .gs-liquid:focus-visible .gs-liquid-border,
        .gs-liquid:focus-visible .gs-liquid-fill { opacity: 1; }

        .gs-liquid-border {
          padding: 1px;
          background: radial-gradient(90px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.9), transparent 70%);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
        }
        .gs-liquid-fill {
          background:
            radial-gradient(140px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.14), transparent 60%),
            radial-gradient(40px circle at var(--mx,50%) var(--my,50%), rgba(255,255,255,0.35), transparent 70%);
        }

        /* Overrides the white/light .pj-cta material + its old
           lift/glow/sheen hover for the dark-glass variant. Placed
           after the base rules so it wins at equal specificity. */
        .pj-cta--dark {
          color: var(--color-text-primary);
          background: rgba(var(--color-surface-glass-rgb),0.55);
          border: 1.5px solid rgba(var(--color-border-rgb),0.35);
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
          transition: background 220ms ease, border-color 220ms ease;
        }
        .pj-cta--dark::after { content: none; }
        .pj-cta--dark:hover,
        .pj-cta--dark:focus-visible {
          transform: none;
          filter: none;
          box-shadow: inset 0 1px 0 rgba(255,255,255,0.12);
        }
        .pj-cta--dark.is-glow-active,
        .pj-cta--dark:focus-visible {
          border-color: rgba(var(--color-glow-white-rgb),0.4);
          background: rgba(var(--color-surface-glass-rgb),0.72);
        }
        .pj-cta--dark .gs-liquid-label {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          gap: 8px;
        }
        .pj-cta--dark:hover .pj-cta-arrow,
        .pj-cta--dark:focus-visible .pj-cta-arrow,
        .pj-cta--dark.is-glow-active .pj-cta-arrow { transform: translateX(3px); }

        /* ===== Animated glass / aurora light system =====
           Conceptually this is Home's free-floating orbs pushed indoors:
           instead of physical balls drifting in open space, the same
           light now reads as color refracting slowly underneath each
           card's frosted glass. Two blurred gradient layers, clipped to
           the card's own rounded corners (.pj-card already has
           overflow:hidden), sitting behind all content at z-index:0.
           transform/opacity only for animation — no layout-affecting
           properties — with will-change on the layers that actually
           animate continuously. Colors come from the accent-* rules
           below; this block only sets shape, position, and motion. */
        .pj-aurora {
          position: absolute;
          inset: 0;
          z-index: 0;
          overflow: hidden;
          border-radius: inherit;
          pointer-events: none;
        }

        .pj-aurora-a,
        .pj-aurora-b {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          will-change: transform, opacity;
        }

        /* Primary light — an elongated soft blob drifting/rotating near
           the top-right corner (same corner the old orb occupied). */
        .pj-aurora-a {
          top: -30%;
          right: -25%;
          width: 85%;
          height: 70%;
          filter: blur(26px);
          opacity: 0.4;
          transform: rotate(-14deg);
          animation: pjAuroraDriftA 15s ease-in-out infinite;
        }

        /* Secondary reflection — softer, slower, opposite corner. */
        .pj-aurora-b {
          left: -20%;
          bottom: -25%;
          width: 65%;
          height: 55%;
          filter: blur(30px);
          opacity: 0.24;
          animation: pjAuroraDriftB 19s ease-in-out infinite;
        }

        @keyframes pjAuroraDriftA {
          0%, 100% { transform: translate(0, 0) rotate(-14deg) scale(1); opacity: 0.34; }
          50%      { transform: translate(-5%, 4%) rotate(-6deg) scale(1.1); opacity: 0.46; }
        }
        @keyframes pjAuroraDriftB {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.18; }
          50%      { transform: translate(5%, -5%) scale(1.15); opacity: 0.28; }
        }

        /* Each project's own restrained color personality — muted,
           translucent, never saturated enough to read as neon. The card
           surface itself stays dark glass; color only lives in this
           refracted light layer. */
        .accent-green .pj-aurora-a {
          background: linear-gradient(120deg, transparent 0%, rgba(125,211,252,0.55) 35%, rgba(134,239,172,0.5) 65%, transparent 100%);
        }
        .accent-green .pj-aurora-b {
          background: radial-gradient(circle, rgba(94,234,212,0.5) 0%, transparent 72%);
        }

        .accent-pink .pj-aurora-a {
          background: linear-gradient(120deg, transparent 0%, rgba(224,166,178,0.5) 40%, rgba(196,181,253,0.42) 70%, transparent 100%);
        }
        .accent-pink .pj-aurora-b {
          background: radial-gradient(circle, rgba(196,181,253,0.42) 0%, transparent 72%);
        }

        .accent-rose .pj-aurora-a {
          background: linear-gradient(120deg, transparent 0%, rgba(249,168,190,0.5) 40%, rgba(253,199,169,0.42) 70%, transparent 100%);
        }
        .accent-rose .pj-aurora-b {
          background: radial-gradient(circle, rgba(253,199,169,0.4) 0%, transparent 72%);
        }

        .accent-lavender .pj-aurora-a {
          background: linear-gradient(120deg, transparent 0%, rgba(196,181,253,0.5) 40%, rgba(167,139,250,0.4) 70%, transparent 100%);
        }
        .accent-lavender .pj-aurora-b {
          background: radial-gradient(circle, rgba(167,139,250,0.38) 0%, transparent 72%);
        }

        .accent-blue .pj-aurora-a {
          background: linear-gradient(120deg, transparent 0%, rgba(125,211,252,0.55) 40%, rgba(96,165,250,0.42) 70%, transparent 100%);
        }
        .accent-blue .pj-aurora-b {
          background: radial-gradient(circle, rgba(96,165,250,0.4) 0%, transparent 72%);
        }

        /* Motif glow tinted to match each card's accent, same palette as
           the aurora above. */
        .accent-green    .pj-motif-glow { background: radial-gradient(circle, rgba(125,211,252,0.32) 0%, transparent 70%); }
        .accent-pink     .pj-motif-glow { background: radial-gradient(circle, rgba(224,166,178,0.32) 0%, transparent 70%); }
        .accent-rose     .pj-motif-glow { background: radial-gradient(circle, rgba(249,168,190,0.32) 0%, transparent 70%); }
        .accent-lavender .pj-motif-glow { background: radial-gradient(circle, rgba(196,181,253,0.32) 0%, transparent 70%); }
        .accent-blue     .pj-motif-glow { background: radial-gradient(circle, rgba(96,165,250,0.32) 0%, transparent 70%); }

        /* Gentle Sprout (featured) gets the richest version of the
           effect: bigger/brighter aurora layers, plus a very subtle
           conic-gradient ring that slowly sweeps a soft highlight around
           part of the edge — not a spinning rainbow, just one quiet
           traveling highlight in the same icy-mint family as its aurora.
           Reuses the content-box/border-box mask trick already used by
           .gs-liquid-border elsewhere in this file. */
        .pj-card-featured .pj-aurora-a { opacity: 0.5; filter: blur(24px); }
        .pj-card-featured .pj-aurora-b { opacity: 0.32; }

        .pj-edge-light {
          position: absolute;
          inset: 0;
          z-index: 0;
          border-radius: inherit;
          padding: 1px;
          pointer-events: none;
          background: conic-gradient(from 0deg, transparent 0deg, rgba(125,211,252,0.5) 40deg, rgba(134,239,172,0.32) 70deg, transparent 130deg, transparent 360deg);
          -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0.48;
          /* Slowed from 11s so it reads as light slowly catching the
             glass edge rather than an animated/spinning border. */
          animation: pjEdgeSweep 16s linear infinite;
          will-change: transform;
        }
        @keyframes pjEdgeSweep {
          to { transform: rotate(360deg); }
        }

        /* .projects-center's padding/display/flex and .projects-content's
           display/gap now live on their base rules above (shared at
           every width); .projects-shell's width cap likewise. This block
           is left with only what's genuinely width-specific: the
           tablet+ title/grid/card treatment. */
        @media (min-width: 761px) {
          .projects-title {
            font-size: clamp(1.95rem, 3.6vw, 3.7rem);
            line-height: 0.96;
          }

          .projects-grid {
            min-width: 0;
          }

          .pj-card { border-radius: 22px; }

          .pj-title { font-size: clamp(1.08rem, 1.15vw, 1.55rem); }

          .pj-cta { width: auto; white-space: nowrap; }
        }

        /* ── Large desktop tweaks ─────────────────────────────────────── */
        @media (min-width: 1380px) {
          .projects-shell { width: min(1300px, 100%); }
        }

        @media (min-width: 761px) and (max-height: 860px) {
          .projects-center  { padding-top: 8px; padding-bottom: 8px; }
          .projects-shell   { gap: 12px; }
          .projects-hero    { gap: 7px; margin-bottom: 12px; }
          .projects-title   { font-size: clamp(1.78rem, 3.15vw, 3.2rem); }
          .projects-content { gap: 12px; }
          .projects-grid    { gap: 12px; }
          /* Freed-up vertical room now that .pj-bio is gone — loosened
             from the previous crushed padding/gap rather than kept tight
             for a block that no longer exists. */
          .pj-card          { padding: 14px; gap: 12px; }
          .pj-tagItem       { font-size: 0.78rem; }
          .pj-tags          { min-height: 54px; }
          .pj-kicker        { min-height: 2.4em; }
          .pj-cta           { min-height: 35px; font-size: 0.74rem; padding: 8px 12px; }
          .pj-motif         { width: 32px; height: 32px; margin: 0 auto -2px; }
          .pj-motif-icon    { width: 19px; height: 19px; }
          /* Same compact philosophy as the spacious-desktop rule above,
             just scaled to this breakpoint's own tighter 12px .pj-card
             gap — kept comfortably under it so this stays within the
             already-verified no-clipping budget for short viewports.
             (.pj-card-standard .pj-motif/.pj-kicker/.pj-tags/.pj-footer
             need no reset here — those are compound descendant
             selectors, so they already win over this block's plain
             .pj-motif/.pj-kicker/.pj-tags rules by specificity alone.) */
          .pj-card.pj-card-standard { gap: 9px; }
          /* Equal row heights at this breakpoint's own scale — Gentle
             Sprout measures 255px tall here (this block's tighter
             padding/motif/tag sizing above changes its natural height
             too, hence a distinct measured value rather than reusing the
             275px spacious-desktop one). */
          .pj-card.pj-card-standard { min-height: 255px; }
        }

        /* Extra compaction for short desktop viewports (e.g. 2122x963) —
           cards fit, no scrollbar. Back to a 2-row (3+2) budget now that
           the featured card lives inside the same grid as everyone else
           again, rather than the tighter values this breakpoint needed
           while there was a separate featured row adding a third row of
           height. Values re-verified empirically against the live grid
           so the second card row still doesn't overflow .projects-grid's
           overflow:hidden. */
        @media (min-width: 901px) and (max-height: 963px) {
          .projects-center  { padding-top: 6px; padding-bottom: 6px; }
          .projects-shell   { gap: 8px; }
          /* Title→card gap: this used to be margin-bottom:6px, which
             combined with this block's 8px .projects-shell gap netted
             only ~14px of actual visible space (measured via
             getBoundingClientRect — title.bottom to the first card's
             top) — the title was crowding the cards at this common
             laptop-scale viewport. 17px nets ~25px visible, inside the
             requested 24-26px short-viewport target, without touching
             .projects-shell's own gap (this is the one property that
             should carry the reduction, not a shared layout gap used
             elsewhere too). */
          .projects-hero    { gap: 5px; margin-bottom: 17px; }
          .projects-title   { font-size: clamp(1.5rem, 2.5vw, 2.4rem); }
          .projects-content { gap: 8px; }
          .projects-grid    { gap: 8px; }
          .pj-card          { padding: 11px 13px; gap: 8px; }
          .pj-kicker        { margin-top: 2px; min-height: 2.2em; }
          .pj-tags          { gap: 6px; min-height: 42px; }
          .pj-tagItem       { font-size: 0.73rem; padding: 3px 7px; }
          .pj-cta           { min-height: 33px; font-size: 0.72rem; padding: 7px 10px; }
          .pj-motif         { width: 27px; height: 27px; margin: 0 auto -2px; }
          .pj-motif-icon    { width: 16px; height: 16px; }
          /* Same reasoning as the 860px breakpoint above, scaled to this
             breakpoint's tighter 8px .pj-card gap. */
          .pj-card.pj-card-standard { gap: 6px; }
          /* Equal row heights, this breakpoint's own measured Gentle
             Sprout height (213px — this tier's smaller padding/motif/
             font sizing above makes it shorter than the 275px spacious-
             desktop and 255px 860px-tier values). */
          .pj-card.pj-card-standard { min-height: 213px; }
        }

        /* Pre-existing narrow edge case, not introduced by the alignment
           pass above but made noticeably worse by it: 901-1099px width
           falls between the 2-column (641px+) and 3-column (1100px+)
           breakpoints, so at this width the grid is still 2 columns —
           5 cards become 3 rows (2+2+1) instead of 2 (3+2) — while the
           "short desktop" compaction above was tuned assuming 2 rows.
           Combined with a height under 963px, that 3rd row can overflow
           .projects-grid's overflow:hidden. This narrower band gets
           its own tighter reservations on top of the general compaction,
           verified empirically against the live grid. */
        @media (min-width: 901px) and (max-width: 1099px) and (max-height: 963px) {
          .projects-shell   { gap: 6px; }
          /* Same title→card gap fix as the 963px breakpoint above, tuned
             for this band's own tighter 6px .projects-shell gap: was
             margin-bottom:4px (netting ~10px visible — the worst case of
             all, title practically touching the cards), now nets ~25px
             (6px shell gap + 19px here), matching the 24-26px short-
             viewport target instead of collapsing it. */
          .projects-hero    { margin-bottom: 19px; }
          .projects-content { gap: 6px; }
          .projects-grid    { gap: 6px; }
          .pj-card           { padding: 8px 10px; gap: 6px; }
          .pj-kicker         { min-height: 1.3em; }
          .pj-tags           { min-height: 26px; }
          .pj-motif          { width: 22px; height: 22px; margin: 0 auto -3px; }
          .pj-motif-icon     { width: 13px; height: 13px; }
          /* Same compact philosophy, scaled to this band's tightest
             6px .pj-card gap. */
          .pj-card.pj-card-standard { gap: 5px; }
          /* Equal row heights, this band's own measured Gentle Sprout
             height (169px — the 2+2+1 layout here plus this band's own
             tighter sizing above makes it shorter than every other
             tier's value). */
          .pj-card.pj-card-standard { min-height: 169px; }
        }

        @media (max-width: 420px) {
          .pj-card        { padding: 14px; }
          .pj-title       { font-size: 1.08rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pj-card, .pj-cta, .pj-cta::after, .pj-cta-arrow { transition: none !important; }
          .pj-card:hover, .pj-cta:hover, .pj-cta:focus-visible { transform: none !important; }
          .pj-cta:hover::after, .pj-cta:focus-visible::after { transform: translateX(-130%) !important; }
          .pj-cta:hover .pj-cta-arrow, .pj-cta:focus-visible .pj-cta-arrow { transform: none !important; }

          .gs-liquid, .gs-liquid-border, .gs-liquid-fill, .pj-cta--dark { transition: none !important; }
          .gs-liquid:active { transform: none !important; }

          .pj-motif-glow, .pj-motif-icon { animation: none !important; }

          .pj-aurora-a, .pj-aurora-b, .pj-edge-light { animation: none !important; }

          .projects-title { animation: none !important; background-position: 0% 50% !important; }

          .pj-tagItem::after {
            animation: none !important;
            opacity: 0 !important;
          }
        }

      `}</style>
    </section>
  );
}