import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.1.25:8080/api/auth/login';

export const login = async (account) => {
  try {
    const response = await axios.post(API_URL, account).then((res) => {
      toast.success('Login success', {
        position: 'top-center',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
    return response?.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
};
