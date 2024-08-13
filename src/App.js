import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/sideBar/sideBar';
import MainContent from './pages/mainContent/mainContent';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<MainContent />} />
        <Route path="/" element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
