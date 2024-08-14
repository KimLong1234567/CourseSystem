import React, { useState } from 'react';
import { Button, Modal, Table } from 'antd';
import {
  Cascader,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Mentions,
  Select,
  TreeSelect,
} from 'antd';

function AdminContent() {
  // table ant
  const columns = [
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
      width: '30%',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Address',
      dataIndex: 'address',
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
      width: '40%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      button: [],
    },
  ];
  const data = [
    {
      key: '1',
      name: 'John Brown',
      age: 32,
      address: 'New York No. 1 Lake Park',
    },
    {
      key: '2',
      name: 'Jim Green',
      age: 42,
      address: 'London No. 1 Lake Park',
    },
    {
      key: '3',
      name: 'Joe Black',
      age: 32,
      address: 'Sydney No. 1 Lake Park',
    },
    {
      key: '4',
      name: 'Jim Red',
      age: 32,
      address: 'London No. 2 Lake Park',
    },
  ];

  // form ant
  const { RangePicker } = DatePicker;
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div>
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Student Manage
      </h2>
      <Button
        type="primary"
        onClick={showModal}
        className="transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300"
      >
        Open Modal
      </Button>
      <Modal
        title="Add Student"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...formItemLayout}
          variant="filled"
          style={{
            maxWidth: 600,
          }}
        >
          {/* not define user can input id */}
          <Form.Item
            label="Input"
            name="Student Id"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Student Name"
            name="Student Name"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            label="Email"
            name="Email"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Mentions />
          </Form.Item>

          <Form.Item
            label="Gender"
            name="Gender"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Select />
          </Form.Item>

          <Form.Item
            label="Date"
            name="Date"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 6,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        className="mt-5"
        columns={columns}
        dataSource={data}
        onChange={onChange}
        // rowSelection={{
        //   onSelect: (record) => {
        //     handleSelect(record);
        //   },
        // }}
      />
    </div>
  );
}

export default AdminContent;
