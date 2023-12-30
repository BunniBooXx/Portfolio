// Import necessary components
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './Welcome';
import Footer from './Footer';
import Navbar from './Navbar';
import AboutMe from './AboutMe';
import ContactMe from './ContactMe';
import Projects from './Projects'; // Import the Projects component

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/aboutme" element={<AboutMe />} />
        <Route path="/contact" element={<ContactMe />} />
        <Route path="/projects" element={<Projects />} /> {/* Add the Projects route */}
        <Route />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

