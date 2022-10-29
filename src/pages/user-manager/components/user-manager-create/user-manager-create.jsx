import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
const UserManagerCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    console.log("object", isModalOpen);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Button type='primary' onClick={showModal}>
        <PlusOutlined />
      </Button>
      <Modal
        title='Basic Modal'
        visible={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};
export default UserManagerCreate;
