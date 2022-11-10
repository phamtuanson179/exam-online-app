import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Space, Table } from "antd";
import { QUESTION_TYPE } from "constants/types";
import { getAllQuestionThunk } from "pages/question/redux/questionThunks";
import { getAllSubjectThunk } from "pages/subject/redux/subjectThunks";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  listQuestionsSelector,
  listSubjectsSelector,
} from "../../../../redux/selectors";
import { convertDate } from "../../../../utils/time";
import QuestionUpdate from "../question-update/questionUpdate";

const QuestionView = () => {
  const [filter, setFilter] = useState("");
  const question = useSelector(listQuestionsSelector);
  const subject = useSelector(listSubjectsSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (subject.listSubjects?.length <= 0) {
      dispatch(getAllSubjectThunk());
    }
  }, []);

  useEffect(() => {
    dispatch(getAllQuestionThunk());
  }, []);

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

  return (
    <Card title='Danh sách câu hỏi' extra={<QuestionUpdate />}>
      {question.loading ? null : (
        <Table
          columns={columns}
          dataSource={question.question}
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
