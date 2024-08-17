import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select, InputNumber } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getCourses,
  createCourses,
  deleteCourses,
  updateCourses,
} from '../../../service/courses';
import Profile from '../Profile/coursesDetail';
import moment from 'moment';

function AdminCourses() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const courses = await getCourses();
        const coursesWithId = courses.map((courses, index) => ({
          ...courses,
          id: index + 1,
        }));
        setData(coursesWithId);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchData();
  }, [refresh]);

  function TransferDate(timestamp) {
    const date = new Date(timestamp * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  const handleDetail = (record) => {
    setCurrentRecord(record);
    setIsProfileVisible(true);
  };

  const handleUpdate = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      // Populate form fields with current record data
      ...record,
      dob: record.dob ? moment(record.dob) : null,
    });
    setIsModalOpen(true);
  };

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
          icon={<SearchOutlined />}
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    render: (text) =>
      searchedColumn === dataIndex ? (
        <span style={{ backgroundColor: '#ffc069', padding: '0 5px' }}>
          {text}
        </span>
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      width: '15%',
    },

    {
      title: 'description',
      dataIndex: 'description',
      width: '30%',
    },
    {
      title: 'Start Date',
      dataIndex: 'dateStart',
      render: (timestamp) => TransferDate(timestamp),
    },
    {
      title: 'End Date',
      dataIndex: 'dateEnd',
      render: (timestamp) => TransferDate(timestamp),
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
        title={currentRecord ? 'Update Courses' : 'Add Courses'}
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="CoursesForm"
          onFinish={handleFormSubmit}
          layout="vertical"
          initialValues={{
            currentRecord,
          }}
        >
          <Form.Item
            label="Courses Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the student name!',
              },
            ]}
          >
            <Input placeholder="Courses Name" />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input placeholder="Description" />
          </Form.Item>

          <Form.Item
            label="Start Date"
            name="dateStart"
            rules={[
              {
                required: true,
                message: 'Please enter start date!',
              },
            ]}
          >
            <DatePicker />
          </Form.Item>

          <Form.Item
            label="End Date"
            name="dateEnd"
            rules={[
              {
                required: true,
                message: 'Please select the end date!',
              },
            ]}
          >
            <DatePicker readOnly={true} />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRecord ? 'Update Courses' : 'Add Courses'}
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
          gap: '1rem',
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
            className="sticky top-0 max-h-screen overflow-auto"
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
