import React from "react";
import Header from "../Layout/Header/Header";
import { Outlet } from "react-router-dom";
import Footer from "../Layout/Footer/Footer";

export default function MainHomePage() {
	return (
		<>
			<Header />
			<Outlet />
			<Footer />
		</>
	);
}
