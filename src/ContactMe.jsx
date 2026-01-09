// ContactMe.jsx — lavender themed + responsive + CSS in same file ✅💜

import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons";

export default function ContactMe() {
  const form = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  const sendEmail = (e) => {
    e.preventDefault();
    if (!form.current) return;

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
    <div className="contactPage">
      <div className="contactShell">
        <header className="contactHeader">
          <div className="pill">✨ Let’s connect</div>
          <h1 className="title">Contact Form</h1>
          <p className="subtitle">
            Send me a message and I’ll get back to you soon 💜
          </p>
        </header>

        <form className="formCard" ref={form} onSubmit={sendEmail}>
          <label className="label" htmlFor="user_name">
            Your Name ♡
          </label>
          <input
            id="user_name"
            type="text"
            name="user_name"
            className="field"
            placeholder="Your cute name"
            required
          />

          <label className="label" htmlFor="user_email">
            Your Email ✉
          </label>
          <input
            id="user_email"
            type="email"
            name="user_email"
            className="field"
            placeholder="Your adorable email"
            required
          />

          <label className="label" htmlFor="message">
            Your Message 💬
          </label>
          <textarea
            id="message"
            name="message"
            className="field textarea"
            placeholder="Your sweet message"
            required
          />

          <button className="submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send Kawaii Message"}
          </button>

          <div className={`status ${status !== "idle" ? "show" : ""}`} role="status">
            {statusText}
          </div>

          <div className="divider" aria-hidden="true" />

          <div className="socialRow">
            <a
              className="socialBtn"
              href="https://github.com/BunniBooXx"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <FontAwesomeIcon icon={faGithub} />
              <span>GitHub</span>
            </a>

            <a
              className="socialBtn"
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

      <style>{`
        .contactPage{
          min-height: 100vh;
          display: grid;
          place-items: center;
          padding: clamp(18px, 3.2vw, 52px) clamp(14px, 2.6vw, 40px);
          box-sizing: border-box;

          background:
            radial-gradient(900px 520px at 16% 12%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 62%),
            radial-gradient(900px 520px at 84% 92%, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 62%),
            linear-gradient(135deg, #F6F1FF 0%, #EDE2FF 48%, #E7D7FF 100%);

          color: rgba(25,18,40,0.88);
        }

        .contactShell{
          width: min(860px, 100%);
          display: grid;
          gap: clamp(14px, 2vw, 18px);
        }

        .contactHeader{
          text-align: center;
          padding: 6px 0;
        }

        .pill{
          display: inline-flex;
          align-items: center;
          justify-content: center;
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

        .title{
          margin: 10px 0 6px;
          font-family: "Dancing Script", cursive;
          font-size: clamp(2.1rem, 4vw, 3rem);
          color: #6B34D9;
          letter-spacing: 0.4px;
        }

        .subtitle{
          margin: 0 auto;
          max-width: 560px;
          font-family: "Raleway", sans-serif;
          font-size: clamp(0.98rem, 1.4vw, 1.05rem);
          line-height: 1.6;
          color: rgba(30,18,60,0.72);
        }

        .formCard{
          background: rgba(255,255,255,0.78);
          border: 1px solid rgba(156,122,255,0.22);
          border-radius: 22px;
          box-shadow: 0 18px 38px rgba(40,20,80,0.10);
          backdrop-filter: blur(10px);

          padding: clamp(16px, 2.4vw, 26px);
          display: grid;
          gap: 10px;
        }

        .label{
          font-family: "Comic Sans MS", cursive;
          color: rgba(107,52,217,0.85);
          font-weight: 700;
          font-size: 1rem;
          margin-top: 6px;
        }

        .field{
          width: 100%;
          box-sizing: border-box;
          padding: 12px 12px;
          border-radius: 14px;
          border: 1px solid rgba(156,122,255,0.26);
          background: rgba(255,255,255,0.92);
          color: rgba(25,18,40,0.88);
          font-family: "Raleway", sans-serif;
          font-size: 0.98rem;
          outline: none;
          transition: box-shadow 160ms ease, border-color 160ms ease, transform 160ms ease;
        }

        .field::placeholder{
          color: rgba(25,18,40,0.40);
        }

        .field:focus{
          border-color: rgba(107,52,217,0.45);
          box-shadow: 0 0 0 4px rgba(123,92,255,0.18);
        }

        .textarea{
          min-height: 130px;
          resize: vertical;
          line-height: 1.5;
        }

        .submit{
          margin-top: 10px;
          width: 100%;
          border: none;
          cursor: pointer;
          border-radius: 999px;
          padding: 12px 14px;

          font-family: "Comic Sans MS", cursive;
          font-weight: 800;
          font-size: 1.05rem;
          color: #fff;

          background: linear-gradient(180deg, rgba(122,62,240,0.92) 0%, rgba(107,52,217,0.96) 100%);
          box-shadow: 0 16px 26px rgba(107,52,217,0.20);
          border: 1px solid rgba(255,255,255,0.18);

          transition: transform 160ms ease, filter 160ms ease;
        }

        .submit:hover{
          transform: translateY(-2px);
          filter: brightness(1.06);
        }

        .submit:disabled{
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
          filter: none;
        }

        .status{
          text-align: center;
          font-family: "Comic Sans MS", cursive;
          color: rgba(40,20,80,0.72);
          font-size: 0.98rem;
          min-height: 22px;
          opacity: 0;
          transform: translateY(-2px);
          transition: 180ms ease;
        }

        .status.show{
          opacity: 1;
          transform: translateY(0);
        }

        .divider{
          height: 1px;
          background: rgba(156,122,255,0.18);
          margin: 10px 0 6px;
        }

        .socialRow{
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .socialBtn{
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 10px 12px;
          border-radius: 16px;
          text-decoration: none;

          background: rgba(243,238,255,0.85);
          border: 1px solid rgba(156,122,255,0.18);
          color: rgba(40,20,80,0.80);

          font-family: "Comic Sans MS", cursive;
          font-weight: 800;
          transition: transform 160ms ease, background 160ms ease, border-color 160ms ease;
        }

        .socialBtn:hover{
          transform: translateY(-2px);
          background: rgba(255,255,255,0.80);
          border-color: rgba(156,122,255,0.28);
        }

        .socialBtn svg{
          font-size: 1.15rem;
          color: rgba(107,52,217,0.90);
        }

        @media (max-width: 560px){
          .socialRow{
            grid-template-columns: 1fr;
          }
        }

        @media (prefers-reduced-motion: reduce){
          .submit, .socialBtn, .field { transition: none; }
          .submit:hover, .socialBtn:hover { transform: none; }
        }
      `}</style>
    </div>
  );
}
