import React, { useState, useEffect } from "react";

export default function RateHomePage() {
	const dataRate = [
		{
			name: "Jane Smith",
			role: "Teacher",
			content:
				"I'm so glad to see my students growing and learning. This platform has been a valuable tool in my teaching.",
			avatar: "https://i.pravatar.cc/300?img=2",
		},
		{
			name: "Michael Johnson",
			role: "Student",
			content:
				"The interactive features of this course system have made learning a lot more fun. I'm really enjoying it!",
			avatar: "https://i.pravatar.cc/300?img=3",
		},
		{
			name: "Emily Davis",
			role: "Teacher",
			content:
				"The flexibility of this platform allows me to create personalized learning experiences for each student.",
			avatar: "https://i.pravatar.cc/300?img=9",
		},
		{
			name: "David Lee",
			role: "Student",
			content:
				"I've been able to connect with other students from around the world through this platform. It's a great way to learn and collaborate.",
			avatar: "https://i.pravatar.cc/300?img=5",
		},
		{
			name: "Olivia Taylor",
			role: "Teacher",
			content:
				"The resources available on this platform are top-notch. It makes it easy to find the materials I need to create engaging lessons.",
			avatar: "https://i.pravatar.cc/300?img=6",
		},
		{
			name: "Benjamin Hall",
			role: "Student",
			content:
				"I'm so much more confident in my abilities now thanks to this course system. It's been a game-changer.",
			avatar: "https://i.pravatar.cc/300?img=1",
		},
	];

	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setCurrentIndex((prevIndex) =>
				prevIndex === dataRate.length - 1 ? 0 : prevIndex + 1
			);
		}, 5000);

		return () => clearInterval(interval);
	}, [dataRate.length]);

	return (
		<div className="bg-[#EEF4FA] mt-36 mb-10">
			<div className="py-20 max-w-screen-xl mx-auto flex justify-center items-center gap-28 max-lg:flex-col max-lg:px-10">
				<div>
					<h2 className="text-[28px] leading-7 font-semibold w-[404px] pb-5">
						What do students say about the course system?
					</h2>
					<p className="max-w-[346px] text-base text-[#282938] opacity-70 leading-7">
						1000+ students have already joined the course system.
					</p>
				</div>
				<div className="flex overflow-hidden">
					<div className="flex flex-col gap-5 w-full flex-shrink-0 transition-transform duration-300 ease-in-out">
						<p className="text-2xl text-[#282938] text-justify">
							" {dataRate[currentIndex].content} "
						</p>

						<div className="flex items-center justify-between">
							<div className="flex justify-center items-center gap-2">
								<img
									src={dataRate[currentIndex].avatar}
									alt={dataRate[currentIndex].name}
									className="w-14 h-14 rounded-full"
								/>

								<div>
									<p className="text-lg font-medium max-w-44">
										{dataRate[currentIndex].name}
									</p>
									<p className="text-xs font-medium">
										{dataRate[currentIndex].role}
									</p>
								</div>
							</div>
							{/* Dot indicators */}
							<div className="flex space-x-2">
								{dataRate.map((_, index) => (
									<span
										key={index}
										className={`w-2 h-2 rounded-full ${
											index === currentIndex ? "bg-blue-500" : "bg-gray-300"
										}`}
									></span>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
