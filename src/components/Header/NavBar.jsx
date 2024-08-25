import React from "react";
import { NavLink } from "react-router-dom";

function NavBar({ isOpen, setIsOpen }) {
	const handleLinkClick = () => {
		setIsOpen(false); // Đóng Navbar khi một liên kết được click
	};

	return (
		<nav>
			{/* Nav của desktop */}
			<ul className="flex items-center justify-center gap-4 max-lg:hidden">
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
					<NavLink
						to="/contact"
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						CONTACT
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<NavLink
						to="/blogPage"
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						BLOG
					</NavLink>
				</li>
			</ul>
			{/* Nav của mobile */}
			<ul
				className={`${
					isOpen ? "flex" : "hidden"
				} absolute top-24 left-5 items-center justify-center gap-4 lg:hidden bg-[#262970] p-5 rounded-lg`}
			>
				<li className="px-2 text-sm">
					<NavLink
						to="/"
						onClick={handleLinkClick} // Đóng Navbar khi click
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
						onClick={handleLinkClick} // Đóng Navbar khi click
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
					<NavLink
						to="/contact"
						onClick={handleLinkClick} // Đóng Navbar khi click
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						CONTACT
					</NavLink>
				</li>
				<li className="px-2 text-sm">
					<NavLink
						to="/blogPage"
						onClick={handleLinkClick} // Đóng Navbar khi click
						className={({ isActive }) =>
							isActive
								? "border-b-2 border-white pb-1 px-1"
								: "hover:border-b-[1px]"
						}
					>
						BLOG
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default NavBar;
