import React, { useState, useEffect } from "react";
import { getCourses } from "../../service/courses.js";
import { getCategory } from "../../service/category.js";
import CourseList from "../Layout/course/CoursesList";

export default function CoursesPage() {
	const [coursesData, setCoursesData] = useState([]);
	const [searchText, setSearchText] = useState("");

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
					<SearchCourse setSearchText={setSearchText} />
					<CourseList
						coursesData={coursesData}
						searchText={searchText}
						coursesPerPage={9}
						scrollToTop={true}
					/>
				</div>
			</main>
		</>
	);
}

function SearchCourse({ setSearchText }) {
	const [categoryData, setCategoryData] = useState([]);
	useEffect(() => {
		const fetchCategory = async () => {
			try {
				const fetchedCategory = await getCategory();
				setCategoryData(fetchedCategory);
			} catch (error) {
				console.error("Error fetching category:", error);
			}
		};
		fetchCategory();
	}, []);

	function handleSearch(event) {
		setSearchText(event.target.value);
	}

	const dataSearching = ["All"];
	if (categoryData.content) {
		dataSearching.push(
			...categoryData.content.map((category) => {
				return category.name;
			})
		);
	} else if (categoryData[0] && categoryData[0].content) {
		dataSearching.push(
			...categoryData[0].content.map((category) => {
				return category.name;
			})
		);
	}
	return (
		<div className="pt-10 w-full flex items-center justify-center flex-col gap-12">
			<input
				className="py-4 px-10 min-w-[746px] rounded-lg border-[1.5px] border-[#28293899A]"
				type="text"
				placeholder="Searching ...."
				onChange={handleSearch}
			/>
			<ul className="flex justify-center items-center gap-10 text-[#282938] text-lg">
				{dataSearching.map((data, index) => (
					<button
						key={index}
						className={`cursor-pointer ${
							index === 0
								? "text-[#2405F2]"
								: "text-gray-500 hover:text-[#2405F2]"
						}`}
					>
						{data}
					</button>
				))}
			</ul>
		</div>
	);
}
