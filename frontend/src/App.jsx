import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import SakuraPetals from './components/SakuraPetals/SakuraPetals';
import HomePage from './pages/HomePage';
import ManagePage from './pages/ManagePage';
import KanaPage from './pages/KanaPage';
import PractisePage from './pages/PractisePage';
import './styles/global.css';

export default function App() {
  return (
    <Router>
      <div className="app-layout">
        <SakuraPetals />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/manage" element={<ManagePage />} />
          <Route path="/kana" element={<KanaPage />} />
          <Route path="/practise" element={<PractisePage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}
