import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import MainContent from './pages/mainContent/mainContent';
import ErrorPage from './pages/error/ErrorPage';
import AdminCategory from './pages/Layout/AdminCategory/adminCategory';
import AdminContent from './pages/Layout/AdminStudent/adminStudent';
import AdminCompany from './pages/Layout/AdminCompany/adminCompany';
import AdminCourses from './pages/Layout/AdminCourses/adminCourses';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainContent />}>
          <Route path="/admin/student" element={<AdminContent />} />
          <Route path="/admin/category" element={<AdminCategory />} />
          <Route path="/admin/company" element={<AdminCompany />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
        </Route>
      </Routes>
      <Routes>
        <Route path="/admin" element={<MainContent />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/LogIn" element={<LogInPage />} />
        {/* Error page */}
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
