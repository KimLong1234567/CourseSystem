import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCourses } from "../../service/courses.js";
import CourseList from "../Layout/course/CoursesList";

export default function CoursesPage() {
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
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex flex-col">
					<SearchCourse />
					<CourseList
						coursesData={coursesData}
						coursesPerPage={9}
						scrollToTop={true}
					/>
				</div>
			</main>
		</>
	);
}

function SearchCourse() {
	const dataSearching = ["UX UI", "JavaScript", "TOIEC", "DESIGN", "GIT"];
	return (
		<div className="pt-10 w-full flex items-center justify-center flex-col gap-12">
			<input
				className="py-4 px-10 min-w-[746px] rounded-lg border-[1.5px] border-[#28293899A]"
				type="text"
				placeholder="Searching ...."
			/>
			<ul className="flex justify-center items-center gap-10 text-[#282938] text-lg">
				{dataSearching.map((data, index) => (
					<li
						key={index}
						className={`cursor-pointer ${
							index === 0
								? "text-[#2405F2]"
								: "text-gray-500 hover:text-[#2405F2]"
						}`}
					>
						<Link to={`/${data}`}>{data}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
