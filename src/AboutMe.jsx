// AboutMe.jsx
import React from 'react';
import myImage from '../src/images/portfolio_character_image.jpg';
import './AboutMe.css'; // Import the CSS file for styling

export default function AboutMe() {
  return (
    <div className="about-me-container">
      <div className="content">
        <h1>About Me</h1>
        <p>
          Hello! I'm originally from NYC and recently moved to a small town in PA to live with family
          and switch careers. Through coding, I've discovered a passion that I find both challenging
          and enjoyable. Even debugging brings a sense of satisfaction and accomplishment.
        </p>
        <p>
          I love coding because of the joy it brings, and I also have a soft spot for anime and related
          interests.
        </p>
      </div>
      <div className="image-container">
        {/* Use the myImage variable as the image source */}
        <img src={myImage} alt="Me" />
      </div>
    </div>
  );
}


