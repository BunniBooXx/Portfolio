// Projects.jsx

import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="kawaii-title">Kawaii Projects</h1>

      <div className="project-card">
        <h2 className="project-title">Petite Planner</h2>
        <p className="project-bio">A delightful to do list app to keep track of your daily tasks.</p>
        <a href="https://glistening-rugelach-21389b.netlify.app" className="project-link" target="_blank" rel="noopener noreferrer">
          Explore To Do List
        </a>
      </div>

      <div className="project-card">
        <h2 className="project-title">Bunny Bubble Nails</h2>
        <p className="project-bio"> Custom Press On Nails Shopping Site</p>
        <a href="https://bunnybubblenails.com" className="project-link" target="_blank" rel="noopener noreferrer">
          Discover Ecommerce App
        </a>
      </div>

      <div className="project-card">
        <h2 className="project-title">Otome Game</h2>
        <p className="project-bio">Immerse yourself in a charming otome game with captivating characters.</p>
        <a href="https://arielles-code.netlify.app/" className="project-link" target="_blank" rel="noopener noreferrer">
          Play Otome Game
        </a>
      </div>
    </div>
  );
};

export default Projects;
