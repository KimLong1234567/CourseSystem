import axios from 'axios';

const API_URL = 'http://192.168.18.115:8080/api/courses';
const API_URL_MOC = 'https://66bc665424da2de7ff6a5957.mockapi.io/courses';

const timeoutPromise = (ms) =>
  new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timeout')), ms)
  );

export const getCourses = async () => {
  try {
    const response = await Promise.race([
      axios.get(API_URL),
      timeoutPromise(3000),
    ]);
    console.log('Fetched data from server BE');
    return response.data;
  } catch (error) {
    console.warn(
      'Primary API failed or took too long. Falling back to secondary API...'
    );
    try {
      const fallbackResponse = await axios.get(API_URL_MOC);
      console.log('Fetched data from MOC server');
      return fallbackResponse.data;
    } catch (fallbackError) {
      console.error('Both APIs failed:', fallbackError);
      throw new Error('Unable to fetch data from any API.');
    }
  }
};

export const getCoursesByCategory = async (id) => {
  try {
    const response = await Promise.race([
      axios.get(`${API_URL}/filter?categoryId=${id}`),
      timeoutPromise(3000),
    ]);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch category courses:', error);
    return undefined;
  }
};

export const getCoursesById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course by id from primary API:', error);
    throw error;
  }
};

export const createCourses = async (course) => {
  try {
    const response = await Promise.any([
      axios.post(API_URL, course),
      axios.post(API_URL_MOC, course),
    ]);
    return response.data;
  } catch (error) {
    console.error('Error creating course in primary API:', error);
    throw error;
  }
};

export const updateCourses = async (id, course) => {
  try {
    const response = await Promise.any([
      axios.put(`${API_URL}/${id}`, course),
      axios.put(`${API_URL_MOC}/${id}`, course),
    ]);
    return response.data;
  } catch (error) {
    console.error('Error updating course in primary API:', error);
    throw error;
  }
};

export const deleteCourses = async (id) => {
  try {
    await Promise.any([
      axios.delete(`${API_URL}/${id}`),
      axios.delete(`${API_URL_MOC}/${id}`),
    ]);
  } catch (error) {
    console.error('Error deleting course from primary API:', error);
    throw error;
  }
};
