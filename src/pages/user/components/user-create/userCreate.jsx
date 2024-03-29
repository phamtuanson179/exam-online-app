import { Button, Modal, Form, Input, DatePicker, Select } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import React, { useState, useEffect } from "react";
import UploadImage from "../../../../components/upload-image";
import { ROLE } from "../../../../constants/types";
import { PLACEHOLDER } from "../../../../constants/configs";
import { createUserThunk } from "pages/user/redux/userThunks";
import { useDispatch, useSelector } from "react-redux";
import { listUsersSelector } from "redux/selectors";
import moment from "moment";

const { Option } = Select;

const UserCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userForm] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector(listUsersSelector);
  const listRoles = Object.keys(ROLE);

  useEffect(() => {
    if (!user.loading) {
      setIsModalOpen(false);
    }
  }, [user]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (value) => {
    value.avatar = avatar;
    dispatch(createUserThunk(value));
    userForm.resetFields()
  };

  return (
    <>
      <Button type='primary' className='btn btn-success' onClick={showModal}>
        <PlusOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Thêm tài khoản'
        visible={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          htmlType: "submit",
          form: "userCreateForm",
        }}
      >
        <Form
          form={userForm}
          onFinish={onSubmit}
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          id='userCreateForm'
        >
          {/* <UploadImage
            image={avatar}
            setImage={setAvatar}
            className='text-center mb-3'
          /> */}
          <Form.Item
            label='Họ tên'
            name='fullname'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.NAME} />
          </Form.Item>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
              {
                type: "email",
                message: "Chưa đúng định dạng!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.EMAIL} />
          </Form.Item>
          <Form.Item
            label='Vai trò'
            name='role'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Select placeholder={PLACEHOLDER.ROLE}>
              {listRoles.map((role, key) => (
                <Option key={key} value={role}>
                  {ROLE[role].meaning}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Số điện thoại'
            name='phoneNumber'
            // rules={[
            //   {
            //     required: true,
            //     message: "Trường này bắt buộc!",
            //   },
            // ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label='Địa chỉ' name='address'>
            <Input placeholder={PLACEHOLDER.ADDRESS} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserCreate;
