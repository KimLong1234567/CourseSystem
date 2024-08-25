import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faBuilding,
	faSailboat,
	faGhost,
	faHippo,
	faFire,
} from "@fortawesome/free-solid-svg-icons";
import React from "react";

export default function collaboration() {
	return (
		<div className="py-20 bg-[#EEF4FA]">
			<div className="max-w-screen-xl lg:flex-col max-lg:px-5 mx-auto flex gap-12">
				<div className="flex justify-center items-center gap-10">
					<div>
						<h3 className="text-4xl font-semibold pb-2">50+</h3>
						<p className="text-base font-normal opacity-70">Company</p>
					</div>
					<div>
						<h3 className="text-4xl font-semibold pb-2">300+</h3>
						<p className="text-base font-normal opacity-70">Teacher</p>
					</div>
					<div>
						<h3 className="text-4xl font-semibold pb-2">1000+</h3>
						<p className="text-base font-normal opacity-70">Students</p>
					</div>
				</div>

				<div className="max-md:hidden max-lg:hidden lg:px-3 w-full flex justify-between items-end">
					<div className="flex gap-3 items-center justify-center text-2xl font-bold">
						<FontAwesomeIcon icon={faBuilding} />
						<h2>LOREM</h2>
					</div>
					<div className="flex gap-3 items-center justify-center text-2xl font-bold">
						<FontAwesomeIcon icon={faSailboat} />
						<h2>BOATS</h2>
					</div>
					<div className="flex gap-3 items-center justify-center text-2xl font-bold">
						<FontAwesomeIcon icon={faGhost} />
						<h2>GHOSTS</h2>
					</div>
					<div className="flex gap-3 items-center justify-center text-2xl font-bold">
						<FontAwesomeIcon icon={faHippo} />
						<h2>HIPPOANECY</h2>
					</div>
					<div className="flex gap-3 items-center justify-center text-2xl font-bold">
						<FontAwesomeIcon icon={faFire} />
						<h2>FIRELEARN</h2>
					</div>
				</div>
			</div>
		</div>
	);
}
