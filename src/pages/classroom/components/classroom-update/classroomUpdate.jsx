import {
  Form,
  Input,
  message,
  Modal,
  Select
} from "antd";
import classroomAPI from "apis/classroomAPI";
import { useEffect } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";

const { Option } = Select;

const ClassroomUpdate = ({
  listSubjects,
  setIsRefreshData,
  isRefreshData,
  classroomElement,
  isUpdateModalOpen,
  setIsUpdateModalOpen,
}) => {
  const [classroomForm] = Form.useForm();

  useEffect(() => {
    if (isUpdateModalOpen)
      classroomForm.setFieldsValue({
        subjectId: classroomElement?.subjectId,
        name: classroomElement?.name,
      });
  }, [isUpdateModalOpen]);

  const onSubmit = async (value) => {
    let body = value;
    await classroomAPI
      .update({ id: classroomElement._id }, body)
      .then((res) => {
        message.success("Chỉnh sửa lớp học thành công!");
        classroomForm.resetFields();
        setIsRefreshData(!isRefreshData);
        setIsUpdateModalOpen(false);
      });
  };

  return (
    <>
      <Modal
        getContainer={false}
        title='Cập nhật lớp học'
        visible={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
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
