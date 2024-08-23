import React from "react";
import NavBar from "./NavBar"; // Assuming you have the NavBar component in the same directory

export default function Header() {
	return (
		<header className="bg-[#1C1E53] text-white">
			<div className="max-w-screen-xl mx-auto px-4 sm:px-12 py-7 flex flex-col md:flex-row justify-between items-center">
				{/* logo */}
				<div className="font-mono mb-4 md:mb-0">
					<h2 className="text-2xl font-semibold">[ANHLONG]</h2>
				</div>
				{/* NavBar */}
				<NavBar />
				{/* Login/Register Button  */}
				<div className="text-[#282938] text-lg font-medium flex gap-3 mt-4 md:mt-0">
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
