import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Welcome.css';

export default function Welcome() {
  const [sparkles, setSparkles] = useState([]);
  const [backgroundLoaded, setBackgroundLoaded] = useState(false);

  // Preload Background Image
  useEffect(() => {
    const img = new Image();
    img.src = '/cotton-candy-castle.webp';
    img.onload = () => setBackgroundLoaded(true);
  }, []);

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
    <div className="welcome-container">
      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">Jaqueline Smith 💖</h1>
        <p className="hero-subtitle">✨ Software Engineer | Full-Stack Magic | React & Firebase ✨</p>
        <p className="hero-description">
            I craft dreamy, high-performance applications with beautiful UI/UX & seamless functionality.
            Passionate about building delightful user experiences that feel as magical as they look! 🎀
        </p>
        <Link to="/projects" className="cta-button">
          See My Creations ✨
        </Link>
      </div>

      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`,
          }}
        >
          ✨
        </div>
      ))}

      {/* Background Image Lazy Loaded */}
      {backgroundLoaded && (
        <div 
          className="background-image"
          style={{ backgroundImage: `url('/cotton-candy-castle.webp')` }}
        />
      )}

      <div className="floating-hearts">
        {'💖💝💕'.split('').map((heart, i) => (
          <div key={i} className="floating-heart" style={{ animationDelay: `${i * 0.5}s` }}>
            {heart}
          </div>
        ))}
      </div>
    </div>
  );
}


