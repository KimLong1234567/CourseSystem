import React, { useState, useEffect } from 'react';
import { Button, Badge, Table } from 'antd';
import { getEnrollment } from '../../service/Erollment';

function Enrollment() {
  const [data, setData] = useState([]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const enrollment = await getEnrollment();
        const enrollmentWithId = enrollment.content.map(
          (enrollment, index) => ({
            ...enrollment,
            num: index + 1,
          })
        );

        setData(enrollmentWithId);
      } catch (error) {
        console.error('Error fetching: ', error);
      }
    };
    fetchData();
  }, [refresh]);

  const renderStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return (
          <Badge
            status="success"
            text="Completed"
            style={{ color: '#52c41a' }}
          />
        );
      case 'rejected':
        return (
          <Badge status="error" text="Rejected" style={{ color: '#f5222d' }} />
        );
      case 'pending':
        return (
          <Badge
            status="processing"
            text="Pending"
            style={{ color: '#faad14' }}
          />
        );
      case 'approved':
        return (
          <Badge
            status="warning"
            text="Approved"
            style={{ color: '#1890ff' }}
          />
        );
      case 'withdrawn':
        return (
          <Badge
            status="default"
            text="Withdrawn"
            style={{ color: '#d9d9d9' }}
          />
        );
      default:
        return null;
    }
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'num',
      sorter: (a, b) => a.id - b.id,
      width: '5%',
    },
    {
      title: 'Student Name',
      dataIndex: 'student',
      render: (student) => student.name,
      sorter: (a, b) => a.student.name.localeCompare(b.student.name),
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
      render: (status) => renderStatusBadge(status),
      width: '20%',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (text, record) => (
        <span>
          <Button className="bg-yellow-500 text-white">Update Status</Button>
          <Button className="bg-red-700 text-white">Delete</Button>
        </span>
      ),
    },
  ];

  return (
    <div className="p-6 h-full">
      <h2 className="flex justify-center text-4xl text-cyan-600">Enrollment</h2>
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
