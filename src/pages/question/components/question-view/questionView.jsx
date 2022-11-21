import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Space, Table, Select } from "antd";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { convertToFilterString } from "utils/filter";
import QuestionCreate from "../question-create/questionCreate";

const QuestionView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [subjectIdFilter, setQuestionIdFilter] = useState("");
  const [questionTypeFilter, setQuestionTypeFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const listQuestionTypeKeys = Object.keys(QUESTION_TYPE);

  useEffect(() => {
    getAllSubjects();
    getAllQuestions();
  }, []);

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
    const filterString = [
      { key: "subjectId", operator: "==", value: subjectIdFilter },
      { key: "type", operator: "==", value: questionTypeFilter },
    ]
      .map((item) => convertToFilterString(item))
      .join(",");

    console.log({ filterString });
    const params = {
      filterString: filterString,
    };

    await questionAPI.getAll(params).then((res) => {
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

  const expandedColumns = (record) => [
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
            onChange={handleChangeQuestionTypeFilter}
            options={listQuestionTypeKeys.map((key) => ({
              label: QUESTION_TYPE[key].meaning,
              value: QUESTION_TYPE[key].code,
            }))}
          />
          <QuestionCreate listSubjects={listSubjects} />
        </div>
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
            key=''
            expandable={{
              expandedRowRender: (record) => (
                <Table
                  dataSource={record.listAnswers}
                  columns={expandedColumns(record)}
                  pagination={false}
                  style={{ margin: "1rem" }}
                ></Table>
              ),
              rowExpandable: (record) => record.name !== "Not Expandable",
            }}
          />
        )}
      </Card>
    </>
  );
};
export default QuestionView;

const columns = [
  {
    title: "Nội dung",
    dataIndex: "content",
  },
  {
    title: "Câu trả lời đúng",
    render: (record) => record.listCorrectAnswers.join(","),
  },
  {
    title: "Loại câu hỏi",
    render: (record) => QUESTION_TYPE[record.type].meaning,
  },
  {
    title: "",
    render: (record) => (
      <Space size='middle' key={record}>
        {/* <QuestionUpdate questionElement={record} /> */}
        {/* <UserDelete questionElement={record} /> */}
      </Space>
    ),
  },
];
