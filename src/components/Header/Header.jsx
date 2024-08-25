import React, { useState } from "react";
import NavBar from "./NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBarsStaggered } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const handleToggle = () => {
		setIsOpen(!isOpen);
	};
	return (
		<header className="bg-[#1C1E53] text-white">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-12 py-7 flex flex-col md:flex-row justify-between items-center max-lg:flex-row">
				{/* logo */}
				<div className="font-mono flex items-center gap-2">
					<button className="lg:hidden" onClick={handleToggle}>
						<FontAwesomeIcon icon={faBarsStaggered} />
					</button>
					<h2 className="text-2xl font-semibold">[ANHLONG]</h2>
				</div>
				{/* NavBar */}
				<NavBar isOpen={isOpen} setIsOpen={setIsOpen} />
				{/* Login/Register Button  */}
				<div className="text-[#282938] text-lg font-medium flex gap-3 mt-4 md:mt-0 max-lg:m-0">
					<Link
						to={"/admin/Login"}
						className="px-4 py-2 bg-[#FCD980] rounded-sm hover:bg-yellow-300 "
					>
						Log In
					</Link>
					<button className="max-lg:hidden px-4 py-2 bg-[#FCD980] rounded-sm hover:bg-yellow-300">
						Sign Up
					</button>
				</div>
			</div>
		</header>
	);
}
