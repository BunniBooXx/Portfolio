
import React, { useEffect } from "react";

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

  const RESUME_PDF = "/Jaqueline-Smith-Resume.pdf";

  return (
    <section className="rm-page" aria-label="Resume page">
      <div className="rm-bg" aria-hidden="true" />
      <div className="rm-texture" aria-hidden="true" />

      <div className="rm-center">
        <div className="rm-card">
          <header className="rm-header">
            <div className="rm-pill">Resume</div>

            

            <div className="rm-actions">
              <a
                className="rm-btn rm-btn-primary"
                href={RESUME_PDF}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open PDF
              </a>

              <a
                className="rm-btn rm-btn-secondary"
                href={RESUME_PDF}
                download
              >
                Download
              </a>
            </div>
          </header>

          <main className="rm-stage">
            <p className="rm-note">
              Open or download the PDF to view the full resume.
            </p>

            <div className="rm-viewerWrap" aria-hidden="true">
              <div className="rm-viewerFrame">
                <iframe
                  className="rm-viewer"
                  title="Resume PDF viewer"
                  src={RESUME_PDF}
                />
              </div>
            </div>
          </main>
        </div>
      </div>

      <style>{`
        .rm-page,
        .rm-page *,
        .rm-page *::before,
        .rm-page *::after{
          box-sizing:border-box;
        }

        .rm-page{
          position:relative;
          width:100%;
          height:100%;
          min-height:0;
          overflow:hidden;
          overflow-x:hidden;
          display:grid;
        }

        .rm-bg,
        .rm-texture{
          position:absolute;
          inset:0;
          pointer-events:none;
        }

        .rm-bg{
          z-index:0;
          background:
            radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%),
            linear-gradient(135deg, #F4EEFF 0%, #EDE2FF 45%, #E6D8FF 100%);
        }

        .rm-texture{
          z-index:1;
          opacity:0.45;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size:260px 260px;
          mix-blend-mode:multiply;
        }

        .rm-center{
          position:relative;
          z-index:2;
          height:100%;
          min-height:0;
          display:grid;
          place-items:center;
          padding:clamp(10px, 2vh, 18px) clamp(12px, 3vw, 26px);
        }

        .rm-card{
          width:min(1080px, 100%);
          background:rgba(255,255,255,0.78);
          border-radius:22px;
          border:1px solid rgba(169,135,255,0.20);
          box-shadow:0 12px 30px rgba(40,20,80,0.12);
          backdrop-filter:blur(8px);
          -webkit-backdrop-filter:blur(8px);
          padding:clamp(14px, 2.2vh, 22px);

          max-height:100%;
          overflow:hidden;

          display:flex;
          flex-direction:column;
          gap:12px;

          animation:rmFadeUp 0.7s ease-out;
        }

        .rm-header{
          display:flex;
          flex-direction:column;
          align-items:center;
          text-align:center;
          gap:6px;
          flex:0 0 auto;
        }

        .rm-pill{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          padding:7px 14px;
          border-radius:999px;
          background:rgba(255,255,255,0.66);
          border:1px solid rgba(156,122,255,0.20);
          box-shadow:0 8px 18px rgba(40,20,80,0.07);
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:0.82rem;
          font-weight:800;
          color:rgba(90,47,198,0.82);
        }

        .rm-actions{
          margin-top:2px;
          display:flex;
          flex-wrap:wrap;
          justify-content:center;
          gap:10px;
        }

        .rm-btn{
          display:inline-flex;
          align-items:center;
          justify-content:center;
          min-height:38px;
          padding:9px 15px;
          border-radius:999px;
          text-decoration:none;
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:0.88rem;
          font-weight:900;
          transition:transform 160ms ease, filter 160ms ease, box-shadow 160ms ease, background 160ms ease;
        }

        .rm-btn:hover{
          transform:translateY(-2px);
        }

        .rm-btn-primary{
          color:#fff;
          background:linear-gradient(180deg, rgba(122,62,240,0.95) 0%, rgba(107,52,217,0.98) 100%);
          box-shadow:0 14px 24px rgba(107,52,217,0.18);
        }

        .rm-btn-primary:hover{
          filter:brightness(1.05);
        }

        .rm-btn-secondary{
          color:#6B34D9;
          background:rgba(255,255,255,0.88);
          border:1px solid rgba(156,122,255,0.18);
          box-shadow:0 8px 18px rgba(40,20,80,0.06);
        }

        .rm-stage{
          width:100%;
          flex:1 1 auto;
          min-height:0;
          display:grid;
          place-items:center;
          gap:10px;
        }

        .rm-note{
          margin:0;
          font-family:Nunito, ui-sans-serif, system-ui;
          font-size:0.92rem;
          line-height:1.45;
          font-weight:700;
          color:rgba(40,20,80,0.68);
          text-align:center;
          max-width: 60ch;
        }

        .rm-viewerWrap{
          width: min(980px, 100%);
          display: grid;
          place-items: center;
        }

        .rm-viewerFrame{
          position:relative;
          width: min(100%, 980px);
          height: clamp(520px, 62vh, 820px);
          border-radius: 22px;
          background: rgba(255,255,255,0.72);
          border: 1px solid rgba(123,92,255,0.18);
          box-shadow:
            0 18px 42px rgba(140,90,200,0.12),
            0 6px 16px rgba(140,90,200,0.08),
            inset 0 1px 0 rgba(255,255,255,0.72);
          overflow:hidden;
        }

        .rm-viewer{
          width:100%;
          height:100%;
          display:block;
          border:0;
          background:#fff;
        }

        @keyframes rmFadeUp{
          from{ opacity:0; transform:translateY(14px); }
          to{ opacity:1; transform:translateY(0); }
        }

        /* laptop / short-height fix */
        @media (max-height: 900px){
          .rm-center{
            padding-top:8px;
            padding-bottom:8px;
          }

          .rm-card{
            width:min(1040px, 100%);
            padding:12px;
            gap:8px;
          }

          .rm-header{
            gap:4px;
          }

          .rm-btn{
            min-height:36px;
            padding:8px 14px;
            font-size:0.84rem;
          }
        }

        @media (max-height: 760px){
          .rm-card{
            padding:10px;
            gap:7px;
          }

          .rm-pill{
            font-size:0.76rem;
            padding:6px 12px;
          }

          .rm-actions{
            gap:8px;
          }
        }

        /* Short desktop (e.g. 2122x963): fit without scroll */
        @media (min-width: 901px) and (max-height: 963px){
          .rm-center{ padding: 6px 16px; }
          .rm-card{ padding: 10px; gap: 8px; width: min(1040px, 100%); }
          .rm-header{ gap: 4px; }
          .rm-pill{ font-size: 0.76rem; padding: 5px 10px; }
          .rm-actions{ gap: 6px; margin-top: 0; }
          .rm-btn{ min-height: 32px; padding: 6px 12px; font-size: 0.8rem; }
          .rm-viewerFrame{ height: clamp(460px, 58vh, 720px); }
        }

        /* mobile/tablet: center content like Welcome — responsive at all heights */
        @media (max-width: 900px){
          .rm-page{
            min-height: 100%;
            height: auto;
            overflow: visible;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .rm-center{
            width: 100%;
            min-height: 100%;
            display: grid;
            place-items: center;
            padding: 18px 12px calc(42px + env(safe-area-inset-bottom));
          }

          .rm-card{
            max-height:none;
            overflow:visible;
          }

          .rm-stage{
            flex:none;
          }

          .rm-viewerWrap{ display:none; }
        }

        @media (max-width: 480px){
          .rm-card{
            border-radius:18px;
            padding:14px;
          }

          .rm-center{
            padding-left:12px;
            padding-right:12px;
          }

          .rm-btn{
            width:100%;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .rm-card,
          .rm-btn{
            transition:none !important;
            animation:none !important;
          }

          .rm-btn:hover{
            transform:none !important;
          }
        }
      `}</style>
    </section>
  );
}
