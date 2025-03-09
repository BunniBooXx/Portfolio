import React from 'react';
import './Resume.css';

const Resume = () => {
  return (
    <div className="resume-container">
      <h1>My Resume</h1>
      <p>You can view my resume below:</p>
      <div className="pdf-viewer">
        <iframe
          src="/Jaqueline-Smith-Resume.pdf"
          title="Resume"
          style={{ border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default Resume;


