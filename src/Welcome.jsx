import React from 'react';
import myImage from '../src/images/teddybackground.jpg';
import './Welcome.css'; // Import the CSS file for styling

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="bubble">
          <h1>Welcome</h1>
          {/* Other content goes here */}
        </div>
      </div>
      <div className="background-image" style={{ backgroundImage: `url(${myImage})` }}></div>
    </div>
  );
}

