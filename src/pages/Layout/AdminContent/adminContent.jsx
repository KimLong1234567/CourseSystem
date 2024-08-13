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
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Modal
        title="Basic Modal"
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
          <Form.Item
            label="Input"
            name="Input"
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
            label="InputNumber"
            name="InputNumber"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <InputNumber
              style={{
                width: '100%',
              }}
            />
          </Form.Item>

          <Form.Item
            label="TextArea"
            name="TextArea"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>

          <Form.Item
            label="Mentions"
            name="Mentions"
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
            label="Select"
            name="Select"
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
            label="Cascader"
            name="Cascader"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <Cascader />
          </Form.Item>

          <Form.Item
            label="TreeSelect"
            name="TreeSelect"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <TreeSelect />
          </Form.Item>

          <Form.Item
            label="DatePicker"
            name="DatePicker"
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
            label="RangePicker"
            name="RangePicker"
            rules={[
              {
                required: true,
                message: 'Please input!',
              },
            ]}
          >
            <RangePicker />
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
      />
    </div>
  );
}

export default AdminContent;
