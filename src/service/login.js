import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.1.25:8080/api/auth/login';

export const login = async (account) => {
  try {
    const response = await axios.post(API_URL, account);
    const token = response.data; // Giả sử token được trả về trong response.data.token

    // Lưu token vào localStorage
    localStorage.setItem('authToken', token);

    toast.success('Login success', {
      position: 'top-center',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

    return response.data;
  } catch (error) {
    console.error('Error login:', error);
    toast.error('Login failed', {
      position: 'top-center',
      autoClose: 2000,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });
    throw error;
  }
};
