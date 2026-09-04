import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import OrbField from "./OrbField";
import { CONTACT_ORBS } from "./orbLayouts";

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
      ? "Sending…"
      : status === "sent"
      ? "Sent! Thanks for reaching out."
      : status === "error"
      ? "Something went wrong. Please try again."
      : "";

  return (
    <section className="cm-page" aria-label="Contact Me">
      <div className="cm-bg" aria-hidden="true" />
      <div className="cm-texture" aria-hidden="true" />
      <OrbField orbs={CONTACT_ORBS} />

      <div className="cm-center">
        <div className="cm-card">
          {/* Plain grouping wrapper — no styling of its own. .app-main is
              the single page scroll owner at every width now, so this
              no longer needs to be its own scroll region on mobile. */}
          <div className="cm-cardInner">
            <header className="cm-header">
              <div className="cm-pill">Let’s connect</div>
              <h1 className="cm-title">Contact Form</h1>
              <p className="cm-subtitle">
                Send me a message and I’ll get back to you soon.
              </p>
            </header>

            <form className="cm-form" ref={form} onSubmit={sendEmail}>
              <div className="cm-grid">
                <div className="cm-fieldWrap">
                  <label className="cm-label" htmlFor="user_name">
                    Your Name
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
                    Your Email
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
                  Your Message
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
                {status === "sending" ? (
                  "Sending…"
                ) : (
                  <>
                    <FontAwesomeIcon icon={faPaperPlane} aria-hidden="true" />
                    <span>Send Message</span>
                  </>
                )}
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
          /* Natural flow — sized by its own content, not forced to fill
             the viewport (App.css's .app-shell/.app-main own that). */
          height: auto;
          overflow: visible;
          display: block;
        }

        /* Fixed to the viewport (not .cm-page's own box) so the background
           spans the full screen, continuing behind the navbar and footer
           instead of being clipped to the space between them. */
        .cm-bg,
        .cm-texture{
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        .cm-bg{
          z-index: 0;
          /* The top-left highlight formerly here (radial-gradient at
             18% 10%) read fine when this layer was clipped to the content
             box below the navbar, but now that the background is fixed to
             the viewport (see .cm-bg/.cm-texture above) that same
             10%-from-top anchor sits behind/above the navbar itself,
             showing up as a bright top-edge flare. Removed; the
             lower-right highlight and base gradient are unchanged. */
          background:
            radial-gradient(900px 520px at 84% 88%, rgba(var(--color-ice-rgb),0.05) 0%, rgba(var(--color-ice-rgb),0) 60%),
            linear-gradient(135deg, var(--color-surface-glass) 0%, var(--color-bg-page) 45%, var(--color-surface-recessed) 100%);
        }

        .cm-texture{
          z-index: 1;
          opacity: 0.5;
          background-image:
            radial-gradient(circle at 18% 22%, rgba(255,255,255,0.035) 0 1px, transparent 2px),
            radial-gradient(circle at 70% 32%, rgba(255,255,255,0.03) 0 1px, transparent 2px),
            radial-gradient(circle at 44% 74%, rgba(255,255,255,0.028) 0 1px, transparent 2px),
            radial-gradient(circle at 84% 82%, rgba(255,255,255,0.03) 0 1px, transparent 2px);
          background-size: 260px 260px;
        }

        /* Natural top-down flow, not centered in a viewport-height box.
           Horizontal padding is 0 — the shared .app-content gutter
           (App.css) already supplies it. */
        .cm-center{
          position: relative;
          z-index: 2;
          width: 100%;
          height: auto;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          padding: clamp(10px, 2vh, 18px) 0;
        }

        .cm-card{
          width: min(760px, 100%);
          background: rgba(var(--color-surface-glass-rgb), 0.82);
          border-radius: 22px;
          border: 1px solid rgba(var(--color-border-rgb), 0.3);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5), 0 4px 14px rgba(var(--color-glow-silver-rgb), 0.08);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          padding: clamp(16px, 2.3vh, 24px);

          /* Natural flow — never its own scroll region; .app-main is
             the single page scroll owner (App.css). */
          max-height: none;
          overflow: visible;

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
          background: rgba(var(--color-surface-recessed-rgb),0.6);
          border: 1px solid rgba(var(--color-border-rgb),0.24);
          box-shadow: 0 8px 18px rgba(0,0,0,0.2);

          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.9rem;
          font-weight: 800;
          color: var(--color-text-primary);
        }

        .cm-title{
          margin: 10px 0 6px;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(1.7rem, 3.0vw, 2.35rem);
          font-weight: 900;
          color: var(--color-text-primary);
          line-height: 1.08;
          letter-spacing: -0.03em;
        }

        .cm-subtitle{
          margin: 0 auto;
          max-width: 520px;
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: clamp(0.92rem, 1.15vw, 1rem);
          line-height: 1.45;
          font-weight: 700;
          color: rgba(var(--color-text-primary-rgb), 0.78);
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
          color: var(--color-text-primary);
        }

        .cm-field{
          width: 100%;
          padding: 12px 13px;
          border-radius: 14px;
          border: 1px solid rgba(var(--color-border-rgb), 0.3);
          background: rgba(var(--color-surface-recessed-rgb), 0.85);
          color: var(--color-text-primary);
          font-family: Nunito, ui-sans-serif, system-ui;
          font-size: 0.97rem;
          font-weight: 700;
          outline: none;
          transition: box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease;
        }

        .cm-field::placeholder{
          color: var(--color-text-muted);
          font-weight: 600;
        }

        /* Elegant focus lighting: icy-blue ring, matching the global
           focus-ring token used for keyboard focus elsewhere. */
        .cm-field:focus{
          border-color: rgba(var(--color-ice-rgb),0.6);
          box-shadow: 0 0 0 4px rgba(var(--color-ice-rgb),0.18);
        }

        .cm-textarea{
          min-height: 118px;
          resize: none;
          line-height: 1.5;
        }

        .cm-submit{
          position: relative;
          overflow: hidden;
          margin-top: 4px;
          width: 100%;
          border: none;
          cursor: pointer;
          border-radius: 999px;
          padding: 13px 14px;

          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 900;
          font-size: 1rem;
          color: var(--color-text-on-accent);

          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;

          background: linear-gradient(180deg, var(--color-accent-hover) 0%, var(--color-accent) 100%);
          box-shadow: 0 14px 24px rgba(0,0,0,0.4);
          border: 1px solid rgba(255,255,255,0.18);
          transition: transform 160ms ease, filter 160ms ease, box-shadow 160ms ease;
        }

        .cm-submit::after{
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.55) 50%, transparent 65%);
          transform: translateX(-130%);
          transition: transform 550ms ease;
          pointer-events: none;
        }

        .cm-submit:hover,
        .cm-submit:focus-visible{
          transform: translateY(-2px);
          filter: brightness(1.05);
          box-shadow: 0 18px 32px rgba(0,0,0,0.5), 0 2px 12px rgba(var(--color-glow-white-rgb),0.15);
        }
        .cm-submit:hover::after,
        .cm-submit:focus-visible::after{
          transform: translateX(130%);
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
          color: rgba(var(--color-text-primary-rgb), 0.78);
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
          background: rgba(var(--color-border-rgb), 0.7);
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
          background: rgba(var(--color-surface-recessed-rgb),0.70);
          border: 1px solid rgba(var(--color-border-rgb),0.55);
          color: rgba(var(--color-text-primary-rgb),0.86);

          font-family: Nunito, ui-sans-serif, system-ui;
          font-weight: 800;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }

        .cm-socialBtn:hover,
        .cm-socialBtn:focus-visible{
          transform: translateY(-1px);
          background: rgba(var(--color-surface-recessed-rgb),0.95);
          border-color: rgba(var(--color-glow-white-rgb),0.4);
          color: var(--color-text-primary);
        }

        .cm-socialBtn svg{
          font-size: 1.08rem;
          color: var(--color-text-primary);
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

        /* Mobile/tablet: 1-column field/social layout is the only real
           layout-mode change at this width. Centering/flex/natural-flow
           already come from the base .cm-center/.cm-card/.cm-cardInner
           rules above, applied uniformly at every width. */
        @media (max-width: 900px){
          .cm-center{
            padding: 14px 0;
          }

          .cm-grid{
            grid-template-columns: 1fr;
          }

          .cm-socialRow{
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 520px){
          .cm-center{
            padding: 12px 0;
          }
        }

        @media (max-width: 420px){
          .cm-card{
            border-radius: 18px;
            padding: 14px;
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
          .cm-submit::after,
          .cm-socialBtn,
          .cm-field,
          .cm-status{
            transition: none !important;
            animation: none !important;
          }

          .cm-submit:hover,
          .cm-submit:focus-visible,
          .cm-socialBtn:hover,
          .cm-socialBtn:focus-visible{
            transform: none !important;
          }
          .cm-submit:hover::after,
          .cm-submit:focus-visible::after{
            transform: translateX(-130%) !important;
          }
        }


      `}</style>
    </section>
  );
}