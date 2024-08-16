import React from 'react';
import PropTypes from 'prop-types';

import {
  faSquareShareNodes,
  faBell,
  faEnvelope,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';

const Profile_icon = [
  {
    icon: faSquareShareNodes,
    // name: 'Home',
    // to: '/',
  },
  {
    icon: faBell,
    // name: 'Student',
    // to: '/admin/student',
  },
  {
    icon: faEnvelope,
    // name: 'Category',
    // to: '/admin/category',
  },
];
function Profile({ id, name, age, email, gender, dob, onClose }) {
  const hasData = id && name && age && email && gender && dob;

  console.log(id);
  return hasData ? (
    <div className="">
      <h2 className="mb-3 flex justify-center">ID Student: {id}</h2>
      <div className="flex justify-center">
        <img
          className="rounded-full h-52 w-52 flex justify-center"
          src="https://picsum.photos/200/300"
          alt="avatar"
        />
      </div>
      {/* some icons here */}
      <div className="flex justify-center space-x-6">
        {Profile_icon.map((item, index) => {
          return (
            <div key={index} className="ml-4">
              <Link to={item.to} className="name menuItem">
                <Icon icon={item.icon} className="iconItem" />
                {/* <span className="ml-3">{item.name}</span> */}
              </Link>
            </div>
          );
        })}
      </div>
      <div className="mt-4">
        <div>
          <strong>Name:</strong> {name}
        </div>
        <div>
          <strong>Age:</strong> {age}
        </div>
        <div>
          <strong>Email:</strong> {email}
        </div>
        <div>
          <strong>Gender:</strong> {gender}
        </div>
        <div>
          <strong>Date of Birth:</strong> {dob.toLocaleString()}
        </div>
      </div>
      <button
        onClick={onClose}
        className="mt-4 border-2 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
      >
        Close
      </button>
    </div>
  ) : (
    <div>not found</div>
  );
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  age: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  dob: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Profile;
