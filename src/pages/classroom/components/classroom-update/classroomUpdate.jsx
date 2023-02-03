import { EditOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import classroomAPI from "apis/classroomAPI";
import examAPI from "apis/examAPI";
import { useEffect, useState } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const { Option } = Select;

const ClassroomUpdate = ({
  listSubjects,
  setIsRefreshData,
  isRefreshData,
  classroomElement,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [classroomForm] = Form.useForm();

  useEffect(() => {
    if (isModalOpen)
      classroomForm.setFieldsValue({
        subjectId: classroomElement?.subjectId,
        name: classroomElement?.name,
      });
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let body = value;
    await classroomAPI
      .update({ id: classroomElement._id }, body)
      .then((res) => {
        message.success("Chỉnh sửa lớp học thành công!");
        classroomForm.resetFields();
        setIsRefreshData(!isRefreshData);
        setIsModalOpen(false);
      });
  };

  return (
    <>
      <Button type='primary' className='btn btn-warning' onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Cập nhật lớp học'
        visible={isModalOpen}
        onCancel={handleCancel}
        okButtonProps={{
          htmlType: "submit",
          form: "classroomUpdateForm",
        }}
      >
        <Form
          form={classroomForm}
          onFinish={onSubmit}
          id='classroomUpdateForm'
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
        >
          <Form.Item
            label='Tên lớp học'
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
            label='Môn học'
            name='subjectId'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Select placeholder={PLACEHOLDER.SUBJECT}>
              {listSubjects.map((subject, key) => (
                <Option key={key} value={subject._id}>
                  {subject?.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ClassroomUpdate;
