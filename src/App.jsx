import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import Welcome from "./Welcome";
import Footer from "./Footer";
import Navbar from "./Navbar";
import AboutMe from "./AboutMe";
import ContactMe from "./ContactMe";
import Projects from "./Projects";
import Resume from "./Resume";
import HomeOrbBackground from "./HomeOrbBackground";

function AppShell() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="app-shell">
      {isHome && <HomeOrbBackground />}

      <header className="app-header">
        <div className="app-header-inner">
          <Navbar />
        </div>
      </header>

      <main className="app-main" aria-label="Main content">
        <div className="app-page">
          <div className="app-content">
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/aboutme" element={<AboutMe />} />
              <Route path="/contact" element={<ContactMe />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/resume" element={<Resume />} />
            </Routes>
          </div>

          <div className="app-footer">
            <div className="app-footer-inner">
              <Footer />
            </div>
          </div>
        </div>
      </main>
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
