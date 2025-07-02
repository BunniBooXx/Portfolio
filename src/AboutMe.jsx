import React from 'react';
import myImage from '../src/images/headshot.webp';

export default function AboutMe() {
  return (
    <div style={styles.wrapper}>
      <div style={styles.container}>
        <div style={styles.imageContainer}>
          <img src={myImage} alt="Jaqueline headshot" style={styles.image} />
        </div>
        <div style={styles.content}>
          <h1 style={styles.heading}>About Me 💖</h1>
          <p style={styles.paragraph}>
            Hello! I'm <strong>Jaqueline</strong>, and I've recently made the move from the hustle and bustle of NYC
            to a quiet town in Pennsylvania to be closer to family. This change marked a shift in my career, as I
            transitioned into the tech field through a coding bootcamp called <strong>Coding Temple</strong>.
          </p>
          <p style={styles.paragraph}>
            Discovering the world of coding has been a game-changer for me. It's not just about writing lines of code;
            it's a form of creative expression and problem-solving that I've come to enjoy. This journey, set against
            the backdrop of my new small-town life, has been both fulfilling and transformative.
          </p>
          <p style={styles.paragraph}>
            I'm excited about what lies ahead in the tech world and am eager to apply my newfound skills. The decision
            to make this move was more than just about a career shift; it's been about finding that perfect balance
            between work and personal life.
          </p>
        </div>
      </div>

      {/* Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    width: '100%',
    minHeight: '100vh',
    padding: '40px 20px',
    background: 'linear-gradient(135deg, #ffebf0 0%, #ffe8fa 100%)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    maxWidth: '1200px',
    width: '100%',
    background: 'rgba(255, 255, 255, 0.8)',
    borderRadius: '20px',
    boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '30px',
    gap: '30px',
    animation: 'fadeInUp 1s ease-out',
  },
  imageContainer: {
    flex: '1 1 250px',
    maxWidth: '300px',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    maxWidth: '250px',
    borderRadius: '50%',
    border: '4px solid #eaa3c6',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  content: {
    flex: '2 1 400px',
    maxWidth: '600px',
  },
  heading: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: '2.5rem',
    color: '#d4126b',
    marginBottom: '20px',
    textAlign: 'center',
  },
  paragraph: {
    fontSize: '1.1rem',
    lineHeight: '1.8',
    color: '#333',
    marginBottom: '15px',
  },
};
