import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LogInPage from "./pages/LogInPage/LogInPage";
import HomePage from "./pages/HomePage/HomePage";
function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<HomePage />} />
				<Route path="/LogIn" element={<LogInPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
