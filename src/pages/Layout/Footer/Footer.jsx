import React from "react";

export default function Footer() {
	return (
		<footer className="relative">
			<div className="bg-[#1C1E53] text-white py-24">
				<div className="max-w-screen-xl mx-auto px-12 py-7 flex justify-between items-center">
					<ul>
						<li className="font-mono">
							<h2 className="text-2xl font-bold">[ANHLONG]</h2>
						</li>
						<li>
							<p className="max-w-80 mt-3 text-sm ">
								Course management system for many companies with many features
								and modern technology.
							</p>
						</li>
						<li className="absolute bottom-0 flex max-w-[420px] justify-between items-center py-4 px-8 gap-6 bg-[#FCD980] text-[#1C1E53] rounded-sm">
							<div>
								<h3>Email</h3>
								<p>anhlong@gmail.com</p>
							</div>
							<div>
								<h3>Hot Line </h3>
								<p>+89 91789 6789</p>
							</div>
						</li>
					</ul>

					<ul>
						<li className="text-lg font-semibold">
							© Copyright ANHLONGGG 2024 - 2025s
						</li>
					</ul>
				</div>
			</div>
		</footer>
	);
}
