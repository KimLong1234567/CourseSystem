import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LogInPage from './pages/sideBar/sideBar';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LogInPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
