import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
function HeroHomePage() {
	return (
		<div className="bg-[#1C1E53]">
			<div className="max-w-screen-xl h-[600px]  mx-auto px-12">
				<div className="h-5/6 flex justify-center items-center gap-10 animate-fadeIn">
					<div className="w-1/2 h-full mx-auto flex flex-col justify-center ">
						<h1 className="text-5xl font-bold  text-white">
							Courses That Change Your Life
						</h1>
						<p className="text-white text-lg mt-8">
							[ANHLONG] is a course registration service that uses the world's
							leading technology to bring great user experiences - a bridge
							connecting students and centers.
						</p>
						<div className="mt-16">
							<Link
								to={"/CoursesPage"}
								className="bg-[#FCD980] text-[#1C1E53]  px-10 py-4 rounded-md text-xl font-semibold hover:bg-yellow-200"
							>
								Get Started
							</Link>
							<Link
								to={"/Contact"}
								className="text-white  px-10 py-4 rounded-md text-xl font-semibold hover:font-bold"
							>
								Learn More
								<FontAwesomeIcon className="ml-3" icon={faArrowRight} />
							</Link>
						</div>
					</div>
					<div className="w-1/2 h-full flex justify-center items-center">
						<img src="/img/homePageSmall.png" alt="" className="w-10/12" />
					</div>
				</div>
			</div>
		</div>
	);
}
export default HeroHomePage;
