import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { UniversitiesPage } from './pages/UniversitiesPage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-phoenix-navy selection:bg-phoenix-magenta/30">
        <Navbar />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/universities" element={<UniversitiesPage />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}
