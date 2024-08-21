import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/users';
//   'https://66bc665424da2de7ff6a5957.mockapi.io/student'
// Service để gọi các API liên quan đến Post
export const getAccount = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getAccountById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createAccount = async (post) => {
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
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateAccount = async (id, post) => {
  try {
    const response = await axios
      .put(`${API_URL}/${id}/update_info`, post)
      .then((res) => {
        toast.info('Update success', {
          position: 'top-center',
          autoClose: 2000,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        // setTimeout(3000);
      });
    return response;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteAccount = async (id) => {
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
      // setTimeout(3000);
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
