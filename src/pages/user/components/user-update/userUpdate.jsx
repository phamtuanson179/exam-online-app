import { DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { updateUserThunk } from "pages/user/redux/userThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";
import { ROLE } from "../../../../constants/types";
import { listUsersSelector } from "../../../../redux/selectors";

const { Option } = Select;

const UserUpdate = ({
  userElement,
  setIsUpdateModalOpen,
  isUpdateModalOpen,
}) => {
  const [avatar, setAvatar] = useState("");
  const [userForm] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector(listUsersSelector);
  const listRoles = Object.keys(ROLE);

  useEffect(() => {
    if (isUpdateModalOpen) {
      userForm.setFieldsValue({
        fullname: userElement?.fullname,
        email: userElement?.email,
        username: userElement?.username,
        role: userElement?.role,
        address: userElement?.address,
        phoneNumber: userElement?.phoneNumber,
      });
      setAvatar(userElement?.avatar);
    }
  }, [isUpdateModalOpen]);

  useEffect(() => {
    if (!user.loading) {
      setIsUpdateModalOpen(false);
    }
  }, [user]);

  const onSubmit = (value) => {
    value.avatar = avatar;
    dispatch(updateUserThunk({ params: { id: userElement._id }, body: value }));
    userForm.resetFields()
  };

  return (
    <>
      {/* <Button type='warning' className='btn btn-warning' onClick={showModal}>
        <EditOutlined />
      </Button> */}
      <Modal
        title='Cập nhật tài khoản'
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        getContainer={false}
        okButtonProps={{
          htmlType: "submit",
          form: "userUpdateForm",
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          form={userForm}
          onFinish={onSubmit}
          id='userUpdateForm'
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
export default UserUpdate;
