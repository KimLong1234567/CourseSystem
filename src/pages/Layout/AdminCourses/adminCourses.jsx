import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select, InputNumber } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
import {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
} from '../../../service/courses';
import Profile from '../Profile/profile';

function AdminCourses() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accounts = await getCourses();
        const accountsWithId = accounts.map((account, index) => ({
          ...account,
          id: index + 1,
        }));
        setData(accountsWithId);
      } catch (error) {
        console.error('Error fetching accounts:', error);
      }
    };

    fetchData();
  }, [refresh]);

  const handleDetail = (record) => {
    setCurrentRecord(record);
    setIsProfileVisible(true);
  };

  const handleUpdate = (record) => {
    setCurrentRecord(record);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
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
      title: 'description',
      dataIndex: 'description',
      filters: [],
      onFilter: (value, record) => record.description.startsWith(value),
      filterSearch: true,
      width: '30%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <Button
            className="ml-3 bg-blue-700 text-white"
            onClick={() => handleDetail(record)}
          >
            Detail
          </Button>
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
      await deleteCourses(record.id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentRecord) {
        const { id, ...restValues } = values;
        console.log(values, id, restValues);
        await updateCourses(currentRecord.id, restValues);
      } else {
        await createCourses(values);
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
      <ToastContainer />
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Courses Manage
      </h2>
      <Button
        type="primary"
        onClick={() => {
          setCurrentRecord(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white"
      >
        Add Courses
      </Button>
      <Modal
        title={currentRecord ? 'Update Student' : 'Add Student'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="studentForm"
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            currentRecord,
          }}
        >
          <Form.Item label="Student Id" name="id">
            <Input
              placeholder={currentRecord ? currentRecord.id : 'Student id'}
              readOnly={true}
            />
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
            <Input
              placeholder={currentRecord ? currentRecord.name : 'Student Name'}
            />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input
              placeholder={
                currentRecord ? currentRecord.description : 'description'
              }
            />
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
              min={0}
              placeholder={currentRecord ? currentRecord.age : 'Age'}
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
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
            <DatePicker readOnly={true} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRecord ? 'Update Student' : 'Add Student'}
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

export default AdminCourses;
