// AboutMe.jsx
import React from 'react';
import myImage from '../src/images/portfolio_character_image.jpg';
import './AboutMe.css'; // Import the CSS file for styling

export default function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="content">
        <p>
        Hello! I'm Jaqueline, and I've recently made the move from the hustle and bustle of NYC to a quiet town in Pennsylvania to be closer to family. This change marked a shift in my career, as I transitioned into the tech field through a coding bootcamp called Coding Temple.

        Discovering the world of coding has been a game-changer for me. It's not just about writing lines of code; it's a form of creative expression and problem-solving that I've come to enjoy. This journey, set against the backdrop of my new small-town life, has been both fulfilling and transformative.

        I'm excited about what lies ahead in the tech world and am eager to apply my newfound skills. The decision to make this move was more than just about a career shift; it's been about finding that perfect balance between work and personal life.
        </p>
      </div>
      <div className="image-container">
        {/* Use the myImage variable as the image source */}
        <img src={myImage} alt="Me" />
      </div>
    </div>
  );
}


