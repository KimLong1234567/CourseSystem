import axios from 'axios';

const API_URL = 'https://66bc665424da2de7ff6a5957.mockapi.io/student';

// Service để gọi các API liên quan đến Post
export const createStudent = async (student) => {
  try {
    console.log(student);
    const response = await axios.post(API_URL, student);
    return response.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getStudentById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const getAllStudent = async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateAccount = async (id, post) => {
  try {
    console.log(id, post);
    const response = await axios.put(`${API_URL}/${id}/update_info`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteAccount = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
