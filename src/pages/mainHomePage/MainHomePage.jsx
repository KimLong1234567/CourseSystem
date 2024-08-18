import React, { useState, useEffect } from "react";
import HeroHomePage from "../Layout/DescHomePage/heroHomePage.jsx";
import Collaboration from "../Layout/DescHomePage/collaboration.jsx";
import CourseList from "../Layout/course/CoursesList.jsx";
import DetailHomePage from "../Layout/DescHomePage/detailHomePage.jsx";
import { getCourses } from "../../service/courses.js";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import AboutUS from "../Layout/DescHomePage/aboutUS.jsx";
import RateHomePage from "../Layout/DescHomePage/rateHomePage.jsx";
import RegisterHomepage from "../Layout/DescHomePage/registerHomepage.jsx";

export default function MainHomePage() {
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
			<main>
				{/* Hero section */}
				<HeroHomePage />
				{/* Intro collaboration */}
				<Collaboration />

				<div className="max-w-screen-xl mx-auto  py-7 flex flex-col">
					{/* Benefit */}
					<DetailHomePage />
					<AboutUS />
					{/* Render Courses */}
					<div className="flex justify-between items-center gap-10">
						<h2 className="text-4xl font-semibold text-center">
							Explore Our Popular Courses
						</h2>
						<Link
							to="/CoursesPage"
							className="text-xl font-medium text-[#282938] flex justify-center items-center gap-2 mr-10 hover:border-b-2 border-[#282938]"
						>
							See more <FontAwesomeIcon icon={faArrowRight} />
						</Link>
					</div>
					<CourseList
						coursesData={coursesData}
						coursesPerPage={3}
						scrollToTop={false}
					/>
				</div>
				{/* Rate */}
				<RateHomePage />
				<RegisterHomepage />
			</main>
		</>
	);
}
