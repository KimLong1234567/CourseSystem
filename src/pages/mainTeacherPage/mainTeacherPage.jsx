import React from "react";
import Sidebar from "../../components/sideBar/SideBar";
import HeaderAdmin from "../../components/HeaderAdmin/header";
import { Outlet } from "react-router-dom";
// import './mainContent.css';

function MainTeacherPage() {
	return (
		<div
			className="h-screen grid gap-2"
			style={{
				gridTemplateRows: "auto 2fr",
				gridTemplateColumns: "minmax(auto, 0.5fr) 3fr minmax(auto, 1fr)",
				gridTemplateAreas: `
          "sidebar header header"
          "sidebar page page"
        `,
			}}
		>
			<div style={{ gridArea: "sidebar" }}>
				<div className="flex justify-center bg-[#1C1E53] text-slate-50 py-4">
					Teacher
				</div>
				<Sidebar />
			</div>
			<div
				className="flex items-end justify-end p-4 mr-5"
				style={{ gridArea: "header" }}
			>
				<HeaderAdmin />
			</div>
			<div
				className="bg-aquamarine-500 p-4 text-black"
				style={{ gridArea: "page" }}
			>
				<Outlet />
			</div>
			{/* <div style={{ gridArea: 'detail' }}>
        <Profile />
      </div> */}
		</div>
	);
}

export default MainTeacherPage;
