import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Welcome from "./Welcome";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Projects from "./Projects";
import Resume from "./Resume";

export default function App() {
  return (
    <Router>
      <div className="app-shell">
        <header className="app-header">
          <Navbar />
        </header>

        <main className="app-main">
          {/* ✅ this wrapper is what we make "fill" */}
          <div className="route-shell">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/aboutme" element={<AboutMe />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </div>
        </main>

        <footer className="app-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}
