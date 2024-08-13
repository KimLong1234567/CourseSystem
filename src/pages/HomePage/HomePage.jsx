import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../Layout/Header/Header";
import Footer from "../Layout/Footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { courseDatas } from "./courses.js";
import {
	faGraduationCap,
	faHourglassEnd,
} from "@fortawesome/free-solid-svg-icons";

function SearchCourse() {
	return (
		<div className="pt-10 w-full flex items-center justify-center flex-col gap-12">
			<input
				className="py-4 px-10 min-w-[746px] rounded-lg border-[1.5px] border-[#28293899A]"
				type="text"
				placeholder="Searching ...."
			/>
			<ul className=" flex justify-center items-center gap-10 text-[#282938] text-lg">
				<li className="text-[#2405F2] cursor-pointer">
					<Link href="#!">UX UI</Link>
				</li>
				<li className="cursor-pointer hover:text-gray-500">
					<Link href="#!">JavaScript</Link>
				</li>
				<li className="cursor-pointer hover:text-gray-500">
					<Link href="#!">TOIEC</Link>
				</li>
				<li className="cursor-pointer hover:text-gray-500">
					<Link href="#!">DESIGN</Link>
				</li>
				<li className="cursor-pointer hover:text-gray-500">
					<Link href="#!">3d</Link>
				</li>
				<li className="cursor-pointer hover:text-gray-500">
					<Link href="#!">Marketing</Link>
				</li>
			</ul>
		</div>
	);
}
export default function HomePage() {
	const [coursesData, setCoursesData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const coursesPerPage = 9; // 3 hàng x 3 cột
	useEffect(() => {
		setCoursesData(courseDatas);
	}, []);

	// Tính toán dữ liệu trang hiện tại
	const indexOfLastCourse = currentPage * coursesPerPage;
	const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
	const currentCourses = coursesData.slice(
		indexOfFirstCourse,
		indexOfLastCourse
	);

	// Tạo các trang
	const totalPages = Math.ceil(coursesData.length / coursesPerPage);

	// Cuộn lên đầu trang khi chuyển trang
	useEffect(() => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [currentPage]);

	return (
		<>
			<Header />
			<main>
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex flex-col">
					{/* Searching */}
					<SearchCourse />

					{/* Render Courses */}
					<div className="my-10 grid grid-rows-3 grid-flow-col gap-4">
						{currentCourses.map((course) => (
							<section
								key={course.id}
								className="w-96 shadow-md hover:shadow-xl cursor-pointer animate-fadeIn"
							>
								<div className="w-full rounded-lg">
									<img
										className="w-full h-60 object-cover rounded-t-lg"
										src={course.image}
										alt={course.title}
									/>
								</div>
								<div className="px-4 py-6 max-w-[352px] h-40 overflow-hidden">
									<h2 className="text-2xl font-medium text-[#282938]">
										{course.title}
									</h2>
									<p className="text-[#282938] text-lg opacity-60">
										{course.description}
									</p>
								</div>
								<div className="px-4 pb-6 flex justify-between items-center opacity-60">
									<span className="flex justify-center items-center gap-2">
										<FontAwesomeIcon icon={faHourglassEnd} />
										{course.date}
									</span>
									<span className=" flex justify-center items-center gap-2">
										<FontAwesomeIcon icon={faGraduationCap} />
										{course.students}
									</span>
								</div>
							</section>
						))}
					</div>

					{/* Pagination */}
					<div className="flex justify-center items-center space-x-2">
						<button
							onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
							disabled={currentPage === 1}
							className=" px-4 py-2 bg-gray-200 rounded hover:bg-yellow-300"
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
			</main>
			<Footer />
		</>
	);
}
