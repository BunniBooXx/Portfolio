// App.jsx — fixed structure (no nested <main>) ✅
import "./App.css";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import Welcome from "./Welcome";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Projects from "./Projects";
import Resume from "./Resume";

function AppShell() {
  const location = useLocation();
  const isProjects = location.pathname === "/projects";
  return (
    <div className="app-shell">
      <header className="app-header">
        <Navbar />
      </header>

      <main className={`app-main ${isProjects ? "app-main--projects" : ""}`} aria-label="Main content">
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/aboutme" element={<AboutMe />} />
          <Route path="/contact" element={<ContactMe />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/resume" element={<Resume />} />
        </Routes>
      </main>

      <div className="app-footer" role="contentinfo">
        <Footer />
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppShell />
    </Router>
  );
}
