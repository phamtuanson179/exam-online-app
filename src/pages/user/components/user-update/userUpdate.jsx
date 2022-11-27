import { EditOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, Modal, Select } from "antd";
import moment from "moment/moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";
import { ROLE } from "../../../../constants/types";
import { listUsersSelector } from "../../../../redux/selectors";
import { updateUserThunk } from "pages/user/redux/userThunks";

const { Option } = Select;

const UserUpdate = ({ userElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [userForm] = Form.useForm();
  const dispatch = useDispatch();
  const user = useSelector(listUsersSelector);
  const listRoles = Object.keys(ROLE);

  useEffect(() => {
    userForm.setFieldsValue({
      fullname: userElement?.fullname,
      email: userElement?.email,
      username: userElement?.username,
      role: userElement?.role,
      address: userElement?.address,
      dob: moment(userElement?.dob),
    });
    setAvatar(userElement?.avatar);
  }, []);

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
    value.dob = value.dob.valueOf();
    dispatch(updateUserThunk({ params: { id: userElement._id }, body: value }));
  };

  return (
    <>
      <Button type='warning' className='btn btn-warning' onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title='Basic Modal'
        visible={isModalOpen}
        onCancel={handleCancel}
        getContainer={false}
        okButtonProps={{
          htmlType: "submit",
          form: "userUpdateForm",
        }}
      >
        <Form
          layout={"vertical"}
          form={userForm}
          onFinish={onSubmit}
          id='userUpdateForm'
        >
          <Form.Item>
            <UploadImage
              image={avatar}
              setImage={setAvatar}
              className='text-center'
            />
          </Form.Item>
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
            label='Tên tài khoản'
            name='username'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.USERNAME} />
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
          <Form.Item label='Địa chỉ' name='address'>
            <Input placeholder={PLACEHOLDER.ADDRESS} />
          </Form.Item>
          <Form.Item label='Ngày sinh' name='dob'>
            <DatePicker placeholder={PLACEHOLDER.DOB} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default UserUpdate;
