import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Select, Space, Table } from "antd";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { convertToFilterString } from "utils/filter";
import QuestionCreate from "../question-create/questionCreate";
import QuestionDelete from "../question-delete/questionDelete";
import QuestionUpdate from "../question-update/questionUpdate";

const QuestionView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [subjectIdFilter, setQuestionIdFilter] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);
  const [isRefreshData, setIsRefreshData] = useState(false);

  const columns = [
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
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size='middle' key={record}>
          <QuestionUpdate
            questionElement={record}
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
          <QuestionDelete
            questionElement={record}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubjects();
  }, []);

  useEffect(() => {
    getAllQuestions();
  }, [isRefreshData]);

  useEffect(() => {
    getAllQuestions();
  }, [questionTypeFilter, subjectIdFilter]);

  const getAllSubjects = async () => {
    setIsLoading(true);
    await subjectAPI.getAll().then((res) => {
      setListSubjects(res.data);
      setIsLoading(false);
    });
  };

  const getAllQuestions = async () => {
    setIsLoading(true);
    const filterString = convertToFilterString([
      { key: "subjectId", operator: "==", value: subjectIdFilter },
      { key: "type", operator: "==", value: questionTypeFilter },
    ]);

    const params = {
      filterString: filterString,
    };

    await questionAPI.get(params).then((res) => {
      setListQuestions(res.data);
      setIsLoading(false);
    });
  };

  const handleChangeSubjectFilter = (value) => {
    setQuestionIdFilter(value);
  };

  const handleChangeQuestionTypeFilter = (value) => {
    setQuestionTypeFilter(value);
  };

  const isCorrectAnswer = (answer, listCorrectAnswers) => {
    return listCorrectAnswers.find((correctAnswer) => correctAnswer == answer);
  };

  const renderTableExtra = () => {
    return (
      <>
        <div
          className='d-flex justify-content-end align-items-center'
          style={{ columnGap: "0.5rem" }}
        >
          <Select
            placeholder='Chọn môn học'
            style={{ width: 180 }}
            onChange={handleChangeSubjectFilter}
            options={listSubjects.map((question) => ({
              label: question.name,
              value: question._id,
            }))}
          />
          <Select
            placeholder='Chọn loại câu hỏi'
            style={{ width: 180 }}
            allowClear
            onChange={handleChangeQuestionTypeFilter}
            options={listQuestionTypeKeys.map((key) => ({
              label: QUESTION_TYPE[key].meaning,
              value: QUESTION_TYPE[key].code,
            }))}
          />
          <QuestionCreate
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          />
        </div>
      </>
    );
  };

  const renderTableExpanded = (record) => {
    const columns = [
      {
        title: "Câu trả lời",
        render: (answer) => answer,
      },
      {
        title: "Trạng thái",
        render: (answer) =>
          isCorrectAnswer(answer, record.listCorrectAnswers) ? (
            <CheckCircleOutlined className='text-success fs-4' />
          ) : (
            <InfoCircleOutlined className='text-danger fs-4' />
          ),
      },
    ];
    return (
      <>
        <Table
          dataSource={record.listAnswers}
          columns={columns}
          pagination={false}
          style={{ margin: "1rem" }}
        ></Table>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách câu hỏi' extra={renderTableExtra()}>
        {isLoading ? null : (
          <Table
            columns={columns}
            dataSource={listQuestions}
            expandable={{
              expandedRowRender: (record) => renderTableExpanded(record),
              defaultExpandedRowKeys: ["0"],
            }}
          />
        )}
      </Card>
    </>
  );
};
export default QuestionView;
