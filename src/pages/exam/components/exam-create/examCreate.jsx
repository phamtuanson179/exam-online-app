import { PlusOutlined } from "@ant-design/icons";
import { Button, DatePicker, Form, Input, message, Modal, Select } from "antd";
import examAPI from "apis/examAPI";
import moment from "moment";
import { useState } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";

const { Option } = Select;

const ExamCreate = ({ listSubjects, setIsRefreshData, isRefreshData }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examForm] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let body = {
      ...value,
      openTime: moment(value.openTime)?.valueOf(),
      closeTime: moment(value.closeTime)?.valueOf(),
    };

    await examAPI.create(body).then(() => {
      message.success("Thêm đề thi thành công!");
      examForm.resetFields();
      setIsRefreshData(!isRefreshData);
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
        title='Thêm đề thi'
        visible={isModalOpen}
        onCancel={handleCancel}
        width={1000}
        okButtonProps={{
          htmlType: "submit",
          form: "examCreateForm",
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
          form={examForm}
          onFinish={onSubmit}
          id='examCreateForm'
        >
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
          <Form.Item
            label='Tên đề thi'
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
            label='Số câu hỏi'
            name='amountQuestion'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.NAME} type='number' />
          </Form.Item>
          <Form.Item
            label='Số câu trả lời đúng tối thiểu'
            name='minCorrectAnswerToPass'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder={PLACEHOLDER.NAME} type='number' />
          </Form.Item>
          <Form.Item
            label='Thời gian làm bài (tính theo giây)'
            name='time'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
          >
            <Input placeholder='Basic usage' type='number' />
          </Form.Item>
          <Form.Item label='Thời gian mở' name='openTime'>
            <DatePicker showTime />
          </Form.Item>
          <Form.Item label='Thời gian đóng' name='closeTime'>
            <DatePicker showTime />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ExamCreate;
