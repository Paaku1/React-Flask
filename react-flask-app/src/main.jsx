import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App.jsx';
import Details from './components/Details.jsx';
import Dataset from './components/Dataset.jsx';
import Questionnaire from './components/Questionnaire.jsx';
import Result from './components/Result.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/details" element={<Details />} />
        <Route path="/dataset" element={<Dataset />} />
        <Route path="/questionnaire" element={<Questionnaire />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  </StrictMode>,
);