import React from 'react';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';

function HeaderAdmin() {
  //where get data
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
      label: '3rd menu item',
      key: '3',
    },
  ];
  // log out account
  const logout = async () => {};

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
            {/* day de title admin */}
          </Space>
        </a>
      </Dropdown>
    </div>
  );
}

export default HeaderAdmin;
