import React, { useState, useEffect } from 'react';
import { Button, Modal, Table } from 'antd';

function AdminRole() {
  const [currentRecord, setCurrentRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <h2 className="flex justify-center text-4xl text-cyan-600">
        Role Manage
      </h2>
      <Button
        type="primary"
        onClick={() => {
          setCurrentRecord(null);
          setIsModalOpen(true);
        }}
        className="bg-blue-500 text-white"
      >
        Add Category
      </Button>
    </div>
  );
}

export default AdminRole;
