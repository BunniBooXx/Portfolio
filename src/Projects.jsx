import React, { useEffect } from "react";

const PROJECTS = [
  {
    title: "Gentle Sprout",
    bio:
      "A DBT-inspired full-stack mental wellness app with a companion chatbot, guided DBT coaching flows, and a live beta experience powered by retrieval-augmented generation. Built with a Django backend and designed to evolve into a more advanced AI-driven support experience.",
    href: "https://my-dbt-ai-frontend.onrender.com/",
    cta: "Explore Gentle Sprout Beta",
    emoji: "🌱",
    tags: ["React Native", "Django", "AI", "RAG", "DBT"],
    featured: true,
    accent: "green",
  },
  {
    title: "Petite Planner",
    bio:
      "A polished productivity app for organizing tasks, planning daily life, and keeping routines visually approachable. Built with a Firebase-powered data layer and a soft, delightful interface focused on usability.",
    href: "https://petite-planner.netlify.app/",
    cta: "Explore Petite Planner",
    emoji: "📝",
    tags: ["React", "Firebase", "UI/UX", "Productivity"],
    accent: "pink",
  },
  {
    title: "Bunny Bubble Nails",
    bio:
      "A custom press-on nails ecommerce experience with playful branding, polished product presentation, and a live shopping flow. Built with a Flask backend and Firebase-backed data to support a more custom storefront experience.",
    href: "https://bunnybubblenails.com",
    cta: "Visit Bunny Bubble Nails",
    emoji: "🎀",
    tags: ["Ecommerce", "Flask", "Firebase", "Brand UI"],
    accent: "rose",
  },
  {
    title: "Otome Game",
    bio:
      "A charming browser-based otome game concept focused on cute presentation, immersive interactions, and personality-driven frontend storytelling.",
    href: "https://arielles-code.netlify.app/",
    cta: "Play Otome Game",
    emoji: "💌",
    tags: ["Frontend", "Game UI", "Interactive Design"],
    accent: "lavender",
  },
  {
    title: "Pretty Links",
    bio:
      "A Chrome extension for organizing and managing bookmarks with a prettier, more intentional experience using browser APIs and focused interface design.",
    href: "https://pretty-links.netlify.app",
    cta: "Explore Pretty Links",
    emoji: "🔖",
    tags: ["Chrome Extension", "Browser APIs", "Frontend"],
    accent: "blue",
  },
];

