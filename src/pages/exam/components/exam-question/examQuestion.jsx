import { ProfileOutlined } from "@ant-design/icons";
import {
  Alert,
  Button,
  Checkbox,
  Form,
  Input,
  message,
  Modal,
  Table,
} from "antd";
import examAPI from "apis/examAPI";
import { useEffect, useState } from "react";
import { PLACEHOLDER } from "../../../../constants/configs";
import { QUESTION_TYPE } from "../../../../constants/types";

const ExamQuestion = ({
  setIsRefreshData,
  isRefreshData,
  listQuestions,
  examElement,
}) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [listQuestionsOfSelectedSubject, setListQuestionsOfSelectedSubject] =
    useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRandomInAll, setIsRandomInAll] = useState(examElement.isRandomInAll);

  const onSelectChange = (newSelectedRowKeys) => {
    if (newSelectedRowKeys) {
      setSelectedRowKeys(newSelectedRowKeys);
    }
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  useEffect(() => {
    filterListQuestionBySubject();
  }, []);

  useEffect(() => {
    if (isModalOpen) getQuestionOfExam();
  }, [isModalOpen]);

  // useEffect(() => {
  //   console.log({ examElement, isRandomInAll });
  //   if (!isRandomInAll) renderListQuestionOfExam();
  // }, [isRandomInAll, examElement]);
  useEffect(() => {}, [isRandomInAll]);

  // const renderListQuestionOfExam = () => {
  //   console.log(examElement, examElement.listQuestions);
  //   if (examElement.listQuestions?.length > 0) {
  //     const listQuestionIds = examElement.listQuestions?.map(
  //       (question) => question._id
  //     );
  //     console.log({ listQuestionIds });
  //     onSelectChange(listQuestionIds);
  //   }
  // };

  const getQuestionOfExam = async (exam) => {
    await examAPI
      .getQuestionOfExam({
        examId: examElement._id,
      })
      .then((res) => {
        console.log({ res });

        const listTeacherIdOfClassrooms = res.data.map(
          (item) => item.questionId
        );
        onSelectChange(listTeacherIdOfClassrooms);
      });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onChangeIsRandomInAll = async (event) => {
    const value = event.target.checked;
    setIsRandomInAll(value);
  };

  const onSubmit = async (value) => {
    if (selectedRowKeys.length < examElement.amountQuestion) {
      message.warning(
        "Số câu hỏi được chọn cần lớn hơn hoặc bằng số câu hỏi của đề thi!"
      );
      return;
    }

    const { listQuestions, ...originExam } = examElement;
    await examAPI.update({ ...originExam, isRandomInAll: isRandomInAll });

    if (!isRandomInAll) {
      await examAPI.updateQuestionOfExam(
        { examId: examElement._id },
        { listQuestionIds: selectedRowKeys }
      );
    } else
      await examAPI.updateQuestionOfExam(
        { examId: examElement._id },
        { listQuestionIds: [] }
      );

    setSelectedRowKeys([]);
    setListQuestionsOfSelectedSubject([]);
    setIsRefreshData(!isRefreshData);
    setIsModalOpen(false);
  };

  const filterListQuestionBySubject = () => {
    console.log({ listQuestions });
    const listQuestionsOfSelectedSubject = listQuestions
      .filter((question) => question.subjectId == examElement.subjectId)
      .map((question) => {
        question.key = question._id;
        return question;
      });

    setListQuestionsOfSelectedSubject(listQuestionsOfSelectedSubject);
  };

  const getRandomQuestion = (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      const amountQuestion = examElement.amountQuestion;
      const listQuestionRandom = [...listQuestionsOfSelectedSubject]
        .sort((a, b) => 0.5 - Math.random())
        .slice(0, amountQuestion);
      onSelectChange(listQuestionRandom.map((item) => item._id));
    } else onSelectChange([]);
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
          <Form.Item label='Số câu hỏi'>
            <Input
              placeholder={PLACEHOLDER.NAME}
              value={examElement.amountQuestion}
              type='number'
              disabled
            />
          </Form.Item>
          <Form.Item label='Lấy ngẫu nhiên trong ngân hàng câu hỏi'>
            <Checkbox onChange={onChangeIsRandomInAll}></Checkbox>
          </Form.Item>

          {!isRandomInAll ? (
            <Form.Item
              label='Danh sách câu hỏi'
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Checkbox className='mb-2' onChange={getRandomQuestion}>
                Lấy ngẫu nhiên câu hỏi trong ngân hàng đề thi
              </Checkbox>
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
          ) : null}
        </Form>
      </Modal>
    </>
  );
};
export default ExamQuestion;

const questionTableColumn = [
  {
    title: "Nội dung",
    dataIndex: "content",
    key: "content",
  },
  {
    title: "Câu trả lời đúng",
    render: (record) => record.listCorrectAnswers?.join(","),
    key: "listCorrectAnswers",
  },
  {
    title: "Loại câu hỏi",
    render: (record) => QUESTION_TYPE[record.type].meaning,
    key: "type",
  },
];
