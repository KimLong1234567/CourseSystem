import React from "react";
import IconError from "../../img/ErrorPage.png";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
export default function ErrorPage() {
	return (
		<>
			<header></header>
			<main className="w-screen h-screen  bg-slate-200/70 flex flex-col items-center justify-center">
				<div className="flex items-center">
					<div className="relative ">
						<img src={IconError} alt="" />
						<button className="absolute -right-20 bottom-0 bg-[#FCD980] hover:bg-yellow-200 px-10 py-3 rounded-md text-[#282938] text-lg font-bold flex gap-2 justify-center items-center">
							{" "}
							<FontAwesomeIcon icon={faArrowLeft} className="" />
							<Link to="/" className="">
								Back to Home Page
							</Link>
						</button>
					</div>
				</div>
			</main>
			<footer></footer>
		</>
	);
}
