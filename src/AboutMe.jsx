import React from "react";
import myImage from "../src/images/headshot.webp";

export default function AboutMe() {
  const INCLUDE_JOB_SEARCH_LINE = false; // ✅ flip to true if you want to say you're job searching

  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.topRow}>
          <div style={styles.imageContainer}>
            <img src={myImage} alt="Jaqueline headshot" style={styles.image} />
          </div>

          <div style={styles.headerBlock}>
            <h1 style={styles.heading}>About Me 💜</h1>
            <p style={styles.subtitle}>
              NYC → Pennsylvania • Full-Stack Engineering • Frontend AI Trainer
            </p>
          </div>
        </div>

        <div style={styles.content}>
          <p style={styles.paragraph}>
            Hi! I’m <strong>Jaqueline</strong>. I recently moved from the energy of <strong>NYC</strong> to a quieter
            town in <strong>Pennsylvania</strong> to be closer to family and go back to school—ultimately committing to
            a new path in tech.
          </p>

          <p style={styles.paragraph}>
            I graduated from <strong>Coding Temple</strong> and earned my <strong>Full-Stack Engineering certificate</strong>.
            That experience strengthened my foundation in building end-to-end applications and helped me fall in love with
            the mix of creativity and problem-solving that comes with software development.
          </p>

          <p style={styles.paragraph}>
            Today, I work at <strong>Outlier AI</strong> as a <strong>Frontend AI Trainer</strong>, where I help shape and
            evaluate model outputs and improve UI-focused reasoning and quality.
            {INCLUDE_JOB_SEARCH_LINE ? (
              <>
                {" "}
                I’m currently seeking a full-time role where I can grow as an engineer and ship meaningful products.
              </>
            ) : null}
          </p>

          <div style={styles.callout}>
            <p style={styles.calloutTitle}>What I’m into right now ✨</p>
            <ul style={styles.list}>
              <li style={styles.listItem}>Building polished, responsive UI with React</li>
              <li style={styles.listItem}>Full-stack projects that feel warm + human</li>
              <li style={styles.listItem}>AI + product experiences that are genuinely helpful</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatGlow {
          0%, 100% { transform: translateY(0); opacity: 0.55; }
          50% { transform: translateY(-10px); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    width: "100%",
    minHeight: "100vh",
    padding: "clamp(20px, 4vw, 56px) clamp(14px, 3vw, 28px)",
    background:
      "radial-gradient(1200px 600px at 20% 10%, rgba(255,255,255,0.65) 0%, rgba(255,255,255,0) 55%), linear-gradient(135deg, #F4EEFF 0%, #EDE2FF 45%, #E6D8FF 100%)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    maxWidth: "1050px",
    width: "100%",
    background: "rgba(255, 255, 255, 0.78)",
    borderRadius: "22px",
    border: "1px solid rgba(169, 135, 255, 0.20)",
    boxShadow: "0 12px 30px rgba(40, 20, 80, 0.12)",
    padding: "clamp(18px, 3vw, 34px)",
    animation: "fadeInUp 0.9s ease-out",
    backdropFilter: "blur(8px)",
  },

  topRow: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "clamp(16px, 3vw, 28px)",
    flexWrap: "wrap", // ✅ stacks on small screens
    marginBottom: "clamp(12px, 2vw, 18px)",
  },

  imageContainer: {
    flex: "0 1 240px",
    display: "flex",
    justifyContent: "center",
  },

  image: {
    width: "clamp(140px, 26vw, 220px)",
    height: "clamp(140px, 26vw, 220px)",
    objectFit: "cover",
    borderRadius: "50%",
    border: "4px solid rgba(156, 122, 255, 0.55)",
    boxShadow: "0 10px 22px rgba(40, 20, 80, 0.15)",
    background: "rgba(255,255,255,0.9)",
  },

  headerBlock: {
    flex: "1 1 320px",
    minWidth: "min(520px, 100%)",
    textAlign: "center",
    padding: "6px 0",
    position: "relative",
  },

  heading: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: "clamp(2.0rem, 4.5vw, 3.1rem)",
    color: "#6B34D9",
    margin: "0 0 8px 0",
    letterSpacing: "0.2px",
  },

  subtitle: {
    margin: 0,
    fontSize: "clamp(0.95rem, 1.6vw, 1.05rem)",
    color: "rgba(40, 20, 80, 0.72)",
    lineHeight: 1.5,
  },

  content: {
    maxWidth: "820px",
    margin: "0 auto",
    paddingTop: "clamp(10px, 1.5vw, 16px)",
  },

  paragraph: {
    fontSize: "clamp(1rem, 1.6vw, 1.12rem)",
    lineHeight: 1.85,
    color: "rgba(25, 18, 40, 0.86)",
    marginBottom: "clamp(12px, 1.8vw, 16px)",
  },

  callout: {
    marginTop: "clamp(12px, 2vw, 18px)",
    padding: "clamp(14px, 2.2vw, 18px)",
    borderRadius: "18px",
    border: "1px solid rgba(156, 122, 255, 0.22)",
    background:
      "linear-gradient(180deg, rgba(243, 237, 255, 0.85) 0%, rgba(255, 255, 255, 0.85) 100%)",
    boxShadow: "0 10px 22px rgba(40, 20, 80, 0.08)",
  },

  calloutTitle: {
    margin: "0 0 10px 0",
    fontSize: "clamp(1.05rem, 1.8vw, 1.2rem)",
    fontWeight: 800,
    color: "#5A2FC6",
  },

  list: {
    margin: 0,
    paddingLeft: "1.1rem",
  },

  listItem: {
    marginBottom: "8px",
    fontSize: "clamp(0.98rem, 1.5vw, 1.06rem)",
    color: "rgba(25, 18, 40, 0.82)",
    lineHeight: 1.6,
  },
};
