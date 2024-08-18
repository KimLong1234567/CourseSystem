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
  { icon: faSquareShareNodes },
  { icon: faBell },
  { icon: faEnvelope },
];

function Profile({
  id,
  stu_name,
  stu_address,
  stu_email,
  stu_phone,
  stu_gender,
  stu_birthday,
  onClose,
}) {
  const hasData =
    id && stu_name && stu_address && stu_email && stu_email && stu_birthday;
  function TransferDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const brithday = TransferDate(stu_birthday);

  return hasData ? (
    <div className="max-w-sm mx-auto  rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        ID Student: {id}
      </h2>
      <div className="flex justify-center">
        <img
          className="rounded-full h-52 w-52"
          src="https://picsum.photos/200/300"
          alt="avatar"
        />
      </div>

      <div className="flex justify-center space-x-6 mt-4">
        {Profile_icon.map((item, index) => (
          <div
            key={index}
            className="text-gray-500 hover:text-gray-800 transition-colors duration-300"
          >
            <Link to={item.to}>
              <Icon icon={item.icon} className="text-2xl" />
            </Link>
          </div>
        ))}
      </div>

      <div className="space-y-2 text-gray-700">
        <div>
          <strong>Name:</strong> {stu_name}
        </div>
        <div>
          <strong>Address:</strong> {stu_address}
        </div>
        <div>
          <strong>Phone:</strong> {stu_phone}
        </div>
        <div>
          <strong>Email:</strong> {stu_email}
        </div>
        <div>
          <strong>Gender:</strong> {stu_gender}
        </div>
        <div>
          <strong>Date of Birth:</strong> {brithday}
        </div>
      </div>

      <div className="flex justify-center">
        <button
          onClick={onClose}
          className="mt-4 w-full bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500">Not found</div>
  );
}

Profile.propTypes = {
  id: PropTypes.string.isRequired,
  stu_name: PropTypes.string.isRequired,
  stu_address: PropTypes.string.isRequired,
  stu_email: PropTypes.string.isRequired,
  stu_phone: PropTypes.number.isRequired,
  stu_gender: PropTypes.string.isRequired,
  stu_birthday: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Profile;