function ProjectCard({ project, featured = false }) {
  return (
    <article
      className={`pj-card ${featured ? "pj-card-featured" : "pj-card-standard"} accent-${project.accent || "lavender"}`}
    >
      <div className="pj-orb" aria-hidden="true" />
      <div className="pj-sparkle pj-sparkle-one" aria-hidden="true" />
      <div className="pj-sparkle pj-sparkle-two" aria-hidden="true" />

      <div className="pj-top">
        <div className="pj-icon-wrap">
          <div className="pj-icon">{project.emoji}</div>
        </div>

        <div className="pj-heading">
          <div className="pj-meta">
            <span className="pj-pill">
              {featured ? "Featured" : "Project"}
            </span>
            <span className="pj-arrow">↗</span>
          </div>

          <h2 className="pj-title">{project.title}</h2>
        </div>
      </div>

      <p className="pj-bio">{project.bio}</p>

      <div className="pj-tags">
        {project.tags.map((tag) => (
          <span key={tag} className="pj-tag">
            {tag}
          </span>
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
  useEffect(() => {
    document.body.classList.add("route-projects");
    return () => document.body.classList.remove("route-projects");
  }, []);

  const featuredProject = PROJECTS.find((project) => project.featured);
  const otherProjects = PROJECTS.filter((project) => !project.featured);

  return (
    <section className="projects-page" aria-label="Portfolio projects">
      <div className="projects-bg" aria-hidden="true" />
      <div className="projects-texture" aria-hidden="true" />
      <div className="projects-glow projects-glow-left" aria-hidden="true" />
      <div className="projects-glow projects-glow-right" aria-hidden="true" />

      <div className="projects-center">
        <div className="projects-shell">
          <header className="projects-hero">
            <div className="projects-badge">✨ Selected Work</div>

            <h1 className="projects-title">
              Projects that blend{" "}
              <span className="projects-title-gradient">
                product thinking, frontend polish, and playful UI
              </span>
            </h1>

            <p className="projects-subtitle">
              I build thoughtful, interactive, visually memorable experiences —
              from AI-powered wellness tools to ecommerce, productivity, and browser-based products.
            </p>
          </header>

          <main className="projects-content">
            {featuredProject && (
              <ProjectCard project={featuredProject} featured />
            )}

            <section className="projects-grid">
              {otherProjects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </section>
          </main>
        </div>
      </div>

      <style>{`
        .projects-page,
        .projects-page *,
        .projects-page *::before,
        .projects-page *::after{
          box-sizing:border-box;
        }

        .projects-page{
          position:relative;
          width:100%;
          height:100%;
          min-height:0;
          overflow:hidden;
          overflow-x:hidden;
          display:grid;
          color:#261b3d;
          isolation:isolate;
        }

        .projects-bg,
        .projects-texture,
        .projects-glow{
          position:absolute;
          inset:0;
          pointer-events:none;
        }

        .projects-bg{
          z-index:0;
          background:
            radial-gradient(1100px 560px at 16% 8%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0) 55%),
            radial-gradient(920px 560px at 86% 86%, rgba(255,255,255,0.34) 0%, rgba(255,255,255,0) 62%),
            linear-gradient(135deg, #f7f1ff 0%, #efe4ff 50%, #f7ecff 100%);
        }

        .projects-texture{
          z-index:1;
          opacity:0.34;
          background-image:
            radial-gradient(circle at 20% 22%, rgba(0,0,0,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 28%, rgba(0,0,0,0.022) 0 1px, transparent 2px),
            radial-gradient(circle at 42% 72%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 80%, rgba(0,0,0,0.022) 0 1px, transparent 2px);
          background-size:260px 260px;
          mix-blend-mode:multiply;
        }

        .projects-glow{
          z-index:0;
          border-radius:50%;
          filter:blur(24px);
          opacity:0.72;
        }

        .projects-glow-left{
          inset:auto;
          width:260px;
          height:260px;
          top:-72px;
          left:-78px;
          background:radial-gradient(circle, rgba(171,131,255,0.28) 0%, rgba(171,131,255,0) 68%);
        }

        .projects-glow-right{
          inset:auto;
          width:320px;
          height:320px;
          right:-110px;
          bottom:-42px;
          background:radial-gradient(circle, rgba(255,126,191,0.20) 0%, rgba(255,126,191,0) 68%);
        }

        .projects-center{
          position:relative;
          z-index:2;
          height:100%;
          min-height:0;
          display:grid;
          place-items:center;
          padding:clamp(8px, 1.3vh, 14px) clamp(12px, 2vw, 24px);
        }

        .projects-shell{
          width:min(1220px, 100%);
          max-height:100%;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          justify-content:center;
          gap:14px;
        }

        .projects-hero{
          text-align:center;
          display:flex;
          flex-direction:column;
          align-items:center;
          gap:8px;
        }

        .projects-badge{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:7px 14px;
          border-radius:999px;
          background:rgba(255,255,255,0.64);
          border:1px solid rgba(156,122,255,0.20);
          box-shadow:0 8px 18px rgba(40,20,80,0.07);
          font-size:0.82rem;
          font-weight:800;
          color:rgba(90,47,198,0.82);
        }

        .projects-title{
          margin:0;
          max-width:980px;
          font-size:clamp(1.95rem, 3.6vw, 3.7rem);
          line-height:0.96;
          letter-spacing:-0.045em;
          font-weight:900;
        }

        .projects-title-gradient{
          background:linear-gradient(90deg, #7b45f2 0%, #9d52ff 46%, #ff77bc 100%);
          -webkit-background-clip:text;
          background-clip:text;
          color:transparent;
        }

        .projects-subtitle{
          margin:0;
          max-width:760px;
          font-size:clamp(0.92rem, 1vw, 1rem);
          line-height:1.45;
          font-weight:700;
          color:rgba(38,27,61,0.64);
        }

        .projects-content{
          display:grid;
          grid-template-columns:minmax(300px, 1.02fr) minmax(0, 1.58fr);
          gap:14px;
          min-height:0;
          align-items:stretch;
        }

        .projects-grid{
          display:grid;
          grid-template-columns:repeat(2, minmax(0, 1fr));
          gap:14px;
          min-width:0;
          min-height:0;
        }

        .pj-card{
          position:relative;
          overflow:hidden;
          display:flex;
          flex-direction:column;
          gap:12px;
          min-height:0;
          padding:16px;
          border-radius:22px;
          border:1px solid rgba(127,93,211,0.14);
          background:linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.76) 100%);
          backdrop-filter:blur(14px);
          -webkit-backdrop-filter:blur(14px);
          box-shadow:0 12px 28px rgba(115,82,190,0.11);
          transition:transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
          min-width:0;
        }

        .pj-card:hover{
          transform:translateY(-3px);
          box-shadow:0 16px 34px rgba(115,82,190,0.16);
          border-color:rgba(111,66,232,0.22);
        }

        .pj-card-featured{
          background:linear-gradient(145deg, rgba(255,255,255,0.92) 0%, rgba(248,242,255,0.88) 50%, rgba(255,248,253,0.92) 100%);
        }

        .pj-card-standard{
          min-height:0;
        }

        .pj-top{
          position:relative;
          z-index:1;
          display:flex;
          align-items:flex-start;
          gap:12px;
          min-width:0;
        }

        .pj-icon-wrap{
          flex-shrink:0;
        }

        .pj-icon{
          width:46px;
          height:46px;
          display:grid;
          place-items:center;
          border-radius:15px;
          font-size:1.15rem;
          background:linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(244,235,255,0.96) 100%);
          border:1px solid rgba(132,103,216,0.14);
          box-shadow:0 8px 18px rgba(111,66,232,0.10);
        }

        .pj-heading{
          min-width:0;
          flex:1;
        }

        .pj-meta{
          display:flex;
          align-items:center;
          justify-content:space-between;
          gap:8px;
          margin-bottom:6px;
        }

        .pj-pill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:5px 9px;
          border-radius:999px;
          font-size:0.62rem;
          font-weight:900;
          letter-spacing:0.05em;
          text-transform:uppercase;
          background:rgba(111,66,232,0.09);
          color:#7647ef;
          border:1px solid rgba(111,66,232,0.10);
        }

        .pj-arrow{
          font-size:0.95rem;
          line-height:1;
          color:rgba(111,66,232,0.55);
        }

        .pj-title{
          margin:0;
          font-size:clamp(1.08rem, 1.15vw, 1.55rem);
          line-height:1.08;
          letter-spacing:-0.03em;
          font-weight:900;
          word-break:break-word;
        }

        .pj-bio{
          position:relative;
          z-index:1;
          margin:0;
          font-size:0.84rem;
          line-height:1.48;
          color:rgba(38,27,61,0.66);

          display:-webkit-box;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }

        .pj-card-featured .pj-bio{
          -webkit-line-clamp:5;
        }

        .pj-card-standard .pj-bio{
          -webkit-line-clamp:4;
        }

        .pj-tags{
          position:relative;
          z-index:1;
          display:flex;
          flex-wrap:wrap;
          gap:7px;
        }

        .pj-tag{
          padding:5px 9px;
          border-radius:999px;
          background:rgba(255,255,255,0.84);
          border:1px solid rgba(127,93,211,0.14);
          color:#6443be;
          font-size:0.68rem;
          font-weight:800;
          line-height:1;
          box-shadow:0 5px 12px rgba(111,66,232,0.05);
        }

        .pj-footer{
          position:relative;
          z-index:1;
          margin-top:auto;
          display:flex;
          align-items:flex-end;
          justify-content:flex-start;
          gap:10px;
          min-width:0;
        }

        .pj-cta{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap:8px;
          min-height:38px;
          max-width:100%;
          padding:9px 13px;
          border-radius:999px;
          text-decoration:none;
          color:#fff;
          font-size:0.78rem;
          font-weight:900;
          line-height:1;
          background:linear-gradient(135deg, #7b45f2 0%, #5b30d9 58%, #a24dff 100%);
          box-shadow:0 12px 24px rgba(104,59,226,0.22);
          transition:transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
          white-space:nowrap;
        }

        .pj-cta:hover{
          transform:translateY(-2px);
          filter:brightness(1.03);
          box-shadow:0 16px 28px rgba(104,59,226,0.28);
        }

        .pj-cta-arrow{
          font-size:0.92rem;
        }

        .pj-orb{
          position:absolute;
          right:-34px;
          top:-30px;
          width:112px;
          height:112px;
          border-radius:50%;
          opacity:0.82;
          pointer-events:none;
          z-index:0;
        }

        .pj-sparkle{
          position:absolute;
          border-radius:999px;
          background:rgba(255,255,255,0.78);
          box-shadow:0 0 0 1px rgba(255,255,255,0.5);
          z-index:0;
          pointer-events:none;
        }

        .pj-sparkle-one{
          width:7px;
          height:7px;
          top:18px;
          right:62px;
        }

        .pj-sparkle-two{
          width:5px;
          height:5px;
          top:37px;
          right:42px;
        }

        .accent-green .pj-orb{
          background:radial-gradient(circle, rgba(118,223,168,0.42) 0%, rgba(118,223,168,0) 68%);
        }

        .accent-pink .pj-orb{
          background:radial-gradient(circle, rgba(255,139,198,0.42) 0%, rgba(255,139,198,0) 68%);
        }

        .accent-rose .pj-orb{
          background:radial-gradient(circle, rgba(255,160,192,0.42) 0%, rgba(255,160,192,0) 68%);
        }

        .accent-lavender .pj-orb{
          background:radial-gradient(circle, rgba(181,141,255,0.42) 0%, rgba(181,141,255,0) 68%);
        }

        .accent-blue .pj-orb{
          background:radial-gradient(circle, rgba(149,182,255,0.42) 0%, rgba(149,182,255,0) 68%);
        }

        .accent-green .pj-pill{
          background:rgba(100,210,150,0.12);
          color:#2d9f61;
          border-color:rgba(100,210,150,0.14);
        }

        .accent-pink .pj-pill,
        .accent-rose .pj-pill{
          background:rgba(255,126,191,0.11);
          color:#d94d90;
          border-color:rgba(255,126,191,0.14);
        }

        .accent-blue .pj-pill{
          background:rgba(114,157,255,0.11);
          color:#4c6fd8;
          border-color:rgba(114,157,255,0.14);
        }

        /* roomy desktop */
        @media (min-width: 1380px){
          .projects-shell{
            width:min(1300px, 100%);
          }

          .projects-content{
            grid-template-columns:minmax(320px, 0.98fr) minmax(0, 1.62fr);
          }

          .pj-card-standard .pj-bio{
            -webkit-line-clamp:3;
          }
        }

        /* shorter desktop screens */
        @media (max-height: 860px){
          .projects-center{
            padding-top:8px;
            padding-bottom:8px;
          }

          .projects-shell{
            gap:12px;
          }

          .projects-hero{
            gap:7px;
          }

          .projects-title{
            font-size:clamp(1.78rem, 3.15vw, 3.2rem);
          }

          .projects-subtitle{
            font-size:0.9rem;
            line-height:1.38;
          }

          .projects-content{
            gap:12px;
          }

          .projects-grid{
            gap:12px;
          }

          .pj-card{
            padding:14px;
            gap:10px;
          }

          .pj-icon{
            width:42px;
            height:42px;
            font-size:1.05rem;
          }

          .pj-card-featured .pj-bio{
            -webkit-line-clamp:4;
          }

          .pj-card-standard .pj-bio{
            -webkit-line-clamp:3;
          }

          .pj-tag{
            font-size:0.64rem;
            padding:5px 8px;
          }

          .pj-cta{
            min-height:35px;
            font-size:0.74rem;
            padding:8px 12px;
          }
        }

        /* laptop / tablet landscape */
        @media (max-width: 1080px){
          .projects-page{
            height:auto;
            min-height:100%;
            overflow:visible;
          }

          .projects-center{
            height:auto;
            min-height:100%;
            place-items:start center;
            padding-top:18px;
            padding-bottom:24px;
          }

          .projects-shell{
            max-height:none;
            overflow:visible;
            gap:16px;
          }

          .projects-content{
            grid-template-columns:1fr;
          }

          .projects-grid{
            grid-template-columns:repeat(2, minmax(0, 1fr));
          }

          .pj-card-featured .pj-bio,
          .pj-card-standard .pj-bio{
            -webkit-line-clamp:unset;
            display:block;
            overflow:visible;
          }
        }

        /* mobile */
        @media (max-width: 760px){
          .projects-center{
            padding-left:12px;
            padding-right:12px;
          }

          .projects-title{
            font-size:clamp(1.85rem, 8vw, 2.75rem);
            line-height:1.02;
          }

          .projects-subtitle{
            font-size:0.94rem;
            line-height:1.5;
          }

          .projects-grid{
            grid-template-columns:1fr;
          }

          .pj-card{
            padding:16px;
            border-radius:20px;
          }

          .pj-top{
            gap:10px;
          }

          .pj-icon{
            width:44px;
            height:44px;
          }

          .pj-title{
            font-size:1.2rem;
          }

          .pj-tag{
            font-size:0.7rem;
          }

          .pj-cta{
            width:100%;
            white-space:normal;
          }
        }

        @media (max-width: 420px){
          .projects-badge{
            font-size:0.76rem;
            padding:7px 12px;
          }

          .projects-shell{
            gap:14px;
          }

          .pj-card{
            padding:14px;
          }

          .pj-title{
            font-size:1.08rem;
          }

          .pj-bio{
            font-size:0.82rem;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .pj-card,
          .pj-cta{
            transition:none !important;
          }

          .pj-card:hover,
          .pj-cta:hover{
            transform:none !important;
          }
        }
      `}</style>
    </section>
  );
}