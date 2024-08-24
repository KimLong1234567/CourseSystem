import axios from 'axios';
import { toast } from 'react-toastify';

const API_URL = 'http://192.168.18.115:8080/api/enrollments';

// Remember to change return when BE handle data and sent back
export const postStudentRegister = async (dataStudent) => {
  try {
    await axios.post(API_URL, dataStudent).then((res) => {
      toast.success('Create success', {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    });
    return true;
  } catch (error) {
    console.error('Failed to sent infoStudent', error);
    toast.error('Sorry! Something info not true, please try late');
  }
};
