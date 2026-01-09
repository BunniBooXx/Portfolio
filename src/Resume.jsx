import React from "react";

export default function Resume() {
  return (
    <div className="resume-page">
      <div className="resume-shell">
        <h1 className="resume-title">My Resume 💜</h1>
        <p className="resume-subtitle">You can view my resume below:</p>

        <div className="resume-card">
          <iframe
            className="resume-iframe"
            src="/Jaqueline-Smith-Resume.pdf"
            title="Resume"
          />
        </div>
      </div>

      {/* ✨ Embedded Lavender Styles */}
      <style>{`
        /* reset to avoid mystery scroll */
        html, body {
          margin: 0;
          padding: 0;
        }
        *, *::before, *::after {
          box-sizing: border-box;
        }

        .resume-page {
          min-height: 100dvh;
          width: 100%;
          padding: clamp(18px, 3.5vh, 34px);
          display: flex;
          justify-content: center;
          align-items: flex-start;

          background:
            radial-gradient(900px 650px at 18% 18%, rgba(123,92,255,0.12), transparent 56%),
            radial-gradient(780px 600px at 86% 70%, rgba(184,164,255,0.22), transparent 60%),
            radial-gradient(720px 520px at 60% 12%, rgba(110,201,255,0.10), transparent 62%),
            linear-gradient(135deg, #ffffff 0%, #f8f3ff 40%, #efe6ff 72%, #e7d8ff 100%);

          overflow-x: hidden;
        }

        .resume-shell {
          width: min(980px, 100%);
          text-align: center;
        }

        .resume-title {
          margin: 6px 0 10px;
          font-family: "Grand Hotel", cursive;
          font-size: clamp(2.6rem, 4vw + 1rem, 4.2rem);
          line-height: 0.95;
          font-weight: 400;

          color: #7b5cff;
          text-shadow: 0 12px 30px rgba(123, 92, 255, 0.18);
          letter-spacing: 0.2px;
        }

        .resume-subtitle {
          margin: 0 0 18px;
          font-family: "Nunito", system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif;
          font-size: clamp(1rem, 0.8vw + 0.85rem, 1.2rem);
          line-height: 1.6;
          font-weight: 700;
          color: rgba(26, 22, 48, 0.74);
        }

        .resume-card {
          width: min(980px, 92vw);
          height: min(82dvh, 980px);

          padding: 10px;
          border-radius: 24px;
          overflow: hidden;

          background: rgba(255, 255, 255, 0.68);
          border: 1px solid rgba(123, 92, 255, 0.18);

          box-shadow:
            0 22px 70px rgba(140, 90, 200, 0.18),
            0 8px 22px rgba(140, 90, 200, 0.14);

          backdrop-filter: blur(14px);
          -webkit-backdrop-filter: blur(14px);

          transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
        }

        .resume-card:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.78);
          box-shadow:
            0 28px 90px rgba(140, 90, 200, 0.22),
            0 10px 28px rgba(140, 90, 200, 0.16);
        }

        .resume-iframe {
          width: 100%;
          height: 100%;
          border: 0;
          border-radius: 16px;
          background: #ffffff;
        }

        /* Tablet */
        @media (max-width: 768px) {
          .resume-page {
            padding: 18px;
          }

          .resume-card {
            width: 94vw;
            height: 76dvh;
            border-radius: 22px;
          }
        }

        /* Mobile */
        @media (max-width: 480px) {
          .resume-card {
            width: 96vw;
            height: 72dvh;
            border-radius: 20px;
          }
        }
      `}</style>
    </div>
  );
}
