import React, { useState } from 'react';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faUserGraduate,
  faThList,
  faBuilding,
  faBookOpen,
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

// Admin sidebar menu items
const ADMIN_SIDEBAR = [
  {
    icon: faHome,
    name: 'Home',
    to: '/',
  },
  {
    icon: faUserGraduate,
    name: 'Students',
    to: '/admin/student',
  },
  {
    icon: faThList,
    name: 'Category',
    to: '/admin/category',
  },
  {
    icon: faBuilding,
    name: 'Company',
    to: '/admin/company',
  },
  {
    icon: faBookOpen,
    name: 'Courses',
    to: '/admin/courses',
  },
];

function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="bg-gray-800 text-white h-full p-4 space-y-4">
      {ADMIN_SIDEBAR.map((item, index) => {
        const isActive = activeItem === index;
        return (
          <Link
            key={index}
            to={item.to}
            className={`flex items-center space-x-3 p-2 rounded-lg transition-all duration-300 ${
              isActive
                ? 'bg-blue-600 text-white shadow-md'
                : 'hover:bg-gray-700 hover:text-blue-400'
            }`}
            onClick={() => setActiveItem(index)}
          >
            <Icon
              icon={item.icon}
              className="text-xl transition-transform duration-300 transform group-hover:scale-110"
            />
            <span className="text-lg">{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}

export default Sidebar;
