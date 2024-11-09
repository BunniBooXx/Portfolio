import React from 'react';
import { Link } from 'react-router-dom';
import myImage from '../src/images/teddybackground.jpg';
import './Welcome.css';

export default function Welcome() {
  return (
    <div className="welcome-container">
      <div className="welcome-content">
        <div className="bubble">
          <Link to="/projects" className="welcome-link">
            <h1>Welcome</h1>
          </Link>
          {/* Other content goes here */}
        </div>
      </div>
      <div className="background-image" style={{ backgroundImage: `url(${myImage})` }}></div>
    </div>
  );
}


