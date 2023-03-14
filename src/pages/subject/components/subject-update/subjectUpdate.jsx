import { EditOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, message } from "antd";
import subjectAPI from "apis/subjectAPI";
import { useEffect, useState } from "react";
import UploadImage from "../../../../components/upload-image";
import { PLACEHOLDER } from "../../../../constants/configs";

const { TextArea } = Input;

const SubjectUpdate = ({
  subjectElement,
  isRefreshData,
  setIsRefreshData,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
}) => {
  const [image, setImage] = useState("");
  const [subjectForm] = Form.useForm();

  useEffect(() => {
    if (isUpdateModalOpen) {
      subjectForm.setFieldsValue({
        name: subjectElement.name,
        alias: subjectElement.alias,
        description: subjectElement.description,
      });
      setImage(subjectElement?.image);
    }
  }, [isUpdateModalOpen]);

  const onSubmit = async (value) => {
    value.image = image;

    await subjectAPI.update({ id: subjectElement._id }, value).then((res) => {
      message.success("Cập nhật môn học thành công!");
      setIsRefreshData(!isRefreshData);
      setIsUpdateModalOpen(false);
    });
  };

  return (
    <>
      <Modal
        title='Cập nhật môn học'
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        getContainer={false}
        okButtonProps={{
          htmlType: "submit",
          form: "subjectUpdateForm",
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          form={subjectForm}
          onFinish={onSubmit}
          id='subjectUpdateForm'
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
          <Form.Item
            label='Mã môn học'
            name='alias'
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
export default SubjectUpdate;
