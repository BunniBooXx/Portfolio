// ContactMe.jsx

import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faLinkedin } from '@fortawesome/free-brands-svg-icons';
import './ContactMe.css'; // Import the stylesheet

const ContactMe = () => {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs.sendForm('service_cc7dukm', 'template_59litsq', form.current, 'b3f7LghfO8lhnUG50')
      .then((result) => {
        console.log(result.text);
        console.log("message sent")
      }, (error) => {
        console.log(error.text);
      });
  };

  return (
    <div className="contact-container">
      <form className="contact-form" ref={form} onSubmit={sendEmail}>
        <h1 className="title">Kawaii Contact Form</h1>

        <label className="input-label">Your Name ♡</label>
        <input type="text" name="user_name" className="input-field" placeholder="Your cute name" />

        <label className="input-label">Your Email ✉</label>
        <input type="email" name="user_email" className="input-field" placeholder="Your adorable email" />

        <label className="input-label">Your Message 💬</label>
        <textarea name="message" className="input-field" placeholder="Your sweet message" />

        <button type="submit" className="submit-button">Send Kawaii Message</button>
      </form>

      <div className="social-icons">
        <a href="https://github.com/BunniBooXx" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faGithub} className="social-icon" />
        </a>
        <a href="https://www.linkedin.com/in/jaqueline-smith-237366238/" target="_blank" rel="noopener noreferrer">
          <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
        </a>
      </div>
    </div>
  );
};

export default ContactMe;

