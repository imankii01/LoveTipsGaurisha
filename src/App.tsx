import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DailyTipsPage from './pages/DailyTipsPage';
import AskGurishaPage from './pages/AskGurishaPage';
import ConfessionsPage from './pages/ConfessionsPage';
import LoveLanguagePage from './pages/LoveLanguagePage';
import QuizzesPage from './pages/QuizzesPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const handlePageChange = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation currentPage={currentPage} onPageChange={handlePageChange} />
        <Routes>
          <Route path="/" element={<HomePage onPageChange={handlePageChange} />} />
          <Route path="/tips" element={<DailyTipsPage onPageChange={handlePageChange} />} />
          <Route path="/ask" element={<AskGurishaPage onPageChange={handlePageChange} />} />
          <Route path="/confessions" element={<ConfessionsPage onPageChange={handlePageChange} />} />
          <Route path="/love-language" element={<LoveLanguagePage onPageChange={handlePageChange} />} />
          <Route path="/quizzes" element={<QuizzesPage onPageChange={handlePageChange} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;