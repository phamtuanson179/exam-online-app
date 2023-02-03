import { PlusOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import subjectAPI from "apis/subjectAPI";
import { useState } from "react";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";

const { TextArea } = Input;

const SubjectCreate = ({ setIsRefreshData, isRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [image, setImage] = useState("");
  const [subjectForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    value.image = image;
    await subjectAPI.create(value).then(() => {
      message.success("Thêm môn học thành công!");
      setIsRefreshData(!isRefreshData);
      subjectForm.resetFields();
      setIsModalOpen(false);
    });
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          form={subjectForm}
          onFinish={onSubmit}
          id='subjectCreateForm'
        >
          <UploadImage
            image={image}
            setImage={setImage}
            className='text-center mb-3'
          />
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
          <Form.Item label='Mô tả' name='description'>
            <TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default SubjectCreate;
