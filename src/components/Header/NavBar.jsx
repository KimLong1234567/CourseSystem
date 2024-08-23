import React from "react";
import { NavLink } from "react-router-dom";

function NavBar() {
	return (
		<nav>
			<ul className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
				<li className="px-2 text-sm">
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						HOME
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<NavLink
						to="/CoursesPage"
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						COURSES
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<a href="/contact" className=" border-white hover:border-b-[1px]">
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

export default NavBar;
