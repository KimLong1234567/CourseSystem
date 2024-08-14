import React from 'react';
import Sidebar from '../sideBar/sideBarAdmin';
import HeaderAdmin from '../Layout/HeaderAdmin/header';
import AdminContent from '../Layout/AdminContent/adminContent';

function MainContent() {
  return (
    <div
      className="h-screen grid gap-2"
      style={{
        gridTemplateRows: 'auto 2fr 20%',
        gridTemplateColumns: 'minmax(auto, 1fr) 3fr minmax(auto, 1fr)',
        gridTemplateAreas: `
          "sidebar header header"
          "sidebar page page"
        `,
      }}
    >
      <div style={{ gridArea: 'sidebar' }}>
        <div className="flex justify-center bg-[#1C1E53] text-slate-50 py-4">
          ADMIN
        </div>
        <Sidebar />
      </div>
      <div
        className="flex items-end justify-end p-4 mr-5"
        style={{ gridArea: 'header' }}
      >
        <HeaderAdmin />
      </div>
      <div
        className="bg-aquamarine-500 p-4 text-black"
        style={{ gridArea: 'page' }}
      >
        <AdminContent />
      </div>
      <div>This is detail profile</div>
    </div>
  );
}

export default MainContent;
