import React from "react";

const PROJECTS = [
  {
    title: "Gentle Sprout",
    bio:
      "A DBT-inspired full-stack app with a companion chatbot and step-by-step DBT coach. Powered by Google Voice for a more supportive, guided experience. The current beta is live and uses RAG — and I’ll be rebuilding it later into a true AI bot.",
    href: "https://my-dbt-ai-frontend.onrender.com/",
    cta: "Explore Gentle Sprout Beta",
    emoji: "🌱",
    tags: ["Full Stack", "AI", "RAG", "DBT"],
    featured: true,
  },
  {
    title: "Petite Planner",
    bio: "A delightful to-do list app to keep track of your daily tasks.",
    href: "https://petite-planner.netlify.app/",
    cta: "Explore To Do List",
    emoji: "📝",
    tags: ["Frontend", "UI"],
  },
  {
    title: "Bunny Bubble Nails",
    bio: "Custom press-on nails shopping site.",
    href: "https://bunnybubblenails.com",
    cta: "Discover Ecommerce App",
    emoji: "🎀",
    tags: ["Ecommerce", "Brand"],
  },
  {
    title: "Otome Game",
    bio: "Immerse yourself in a charming otome game with captivating characters.",
    href: "https://arielles-code.netlify.app/",
    cta: "Play Otome Game",
    emoji: "💌",
    tags: ["Game", "Frontend"],
  },
  {
    title: "Pretty Links",
    bio: "A Chrome bookmarks extension for managing your links.",
    href: "https://pretty-links.netlify.app",
    cta: "Explore Pretty Links",
    emoji: "🔖",
    tags: ["Extension", "Chrome API"],
  },
];

function ProjectCard({ p, featured = false }) {
  return (
    <article className={`card ${featured ? "cardFeatured" : "cardSmall"}`}>
      <div className="cardTop">
        <div className="iconChip" aria-hidden="true">
          {p.emoji || "💜"}
        </div>

        {featured ? (
          <div className="titleBlock">
            <h2 className="cardTitle">{p.title}</h2>
            <p className="cardKicker">Featured Project</p>
          </div>
        ) : (
          <h2 className="cardTitle">{p.title}</h2>
        )}
      </div>

      <p className="cardBio">{p.bio}</p>

      <div className="tagRow" aria-label="Tech tags">
        {(p.tags || []).map((t) => (
          <span className="tag" key={`${p.title}-${t}`}>
            {t}
          </span>
        ))}
      </div>

      <div className="cardBottom">
        <a className="cta" href={p.href} target="_blank" rel="noopener noreferrer">
          <span aria-hidden="true">🌸</span>
          {p.cta}
        </a>
        {featured ? <span className="ctaHint">Opens in a new tab</span> : null}
      </div>

      {featured ? <div className="glow" aria-hidden="true" /> : null}
    </article>
  );
}

