import { ProfileOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Select,
  Table,
} from "antd";
import examAPI from "apis/examAPI";
import { useEffect, useState } from "react";
import { findElementOfArray1OutOfArray2 } from "utils/common";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const { Option } = Select;

const ClassroomTeacher = ({
  setIsRefreshData,
  isRefreshData,
  listQuestions,
  classroomElement,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listQuestionsOfSelectedSubject, setListQuestionsOfSelectedSubject] =
    useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSelectChange = async (newSelectedRowKeys) => {
    if (newSelectedRowKeys) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    console.log({ classroomElement });
    renderListTeacherOfClassroom();
  }, [classroomElement]);

  const renderListTeacherOfClassroom = () => {
    if (classroomElement.listQuestions?.length > 0) {
      const listQuestionIds = classroomElement.listQuestions?.map(
        (question) => question._id
      );
      console.log({ listQuestionIds });
      setSelectedRowKeys(listQuestionIds);
    }
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onSubmit = async (value) => {
    if (selectedRowKeys.length < classroomElement.amountQuestion) {
      message.warning(
        "Số câu hỏi được chọn cần lớn hơn hoặc bằng số câu hỏi của đề thi!"
      );
      return;
    }

    const { listQuestions, ...originExam } = classroomElement;
    await examAPI.update({ ...originExam, isRandomInAll: isRandomInAll });

    if (!isRandomInAll) {
      await examAPI.updateQuestionOfExam(
        { examId: classroomElement._id },
        { listQuestionIds: selectedRowKeys }
      );
    } else
      await examAPI.updateQuestionOfExam(
        { examId: classroomElement._id },
        { listQuestionIds: [] }
      );

    setSelectedRowKeys([]);
    setListQuestionsOfSelectedSubject([]);
    setIsRefreshData(!isRefreshData);
    setIsModalOpen(false);
  };

  return (
    <>
      <Button type='primary' className='btn btn-info' onClick={showModal}>
        <ProfileOutlined />
      </Button>
      <Modal
        getContainer={false}
        title='Thêm câu hỏi'
        visible={isModalOpen}
        onCancel={handleCancel}
        onOk={onSubmit}
        width={1000}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign='left'
        >
          <Form.Item
            label='Danh sách câu hỏi'
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Alert
              message={`Có ${selectedRowKeys?.length} câu hỏi được chọn`}
              type={"info"}
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
export default ClassroomTeacher;

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
