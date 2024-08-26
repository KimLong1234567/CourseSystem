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
  num,
  name,
  address,
  email,
  phone,
  gender,
  birthday,
  company,
  onClose,
}) {
  const hasData = num && name && address && email && phone && birthday;
  const formattedDob = birthday
    ? new Date(birthday).toLocaleDateString()
    : 'N/A';

  return hasData ? (
    <div className="max-w-sm mx-auto  rounded-xl shadow-lg p-6 space-y-6">
      <h2 className="text-2xl font-bold text-center text-gray-800">
        ID Student: {num || 'N/A'}
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
          <strong>Name:</strong> {name || 'N/A'}
        </div>
        <div>
          <strong>Address:</strong> {address || 'N/A'}
        </div>
        <div>
          <strong>Phone:</strong> {phone || 'N/A'}
        </div>
        <div>
          <strong>Email:</strong> {email || 'N/A'}
        </div>
        <div>
          <strong>Gender:</strong> {gender || 'N/A'}
        </div>
        <div>
          <strong>Company:</strong> {company?.name || 'N/A'}
        </div>
        <div>
          <strong>Date of Birth:</strong> {formattedDob}
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
  num: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  phone: PropTypes.string.isRequired,
  gender: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  company: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Profile;
