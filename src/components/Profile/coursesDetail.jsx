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

function coursesDetail({
  id,
  name,
  description,
  startDate,
  endDate,
  category,
  company,
  image,
  onClose,
}) {
  const hasData = id && name && description && startDate && endDate;

  const start = new Date(startDate).toLocaleDateString();
  const end = new Date(endDate).toLocaleDateString();

  console.log(image.uid);

  return hasData ? (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="sm:flex sm:justify-between sm:gap-4">
        <div>
          <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
            ID Course: {id}
          </h3>
          <p className="mt-1 text-xs font-medium text-gray-600">
            Course Name: {name}
          </p>
        </div>

        <div className="hidden sm:block sm:shrink-0">
          <img
            alt="Course Image"
            src={`/${image.uid}`}
            className="size-16 rounded-lg object-cover shadow-sm"
          />
        </div>
      </div>

      <div className="mt-4">
        <p>Description:</p>
        <p className="text-sm text-gray-500"> {description}</p>
      </div>

      <div className="mt-4">
        <p>Category:</p>
        <p className="text-sm text-gray-500"> {category.name}</p>
      </div>

      <div className="mt-4">
        <p>Company:</p>
        <p className="text-sm text-gray-500"> {company.name}</p>
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

      <dl className="mt-6 flex gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dd className="text-xs text-gray-500">{start}</dd>
          <dt className="text-sm font-medium text-gray-600">Start Date</dt>
        </div>

        <div className="flex flex-col-reverse">
          <dd className="text-xs text-gray-500">{end}</dd>
          <dt className="text-sm font-medium text-gray-600">End Date</dt>
        </div>
      </dl>

      <div className="flex justify-center mt-6">
        <button
          onClick={onClose}
          className="w-full bg-red-600 text-white font-medium py-2 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
        >
          Close
        </button>
      </div>
    </div>
  ) : (
    <div className="text-center text-gray-500">Not found</div>
  );
}

coursesDetail.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  startDate: PropTypes.string.isRequired,
  endDate: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.object.isRequired,
  company: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default coursesDetail;
