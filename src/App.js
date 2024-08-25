import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LogInPage from './pages/LogInPage/LogInPage';
import MainContent from './pages/mainContent/mainContent';
import ErrorPage from './pages/error/ErrorPage';

import AdminCategory from './components/AdminCategory/adminCategory';
import AdminContent from './components/AdminUser/adminUser';
import AdminCompany from './components/AdminCompany/adminCompany';
import AdminCourses from './components/AdminCourses/adminCourses';
import CoursePage from './pages/coursesPage/CoursesPage';
import MainHomePage from './pages/mainHomePage/MainHomePage';

import Register from './pages/coursesPage/Register';
import RegisterSuccess from './pages/coursesPage/RegisterSuccess';
import ContactPage from './pages/contactPage/ContactPage';
import MainTeacherPage from './pages/mainTeacherPage/mainTeacherPage';
import TeacherStudent from './components/TeacherStudent/teacherStudent';
import AdminStudent from './components/AdminUser/adminStudent';
import ResetPassword from './pages/resetPassword/resetPassword';
import Enrollment from './components/AdminEnrollment/adminEnrollment';
import AdminRole from './components/AdminRole/adminRole';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main content route */}
        <Route path="/admin/Login" element={<LogInPage />} />
        <Route element={<MainContent />}>
          <Route path="/admin/users" element={<AdminContent />} />
          <Route path="/admin/students" element={<AdminStudent />} />
          <Route path="/admin/categories" element={<AdminCategory />} />
          <Route path="/admin/companies" element={<AdminCompany />} />
          <Route path="/admin/courses" element={<AdminCourses />} />
          <Route path="/admin/enrollment" element={<Enrollment />} />
          <Route path="/admin/role" element={<AdminRole />} />
          <Route path="/admin/*" element={<ErrorPage />} />
        </Route>

        <Route path="/teacher/Login" element={<LogInPage />} />
        <Route path="/teacher/resetPassword" element={<ResetPassword />} />
        <Route element={<MainTeacherPage />}>
          <Route path="/teacher/student" element={<TeacherStudent />} />
          <Route path="/teacher/courses" element={<AdminCourses />} />
          <Route path="/teacher/*" element={<ErrorPage />} />
        </Route>

        <Route element={<HomePage />}>
          <Route path="/" element={<MainHomePage />} />
          <Route path="/CoursesPage" element={<CoursePage />} />
          <Route path="/Register/:id" element={<Register />} />
          <Route path="/RegisterSuccess" element={<RegisterSuccess />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
