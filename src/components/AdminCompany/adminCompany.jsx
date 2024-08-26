import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { Form, Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getCompany,
  createCompany,
  updateCompany,
  deleteCompany,
} from '../../service/company';
import Profile from '../Profile/companyDetail';
import moment from 'moment';

function AdminCompany() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');

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
        const company = await getCompany(token);
        const companyWithId = company.map((company, index) => ({
          ...company,
          num: index + 1,
        }));
        setData(companyWithId);
      } catch (error) {
        console.error('Error fetching courses:', error);
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
      title: 'Email',
      dataIndex: 'email',
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
      await deleteCompany(record.id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting company:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      if (currentRecord) {
        const { id, ...restValues } = values;
        await updateCompany(currentRecord.id, restValues, token);
      } else {
        await createCompany(values, token);
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
        Company Manage
      </h2>
      <Button
        type="primary"
        onClick={() => {
          setCurrentRecord(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white"
      >
        Add Company
      </Button>
      <Modal
        title={currentRecord ? 'Update Company' : 'Add Company'}
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
            label="Company Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the company name!',
              },
            ]}
          >
            <Input placeholder="Company Name" />
          </Form.Item>

          <Form.Item
            label="Company Email "
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the company email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input placeholder="Company Email" />
          </Form.Item>

          <Form.Item
            label="Company Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input the company phone!',
              },
            ]}
          >
            <Input
              min={0}
              placeholder="Company phone"
              onKeyPress={(e) => {
                if (isNaN(e.key)) {
                  e.preventDefault();
                }
              }}
            />
          </Form.Item>

          <Form.Item
            label="Company Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the company address!',
              },
            ]}
          >
            <Input placeholder="Compnay Address" />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              {currentRecord ? 'Update Company' : 'Add Company'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <div
        className="grid"
        style={{
          gridTemplateRows: 'auto',
          gridTemplateColumns: '3fr minmax(auto, 1fr)',
          gridTemplateAreas: `"table profile"`,
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
        <div className="mt-5" style={{ gridArea: 'profile' }}>
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

export default AdminCompany;
