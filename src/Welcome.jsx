import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import myImage from '../src/images/candy-hearts.webp';
import './Welcome.css';

export default function Welcome() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });

      // Create sparkle effect on mouse move
      const newSparkle = {
        id: Date.now(),
        x: e.clientX,
        y: e.clientY,
      };
      setSparkles(prev => [...prev, newSparkle]);
      setTimeout(() => {
        setSparkles(prev => prev.filter(sparkle => sparkle.id !== newSparkle.id));
      }, 1000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="bubble">
          <Link to="/projects" className="welcome-link">
            <h1>Welcome to My Portfolio 🌟</h1>
          </Link>
          <p className="bounce-text">Hover around to see the magic ✨</p>
        </div>
      </div>
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="sparkle"
          style={{
            left: `${sparkle.x}px`,
            top: `${sparkle.y}px`
          }}
        >
          ✨
        </div>
      ))}
      <div 
        className="background-image" 
        style={{ 
          backgroundImage: `url(${myImage})`,
          transform: `translate(
            ${mousePosition.x * -20}px, 
            ${mousePosition.y * -20}px
          ) scale(1.1)`
        }}
      />
      <div className="floating-hearts">
        {'💖💝💕'.split('').map((heart, i) => (
          <div 
            key={i} 
            className="floating-heart"
            style={{ animationDelay: `${i * 0.5}s` }}
          >
            {heart}
          </div>
        ))}
      </div>
    </div>
  );
}
