import React from "react";

const PROJECTS = [
  {
    title: "Gentle Sprout",
    bio:
      "A DBT-inspired mental wellness app with guided coaching flows, an AI companion chatbot, and a live beta experience powered by RAG.",
    href: "https://my-dbt-ai-frontend.onrender.com/",
    cta: "Explore Gentle Sprout Beta",
    emoji: null,
    tags: ["React Native", "Django", "AI", "RAG", "DBT"],
    featured: true,
    accent: "green",
  },
  {
    title: "Petite Planner",
    bio:
      "A polished productivity app for task planning and daily organization, designed with a premium SaaS look and a clean Firebase-powered experience.",
    href: "https://petite-planner.netlify.app/",
    cta: "Explore Petite Planner",
    emoji: null,
    tags: ["React", "Firebase", "UI/UX", "Productivity"],
    accent: "pink",
  },
  {
    title: "Bunny Bubble Nails",
    bio:
      "A custom press-on nails ecommerce experience with playful branding, polished product presentation, and a live shopping flow.",
    href: "https://bunnybubblenails.com",
    cta: "Visit Bunny Bubble Nails",
    emoji: null,
    tags: ["Ecommerce", "Flask", "Firebase", "Brand UI"],
    accent: "rose",
  },
  {
    title: "Otome Game",
    bio:
      "A browser-based otome game concept focused on charming presentation, immersive interactions, and personality-driven frontend storytelling.",
    href: "https://arielles-code.netlify.app/",
    cta: "Play Otome Game",
    emoji: null,
    tags: ["Frontend", "Game UI", "Interactive Design"],
    accent: "lavender",
  },
  {
    title: "Pretty Links",
    bio:
      "A Chrome extension for organizing bookmarks with a cleaner, more intentional interface built around browser APIs.",
    href: "https://pretty-links.netlify.app",
    cta: "Explore Pretty Links",
    emoji: null,
    tags: ["Chrome Extension", "Browser APIs", "Frontend"],
    accent: "blue",
  },
];

function ProjectCard({ project, featured = false }) {
  return (
    <article
      className={`pj-card ${
        featured ? "pj-card-featured" : "pj-card-standard"
      } accent-${project.accent || "lavender"}`}
    >
      <div className="pj-orb" aria-hidden="true" />
      <div className="pj-sparkle pj-sparkle-one" aria-hidden="true" />
      <div className="pj-sparkle pj-sparkle-two" aria-hidden="true" />

      <div className="pj-top">
        <div className="pj-heading">
          <div className="pj-meta">
            <span className="pj-pill">{featured ? "Featured" : "Project"}</span>
          </div>
          <h2 className="pj-title">{project.title}</h2>
        </div>
      </div>

      <p className="pj-bio">{project.bio}</p>

      <div className="pj-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pj-tag">{tag}</span>
        ))}
      </div>

      <div className="pj-footer">
        <a
          className="pj-cta"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span>{project.cta}</span>
          <span className="pj-cta-arrow">→</span>
        </a>
      </div>
    </article>
  );
}

