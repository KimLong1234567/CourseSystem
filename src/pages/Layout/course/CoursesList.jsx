import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faFlagCheckered,
	faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

function TransferDate(timestamp) {
	const date = new Date(timestamp * 1000);

	const day = date.getDate();
	const month = date.getMonth() + 1;
	const year = date.getFullYear();

	const formattedDate = `${day}/${month}/${year}`;
	return formattedDate;
}
function CourseList({ coursesData, coursesPerPage, scrollToTop }) {
	const [currentPage, setCurrentPage] = useState(1);

	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = coursesData.slice(
		indexOfFirstCourse,
		indexOfLastCourse
	);
	const totalPages = Math.ceil(coursesData.length / coursesPerPage);

	useEffect(() => {
		if (scrollToTop) {
			window.scrollTo({ top: 0, behavior: "smooth" });
		}
	}, [currentPage, scrollToTop]);
	const imgPathDemo =
		"https://plus.unsplash.com/premium_photo-1661596686441-611034b8077e?q=80&w=3348&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
	return (
		<div>
			<div className="my-10 grid grid-cols-3 gap-4">
				{currentCourses.map((course) => (
					<Link
						to={`/register/${course.id}`}
						state={{ course: course }}
						key={course.id}
					>
						<section className="w-96 shadow-md hover:shadow-xl cursor-pointer animate-fadeIn">
							<div className="w-full rounded-lg">
								<img
									className="w-full h-60 object-cover rounded-t-lg"
									src={course.image === null ? imgPathDemo : course.image}
									alt={course.name}
								/>
							</div>
							<div className="px-4 py-6 max-w-[352px] h-40 overflow-hidden">
								<h2 className="text-2xl font-medium text-[#282938] line-clamp-1">
									{course.name}
								</h2>
								<p className="text-[#282938] text-lg opacity-60 line-clamp-3">
									{course.description}
								</p>
							</div>
							<div className="px-4 pb-6 flex justify-between items-center opacity-60">
								<span className="flex justify-center items-center gap-2">
									<FontAwesomeIcon icon={faHourglassEnd} />
									{TransferDate(course.dateStart)}
								</span>
								<span className="flex justify-center items-center gap-2">
									<FontAwesomeIcon icon={faFlagCheckered} />
									{TransferDate(course.dateEnd)}
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
		</div>
	);
}
export default CourseList;
