import React from 'react';
import myImage from '../src/images/teddybackground.jpg';
import './Welcome.css'; // Import the CSS file for styling

export default function Welcome() {
  return (
    <div className="welcome-container">
      {/* Content inside the welcome container */}
      <div className="welcome-content">
        <h1>Welcome</h1>
        {/* Other content goes here */}
      </div>

      {/* Background image covering the entire page */}
      <div className="background-image" style={{ backgroundImage: `url(${myImage})` }}></div>
    </div>
  );
}


