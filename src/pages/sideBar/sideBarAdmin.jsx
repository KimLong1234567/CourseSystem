import React from 'react';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
const ADMIN_SIDEBAR = [{ icon: faChartLine, name: 'Home', to: '/' }];
function Sidebar() {
  return (
    <div className="">
      <h3 className="">This is Side bar</h3>
    </div>
  );
}

export default Sidebar;
