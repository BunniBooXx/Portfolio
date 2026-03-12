import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ContactMe() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  useEffect(() => {
    const id = "contactme-fonts";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Dancing+Script:wght@600;700&family=Nunito:wght@500;700;800&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current || status === "sending") return;

    setStatus("sending");

    emailjs
      .sendForm(
        "service_cc7dukm",
        "template_59litsq",
        form.current,
        "b3f7LghfO8lhnUG50"
      )
      .then(
        () => {
          setStatus("sent");
          form.current.reset();
          setTimeout(() => setStatus("idle"), 3500);
        },
        () => {
          setStatus("error");
          setTimeout(() => setStatus("idle"), 4500);
        }
      );
  };

  const statusText =
    status === "sending"
      ? "Sending… 💌"
      : status === "sent"
      ? "Sent! Thanks for reaching out 💜"
      : status === "error"
      ? "Oops—something went wrong. Try again? 🥺"
      : "";

  return (
    <section className="cm-page" aria-label="Contact Me">
      <div className="cm-bg" aria-hidden="true" />
      <div className="cm-texture" aria-hidden="true" />

      <div className="cm-center">
        <div className="cm-card">
          <header className="cm-header">
            <div className="cm-pill">✨ Let’s connect</div>
            <h1 className="cm-title">Contact Form</h1>
            <p className="cm-subtitle">
              Send me a message and I’ll get back to you soon 💜
            </p>
          </header>

          <form className="cm-form" ref={form} onSubmit={sendEmail}>
            <div className="cm-grid">
              <div className="cm-fieldWrap">
                <label className="cm-label" htmlFor="user_name">
                  Your Name ♡
                </label>
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  className="cm-field"
                  placeholder="Your cute name"
                  required
                />
              </div>

              <div className="cm-fieldWrap">
                <label className="cm-label" htmlFor="user_email">
                  Your Email ✉
                </label>
                <input
                  id="user_email"
                  type="email"
                  name="user_email"
                  className="cm-field"
                  placeholder="Your adorable email"
                  required
                />
              </div>
            </div>

            <div className="cm-fieldWrap">
              <label className="cm-label" htmlFor="message">
                Your Message 💬
              </label>
              <textarea
                id="message"
                name="message"
                className="cm-field cm-textarea"
                placeholder="Your sweet message"
                required
              />
            </div>

            <button
              className="cm-submit"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "sending" ? "Sending…" : "Send Kawaii Message"}
            </button>

            <div
              className={`cm-status ${status !== "idle" ? "show" : ""}`}
              role="status"
              aria-live="polite"
            >
              {statusText}
            </div>

            <div className="cm-divider" aria-hidden="true" />

            <div className="cm-socialRow">
              <a
                className="cm-socialBtn"
                href="https://github.com/BunniBooXx"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
                <span>GitHub</span>
              </a>

              <a
                className="cm-socialBtn"
                href="https://www.linkedin.com/in/jaqueline-smith-237366238/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <FontAwesomeIcon icon={faLinkedin} />
                <span>LinkedIn</span>
              </a>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .cm-page,
        .cm-page *,
        .cm-page *::before,
        .cm-page *::after{
          box-sizing: border-box;
        }

        .cm-page{
          position: relative;
          width: 100%;
          height: 100%;
          min-height: 0;
          overflow: hidden;
          overflow-x: hidden;
          display: grid;
        }

        .cm-bg,
        .cm-texture{
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .cm-bg{
          z-index: 0;
          background:
            radial-gradient(1100px 560px at 18% 10%, rgba(255,255,255,0.66) 0%, rgba(255,255,255,0) 55%),
            radial-gradient(900px 520px at 84% 88%, rgba(255,255,255,0.38) 0%, rgba(255,255,255,0) 60%),
            linear-gradient(135deg, #F4EEFF 0%, #EDE2FF 45%, #E6D8FF 100%);
        }

        .cm-texture{
          z-index: 1;
          opacity: 0.40;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(0,0,0,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(0,0,0,0.025) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(0,0,0,0.02) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(0,0,0,0.025) 0 1px, transparent 2px);
          background-size: 260px 260px;
          mix-blend-mode: multiply;
        }

        .cm-center{
          position: relative;
          z-index: 2;
          height: 100%;
          min-height: 0;
          display: grid;
          place-items: center;
          padding: clamp(10px, 2vh, 18px) clamp(12px, 2.6vw, 26px);
        }

        .cm-card{
          width: min(760px, 100%);
          background: rgba(255, 255, 255, 0.78);
          border-radius: 22px;
          border: 1px solid rgba(169, 135, 255, 0.20);
          box-shadow: 0 12px 30px rgba(40, 20, 80, 0.12);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: clamp(16px, 2.3vh, 24px);

          max-height: 100%;
          overflow: hidden;

          animation: cmFadeUp 0.7s ease-out;
        }

        .cm-header{
          text-align: center;
          margin-bottom: 12px;
        }

        .cm-pill{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 7px 14px;
          border-radius: 999px;
          background: rgba(255,255,255,0.64);
          border: 1px solid rgba(156,122,255,0.20);
          box-shadow: 0 8px 18px rgba(40,20,80,0.07);

          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.9rem;
          font-weight: 800;
          color: rgba(90, 47, 198, 0.82);
        }

        .cm-title{
          margin: 10px 0 6px;
          font-family: "Dancing Script", cursive;
          font-size: clamp(2rem, 3.4vw, 2.8rem);
          color: #6B34D9;
          line-height: 1.05;
          letter-spacing: 0.2px;
        }

        .cm-subtitle{
          margin: 0 auto;
          max-width: 520px;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.92rem, 1.15vw, 1rem);
          line-height: 1.45;
          font-weight: 700;
          color: rgba(40, 20, 80, 0.72);
        }

        .cm-form{
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .cm-grid{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        .cm-fieldWrap{
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .cm-label{
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.95rem;
          font-weight: 800;
          color: #6B34D9;
        }

        .cm-field{
          width: 100%;
          padding: 12px 13px;
          border-radius: 14px;
          border: 1px solid rgba(156, 122, 255, 0.26);
          background: rgba(255,255,255,0.92);
          color: rgba(25,18,40,0.88);
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.97rem;
          font-weight: 700;
          outline: none;
          transition: box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease;
        }

        .cm-field::placeholder{
          color: rgba(25,18,40,0.40);
          font-weight: 600;
        }

        .cm-field:focus{
          border-color: rgba(107,52,217,0.44);
          box-shadow: 0 0 0 4px rgba(123,92,255,0.14);
        }

        .cm-textarea{
          min-height: 118px;
          resize: none;
          line-height: 1.5;
        }

        .cm-submit{
          margin-top: 4px;
          width: 100%;
          border: none;
          cursor: pointer;
          border-radius: 999px;
          padding: 13px 14px;

          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: 1rem;
          color: #fff;

          background: linear-gradient(180deg, rgba(122,62,240,0.95) 0%, rgba(107,52,217,0.98) 100%);
          box-shadow: 0 14px 24px rgba(107,52,217,0.18);
          border: 1px solid rgba(255,255,255,0.18);
          transition: transform 160ms ease, filter 160ms ease;
        }

        .cm-submit:hover{
          transform: translateY(-2px);
          filter: brightness(1.05);
        }

        .cm-submit:disabled{
          opacity: 0.72;
          cursor: not-allowed;
          transform: none;
          filter: none;
        }

        .cm-status{
          text-align: center;
          min-height: 20px;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.95rem;
          font-weight: 800;
          color: rgba(40,20,80,0.72);
          opacity: 0;
          transform: translateY(-2px);
          transition: 180ms ease;
        }

        .cm-status.show{
          opacity: 1;
          transform: translateY(0);
        }

        .cm-divider{
          height: 1px;
          background: rgba(156,122,255,0.18);
          margin: 2px 0 0;
        }

        .cm-socialRow{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .cm-socialBtn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 11px 12px;
          border-radius: 16px;
          text-decoration: none;
          background: rgba(243,238,255,0.88);
          border: 1px solid rgba(156,122,255,0.18);
          color: rgba(40,20,80,0.82);

          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 800;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }

        .cm-socialBtn:hover{
          transform: translateY(-2px);
          background: rgba(255,255,255,0.88);
          border-color: rgba(156,122,255,0.28);
        }

        .cm-socialBtn svg{
          font-size: 1.08rem;
          color: rgba(107,52,217,0.92);
        }

        @keyframes cmFadeUp{
          from{ opacity: 0; transform: translateY(14px); }
          to{ opacity: 1; transform: translateY(0); }
        }

        /* tighten for shorter desktops so footer/nav space doesn't force overflow */
        @media (max-height: 820px){
          .cm-center{
            padding-top: 8px;
            padding-bottom: 8px;
          }

          .cm-card{
            padding: 14px;
          }

          .cm-header{
            margin-bottom: 10px;
          }

          .cm-title{
            margin-top: 8px;
            margin-bottom: 4px;
          }

          .cm-textarea{
            min-height: 104px;
          }
        }

        /* mobile/tablet: let normal page scroll happen if needed */
        @media (max-width: 768px){
          .cm-page{
            height: auto;
            min-height: 100%;
            overflow: visible;
          }

          .cm-center{
            height: auto;
            min-height: 100%;
            place-items: start center;
            padding-top: 18px;
            padding-bottom: calc(42px + env(safe-area-inset-bottom));
          }

          .cm-card{
            max-height: none;
            overflow: visible;
          }

          .cm-grid{
            grid-template-columns: 1fr;
          }

          .cm-socialRow{
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 420px){
          .cm-card{
            border-radius: 18px;
            padding: 14px;
          }

          .cm-center{
            padding-left: 12px;
            padding-right: 12px;
          }

          .cm-title{
            font-size: 1.85rem;
          }

          .cm-field,
          .cm-submit,
          .cm-socialBtn{
            font-size: 0.94rem;
          }

          .cm-textarea{
            min-height: 110px;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .cm-card,
          .cm-submit,
          .cm-socialBtn,
          .cm-field,
          .cm-status{
            transition: none !important;
            animation: none !important;
          }

          .cm-submit:hover,
          .cm-socialBtn:hover{
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}