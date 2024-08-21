import axios from 'axios';

const API_URL =
  'http://192.168.18.115:8080/api/companies' ||
  'https://66ac95e0f009b9d5c732a553.mockapi.io/company';
// Service để gọi các API liên quan đến Post
export const getCompany = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getCompanyById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createCompany = async (post) => {
  try {
    const response = await axios.post(API_URL, post);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateCompany = async (id, post) => {
  try {
    console.log(id, post);
    const response = await axios.put(`${API_URL}/${id}/update_info`, post);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`);
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
