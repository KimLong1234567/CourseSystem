import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFlagCheckered,
	faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

function CourseList({ coursesData, searchText, coursesPerPage, scrollToTop }) {
	const [currentPage, setCurrentPage] = useState(1);
	const [loading, setLoading] = useState(true);

	const data = useMemo(() => {
		if (coursesData) {
			return coursesData;
		} else if (coursesData[0] && coursesData[0].content) {
			return coursesData[0].content;
		}
		return [];
	}, [coursesData]);

	useEffect(() => {
		if (data && data.length > 0) {
			setLoading(false);
		}
	}, [data]);
	console.log(data);

	const filteredCourses = data.filter((course) =>
		course.name.toLowerCase().includes(searchText.toLowerCase())
	);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = filteredCourses.slice(
		indexOfFirstCourse,
		indexOfLastCourse
	);
	const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

	useEffect(() => {
		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [currentPage, scrollToTop]);

	const imgPathDemo =
		"https://plus.unsplash.com/premium_photo-1661596686441-611034b8077e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

	return (
		<>
			{loading ? (
				<div className="flex flex-col justify-center items-center pt-10">
					<svg
						className="animate-spin h-10 w-10 mr-3 text-[#1C1E53]"
						viewBox="0 0 24 24"
					>
						<circle
							className="opacity-5"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						></circle>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
						></path>
					</svg>
					<p className="text-lg font-medium pt-4">Loading .....</p>
				</div>
			) : (
				<>
					<div className="my-10 grid grid-cols-3  gap-4 max-lg:grid-cols-1 max-md:grid-cols-1 max-lg:my-5 max-lg:mx-auto max-md:my-5 max-md:mx-auto max-xl:grid-cols-2 max-xl:mx-auto ">
						{currentCourses.map((course) => (
							<Link
								to={`/register/${course.id}`}
								state={{ course: course }}
								key={course.id}
							>
								<section className="animate-fadeIn w-96 shadow-md hover:shadow-xl cursor-pointer">
									<div className="w-full rounded-lg">
										<img
											className="w-full h-60 object-cover rounded-t-lg"
											src={course.imageUrl ? course.imageUrl : imgPathDemo}
											alt={course.category.name}
										/>
									</div>
									<div className="px-4 py-6 max-w-[352px] h-40 overflow-hidden">
										<h2 className="text-2xl font-medium text-[#282938] line-clamp-1">
											{course.name}
										</h2>
										<p className="text-[#282938] text-lg opacity-60 line-clamp-3">
											{course.description}
										</p>
										<p className="text-[#282938] text-lg opacity-60">
											<strong>Category:</strong> {course.category.name}
										</p>
										<p className="text-[#282938] text-lg opacity-60">
											<strong>Company:</strong> {course.company.name}
										</p>
									</div>
									<div className="px-4 pb-6 flex justify-between items-center opacity-60">
										<span className="flex justify-center items-center gap-2">
											<FontAwesomeIcon icon={faHourglassEnd} />
											{course.startDate}
										</span>
										<span className="flex justify-center items-center gap-2">
											<FontAwesomeIcon icon={faFlagCheckered} />
											{course.endDate}
										</span>
									</div>
								</section>
							</Link>
						))}
					</div>
					<div className="flex justify-center items-center space-x-2">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-yellow-300"
						>
							Previous
						</button>
						{Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
							<button
								key={page}
								onClick={() => setCurrentPage(page)}
								className={`px-4 py-2 rounded-sm ${
									page === currentPage
										? "bg-[#FCD980] text-[#282938]"
										: "bg-gray-200 hover:bg-yellow-300"
								}`}
							>
								{page}
							</button>
						))}
						<button
							onClick={() =>
								setCurrentPage((prev) => Math.min(prev + 1, totalPages))
							}
							disabled={currentPage === totalPages}
							className="px-4 py-2 bg-gray-200 rounded hover:bg-yellow-300"
						>
							Next
						</button>
					</div>
				</>
			)}
		</>
	);
}

export default CourseList;
