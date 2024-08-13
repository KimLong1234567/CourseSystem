import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import MainContent from './pages/mainContent/mainContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<MainContent />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/LogIn" element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
