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
              <h1 className="am-title">About Me 💜</h1>
              <p className="am-subtitle">
                NYC → Pennsylvania • Full-Stack Engineering • Frontend AI Trainer
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="am-body">
            <p className="am-p">
              Hi! I’m <strong>Jaqueline</strong>. I recently moved from the
              energy of <strong>NYC</strong> to a quieter town in{" "}
              <strong>Pennsylvania</strong> to be closer to family and go back
              to school—ultimately committing to a new path in tech.
            </p>

            <p className="am-p">
              I graduated from <strong>Coding Temple</strong> and earned my{" "}
              <strong>Full-Stack Engineering certificate</strong>. That
              experience strengthened my foundation in building end-to-end
              applications and helped me fall in love with the mix of creativity
              and problem-solving that comes with software development.
            </p>

            <p className="am-p">
              Today, I work at <strong>Outlier AI</strong> as a{" "}
              <strong>Frontend AI Trainer</strong>, where I help shape and
              evaluate model outputs and improve UI-focused reasoning and
              quality.
              {INCLUDE_JOB_SEARCH_LINE ? (
                <>
                  {" "}
                  I’m currently seeking a full-time role where I can grow as an
                  engineer and ship meaningful products.
                </>
              ) : null}
            </p>

            <div className="am-callout">
              <p className="am-calloutTitle">What I’m into right now ✨</p>
              <ul className="am-list">
                <li>Building polished, responsive UI with React</li>
                <li>Full-stack projects that feel warm + human</li>
                <li>AI + product experiences that are genuinely helpful</li>
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
          border: 1px solid rgba(169, 135, 255, 0.20);
          box-shadow: 0 12px 30px rgba(40, 20, 80, 0.12);
          backdrop-filter: blur(8px);
          padding: clamp(14px, 2.6vh, 26px);

          /* desktop: keep it neat between nav + footer */
          max-height: 100%;
          overflow: hidden;

          animation: fadeInUp 0.7s ease-out;
        }

        .am-top{
          display: flex;
          align-items: center;
          justify-content: center;
          gap: clamp(14px, 2.4vw, 24px);
          flex-wrap: wrap;
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
          flex: 1 1 360px;
          min-width: min(520px, 100%);
          text-align: center;
          padding: 4px 0;
        }

        .am-title{
          font-family: "Dancing Script", cursive;
          font-size: clamp(1.9rem, 3.4vw, 2.7rem);
          color: #6B34D9;
          margin: 0 0 6px 0;
          letter-spacing: 0.2px;
          line-height: 1.05;
        }

        .am-subtitle{
          margin: 0;
          font-size: clamp(0.9rem, 1.2vw, 1.02rem);
          color: rgba(40, 20, 80, 0.72);
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
          color: rgba(25, 18, 40, 0.86);
          margin: 0 0 clamp(10px, 1.2vh, 14px) 0;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 600;
        }

        .am-callout{
          margin-top: clamp(10px, 1.6vh, 14px);
          padding: clamp(12px, 1.8vh, 16px);
          border-radius: 18px;
          border: 1px solid rgba(156, 122, 255, 0.22);
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
          color: #5A2FC6;
          font-family: Nunito, ui-sans-serif, system-ui;
        }

        .am-list{
          margin: 0;
          padding-left: 1.1rem;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 700;
          color: rgba(25, 18, 40, 0.82);
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

        /* =========================================================
           ✅ MOBILE FIX (prevents bottom cut-off)
           - Let the page/content be naturally tall
           - Remove max-height + overflow clipping
           - Add extra bottom padding so last section is always visible
           ========================================================= */

        @media (max-width: 768px){
          .am-page{
            height: auto;
            min-height: 100%;
            overflow: visible; /* IMPORTANT: no inner scrolling container */
          }

          .am-center{
            height: auto;
            min-height: 100%;
            place-items: start center;

            /* extra room so the very bottom never gets hidden */
            padding-top: 18px;
            padding-bottom: calc(42px + env(safe-area-inset-bottom));
          }

          .am-card{
            max-height: none;     /* remove clip */
            overflow: visible;    /* remove clip */
          }
        }

        /* ✅ Extra small phones */
        @media (max-width: 420px){
          .am-head{ min-width: 100%; }
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
