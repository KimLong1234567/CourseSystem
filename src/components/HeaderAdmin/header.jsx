import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import { useNavigate } from 'react-router-dom';

function HeaderAdmin() {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('authToken');
    navigate('/admin/login');
  };

  const items = [
    {
      label: <a href="">1st menu item</a>,
      key: '0',
    },
    {
      label: <a href="">2nd menu item</a>,
      key: '1',
    },
    {
      type: 'divider',
    },
    {
      label: (
        <div onClick={logout} style={{ cursor: 'pointer', width: '100%' }}>
          Logout
        </div>
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
        <a onClick={(e) => e.preventDefault()}>
          <Space className="mt-2">
            <img
              className="h-14 w-14 rounded-full"
              src="https://picsum.photos/200/300"
              alt="avatar"
            />
            <div className="flex flex-col">
              <span>Hello Admin name</span>
              <span>Main admin</span>
            </div>
            <DownOutlined />
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default HeaderAdmin;
