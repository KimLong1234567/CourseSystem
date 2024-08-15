import React, { useState, useEffect } from "react";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import CourseList from "../Layout/course/CoursesList.jsx";
import { getCourses } from "../../service/courses.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import IconHome from "../../img/homePageSmall.png";

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
				{/* Hero section */}
				<div className="bg-[#1C1E53]">
					<div className="max-w-screen-xl h-[600px]  mx-auto px-12">
						<div className="h-5/6 flex justify-center items-center gap-10 animate-fadeIn">
							<div className="w-1/2 h-full mx-auto flex flex-col justify-center ">
								<h1 className="text-5xl font-bold  text-white">
									Courses That Change Your Life
								</h1>
								<p className="text-white text-lg mt-8">
									[ANHLONG] is a course registration service that uses the
									world's leading technology to bring great user experiences - a
									bridge connecting students and centers.
								</p>
								<div className="mt-16">
									<button className="bg-[#FCD980] text-[#1C1E53]  px-10 py-4 rounded-md text-xl font-semibold hover:bg-yellow-200">
										Get Started
									</button>
									<button className="text-white  px-10 py-4 rounded-md text-xl font-semibold hover:font-bold">
										Learn More
										<FontAwesomeIcon className="ml-3" icon={faArrowRight} />
									</button>
								</div>
							</div>
							<div className="w-1/2 h-full flex justify-center items-center">
								<img src={IconHome} alt="" className="w-10/12" />
							</div>
						</div>
					</div>
				</div>
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex flex-col">
					{/* Render Courses */}
					<h2 className="text-3xl font-semibold text-center">
						Explore Our Popular Courses
					</h2>
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
