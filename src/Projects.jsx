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
        <div className="iconChip">{p.emoji}</div>
        <div className="titleBlock">
          <h2 className="cardTitle">{p.title}</h2>
          {featured && <p className="cardKicker">Featured Project</p>}
        </div>
      </div>

      <p className="cardBio">{p.bio}</p>

      <div className="tagRow">
        {p.tags.map((t) => (
          <span className="tag" key={t}>{t}</span>
        ))}
      </div>

      <div className="cardBottom">
        <a className="cta" href={p.href} target="_blank" rel="noopener noreferrer">
          🌸 {p.cta}
        </a>
        {featured && <span className="ctaHint">Opens in a new tab</span>}
      </div>

      {featured && <div className="glow" />}
    </article>
  );
}

export default function Projects() {
  const featured = PROJECTS.find(p => p.featured);
  const rest = PROJECTS.filter(p => !p.featured);

  return (
    <div className="projectsPage">
      <header className="projectsHero">
        <div className="heroPill">✨ Portfolio Projects</div>
        <h1 className="heroTitle">Kawaii Projects</h1>
        <p className="heroSubtitle">
          A few things I’ve built — full stack, front end, and cute ideas 💜
        </p>
      </header>

      <main className="projectsLayout">
        <ProjectCard p={featured} featured />
        <section className="gridTwoByTwo">
          {rest.map(p => <ProjectCard key={p.title} p={p} />)}
        </section>
      </main>

      <style>{`
        /* ===============================
           SCROLLBAR — INVISIBLE BUT WORKING
           =============================== */

        .projectsPage{
          min-height:100vh;
          overflow-y:auto;

          scrollbar-width: none;          /* Firefox */
          -ms-overflow-style: none;       /* IE / Edge */
        }

        .projectsPage::-webkit-scrollbar{
          width:0;
          height:0;
          display:none;                   /* Chrome / Safari */
        }

        /* ===============================
           PAGE
           =============================== */

        .projectsPage{
          padding: clamp(22px,4vw,60px) clamp(14px,3vw,36px);
          display:flex;
          flex-direction:column;
          align-items:center;
          background:
            radial-gradient(900px 520px at 18% 12%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 60%),
            radial-gradient(900px 520px at 82% 92%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(135deg, #F6F1FF 0%, #EDE2FF 48%, #E7D7FF 100%);
          color: rgba(25,18,40,0.88);
        }

        .projectsHero{
          text-align:center;
          max-width:1100px;
          margin-bottom: 24px;
        }

        .heroPill{
          padding: 8px 14px;
          border-radius:999px;
          background: rgba(255,255,255,0.55);
          font-family: "Comic Sans MS", cursive;
        }

        .heroTitle{
          font-family:"CuteFont", cursive;
          font-size: clamp(2.2rem,4.2vw,3.4rem);
          color:#6B34D9;
        }

        .heroSubtitle{
          font-family:"Comic Sans MS", cursive;
          max-width:720px;
          margin: 0 auto;
        }

        .projectsLayout{
          width:100%;
          max-width:1100px;
          display:flex;
          flex-direction:column;
          gap:24px;
        }

        .gridTwoByTwo{
          display:grid;
          grid-template-columns: repeat(2,1fr);
          gap:20px;
        }

        @media (max-width:820px){
          .gridTwoByTwo{ grid-template-columns:1fr; }
        }

        .card{
          background: rgba(255,255,255,0.75);
          border-radius:20px;
          padding:20px;
          display:flex;
          flex-direction:column;
          gap:12px;
          position:relative;
        }

        .iconChip{
          width:44px;
          height:44px;
          border-radius:14px;
          display:grid;
          place-items:center;
          background: rgba(124,85,240,0.15);
          font-size:1.3rem;
        }

        .cardTitle{
          font-family:"CuteFont", cursive;
          font-size:1.8rem;
          color:#7A3EF0;
        }

        .cardBio{
          font-family:"Comic Sans MS", cursive;
          line-height:1.6;
        }

        .cardSmall .cardBio{
          display:-webkit-box;
          -webkit-line-clamp:4;
          -webkit-box-orient:vertical;
          overflow:hidden;
        }

        .tagRow{
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        }

        .tag{
          padding:6px 10px;
          border-radius:999px;
          background:#F3EEFF;
          font-size:0.9rem;
        }

        .cta{
          margin-top:auto;
          padding:12px;
          border-radius:999px;
          background: linear-gradient(180deg,#7A3EF0,#6B34D9);
          color:white;
          text-align:center;
          text-decoration:none;
          font-family:"CuteFont", cursive;
          font-size:1.25rem;
        }

        .glow{
          position:absolute;
          top:-120px;
          right:-120px;
          width:260px;
          height:260px;
          border-radius:50%;
          background: radial-gradient(circle, rgba(122,62,240,0.35), transparent 60%);
        }
      `}</style>
    </div>
  );
}
