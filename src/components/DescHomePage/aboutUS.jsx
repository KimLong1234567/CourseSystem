import React from "react";

export default function AboutUS() {
	return (
		<div className="flex justify-between items-center gap-24 py-10 mb-28 max-lg:hidden">
			<div className="w-1/2 flex flex-col gap-4 text-[#232536]">
				<span className="text-[#232536] text-lg font-normal opacity-85">
					About Us
				</span>
				<h1 className="text-4xl font-semibold leading-normal">
					[ANHLONG] course management system will help you develop.
				</h1>
				<p className="text-base font-normal leading-normal">
					[ANHLONG] provides a comprehensive learning platform, helping you
					develop knowledge, skills and thinking. With a flexible learning path,
					diverse content and a vibrant learning community, [ANHLONG] will
					accompany you on every journey.
				</p>
			</div>
			<div className=" w-1/2 max-h-[500px] overflow-hidden rounded-lg">
				<img
					src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
					alt=""
					className="w-full h-full object-cover"
				/>
			</div>
		</div>
	);
}
