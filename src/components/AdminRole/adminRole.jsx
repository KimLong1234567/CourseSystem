import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { Form, Input } from 'antd';
import {
  getAllRole,
  createRole,
  updateRole,
  deleteRole,
} from '../../service/role';
import Profile from '../Profile/coursesDetail';

function AdminRole() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const roleId = '73957c9a-0454-4d65-b683-287f2e72f608';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await getAllRole(token);
        const rolesWithId = roles.map((roles, index) => ({
          ...roles,
          num: index + 1,
        }));
        setData(rolesWithId);
      } catch (error) {
        console.error('Error fetching category:', error);
      }
    };
    fetchData();
  }, [refresh, token]);

  const handleDetail = (record) => {
    setCurrentRecord(record);
    // setIsProfileVisible(true);
  };

  const handleUpdate = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'num',
      sorter: (a, b) => a.num - b.num,
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          {/* <Button
            className="ml-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleDetail(record)}
          >
            Detail
          </Button> */}
          <Button
            className="bg-yellow-400 text-white"
            onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            className="bg-red-700 text-white"
            onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  const handleDelete = async (record) => {
    try {
      await deleteRole(record.id, token);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const data = {
        ...values, // Spread the values object to include its properties directly
        permissions: [
          {
            id: roleId,
          },
        ],
      };

      console.log('Submitted Data:', data); // This will log the correctly structured data

      if (currentRecord) {
        console.log(data);
        await updateRole(currentRecord.id, data, token);
        setIsModalOpen(false);
        form.resetFields();
      } else {
        await createRole(data, token);
        setIsModalOpen(false);
        form.resetFields();
      }
      setRefresh((prev) => prev + 1);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error saving account:', error);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
    setCurrentRecord(null);
  };

  return (
    <div>
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Roles Manage
      </h2>
      <Button
        type="primary"
        onClick={() => {
          setCurrentRecord(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white"
      >
        Add Role
      </Button>
      <Modal
        title={currentRecord ? 'Update Role' : 'Add Role'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="role"
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            currentRecord,
          }}
        >
          <Form.Item
            label="Role name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the role name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRecord ? 'Update Role' : 'Add Role'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div
        className="grid"
        style={{
          gridTemplateRows: 'auto',
          gridTemplateColumns: '3fr minmax(auto, 1fr)',
          gridTemplateAreas: `
                "table profile"
              `,
        }}
      >
        <Table
          style={{ gridArea: 'table' }}
          className="mt-5"
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
        <div className="relative mt-5 ml-4" style={{ gridArea: 'profile' }}>
          {isProfileVisible && currentRecord && (
            <Profile
              {...currentRecord}
              onClose={() => setIsProfileVisible(false)}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminRole;
