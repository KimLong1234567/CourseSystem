import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL =
  'http://192.168.18.115:8080/api/companies' ||
  'https://66ac95e0f009b9d5c732a553.mockapi.io/company';

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
    const response = await axios.post(API_URL, post).then((res) => {
      toast.success('Create success', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
    return response;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateCompany = async (id, post) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, post).then((res) => {
      toast.info('Update success', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteCompany = async (id) => {
  try {
    await axios.delete(`${API_URL}/${id}`).then((res) => {
      toast.error('Delete success', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
