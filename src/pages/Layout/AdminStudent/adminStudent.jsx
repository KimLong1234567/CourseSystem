import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select, InputNumber } from 'antd';
import { toast } from 'react-toastify';
import {
  getAccount,
  createAccount,
  deleteAccount,
  updateAccount,
} from '../../../service/acount';
import Profile from '../Profile/profile';

function AdminContent() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  //get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await getAccount();
        const accountsWithId = accounts.map((account, index) => ({
          ...account,
          Id: index + 1,
        }));
        setData(accountsWithId);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, []);

  // table ant
  const handleDetail = (record) => {
    console.log('Detail clicked for:', record);
    setCurrentRecord(record);
    setIsProfileVisible(true);
  };

  const handleUpdate = (record) => {
    console.log('Update clicked for:', record);
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'Id',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      filters: [],
      filterMode: 'tree',
      filterSearch: true,
      onFilter: (value, record) => record.name.startsWith(value),
      width: '15%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'email',
      dataIndex: 'email',
      filters: [],
      onFilter: (value, record) => record.address.startsWith(value),
      filterSearch: true,
      width: '30%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <button
            className="border-2 ml-3 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            onClick={() => handleDetail(record)}
          >
            Detail
          </button>
          <button
            className="border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
            onClick={() => handleUpdate(record)}
          >
            Update
          </button>
          <button
            className="border-2 transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 duration-300 focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={() => handleDelete(record)}
          >
            Delete
          </button>
        </span>
      ),
    },
  ];

  // form ant
  // const { RangePicker } = DatePicker;
  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 6,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 14,
      },
    },
  };

  // modal ant
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // delete row
  const handleDelete = async (record) => {
    try {
      await deleteAccount(record.id);
      const accounts = await getAccount();
      const accountsWithId = accounts.map((account, index) => ({
        ...account,
        Id: index + 1,
      }));
      setData(accountsWithId);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
  // create new row data
  const handleFormSubmit = async (values) => {
    try {
      await createAccount(values);
      const accounts = await getAccount();
      const accountsWithId = accounts.map((account, index) => ({
        ...account,
        Id: index + 1,
      }));
      setData(accountsWithId);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  return (
    <div>
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Student Manage
      </h2>
      <Button
        type="primary"
        onClick={() => setIsModalOpen(true)}
        className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
      >
        Add Student
      </Button>
      <Modal
        title={currentRecord ? 'Update Student' : 'Add Student'}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          name="studentForm"
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={currentRecord}
        >
          {/* <Form.Item
            label="Student Id"
            name="id"
            rules={[
              {
                required: true,
                message: 'Please input the student ID!',
              },
            ]}
          >
            <Input />
          </Form.Item> */}

          <Form.Item
            label="Student Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the student name!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the student email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="gender"
            rules={[
              {
                required: true,
                message: 'Please select the gender!',
              },
            ]}
          >
            <Select placeholder="Select gender">
              <Select.Option value="male">Male</Select.Option>
              <Select.Option value="female">Female</Select.Option>
              <Select.Option value="other">Other</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Age"
            name="age"
            rules={[
              {
                required: true,
                message: 'Please enter age!',
              },
            ]}
          >
            <InputNumber
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
                  console.log(e.key, 'not a number');
                  return;
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Date of Birth"
            name="dob"
            rules={[
              {
                required: true,
                message: 'Please select the date of birth!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
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
          onChange={(pagination, filters, sorter, extra) => {
            console.log('params', pagination, filters, sorter, extra);
          }}
          rowKey="id"
        />
        {isProfileVisible && currentRecord && (
          <Profile
            style={{ gridArea: 'profile' }}
            {...currentRecord}
            onClose={() => setIsProfileVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminContent;
