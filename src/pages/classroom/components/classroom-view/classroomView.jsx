import { CheckCircleOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Card, Select, Space, Table } from "antd";
import examAPI from "apis/examAPI";
import questionAPI from "apis/questionAPI";
import subjectAPI from "apis/subjectAPI";
import { QUESTION_TYPE } from "constants/types";
import { useEffect, useState } from "react";
import { convertToFilterString } from "utils/filter";
import ExamCreate from "../exam-create/examCreate";
import ExamDelete from "../exam-delete/examDelete";
import ExamUpdate from "../exam-update/examUpdate";

const ClassroomView = () => {
  const [listSubjects, setListSubjects] = useState([]);
  const [listQuestions, setListQuestions] = useState([]);
  const [listExams, setListExams] = useState([]);
  const [subjectIdFilter, setQuestionIdFilter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshData, setIsRefreshData] = useState(false);

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số câu hỏi",
      dataIndex: "amountQuestion",
      key: "amountQuestion",
    },
    {
      title: "Thời gian làm bài",
      dataIndex: "time",
      key: "time",
    },
    {
      title: "",
      key: "action",
      render: (record) => (
        <Space size='middle' key={record}>
          {/* <ExamUpdate
            examElement={record}
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          />
          <ExamDelete
            examElement={record}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
          /> */}
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllSubjects();
    getAllQuestions();
  }, []);

  useEffect(() => {
    getAllExams();
  }, [isRefreshData, subjectIdFilter]);

  const getAllSubjects = async () => {
    setIsLoading(true);
    await subjectAPI.getAll().then((res) => {
      setListSubjects(res.data);
      setIsLoading(false);
    });
  };

  const getAllExams = async () => {
    setIsLoading(true);
    await examAPI.getAll().then((res) => {
      setIsLoading(false);
      const listConvertedExams = addDetailQuestionToExam(res.data);
      setListExams(listConvertedExams);
    });
  };

  const getAllQuestions = async () => {
    setIsLoading(true);
    await questionAPI.getAll().then((res) => {
      setIsLoading(false);
      setListQuestions(res.data);
      setIsLoading(false);
    });
  };

  const addDetailQuestionToExam = (listExams) => {
    listExams?.forEach((exam) => {
      const listQuestionsOfExam = [];
      exam?.listQuestionIds?.forEach((questionId) => {
        const question = listQuestions.find(
          (question) => question._id == questionId
        );
        if (question) listQuestionsOfExam.push(question);
      });
      exam.listQuestions = listQuestionsOfExam;
    });
    return listExams;
  };

  const handleChangeSubjectFilter = (value) => {
    setQuestionIdFilter(value);
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
          {/* 
          <ExamCreate
            listSubjects={listSubjects}
            setIsRefreshData={setIsRefreshData}
            isRefreshData={isRefreshData}
            listQuestions={listQuestions}
          /> */}
        </div>
      </>
    );
  };

  const renderTableExpanded = (record) => {
    return (
      <>
        <Table
          dataSource={record.listQuestions}
          columns={questionTableColumn}
          pagination={false}
          style={{ margin: "1rem" }}
        ></Table>
      </>
    );
  };

  return (
    <>
      <Card title='Danh sách lớp' extra={renderTableExtra()}>
        {isLoading ? null : (
          <Table
            columns={columns}
            dataSource={listExams}
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
export default ClassroomView;

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
