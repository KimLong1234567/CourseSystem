import React from "react";
import { Link, NavLink } from "react-router-dom";

function NavBar() {
	return (
		<nav>
			<ul className="flex items-center justify-center gap-8">
				<li className="px-2 text-sm">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive ? "border-b-2 border-white" : "hover:border-b-[1px]"
						}
					>
						HOME
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<NavLink
						to="/CoursesPage"
						className={({ isActive }) =>
							isActive ? "border-b-2 border-white" : "hover:border-b-[1px]"
						}
					>
						COURSES
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<a href="#contact" className=" border-white hover:border-b-[1px]">
						CONTACT
					</a>
				</li>
				<li className="px-2 text-sm">
					<NavLink
						to="/blogPage"
						className=" border-white hover:border-b-[1px]"
					>
						BLOG
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default function Header() {
	return (
		<header className="bg-[#1C1E53] text-white">
			<div className="max-w-screen-xl mx-auto px-12 py-7 flex justify-between items-center">
				{/* logo */}
				<div className="font-mono">
					<h2 className="text-2xl font-semibold">[ANHLONG]</h2>
				</div>
				{/* NavBar */}
				<NavBar />
				{/* Login/Register Button  */}
				<div className="text-[#282938] text-lg font-medium flex justify-center items-center gap-3">
					<button className="px-4 py-2 bg-[#FCD980] rounded-sm hover:bg-yellow-300">
						Log In
					</button>
					<button className="px-4 py-2 bg-[#FCD980] rounded-sm hover:bg-yellow-300">
						Sign Up
					</button>
				</div>
			</div>
		</header>
	);
}
