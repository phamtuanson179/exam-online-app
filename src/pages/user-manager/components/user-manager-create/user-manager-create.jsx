import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import UploadImage from "../../../../components/upload-image";
import { ROLE } from "../../../../constants/type";

const { Option } = Select;

const UserManagerCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userForm] = Form.useForm();
  const listRoles = Object.keys(ROLE);
  console.log({ listRoles });

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

  const onSubmit = () => {};

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
        <Form layout={"vertical"} form={userForm} onFinish={onSubmit}>
          <Form.Item>
            <UploadImage
              image={avatar}
              setImage={setAvatar}
              className='text-center'
            />
          </Form.Item>
          <Form.Item label='Họ tên' name='fullname'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Email' name='email'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Tên tài khoản' name='username'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Vai trò' name='role'>
            <Select>
              {listRoles.map((role, key) => (
                <Option key={key} value={role}>
                  {ROLE[role].meaning}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label='Địa chỉ' name='address'>
            <Input placeholder='input placeholder' />
          </Form.Item>
          <Form.Item label='Ngày sinh' name='dob'>
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserManagerCreate;
