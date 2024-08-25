import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';
import { DatePicker, Form, Input, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import {
  getAccount,
  createAccount,
  deleteAccount,
  updateAccount,
} from '../../service/acount';
import { getCompany } from '../../service/company';
import { getAllRole } from '../../service/role';
import Profile from '../Profile/profile';
import moment from 'moment';
import { FontAwesomeIcon as Icon } from '@fortawesome/react-fontawesome';
import { faUserPlus } from '@fortawesome/free-solid-svg-icons';

function AdminContent() {
  const [form] = Form.useForm();
  const [refresh, setRefresh] = useState(0);
  const [data, setData] = useState([]);
  const [dataCategory, setDataCategory] = useState([]);
  const [dataCompany, setDataCompany] = useState([]);
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
        const accounts = await getAccount(token);
        const accountsWithId = accounts.map((account, index) => ({
          ...account,
          num: index + 1,
        }));
        setData(accountsWithId);
        const roles = await getAllRole(token);
        setDataCategory(roles);
        const companies = await getCompany(token);
        setDataCompany(companies);
      } catch (error) {
        console.error('Error fetching accounts:', error);
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
      await deleteAccount(record.id);
      setRefresh((prev) => prev + 1);
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  const handleFormSubmit = async (values) => {
    try {
      const data = {
        name: values.name,
        email: values.email,
        address: values.address,
        birthday: values.birthday,
        phone: values.phone,
        gender: values.gender,
        company: {
          id: values.company,
        },
        role: {
          id: values.role,
        },
      };
      console.log(data);

      if (currentRecord) {
        const { id, ...restValues } = data;
        await updateAccount(currentRecord.id, restValues, token);
        setIsModalOpen(false);
        form.resetFields();
      } else {
        await createAccount(data, token);
        setIsModalOpen(false);
        form.resetFields();
      }
      setRefresh((prev) => prev + 1);
      setIsModalOpen(false);
      form.resetFields();
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
        Users Manage
      </h2>
      <Button
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
            Add User
          </span>
        )}
      </Button>
      <Modal
        title={currentRecord ? 'Update User' : 'Add User'}
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
            label="User Name"
            name="name"
            rules={[
              {
                required: true,
                message: 'Please input the student name!',
              },
            ]}
          >
            <Input placeholder="User Name" />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input the user email!',
              },
              {
                type: 'email',
                message: 'Please enter a valid email!',
              },
            ]}
          >
            <Input placeholder="User Email" />
          </Form.Item>

          <Form.Item
            label="Role"
            name="role"
            rules={[
              {
                required: true,
                message: 'Please enter role!',
              },
            ]}
          >
            <Select placeholder="Select a role">
              {dataCategory.map((role, idx) => (
                <Select.Option value={role.id} key={idx}>
                  {role.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Company"
            name="company"
            rules={[
              {
                required: true,
                message: 'Please enter company!',
              },
            ]}
          >
            <Select placeholder="Select a company">
              {dataCompany.map((company, idx) => (
                <Select.Option value={company.id} key={idx}>
                  {company.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Phone"
            name="phone"
            rules={[
              {
                required: true,
                message: 'Please input the user phone!',
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
            label="User Address"
            name="address"
            rules={[
              {
                required: true,
                message: 'Please input the user address!',
              },
            ]}
          >
            <Input placeholder="User Address" />
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
              {currentRecord ? 'Update User' : 'Add User'}
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

export default AdminContent;
