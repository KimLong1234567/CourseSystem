import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// admin controller
const ADMIN_SIDEBAR = [{ icon: faChartLine, name: 'Home', to: '/' }];

function Sidebar() {
  return (
    <div className="">
      <h3 className="">This is Side bar</h3>
      {ADMIN_SIDEBAR.map((item, index) => {
        return (
          <div
            key={index}
            className="flex justify-center border-2 border-rose-500"
          >
            <Link to={item.to} className="name menuItem">
              <Icon icon={item.icon} className="iconItem" />
              <span>{item.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
