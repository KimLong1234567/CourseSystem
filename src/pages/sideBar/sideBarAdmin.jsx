import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faChartLine, faHouse } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { icon } from '@fortawesome/fontawesome-svg-core';

// admin controller
const ADMIN_SIDEBAR = [
  {
    icon: faHouse,
    name: 'Home',
    to: '/',
  },
  {
    icon: faChartLine,
    name: 'Dashboard',
    to: '/admin',
  },
];

function Sidebar() {
  return (
    <div className="">
      <h3 className="">This is Side bar</h3>
      {ADMIN_SIDEBAR.map((item, index) => {
        return (
          <div key={index} className="flex justify-center mb-2">
            <Link to={item.to} className="name menuItem">
              <Icon icon={item.icon} className="iconItem" />
              <span className="ml-3">{item.name}</span>
            </Link>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
