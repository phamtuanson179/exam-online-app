import { PlusOutlined } from "@ant-design/icons";
import { Alert, Button, Form, Input, Modal, Select, Table } from "antd";
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
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listQuestionsOfSelectedSubject, setListQuestionsOfSelectedSubject] =
    useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSelectOverAmountQuestion, setIsSelectOverAmountQuestion] =
    useState(false);
  const [examForm] = Form.useForm();

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

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    let body = value;
    console.log({ value });
    await examAPI.create(body).then((res) => {
      examForm.resetFields();
      setIsSelectOverAmountQuestion(false);
      setSelectedRowKeys([]);
      setListQuestionsOfSelectedSubject([]);
      setIsRefreshData(!isRefreshData);
      setIsModalOpen(false);
    });
  };

  const onChangeSubjectId = () => {
    const listQuestionsOfSelectedSubject = listQuestions
      .filter(
        (question) => question.subjectId == examForm.getFieldValue("subjectId")
      )
      .map((question) => {
        question.key = question._id;
        return question;
      });
    setListQuestionsOfSelectedSubject(listQuestionsOfSelectedSubject);
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
        <Form form={examForm} onFinish={onSubmit} id='examCreateForm'>
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
            <Select
              placeholder={PLACEHOLDER.SUBJECT}
              onChange={onChangeSubjectId}
            >
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
          <Form.Item
            label='Danh sách câu hỏi'
            name='listQuestionIds'
            rules={[
              {
                required: true,
                message: "Trường này bắt buộc!",
              },
            ]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedRowKeys.length} câu hỏi được chọn`}
              type={isSelectOverAmountQuestion ? "error" : "info"}
            />
            <Table
              rowSelection={rowSelection}
              columns={questionTableColumn}
              dataSource={listQuestionsOfSelectedSubject}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default ExamCreate;

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
