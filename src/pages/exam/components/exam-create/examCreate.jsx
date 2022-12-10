import { PlusOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import examAPI from "apis/examAPI";
import { useEffect, useState } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const { Option } = Select;

const ExamCreate = ({
  listSubjects,
  setIsRefreshData,
  isRefreshData,
  listQuestions,
}) => {
  const [listQuestionsOfSelectedSubject, setListQuestionsOfSelectedSubject] =
    useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  useState(false);
  const [examForm] = Form.useForm();

<<<<<<< Updated upstream
  const onSelectChange = (newSelectedRowKeys) => {
    examForm.setFieldsValue({ listQuestionIds: newSelectedRowKeys });
    if (examForm.getFieldValue("amountQuestion") == newSelectedRowKeys.length) {
      setIsSelectOverAmountQuestion(false);
    } else setIsSelectOverAmountQuestion(true);
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

=======
>>>>>>> Stashed changes
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let body = {
      ...value,
      openTime: value.openTime?.valueOf(),
      closeTime: value.closeTime?.valueOf(),
    };

    const examRes = await examAPI.create(body);
    await examAPI.updateQuestionOfExam(
      { examId: examRes.data._id },
      { listQuestionIds: body.listQuestionIds }
    );
    message.success("Thêm đề thi thành công!");

    examForm.resetFields();
    setIsRefreshData(!isRefreshData);
    setIsModalOpen(false);
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
