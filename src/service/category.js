import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/categories';

// "https://66c2ee55d057009ee9be61b9.mockapi.io/category"

export const getCategory = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data.content;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};

export const getCategoryId = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw error;
  }
};

export const createCategory = async (post) => {
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
      // setTimeout(3000);
    });
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updateCategory = async (id, post) => {
  try {
    // /update_info
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
      // setTimeout(3000);
    });
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    await axios.delete(
      `${API_URL}/${id}`.then((res) => {
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
      })
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};
