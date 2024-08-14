import React, { useState, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import CourseList from "../Layout/course/CoursesList.jsx";
import { getCourses } from "../../service/courses.js";

export default function HomePage() {
	const [coursesData, setCoursesData] = useState([]);
	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const fetchedCourses = await getCourses();
				setCoursesData(fetchedCourses);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, []);
	return (
		<>
			<Header />
			<main>
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex flex-col">
					{/* Render Courses */}
					<CourseList
						coursesData={coursesData}
						coursesPerPage={3}
						scrollToTop={false}
					/>
				</div>
			</main>
			<Footer />
		</>
	);
}
