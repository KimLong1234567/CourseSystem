import React from "react";
export default function detailHomePage() {
	const benefits = [
		{
			icon: 1,
			title: "Direct Connection",
			content:
				"Teachers and students can interact directly with each other anytime, anywhere through chat and video calls, fostering quick and efficient communication.",
		},
		{
			icon: 2,
			title: "Flexible Scheduling",
			content:
				"The system supports flexible scheduling, allowing both teachers and students to proactively arrange study times that suit them.",
		},
		{
			icon: 3,
			title: "Rich Resource Library",
			content:
				"The system provides a diverse library of learning materials including lectures, exercises, and video tutorials, empowering students to proactively seek knowledge.",
		},
		{
			icon: 4,
			title: "Track Learning Progress",
			content:
				"Teachers and students can track learning progress in detail, helping to evaluate learning effectiveness and make necessary adjustments.",
		},
		{
			icon: 5,
			title: "Vibrant Learning Community",
			content:
				"The system creates a vibrant learning community where students can discuss, share knowledge and experiences with each other.",
		},
		{
			icon: 6,
			title: "Data Privacy",
			content:
				"The system ensures the privacy of users' personal information, giving users peace of mind.",
		},
	];
	return (
		<div className="py-32 ">
			<div className="flex justify-center items-center">
				<h1 className="text-center max-w-[550px] text-4xl font-semibold text-[#282938]">
					Benefits of Joining [ANHLONG] E-Learning
				</h1>
			</div>
			<div className="pt-10 grid grid-cols-3 gap-5 justify-center items-center">
				{benefits.map((benefit, key) => (
					<div key={key} className="bg-[#F4F6FC] rounded-sm min-h-[316px]">
						<div className="flex flex-col py-10 pl-10 pr-5">
							<span className="w-10 h-10 flex items-center justify-center font-bold bg-[#2405F2] text-white rounded-lg p-2 font-mono text-xl">
								{benefit.icon}
							</span>
							<h2 className="text-[#282938] text-2xl font-medium mt-5">
								{benefit.title}
							</h2>
							<p className="max-w-[325px] text-[#282938] text-base opacity-70 pt-3">
								{benefit.content}
							</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
