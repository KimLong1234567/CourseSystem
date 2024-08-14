import React from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faChartLine,
  faHouse,
  faBarsStaggered,
  faBuilding,
  faSchool,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// admin controller
const ADMIN_SIDEBAR = [
  {
    icon: faHouse,
    name: 'Home',
    to: '/',
  },
  {
    icon: faChartLine,
    name: 'Student',
    to: '/admin/student',
  },
  {
    icon: faBarsStaggered,
    name: 'Category',
    to: '/admin/category',
  },
  {
    icon: faBuilding,
    name: 'Company',
    to: '/admin/company',
  },
  {
    icon: faSchool,
    name: 'Courses',
    to: '/admin/courses',
  },
];

function Sidebar() {
  return (
    <div className="">
      {ADMIN_SIDEBAR.map((item, index) => {
        return (
          <div key={index} className="ml-4">
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
