import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';
import { resetPassword as resetUserPassword } from '../../service/login';

function HeaderAdmin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  let currentAdmin = null;
  const storedData = localStorage.getItem('authToken');
  if (storedData) {
    try {
      currentAdmin = JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
  }

  const token = currentAdmin?.token;

  const resetPassword = async () => {
    try {
      await resetUserPassword(token);
      logout();
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const items = [
    {
      label: <a href="">1st menu item</a>,
      key: '0',
    },
    {
      label: (
        <button
          onClick={resetPassword}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 0',
            width: '100%',
            textAlign: 'left',
          }}
        >
          Reset Password
        </button>
      ),
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <button
          onClick={logout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '10px 0',
            width: '100%',
            textAlign: 'left',
          }}
        >
          Logout
        </button>
      ),
      key: '3',
    },
  ];

  return (
    <div>
      <Dropdown
        menu={{
          items,
        }}
        trigger={['click']}
      >
        <Space className="mt-2">
          <img
            className="h-14 w-14 rounded-full"
            src="https://picsum.photos/200/300"
            alt="avatar"
          />
          <div className="flex flex-col">
            <span>Hello {currentAdmin?.name}</span>
            <span>Main admin</span>
          </div>
          <DownOutlined />
        </Space>
      </Dropdown>
    </div>
  );
}

export default HeaderAdmin;
