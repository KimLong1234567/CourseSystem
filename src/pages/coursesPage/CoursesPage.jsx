import React, { useState, useEffect } from "react";
import { getCourses, getCoursesByCategory } from "../../service/courses.js";
import { getCategory } from "../../service/category.js";
import CourseList from "../../components/course/CoursesList.jsx";

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
			<main className="min-h-screen">
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex flex-col">
					<SearchCourse
						setSearchText={setSearchText}
						setCoursesData={setCoursesData}
					/>
					{coursesData === undefined ? (
						<div className="flex justify-center items-center p-10">
							<h3 className="text-2xl font-medium">Data not found !</h3>
						</div>
					) : (
						<CourseList
							coursesData={coursesData}
							searchText={searchText}
							coursesPerPage={9}
							scrollToTop={true}
						/>
					)}
				</div>
			</main>
		</>
	);
}

function SearchCourse({ setSearchText, setCoursesData }) {
	const [categoryData, setCategoryData] = useState([]);
	const [selectedCategory, setSelectedCategory] = useState("All");

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

	const dataSearching = [];
	if (categoryData.content) {
		dataSearching.push(
			...categoryData.content.map((category) => {
				return category;
			})
		);
	} else if (categoryData[0] && categoryData[0].content) {
		dataSearching.push(
			...categoryData[0].content.map((category) => {
				return category;
			})
		);
	}

	const handleFilter = async (e, id) => {
		e.preventDefault();
		setSelectedCategory(id);
		const dataCategory = await getCoursesByCategory(id);
		setCoursesData(dataCategory);
	};

	const handleAllCategories = async () => {
		try {
			setSelectedCategory("All");
			const fetchedCategory = await getCategory();
			setCategoryData(fetchedCategory);
			const allCourses = await getCourses();
			setCoursesData(allCourses);
		} catch (error) {
			console.error("Error fetching all categories:", error);
		}
	};

	return (
		<div className="pt-10 w-full flex items-center justify-center flex-col gap-12">
			<input
				className="py-4 px-10 min-w-[746px] rounded-lg border-[1.5px] border-[#28293899A]"
				type="text"
				placeholder="Searching ...."
				onChange={handleSearch}
			/>
			<ul className="flex justify-center items-center gap-10 text-[#282938] text-lg">
				<button
					onClick={handleAllCategories}
					className={`cursor-pointer ${
						selectedCategory === "All" ? "text-[#2405F2]" : "text-gray-500"
					}`}
				>
					All
				</button>
				{dataSearching.map((data, index) => (
					<button
						onClick={(e) => handleFilter(e, data.id)}
						key={index}
						className={`cursor-pointer ${
							selectedCategory === data.id ? "text-[#2405F2]" : "text-gray-500"
						} hover:text-[#2405F2]`}
					>
						{data.name}
					</button>
				))}
			</ul>
		</div>
	);
}
