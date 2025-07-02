import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Welcome() {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (sparkles.length < 20) {
        const newSparkle = {
          id: Date.now(),
          x: e.clientX,
          y: e.clientY,
        };
        setSparkles((prev) => [...prev.slice(-19), newSparkle]);
        setTimeout(() => {
          setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== newSparkle.id));
        }, 1000);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [sparkles]);

  return (
    <div style={styles.welcomeContainer}>
      <img 
        src="/cotton-candy-castle.png" 
        alt="Cotton Candy Castle" 
        style={styles.backgroundImage}
      />

      <div style={styles.heroContent}>
        <h1 style={styles.heroTitle}>Jaqueline Smith</h1>
        <h2 style={styles.subtitle}>Full Stack Engineer</h2>
        <Link to="/projects" style={styles.ctaButton}>
          See My Creations ✨
        </Link>
      </div>

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          style={{
            ...styles.sparkle,
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`
          }}
        >
          ✨
        </div>
      ))}

      <div style={styles.floatingHearts}>
        {'💖💝💕'.split('').map((heart, i) => (
          <div 
            key={i} 
            style={{
              ...styles.floatingHeart,
              animationDelay: `${i * 0.5}s`
            }}
          >
            {heart}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes floatPulse {
          0% { transform: translateY(0) scale(1); opacity: 1; }
          50% { transform: translateY(-8px) scale(1.05); opacity: 0.9; }
          100% { transform: translateY(0) scale(1); opacity: 1; }
        }

        @keyframes sparkle-fade {
          0% { opacity: 1; transform: scale(1); }
          100% { opacity: 0; transform: scale(1.5); }
        }

        @keyframes heart-float {
          0% { transform: translateY(0); opacity: 1; }
          50% { transform: translateY(-15px); opacity: 0.8; }
          100% { transform: translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

const styles = {
  welcomeContainer: {
    position: 'relative',
    width: '100%',
    height: '100vh',
    overflow: 'hidden',
    backgroundColor: '#ffebf0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    zIndex: 1,
  },
  heroContent: {
    position: 'relative',
    zIndex: 2,
    background: 'rgba(255, 255, 255, 0.5)',
    padding: '20px 30px',
    borderRadius: '12px',
    backdropFilter: 'blur(6px)',
    textAlign: 'center',
    maxWidth: '90vw',
    animation: 'floatPulse 3s ease-in-out infinite',
  },
  heroTitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(2rem, 5vw + 1rem, 4rem)',
    color: '#f48fb1',
    fontWeight: 'bold',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
    margin: '0 0 10px 0',
    wordWrap: 'break-word',
  },
  subtitle: {
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(1.2rem, 3vw + 0.5rem, 2rem)',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    margin: '0 0 15px 0',
  },
  ctaButton: {
    display: 'inline-block',
    padding: '0.75em 1.5em',
    backgroundColor: '#d4126b',
    color: '#fff',
    borderRadius: '20px',
    fontSize: 'clamp(1rem, 2vw + 0.5rem, 2rem)',
    fontWeight: 'bold',
    boxShadow: '0 3px 10px rgba(212, 18, 107, 0.3)',
    textDecoration: 'none',
    transition: '0.3s ease-in-out',
    animation: 'floatPulse 3s ease-in-out infinite',
  },
  sparkle: {
    position: 'absolute',
    fontSize: '1.2rem',
    opacity: 1,
    animation: 'sparkle-fade 1s ease-in-out forwards',
    pointerEvents: 'none',
    zIndex: 9999,
  },
  floatingHearts: {
    position: 'absolute',
    bottom: '10%',
    left: '50%',
    transform: 'translateX(-50%)',
    display: 'flex',
    gap: '10px',
  },
  floatingHeart: {
    fontSize: '1.5rem',
    opacity: 0,
    animation: 'heart-float 3s infinite ease-in-out',
  },
};
