import { EditOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  DatePicker,
  Form,
  Input,
  Modal,
  Select,
  Table,
} from "antd";
import examAPI from "apis/examAPI";
import moment from "moment";
import { useEffect, useState } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const { Option } = Select;

const ExamUpdate = ({
  listSubjects,
  setIsRefreshData,
  examElement,
  isRefreshData,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [examForm] = Form.useForm();

  useEffect(() => {
    examForm.setFieldsValue({
      subjectId: examElement.subjectId,
      name: examElement.name,
      amountQuestion: examElement.amountQuestion,
      time: examElement.time,
      openTime: moment(examElement?.openTime),
      closeTime: moment(examElement?.closeTime),
    });
  }, []);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

<<<<<<< Updated upstream
  const onChangeSubjectId = () => {
    const listQuestionsOfSelectedSubject = [...listQuestions]
      .filter(
        (question) => question.subjectId == examForm.getFieldValue("subjectId")
      )
      .map((question) => {
        question.key = question._id;
        return question;
      });
    console.log({ listQuestions, listQuestionsOfSelectedSubject });
    setListQuestionsOfSelectedSubject(listQuestionsOfSelectedSubject);
  };

=======
>>>>>>> Stashed changes
  const onSubmit = async (value) => {
    let body = value;
    await examAPI.update({ id: examElement._id }, body).then((res) => {
      examForm.resetFields();
      setIsRefreshData(!isRefreshData);
      setIsModalOpen(false);
    });
  };

  return (
    <>
      <Button type='warning' className='btn btn-warning' onClick={showModal}>
        <EditOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Cập nhật đề thi'
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
            <Select placeholder={PLACEHOLDER.SUBJECT} disabled>
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
export default ExamUpdate;

const questionTableColumn = [
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Câu trả lời đúng",
    render: (record) => record.listCorrectAnswers.join(","),
    key: "listCorrectAnswers",
  },
  {
    title: "Loại câu hỏi",
    render: (record) => QUESTION_TYPE[record.type].meaning,
    key: "type",
  },
];
