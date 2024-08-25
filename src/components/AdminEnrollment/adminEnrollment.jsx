import React, { useState, useEffect } from 'react';
import { Button, Modal, Form, Select, Slider, Badge, Table } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { getCategory } from '../../service/category';
import { getEnrollment } from '../../service/Erollment';

function Enrollment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [dataCategory, setDataCategory] = useState([]);
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  const handleFormSubmit = (values) => {
    console.log('Form Values:', values);
    setIsModalOpen(false);
    form.resetFields();
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollment = await getEnrollment();
        const enrollmentWithId = enrollment.map((enrollment, index) => ({
          ...enrollment,
          num: index + 1,
        }));

        setData(enrollmentWithId);
        const category = await getCategory();
        setDataCategory(category);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    };
    fetchData();
  }, [refresh]);

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return <Badge status="success" text="Completed" />;
      case 'rejected':
        return <Badge status="error" text="Rejected" />;
      case 'pending':
        return <Badge status="processing" text="Pending" />;
      case 'approve':
        return <Badge status="warning" text="Approved" />;
      case 'withdraw':
        return <Badge status="default" text="Withdrawn" />;
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'Number of Students',
      dataIndex: 'numberOfStudents',
      sorter: (a, b) => a.numberOfStudents - b.numberOfStudents,
      width: '15%',
    },
    {
      title: 'Note',
      dataIndex: 'note',
      width: '30%',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: renderStatusBadge,
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <Button
            className="ml-3 bg-blue-700 text-white"
            // onClick={() => handleDetail(record)}
          >
            Detail
          </Button>
          <Button
            className="bg-yellow-400 text-white"
            // onClick={() => handleUpdate(record)}
          >
            Update
          </Button>
          <Button
            className="bg-red-700 text-white"
            // onClick={() => handleDelete(record)}
          >
            Delete
          </Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 h-full">
      <h2 className="flex justify-center text-4xl text-cyan-600">Enrollment</h2>
      <Button
        type="primary"
        icon={<PlusOutlined />}
        onClick={() => setIsModalOpen(true)}
      >
        Add Class
      </Button>

      <Modal
        title="Add New Class"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={handleFormSubmit} layout="vertical">
          <Form.Item
            label="Courses"
            name="courses"
            rules={[{ required: true, message: 'Please select a course' }]}
          >
            <Select placeholder="Select a course">
              {dataCategory.map((category, idx) => (
                <Select.Option value={category.id} key={idx}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Number of Students"
            name="numberOfStudents"
            rules={[
              { required: true, message: 'Please select number of students' },
            ]}
          >
            <Slider min={1} max={50} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Class
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div>
        <Table
          className="mt-5"
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default Enrollment;
