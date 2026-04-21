import React, { useEffect } from "react";
import myImage from "../src/images/headshot.webp";

const INCLUDE_JOB_SEARCH_LINE = false;

export default function AboutMe() {
  // Load fonts once (safe + idempotent)
  useEffect(() => {
    const id = "aboutme-fonts";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@500;700;800&display=swap";
    document.head.appendChild(link);
  }, []);

  return (
    <section className="am-page" aria-label="About Me">
      {/* Background layers scoped to this page only */}
      <div className="am-bg" aria-hidden="true" />
      <div className="am-texture" aria-hidden="true" />

      <div className="am-center">
        <div className="am-card">
          {/* Top */}
          <div className="am-top">
            <div className="am-imgWrap">
              <img src={myImage} alt="Jaqueline headshot" className="am-img" />
            </div>

            <div className="am-head">
              <h1 className="am-title">About Me</h1>
              <p className="am-subtitle">
                Full-Stack Engineer • AI Trainer • React, Django, Python
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="am-body">
            <p className="am-p">
              Hi, I’m <strong>Jaqueline</strong>—a full-stack engineer who ships
              product-minded features end to end, from polished React interfaces
              to reliable Python/Django backends.
            </p>

            <p className="am-p">
              I trained in Full-Stack Engineering at <strong>Coding Temple</strong>,
              building production-style projects and sharpening fundamentals in
              architecture, APIs, data modeling, testing, and deployment.
            </p>

            <p className="am-p">
              Today I work at <strong>Outlier AI</strong> as a{" "}
              <strong>AI Trainer</strong>, evaluating and improving model outputs
              across UI, backend, and product reasoning with a focus on
              correctness, clarity, and quality. I also build and iterate on real
              products—like <strong>Gentle Sprout</strong>—to pair practical
              engineering with AI-aware product thinking.
              {INCLUDE_JOB_SEARCH_LINE ? (
                <>
                  {" "}
                  I’m currently seeking a full-time role where I can grow as an
                  engineer and ship meaningful products.
                </>
              ) : null}
            </p>

            <div className="am-callout">
              <p className="am-calloutTitle">What I’m focused on</p>
              <ul className="am-list">
                <li>Building accessible, responsive React UI with strong UX fundamentals</li>
                <li>Shipping full-stack features with Django APIs and clean data flows</li>
                <li>Improving AI-driven experiences through evaluation, iteration, and product thinking</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* =========================================================
           ABOUT ME
           Key fix for "bottom cuts off":
           ✅ On small screens we DO NOT use inner scroll containers.
           ✅ We remove max-height/overflow clipping so the parent (.app-main)
              can scroll normally and the bottom never gets chopped.
           ========================================================= */

        .am-page,
        .am-page * ,
        .am-page *::before,
        .am-page *::after{
          box-sizing: border-box;
        }

        .am-page{
          --am-ink: #20113f;
          --am-ink-soft: rgba(32, 17, 63, 0.72);
          --am-ink-muted: rgba(32, 17, 63, 0.62);
          --am-primary: #5b30d9;
          --am-primary-2: #7b45f2;
          --am-border: rgba(91,48,217,0.14);
          --am-card-border: rgba(139, 92, 246, 0.18);

          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;     /* default: no scroll on desktop */
          overflow-x: hidden;   /* prevent horizontal bleed */
          display: grid;
        }

        /* Background scoped to this page only */
        .am-bg,
        .am-texture{
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .am-bg{
          z-index: 0;
          background:
            radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%),
            linear-gradient(135deg, #F4EEFF 0%, #EDE2FF 45%, #E6D8FF 100%);
        }

        .am-texture{
          z-index: 1;
          opacity: 0.45;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size: 260px 260px;
          mix-blend-mode: multiply;
        }

        .am-center{
          position: relative;
          z-index: 2;
          height: 100%;
          min-height: 0;
          display: grid;
          place-items: center;
          padding: clamp(12px, 2.6vh, 22px) clamp(12px, 3vw, 28px);
        }

        .am-card{
          width: min(1050px, 100%);
          background: rgba(255, 255, 255, 0.78);
          border-radius: 22px;
          border: 1px solid var(--am-card-border);
          box-shadow: 0 12px 30px rgba(40, 20, 80, 0.12);
          backdrop-filter: blur(8px);
          padding: clamp(14px, 2.6vh, 26px);

          /* desktop: keep it neat between nav + footer */
          max-height: 100%;
          overflow: hidden;

          animation: fadeInUp 0.7s ease-out;
        }

        .am-top{
          display: grid;
          grid-template-columns: auto 1fr;
          align-items: center;
          justify-items: start;
          gap: clamp(14px, 2.2vw, 22px);
          margin-bottom: clamp(10px, 1.8vh, 14px);
        }

        .am-imgWrap{
          flex: 0 0 auto;
          display: flex;
          justify-content: center;
        }

        .am-img{
          width: clamp(120px, 18vh, 200px);
          height: clamp(120px, 18vh, 200px);
          object-fit: cover;
          border-radius: 999px;
          border: 4px solid rgba(156, 122, 255, 0.55);
          box-shadow: 0 10px 22px rgba(40, 20, 80, 0.15);
          background: rgba(255,255,255,0.9);
          display: block;
        }

        .am-head{
          min-width: 0;
          text-align: left;
          padding: 0;
        }

        .am-title{
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(1.65rem, 2.35vw, 2.35rem);
          color: var(--am-ink);
          margin: 0 0 6px 0;
          letter-spacing: -0.03em;
          line-height: 1.1;
          font-weight: 900;
        }

        .am-subtitle{
          margin: 0;
          font-size: clamp(0.9rem, 1.2vw, 1.02rem);
          color: var(--am-ink-soft);
          line-height: 1.45;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 700;
        }

        .am-body{
          width: min(820px, 100%);
          margin: 0 auto;
        }

        .am-p{
          font-size: clamp(0.94rem, 1.05vw, 1.06rem);
          line-height: 1.65;
          color: rgba(32, 17, 63, 0.84);
          margin: 0 0 clamp(10px, 1.2vh, 14px) 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 600;
        }

        .am-callout{
          margin-top: clamp(10px, 1.6vh, 14px);
          padding: clamp(12px, 1.8vh, 16px);
          border-radius: 18px;
          border: 1px solid var(--am-border);
          background: linear-gradient(
            180deg,
            rgba(243, 237, 255, 0.85) 0%,
            rgba(255, 255, 255, 0.85) 100%
          );
          box-shadow: 0 10px 22px rgba(40, 20, 80, 0.08);
        }

        .am-calloutTitle{
          margin: 0 0 8px 0;
          font-size: clamp(1.0rem, 1.25vw, 1.14rem);
          font-weight: 900;
          color: var(--am-primary);
          font-family: Nunito, ui-sans-serif, system-ui;
        }

        .am-list{
          margin: 0;
          padding-left: 1.1rem;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 700;
          color: rgba(32, 17, 63, 0.80);
        }

        .am-list li{
          margin-bottom: 6px;
          font-size: clamp(0.92rem, 1.0vw, 1.02rem);
          line-height: 1.5;
        }

        @keyframes fadeInUp{
          from{ opacity: 0; transform: translateY(14px); }
          to{ opacity: 1; transform: translateY(0); }
        }

        /* mobile/tablet: center content like Welcome — responsive at all heights */
        @media (max-width: 900px){
          .am-page{
            min-height: 100%;
            height: auto;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .am-center{
            width: 100%;
            min-height: 100%;
            display: grid;
            place-items: center;
            padding: 18px 12px calc(42px + env(safe-area-inset-bottom));
          }

          .am-card{
            max-height: none;
            overflow: visible;
          }
        }

        /* ✅ Extra small phones */
        @media (max-width: 420px){
          .am-top{ grid-template-columns: 1fr; justify-items: center; }
          .am-head{ text-align: center; }
          .am-img{ width: 110px; height: 110px; }
          .am-card{ border-radius: 18px; padding: 14px; }
          .am-center{ padding-left: 12px; padding-right: 12px; }
        }

        /* ✅ Short height screens: tighten spacing */
        @media (max-height: 720px){
          .am-img{ width: 112px; height: 112px; }
          .am-p{ line-height: 1.55; }
          .am-callout{ padding: 12px; }
          .am-list li{ margin-bottom: 5px; }
        }
      `}</style>
    </section>
  );
}
