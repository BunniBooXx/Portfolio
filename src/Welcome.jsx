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
        width="1920"
        height="1080"
        loading="eager"
        fetchpriority="high"
      />

      <div style={styles.heroSection}>
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
        @keyframes float {
          0%, 100% { transform: translate(-50%, -50%) translateY(0); }
          50% { transform: translate(-50%, -50%) translateY(-5px); }
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
    padding: '20px',
  },
  backgroundImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    backgroundPosition: 'center',
    zIndex: 1,
    backfaceVisibility: 'hidden',
  },
  heroSection: {
    position: 'relative',
    zIndex: 2,
    width: '100%',
    height: '100%',
  },
  heroTitle: {
    position: 'absolute',
    top: '40%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(2rem, 5vw + 1rem, 5rem)',
    color: '#f48fb1',
    fontWeight: 'bold',
    animation: 'float 3s ease-in-out infinite',
    textShadow: '2px 2px 4px rgba(0,0,0,0.4)',
    padding: '0.5em 1em',
    background: 'rgba(255, 255, 255, 0.4)',
    borderRadius: '12px',
    backdropFilter: 'blur(4px)',
    textAlign: 'center',
  },
  subtitle: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Dancing Script', cursive",
    fontSize: 'clamp(1rem, 3vw + 0.5rem, 3rem)',
    color: '#fff',
    textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
    animation: 'float 3s ease-in-out infinite',
    textAlign: 'center',
  },
  ctaButton: {
    position: 'absolute',
    top: '60%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontFamily: "'Dancing Script', cursive",
    padding: '0.75em 1.5em',
    backgroundColor: '#d4126b',
    color: '#ffffff',
    borderRadius: '20px',
    fontSize: 'clamp(1rem, 2.5vw + 0.5rem, 2rem)',
    fontWeight: 'bold',
    boxShadow: '0 3px 10px rgba(212, 18, 107, 0.3)',
    textDecoration: 'none',
    transition: '0.3s ease-in-out',
    animation: 'float 3s ease-in-out infinite',
    textAlign: 'center',
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