export default function Projects() {
  const featuredProject = PROJECTS.find((p) => p.featured);
  const otherProjects   = PROJECTS.filter((p) => !p.featured);

  return (
    <section className="projects-page" aria-label="Portfolio projects">
      <div className="projects-bg"      aria-hidden="true" />
      <div className="projects-texture" aria-hidden="true" />
      <div className="projects-glow projects-glow-left"  aria-hidden="true" />
      <div className="projects-glow projects-glow-right" aria-hidden="true" />

      <div className="projects-center">
        <div className="projects-shell">
          <header className="projects-hero">
            <div className="projects-badge">Selected Work</div>
            <h1 className="projects-title">
              Projects that blend{" "}
              <span className="projects-title-gradient">
                product thinking, frontend polish, and playful UI
              </span>
            </h1>
            <p className="projects-subtitle">
              I build thoughtful, interactive, visually memorable experiences —
              from AI-powered wellness tools to ecommerce, productivity, and
              browser-based products.
            </p>
          </header>

          <div className="projects-content">
            {featuredProject && <ProjectCard project={featuredProject} featured />}
            <section className="projects-grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
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

        /* Projects page base */
        .projects-page {
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          overflow-x: hidden;
          display: grid;
          color: #261b3d;
          isolation: isolate;
        }

        .projects-center {
          position: relative;
          z-index: 2;
          padding: 18px 12px calc(40px + env(safe-area-inset-bottom));
          height: auto;
          max-height: none;
          overflow: visible;
        }

        .projects-shell {
          width: 100%;
          max-width: 1220px;
          margin: 0 auto;
          height: auto;
          max-height: none;
          overflow: visible;
        }

        /* Desktop: fit viewport, no inner scroll */
        @media (min-width: 901px) {
          .projects-page {
            height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .projects-center {
            flex: 1;
            min-height: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            overflow: hidden;
          }

          .projects-shell {
            width: 100%;
            height: auto;
            max-height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .projects-hero { flex-shrink: 0; }

          .projects-content {
            flex: 1;
            min-height: 0;
            overflow: hidden;
            display: grid;
            grid-template-columns: minmax(300px, 1.02fr) minmax(0, 1.58fr);
            gap: 14px;
            align-items: stretch;
          }

          .projects-grid {
            min-height: 0;
            overflow: hidden;
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
          }
        }

        /* Mobile/tablet: same as AboutMe — app-main scrolls, single scrollbar */
        @media (max-width: 900px) {
          .projects-page {
            height: auto;
            min-height: 0;
            overflow: visible;
          }

          .projects-center {
            height: auto;
            min-height: 0;
            display: grid;
            place-items: start center;
            padding-top: 18px;
            padding-bottom: calc(42px + env(safe-area-inset-bottom));
          }
        }

        .projects-bg,
        .projects-texture,
        .projects-glow {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .projects-bg {
          z-index: 0;
          background:
            radial-gradient(1100px 560px at 16% 8%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 55%),
            radial-gradient(920px 560px at 86% 86%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 62%),
            linear-gradient(135deg, #f7f1ff 0%, #efe4ff 50%, #f7ecff 100%);
        }

        .projects-texture {
          z-index: 1;
          opacity: 0.34;
          background-image:
            radial-gradient(circle at 20% 22%, rgba(0,0,0,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 28%, rgba(0,0,0,0.022) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 72%, rgba(0,0,0,0.02)  0 1px, transparent 2px),
            radial-gradient(circle at 84% 80%, rgba(0,0,0,0.022) 0 1px, transparent 2px);
          background-size: 260px 260px;
          mix-blend-mode: multiply;
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
          background: radial-gradient(circle, rgba(171,131,255,0.28) 0%, rgba(171,131,255,0) 68%);
        }
        .projects-glow-right {
          inset: auto;
          width: 320px; height: 320px;
          right: -110px; bottom: -42px;
          background: radial-gradient(circle, rgba(255,126,191,0.2) 0%, rgba(255,126,191,0) 68%);
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
        }

        .projects-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.64);
          border: 1px solid rgba(156,122,255,0.2);
          box-shadow: 0 8px 18px rgba(40,20,80,0.07);
          font-size: 0.82rem;
          font-weight: 800;
          color: rgba(90,47,198,0.82);
        }

        .projects-title {
          margin: 0;
          max-width: 980px;
          font-size: clamp(1.85rem, 8vw, 2.75rem);
          line-height: 1.02;
          letter-spacing: -0.045em;
          font-weight: 900;
        }

        .projects-title-gradient {
          background: linear-gradient(90deg, #7b45f2 0%, #9d52ff 46%, #ff77bc 100%);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }

        .projects-subtitle {
          margin: 0;
          max-width: 760px;
          font-size: 0.94rem;
          line-height: 1.5;
          font-weight: 700;
          color: rgba(38,27,61,0.64);
        }

        /* Mobile: single column — flow layout, no nested scroll/clip */
        .projects-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: auto;
          max-height: none;
          overflow: visible;
        }

        .projects-grid {
          display: flex;
          flex-direction: column;
          gap: 14px;
          height: auto;
          max-height: none;
          overflow: visible;
        }

        /* Cards */
        .pj-card {
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          gap: 11px;
          padding: 15px;
          border-radius: 20px;
          border: 1px solid rgba(127,93,211,0.14);
          background: linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.76) 100%);
          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);
          box-shadow: 0 12px 28px rgba(115,82,190,0.11);
          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .pj-card:hover {
          transform: translateY(-3px);
          box-shadow: 0 16px 34px rgba(115,82,190,0.16);
          border-color: rgba(111,66,232,0.22);
        }

        .pj-card-featured {
          background: linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,242,255,0.88) 50%, rgba(255,248,253,0.92) 100%);
        }

        .pj-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: flex-start;
          gap: 0px;
          min-width: 0;
        }

        .pj-heading { min-width: 0; flex: 1; }

        .pj-meta {
          display: flex; align-items: center;
          justify-content: space-between; gap: 8px; margin-bottom: 4px;
        }

        .pj-pill {
          display: inline-flex; align-items: center; justify-content: center;
          padding: 5px 9px; border-radius: 999px;
          font-size: 0.62rem; font-weight: 900;
          letter-spacing: 0.05em; text-transform: uppercase;
          background: rgba(111,66,232,0.09); color: #7647ef;
          border: 1px solid rgba(111,66,232,0.1);
        }

        .pj-title {
          margin: 0; font-size: 1.2rem;
          line-height: 1.08; letter-spacing: -0.03em;
          font-weight: 900; word-break: break-word;
        }

        .pj-bio {
          position: relative; z-index: 1; margin: 0;
          font-size: 0.84rem; line-height: 1.48;
          color: rgba(38,27,61,0.66);
          /* Mobile: fully expanded, no clamp */
          display: block; overflow: visible;
        }

        .pj-tags {
          position: relative; z-index: 1;
          display: flex; flex-wrap: wrap; gap: 6px;
        }

        .pj-tag {
          padding: 4px 8px; border-radius: 999px;
          background: rgba(255,255,255,0.84);
          border: 1px solid rgba(127,93,211,0.14);
          color: #6443be; font-size: 0.68rem; font-weight: 800; line-height: 1;
          box-shadow: 0 5px 12px rgba(111,66,232,0.05);
        }

        .pj-footer {
          position: relative; z-index: 1;
          margin-top: auto;
          display: flex; align-items: flex-end;
          justify-content: flex-start; gap: 10px; min-width: 0;
        }

        .pj-cta {
          display: inline-flex; align-items: center;
          justify-content: center; gap: 8px;
          width: 100%; min-height: 36px;
          padding: 8px 12px; border-radius: 999px;
          text-decoration: none; color: #fff;
          font-size: 0.78rem; font-weight: 900; line-height: 1;
          background: linear-gradient(135deg, #7b45f2 0%, #5b30d9 58%, #a24dff 100%);
          box-shadow: 0 12px 24px rgba(104,59,226,0.22);
          transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
          white-space: normal;
        }

        .pj-cta:hover {
          transform: translateY(-2px);
          filter: brightness(1.03);
          box-shadow: 0 16px 28px rgba(104,59,226,0.28);
        }

        .pj-cta-arrow { font-size: 0.92rem; }

        .pj-orb {
          position: absolute; right: -34px; top: -30px;
          width: 112px; height: 112px;
          border-radius: 50%; opacity: 0.82;
          pointer-events: none; z-index: 0;
        }

        .pj-sparkle {
          position: absolute; border-radius: 999px;
          background: rgba(255,255,255,0.78);
          box-shadow: 0 0 0 1px rgba(255,255,255,0.5);
          z-index: 0; pointer-events: none;
        }
        .pj-sparkle-one { width: 7px; height: 7px; top: 18px; right: 62px; }
        .pj-sparkle-two { width: 5px; height: 5px; top: 37px; right: 42px; }

        /* Accent orbs */
        .accent-green   .pj-orb { background: radial-gradient(circle, rgba(118,223,168,0.42) 0%, rgba(118,223,168,0) 68%); }
        .accent-pink    .pj-orb { background: radial-gradient(circle, rgba(255,139,198,0.42) 0%, rgba(255,139,198,0) 68%); }
        .accent-rose    .pj-orb { background: radial-gradient(circle, rgba(255,160,192,0.42) 0%, rgba(255,160,192,0) 68%); }
        .accent-lavender .pj-orb { background: radial-gradient(circle, rgba(181,141,255,0.42) 0%, rgba(181,141,255,0) 68%); }
        .accent-blue    .pj-orb { background: radial-gradient(circle, rgba(149,182,255,0.42) 0%, rgba(149,182,255,0) 68%); }

        /* Accent pills */
        .accent-green   .pj-pill { background: rgba(100,210,150,0.12); color: #2d9f61; border-color: rgba(100,210,150,0.14); }
        .accent-pink    .pj-pill,
        .accent-rose    .pj-pill { background: rgba(255,126,191,0.11); color: #d94d90; border-color: rgba(255,126,191,0.14); }
        .accent-blue    .pj-pill { background: rgba(114,157,255,0.11); color: #4c6fd8; border-color: rgba(114,157,255,0.14); }

        /* Mobile/tablet: overflow release */
        @media (max-width: 900px) {
          .projects-shell,
          .projects-content,
          .projects-grid {
            height: auto;
            max-height: none;
            overflow: visible;
          }
        }

        @media (min-width: 761px) {
          .projects-center {
            padding: clamp(8px,1.3vh,14px) clamp(12px,2vw,24px) calc(40px + env(safe-area-inset-bottom));
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .projects-shell {
            width: min(1220px, 100%);
            margin: 0 auto;
          }

          .projects-title {
            font-size: clamp(1.95rem, 3.6vw, 3.7rem);
            line-height: 0.96;
          }

          .projects-subtitle {
            font-size: clamp(0.92rem, 1vw, 1rem);
            line-height: 1.45;
          }

          .projects-content {
            display: grid;
            grid-template-columns: minmax(300px, 1.02fr) minmax(0, 1.58fr);
            gap: 14px;
            height: auto;
            max-height: none;
            overflow: visible;
            align-items: stretch;
          }

          .projects-grid {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 14px;
            min-width: 0;
            height: auto;
            max-height: none;
            overflow: visible;
          }

          .pj-card { border-radius: 22px; }

          .pj-title { font-size: clamp(1.08rem, 1.15vw, 1.55rem); }

          /* Clamp bio on desktop so cards don't overflow */
          .pj-bio {
            display: -webkit-box;
            -webkit-box-orient: vertical;
            overflow: hidden;
          }
          .pj-card-featured .pj-bio  { -webkit-line-clamp: 6; }
          .pj-card-standard .pj-bio  { -webkit-line-clamp: 4; }

          .pj-cta { width: auto; white-space: nowrap; }
        }

        /* ── Large desktop tweaks ─────────────────────────────────────── */
        @media (min-width: 1380px) {
          .projects-shell { width: min(1300px, 100%); }
          .projects-content { grid-template-columns: minmax(320px, 0.98fr) minmax(0, 1.62fr); }
          .pj-card-featured .pj-bio  { -webkit-line-clamp: 6; }
          .pj-card-standard .pj-bio  { -webkit-line-clamp: 4; }
        }

        @media (min-width: 761px) and (max-height: 860px) {
          .projects-center  { padding-top: 8px; padding-bottom: 8px; }
          .projects-shell   { gap: 12px; }
          .projects-hero    { gap: 7px; }
          .projects-title   { font-size: clamp(1.78rem, 3.15vw, 3.2rem); }
          .projects-subtitle { font-size: 0.9rem; line-height: 1.38; }
          .projects-content { gap: 12px; }
          .projects-grid    { gap: 12px; }
          .pj-card          { padding: 13px; gap: 9px; }
          .pj-card-featured .pj-bio { -webkit-line-clamp: 4; }
          .pj-card-standard .pj-bio { -webkit-line-clamp: 3; }
          .pj-tag           { font-size: 0.64rem; padding: 5px 8px; }
          .pj-cta           { min-height: 35px; font-size: 0.74rem; padding: 8px 12px; }
        }

        /* Desktop: fit viewport (override 761px rules), no scroll */
        @media (min-width: 901px) {
          .projects-page {
            height: 100%;
            min-height: 0;
            display: flex;
            flex-direction: column;
            overflow: hidden;
          }

          .projects-center {
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }

          .projects-shell {
            height: auto;
            max-height: 100%;
            min-height: 0;
            overflow: hidden;
          }

          .projects-content {
            flex: 1;
            min-height: 0;
            overflow: hidden;
          }

          .projects-content > .pj-card,
          .projects-content > .projects-grid {
            min-height: 0;
          }

          .projects-grid {
            min-height: 0;
            overflow: hidden;
          }

          .pj-card {
            min-height: 0;
            overflow: hidden;
          }
        }

        /* Extra compaction for short desktop viewports (e.g. 2122x963) — cards fit, no scrollbar */
        @media (min-width: 901px) and (max-height: 963px) {
          .projects-center  { padding-top: 6px; padding-bottom: 6px; }
          .projects-shell   { gap: 8px; }
          .projects-hero    { gap: 5px; }
          .projects-title   { font-size: clamp(1.5rem, 2.5vw, 2.4rem); }
          .projects-subtitle { font-size: 0.82rem; line-height: 1.3; }
          .projects-content { gap: 8px; }
          .projects-grid    { gap: 8px; }
          .pj-card          { padding: 10px 12px; gap: 8px; }
          .pj-card-featured .pj-bio { -webkit-line-clamp: 4; }
          .pj-card-standard .pj-bio { -webkit-line-clamp: 3; }
          .pj-tag           { font-size: 0.6rem; padding: 4px 6px; }
          .pj-cta           { min-height: 32px; font-size: 0.7rem; padding: 6px 10px; }
        }

        @media (max-width: 420px) {
          .projects-badge { font-size: 0.76rem; padding: 7px 12px; }
          .pj-card        { padding: 14px; }
          .pj-title       { font-size: 1.08rem; }
          .pj-bio         { font-size: 0.82rem; }
        }

        @media (prefers-reduced-motion: reduce) {
          .pj-card, .pj-cta { transition: none !important; }
          .pj-card:hover, .pj-cta:hover { transform: none !important; }
        }

      `}</style>
    </section>
  );
}