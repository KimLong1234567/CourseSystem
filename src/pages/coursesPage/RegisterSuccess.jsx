import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export default function RegisterSuccess() {
	const location = useLocation();
	const { courseData } = location.state || {};
	return (
		<main className="px-16 py-14 flex flex-col justify-center overflow-hidden max-md:px-2">
			<div className="px-20 py-20 flex items-center justify-center gap-40 bg-white shadow-lg overflow-hidden h-full w-full max-lg:flex-col">
				<div>
					<img src="/img/imgThanks.png" alt="" />
				</div>
				<div>
					<div>
						<h1 className="text-5xl font-bold  text-[#1C1E53] ">
							Congratulations,
						</h1>
						<h1 className="text-5xl font-bold  text-[#1C1E53] ">
							you have successfully registered!
						</h1>
					</div>
					<p className="max-w-[700px] text-[#282938] text-xl opacity-70 py-7">
						Thank you for choosing [ANHLONG], your application will be processed
						and sent to your email <strong>"{courseData.student.email}"</strong>{" "}
						as soon as possible.
					</p>
					<button className=" bottom-0 bg-[#FCD980] hover:bg-yellow-200 px-10 py-3 rounded-md text-[#282938] text-lg font-bold flex gap-2 justify-center items-center">
						{" "}
						<FontAwesomeIcon icon={faArrowLeft} className="" />
						<Link to="/" className="">
							Back to Home Page
						</Link>
					</button>
				</div>
			</div>
		</main>
	);
}
