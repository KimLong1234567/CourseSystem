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
import AdminRole from './components/AdminRole/adminRole';
import Enrollment from './components/AdminEnrollment/adminEnrollment';
import PrivateRoute from './PrivateRoute/PrivateRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Route không cần bảo vệ */}
        <Route path="/admin/Login" element={<LogInPage />} />
        <Route path="/teacher/Login" element={<LogInPage />} />

        {/* Main content route bảo vệ bằng PrivateRoute */}
        <Route element={<MainContent />}>
          <Route
            path="/admin/user"
            element={<PrivateRoute element={AdminContent} />}
          />
          <Route
            path="/admin/student"
            element={<PrivateRoute element={AdminStudent} />}
          />
          <Route
            path="/admin/category"
            element={<PrivateRoute element={AdminCategory} />}
          />
          <Route
            path="/admin/company"
            element={<PrivateRoute element={AdminCompany} />}
          />
          <Route
            path="/admin/courses"
            element={<PrivateRoute element={AdminCourses} />}
          />
          <Route
            path="/admin/enrollment"
            element={<PrivateRoute element={Enrollment} />}
          />
          <Route
            path="/admin/roles"
            element={<PrivateRoute element={AdminRole} />}
          />
          <Route path="/admin/*" element={<ErrorPage />} />
        </Route>

        <Route element={<MainTeacherPage />}>
          <Route
            path="/teacher/student"
            element={<PrivateRoute element={TeacherStudent} />}
          />
          <Route
            path="/teacher/courses"
            element={<PrivateRoute element={AdminCourses} />}
          />
          <Route path="/teacher/*" element={<ErrorPage />} />
        </Route>

        {/* Các route khác */}
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
