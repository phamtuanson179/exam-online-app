import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import { createSubjectThunk } from "pages/subject/redux/subjectThunks";
import { createUserThunk } from "pages/user/redux/userThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { listUsersSelector } from "redux/selectors";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";
import { ROLE } from "../../../../constants/types";

const { TextArea } = Input;

const SubjectCreate = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [subjectForm] = Form.useForm();
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
    value.image = image;
    value.dob = value.dob?.valueOf();
    dispatch(createSubjectThunk(value));
  };

  return (
    <>
      <Button type='primary' className='btn btn-success' onClick={showModal}>
        <PlusOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Thêm môn học'
        visible={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          htmlType: "submit",
          form: "subjectCreateForm",
        }}
      >
        <Form
          layout={"vertical"}
          form={subjectForm}
          onFinish={onSubmit}
          id='subjectCreateForm'
        >
          <Form.Item>
            <UploadImage
              image={image}
              setImage={setImage}
              className='text-center'
            />
          </Form.Item>
          <Form.Item
            label='Tên môn học'
            name='name'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.NAME} />
          </Form.Item>
          <Form.Item label='Mã môn học' name='alias'>
            <Input placeholder={PLACEHOLDER.NAME} />
          </Form.Item>
          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubjectCreate;
