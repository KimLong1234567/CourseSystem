import React, { useEffect, useState } from 'react';
import { Button, Modal, Form, Slider, Select, Table, Input } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { getCategory } from '../../service/category';
import {
  getClasses,
  createClasses,
  updateClasses,
  deleteClasses,
} from '../../service/classes';

function AdminClasses() {
  const [form] = Form.useForm();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dataCategory, setDataCategory] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [searchedColumn, setSearchedColumn] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const classes = await getClasses();
        const classesWithId = classes.map((classes, index) => ({
          ...classes,
          num: index + 1,
        }));
        setData(classesWithId);
        const category = await getCategory();
        setDataCategory(category);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    };
    fetchData();
  }, [refresh]);

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

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText('');
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleFormSubmit = (values) => {
    console.log('Form Values:', values);
    setIsModalOpen(false);
    form.resetFields();
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
      ...getColumnSearchProps('name'),
      width: '15%',
    },

    {
      title: 'Courses',
      dataIndex: 'course',
      render: (course) => course?.name || 'N/A',
      width: '30%',
    },
    {
      title: 'Category',
      dataIndex: 'course',
      render: (course) => course?.category?.name || 'N/A',
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

  const handleCancel1 = () => {
    setIsModalVisible(false);
    setCurrentRecord(null);
  };

  const handleDelete = async (record) => {
    try {
      await deleteClasses(record.id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting course:', error);
    }
  };

  const handleUpdate = (record) => {
    setCurrentRecord(record);
    form.setFieldsValue({
      name: record.name,
    });
    setIsModalOpen(true);
  };

  const handleDetail = (record) => {
    setCurrentRecord(record);
    setIsModalVisible(true);
  };

  return (
    <div>
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Classes Manage
      </h2>
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
      {currentRecord && (
        <Modal
          title="Class Details"
          visible={isModalVisible}
          onCancel={handleCancel1}
          footer={[
            <Button key="close" onClick={handleCancel1}>
              Close
            </Button>,
          ]}
        >
          <p>
            <strong>Class Name:</strong> {currentRecord.name}
          </p>
          <p>
            <strong>Course Name:</strong> {currentRecord.course?.name}
          </p>
          <p>
            <strong>Category:</strong> {currentRecord.course?.category?.name}
          </p>
          <p>
            <strong>Company Name:</strong> {currentRecord.course?.company?.name}
          </p>
          <p>
            <strong>Students:</strong>
          </p>
          <ul>
            {currentRecord.students.map((student) => (
              <li key={student.id}>{student.name}</li>
            ))}
          </ul>
        </Modal>
      )}
      <div>
        <Table
          style={{ gridArea: 'table' }}
          className="mt-5"
          columns={columns}
          dataSource={data}
          rowKey="id"
        />
      </div>
    </div>
  );
}

export default AdminClasses;
