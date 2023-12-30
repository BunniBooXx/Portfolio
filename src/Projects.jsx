// Projects.jsx

import React from 'react';
import './Projects.css';

const Projects = () => {
  return (
    <div className="projects-container">
      <h1 className="kawaii-title">Kawaii Projects</h1>

      <div className="project-card">
        <h2 className="project-title">Reading List</h2>
        <p className="project-bio">A delightful reading list to keep track of your favorite books.</p>
        <a href="https://reading-list-external-website.com" className="project-link" target="_blank" rel="noopener noreferrer">
          Explore Reading List
        </a>
      </div>

      <div className="project-card">
        <h2 className="project-title">Ecommerce Application</h2>
        <p className="project-bio">An adorable ecommerce application for your kawaii shopping needs.</p>
        <a href="https://ecommerce-external-website.com" className="project-link" target="_blank" rel="noopener noreferrer">
          Discover Ecommerce App
        </a>
      </div>

      <div className="project-card">
        <h2 className="project-title">Otome Game</h2>
        <p className="project-bio">Immerse yourself in a charming otome game with captivating characters.</p>
        <a href="https://otome-game-external-website.com" className="project-link" target="_blank" rel="noopener noreferrer">
          Play Otome Game
        </a>
      </div>
    </div>
  );
};

export default Projects;
