import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
  return (
    <div className="navbar bg-base-100">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl">
          Home
        </Link>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1">
          <li>
            <Link to="/aboutme">About Me</Link>
          </li>
          <li>
            <details>
              <summary>
                More
              </summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <Link to="/projects">Projects</Link>
                </li>
              <li>
                <Link to="/resume">Resume</Link></li>
              </ul>
            </details>
          </li>
        </ul>
      </div>
    </div>
  );
}




