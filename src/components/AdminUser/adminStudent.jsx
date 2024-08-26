import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getAllStudent,
  createStudent,
  updateStudent,
  deleteStudent,
} from '../../service/student';
import Profile from '../Profile/profileStudent';
import moment from 'moment';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer } from 'react-toastify';

function AdminStudent() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  let currentAdmin = null;
  const storedData = localStorage.getItem('authToken');
  if (storedData) {
    try {
      currentAdmin = JSON.parse(storedData);
    } catch (error) {
      console.error('Error parsing JSON from localStorage:', error);
    }
  }
  const token = currentAdmin.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const students = await getAllStudent(token);
        const studentsWithId = students.map((account, index) => ({
          ...account,
          num: index + 1,
        }));
        setData(studentsWithId);
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchData();
  }, [refresh, token]);

  const handleDetail = (record) => {
    setCurrentRecord(record);
    setIsProfileVisible(true);
  };

  const handleUpdate = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      // Populate form fields with current record data
      ...record,
      birthday: record.birthday ? moment(record.birthday) : null,
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
      dataIndex: 'num',
      sorter: (a, b) => a.num - b.num,
      width: '5%',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
      width: '15%',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
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
      await deleteStudent(record.id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentRecord) {
        const { id, ...restValues } = values;
        await updateStudent(currentRecord.id, restValues);
        setIsModalOpen(false);
        form.resetFields();
      } else {
        await createStudent(values);
        setIsModalOpen(false);
        form.resetFields();
      }
      setIsModalOpen(false);
      form.resetFields();
      setRefresh((prev) => prev + 1);
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
        Students Manage
      </h2>
      <ToastContainer />
      {/* <Button
        type="primary"
        onClick={() => {
          setIsModalOpen(true);
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`bg-blue-500 text-white transition-all duration-300 ease-in-out overflow-hidden ${
          isHovered || isModalOpen ? 'pl-4 pr-6 py-2' : 'px-3 py-3'
        }`}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '50px',
        }}
      >
        <Icon
          icon={faUserPlus}
          className={`transition-transform duration-300 ease-in-out ${
            isHovered || isModalOpen ? 'mr-2' : ''
          }`}
        />
        {(isHovered || isModalOpen) && (
          <span className="transition-opacity duration-300 ease-in-out opacity-100">
            Add Student
          </span>
        )}
      </Button> */}
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
            <Input placeholder="Student Name" />
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
            <Input placeholder="Student Email" />
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input the student phone!',
              },
            ]}
          >
            <Input
              min={0}
              placeholder="Phone"
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Student Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the student address!',
              },
            ]}
          >
            <Input placeholder="Student Address" />
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
            name="birthday"
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
            style={{ gridArea: 'profile' }}
            {...currentRecord}
            onClose={() => setIsProfileVisible(false)}
          />
        )}
      </div>
    </div>
  );
}

export default AdminStudent;