export default function Projects() {
  const featured = PROJECTS.find((p) => p.featured) || PROJECTS[0];
  const rest = PROJECTS.filter((p) => p !== featured);

  return (
    <div className="projectsPage">
      <header className="projectsHero">
        <div className="heroPill">✨ Portfolio Projects</div>
        <h1 className="heroTitle">Kawaii Projects</h1>
        <p className="heroSubtitle">
          A few things I’ve built — full stack, front end, and cute ideas 💜
        </p>
      </header>

      <main className="projectsLayout" aria-label="Project list">
        {/* ✅ FEATURED ON TOP */}
        <ProjectCard p={featured} featured />

        {/* ✅ 4 BELOW IN A 2x2 GRID */}
        <section className="gridTwoByTwo" aria-label="More projects">
          {rest.map((p) => (
            <ProjectCard key={p.title} p={p} />
          ))}
        </section>
      </main>

      <style>{`
        /* PAGE */
        .projectsPage{
          min-height:100vh;
          padding: clamp(22px,4vw,60px) clamp(14px,3vw,36px);
          box-sizing:border-box;
          display:flex;
          flex-direction:column;
          align-items:center;
          background:
            radial-gradient(900px 520px at 18% 12%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%),
            radial-gradient(900px 520px at 82% 92%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(135deg, #F6F1FF 0%, #EDE2FF 48%, #E7D7FF 100%);
          color: rgba(25,18,40,0.88);
        }

        /* HERO */
        .projectsHero{
          width:100%;
          max-width:1100px;
          text-align:center;
          margin-bottom: clamp(16px,2.4vw,24px);
        }

        .heroPill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding: 8px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.55);
          border: 1px solid rgba(156,122,255,0.22);
          box-shadow: 0 10px 24px rgba(40,20,80,0.08);
          backdrop-filter: blur(8px);
          font-family: "Comic Sans MS", cursive;
          color: rgba(40,20,80,0.78);
          font-size: 0.95rem;
        }

        .heroTitle{
          margin: 12px 0 6px;
          font-family: "CuteFont", cursive;
          font-size: clamp(2.2rem,4.2vw,3.4rem);
          color: #6B34D9;
          letter-spacing: 0.6px;
        }

        .heroTitle::before,
        .heroTitle::after{
          content:"♡";
          margin: 0 10px;
          color: rgba(121,74,230,0.85);
        }

        .heroSubtitle{
          margin: 0 auto;
          max-width: 760px;
          font-family: "Comic Sans MS", cursive;
          font-size: clamp(1rem,1.5vw,1.08rem);
          line-height: 1.6;
          color: rgba(30,18,60,0.72);
        }

        /* ✅ LAYOUT: FEATURED ON TOP, GRID BELOW */
        .projectsLayout{
          width:100%;
          max-width:1100px;
          display:flex;
          flex-direction:column;
          gap: clamp(16px,2.4vw,24px);
        }

        .gridTwoByTwo{
          display:grid;
          grid-template-columns: repeat(2, 1fr);
          gap: clamp(14px,2vw,22px);
          align-items: stretch;
        }

        /* CARD */
        .card{
          border-radius: 20px;
          border: 1px solid rgba(156,122,255,0.22);
          background: rgba(255,255,255,0.74);
          box-shadow: 0 18px 38px rgba(40,20,80,0.10);
          padding: clamp(16px,2.2vw,22px);
          backdrop-filter: blur(10px);

          display:flex;
          flex-direction:column;
          gap: 12px;

          position:relative;
          overflow:hidden;

          transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
        }

        .card:hover{
          transform: translateY(-4px);
          box-shadow: 0 22px 48px rgba(40,20,80,0.14);
          border-color: rgba(156,122,255,0.32);
        }

        .cardTop{
          display:flex;
          align-items:center;
          gap: 12px;
        }

        .iconChip{
          width: 44px;
          height: 44px;
          border-radius: 14px;
          display:grid;
          place-items:center;
          background: rgba(124,85,240,0.14);
          border: 1px solid rgba(124,85,240,0.20);
          box-shadow: 0 10px 18px rgba(40,20,80,0.08);
          font-size: 1.3rem;
          flex: 0 0 auto;
        }

        .titleBlock{
          display:flex;
          flex-direction:column;
          gap: 2px;
        }

        .cardTitle{
          margin:0;
          font-family: "CuteFont", cursive;
          font-size: clamp(1.55rem,2vw,1.9rem);
          color:#7A3EF0;
          line-height: 1.1;
        }

        .cardKicker{
          margin:0;
          font-family: "Comic Sans MS", cursive;
          font-size: 0.95rem;
          color: rgba(40,20,80,0.62);
        }

        .cardBio{
          margin:0;
          font-family: "Comic Sans MS", cursive;
          color: rgba(25,18,40,0.80);
          line-height: 1.7;
          font-size: 1rem;
        }

        /* ✅ keep the 4 small cards tidy */
        .cardSmall .cardBio{
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .tagRow{
          display:flex;
          flex-wrap:wrap;
          gap: 8px;
          margin-top: 2px;
        }

        .tag{
          padding: 7px 10px;
          border-radius: 999px;
          font-family: "Comic Sans MS", cursive;
          font-size: 0.92rem;
          color: rgba(40,20,80,0.75);
          background: rgba(243,238,255,0.85);
          border: 1px solid rgba(156,122,255,0.18);
        }

        .cardBottom{
          margin-top:auto;
          display:flex;
          flex-direction:column;
          gap: 8px;
        }

        .cta{
          width:100%;
          display:inline-flex;
          align-items:center;
          justify-content:center;
          gap: 10px;
          padding: 12px 14px;
          border-radius: 999px;
          text-decoration:none;

          font-family: "CuteFont", cursive;
          font-size: 1.25rem;
          color:#fff;

          background: linear-gradient(180deg, rgba(122,62,240,0.92) 0%, rgba(107,52,217,0.96) 100%);
          box-shadow: 0 16px 26px rgba(107,52,217,0.20);
          border: 1px solid rgba(255,255,255,0.18);

          transition: transform 160ms ease, filter 160ms ease;
        }

        .cta:hover{
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .ctaHint{
          font-family: "Comic Sans MS", cursive;
          font-size: 0.9rem;
          color: rgba(40,20,80,0.58);
          text-align:center;
        }

        /* FEATURED CARD tweaks */
        .cardFeatured{
          /* nice “hero card” presence without being comically tall */
          padding: clamp(18px, 2.6vw, 26px);
        }

        .cardFeatured .cardTitle{
          font-size: clamp(1.85rem, 2.4vw, 2.2rem);
        }

        .glow{
          position:absolute;
          right:-120px;
          top:-120px;
          width: 260px;
          height: 260px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, rgba(122,62,240,0.35), rgba(122,62,240,0) 60%);
          filter: blur(2px);
          pointer-events:none;
        }

        /* RESPONSIVE */
        @media (max-width: 820px){
          .gridTwoByTwo{
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .card, .cta{ transition:none; }
          .card:hover, .cta:hover{ transform:none; }
        }
      `}</style>
    </div>
  );
}
