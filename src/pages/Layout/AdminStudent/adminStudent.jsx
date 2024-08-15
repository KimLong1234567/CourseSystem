import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select } from 'antd';
import {
  getAccount,
  createAccount,
  deleteAccount,
  updateAccount,
} from '../../../service/acount';

function AdminContent() {
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    // Implement the detail functionality here
  };

  const handleUpdate = (record) => {
    console.log('Update clicked for:', record);
    // Implement the update functionality here
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
      filters: [
        {
          text: 'Joe',
          value: 'Joe',
        },
        {
          text: 'Category 1',
          value: 'Category 1',
        },
        {
          text: 'Category 2',
          value: 'Category 2',
        },
      ],
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
      filters: [
        {
          text: 'London',
          value: 'London',
        },
        {
          text: 'New York',
          value: 'New York',
        },
      ],
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
            className="border-2 ml-3"
            onClick={() => handleDetail(record)}
          >
            Detail
          </button>
          <button onClick={() => handleUpdate(record)}>Update</button>
          <button onClick={() => handleDelete(record)}>Delete</button>
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
      setData(accounts);
      setIsModalOpen(false);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };
  return (
    <div>
      {/* <Table
        className="mt-5"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        // rowSelection={{
        //   onSelect: (record) => {
        //     handleSelect(record);
        //   },
        // }}
      /> */}

      <h2 className="flex justify-center text-4xl text-cyan-600">
        Student Manage
      </h2>
      <Button
        type="primary"
        onClick={showModal}
        className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
      >
        Add Student
      </Button>
      <Modal
        title="Add Student"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null} // Remove default footer
      >
        <Form
          name="studentForm"
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            remember: true,
          }}
        >
          <Form.Item
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
          </Form.Item>

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
      <Table className="mt-5" columns={columns} dataSource={data} rowKey="id" />
    </div>
  );
}

export default AdminContent;
