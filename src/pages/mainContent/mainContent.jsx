import React from 'react';
import Sidebar from '../sideBar/sideBarAdmin';
function MainContent() {
  return (
    <div className="grid grid-rows-3 grid-col-4 gap-2">
      <div className="row-span-3 col-span-1 bg-red-700">
        <Sidebar />
      </div>
      <div className="row-span-1 col-end-5 bg-gray-800">This is Header</div>
      <div className="row-span-1 col-span-3 bg-red-400">This is main page</div>
    </div>
  );
}

export default MainContent;
