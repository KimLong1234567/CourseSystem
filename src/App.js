import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import LogInPage from "./pages/LogInPage/LogInPage";
import MainContent from "./pages/mainContent/mainContent";
import ErrorPage from "./pages/error/ErrorPage";
import AdminCategory from "./pages/Layout/AdminCategory/adminCategory";
import AdminContent from "./pages/Layout/AdminStudent/adminStudent";
import AdminCompany from "./pages/Layout/AdminCompany/adminCompany";
import AdminCourses from "./pages/Layout/AdminCourses/adminCourses";
import CoursePage from "./pages/coursesPage/CoursesPage";
import MainHomePage from "./pages/mainHomePage/MainHomePage";
import Register from "./pages/coursesPage/Register";
import RegisterSuccess from "./pages/coursesPage/RegisterSuccess";
import ContactPage from "./pages/contactPage/ContactPage";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				{/* Main content route */}
				<Route path="/admin/LogIn" element={<LogInPage />} />
				<Route element={<MainContent />}>
					<Route path="/admin/student" element={<AdminContent />} />
					<Route path="/admin/category" element={<AdminCategory />} />
					<Route path="/admin/company" element={<AdminCompany />} />
					<Route path="/admin/courses" element={<AdminCourses />} />
					<Route path="/admin/*" element={<ErrorPage />} />
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
