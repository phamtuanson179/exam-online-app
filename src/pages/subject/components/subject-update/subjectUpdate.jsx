import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal } from "antd";
import {
  updateSubjectThunk,
  updateUserThunk,
} from "pages/subject/redux/subjectThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";
import { listSubjectsSelector } from "../../../../redux/selectors";

const { TextArea } = Input;

const SubjectUpdate = ({ subjectElement }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [subjectForm] = Form.useForm();
  const dispatch = useDispatch();
  const subject = useSelector(listSubjectsSelector);

  useEffect(() => {
    console.log(subjectElement._id);
    subjectForm.setFieldsValue({
      name: subjectElement.name,
      alias: subjectElement.alias,
      description: subjectElement.description,
    });
    setImage(subjectElement?.image);
  }, []);

  useEffect(() => {
    if (!subject.loading) {
      setIsModalOpen(false);
    }
  }, [subject]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = (value) => {
    value.image = image;
    dispatch(
      updateSubjectThunk({ params: { id: subjectElement._id }, body: value })
    );
  };

  return (
    <>
      <Button type='warning' className='btn btn-warning' onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        title='Cập nhật môn học'
        visible={isModalOpen}
        onCancel={handleCancel}
        getContainer={false}
        okButtonProps={{
          htmlType: "submit",
          form: "subjectUpdateForm",
        }}
      >
        <Form
          layout={"vertical"}
          form={subjectForm}
          onFinish={onSubmit}
          id='subjectUpdateForm'
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
export default SubjectUpdate;
